# adapted from https://github.com/petems/ansible-json
import os
import time
import datetime
import httplib2
import json
import uuid

from datetime import datetime
from httplib2 import Http
from json import JSONEncoder

class CallbackModule(object):

  @staticmethod
  def convert_string_to_timestamp_ms(value, format):
    dt = datetime.strptime(value, format)
    return int(time.mktime(dt.timetuple()) * 1000 + round(dt.microsecond / 1000))

  @staticmethod
  def convert_ansible_datetime_string_to_timestamp_ms(value):
    # Example input: '2015-02-23 13:48:21.316040'
    return CallbackModule.convert_string_to_timestamp_ms(value, '%Y-%m-%d %H:%M:%S.%f')
  
  @staticmethod
  def convert_ansible_time_string_to_timestamp_ms(value):
    # Example input: '0:00:00.004156'
    return CallbackModule.convert_string_to_timestamp_ms('1970-01-01 0' + value, '%Y-%m-%d %H:%M:%S.%f')

  def __init__(self):
    self.uuid = uuid.uuid1()

    self.http = Http()
    self.http_headers = {'Content-type': 'application/json'}
    self.http_method = 'PUT'
    self.http_uri = 'http://172.16.237.124:9200/ansible-deployments-' + time.strftime('%Y') + '/playbook-run-' + str(self.uuid)

  def json_create_message(self, host, status, res):
    if type(res) == type(dict()):
      if 'verbose_override' not in res:

        for i in ['start', 'end']:
          if i in res:
            res[i] = self.convert_ansible_datetime_string_to_timestamp_ms(res[i])

        for i in ['delta']:
          if i in res:
            res[i] = self.convert_ansible_time_string_to_timestamp_ms(res[i])

        res.update({unicode('host'): unicode(host)})
        res.update({unicode('status'): unicode(status)})

        if 'start' in res:
          timestamp = res['start']
        else:
          timestamp = int(time.time() * 1000)

        res.update({'timestamp': timestamp})

        return (str(timestamp), JSONEncoder().encode(res))

    return (None, None)

  def json_post_message(self, id, msg):
    response, content = self.http.request(self.http_uri + '/' + id, self.http_method, msg, self.http_headers)
    print('Data available at: ' + self.http_uri + '/' + id + '?pretty=1')

  def json_post_result(self, host, status, res):
    id, msg = self.json_create_message(host, status, res)
    if id != None:
      self.json_post_message(id, msg)

  def on_any(self, *args, **kwargs):
    pass

  def runner_on_failed(self, host, res, ignore_errors=False):
    self.json_post_result(host, 'failed', res)

  def runner_on_ok(self, host, res):
    self.json_post_result(host, 'ok', res)

  def runner_on_error(self, host, msg):
    json_post_result(host, 'error', {unicode('msg'): msg})
    pass

  def runner_on_skipped(self, host, item=None):
    pass

  def runner_on_unreachable(self, host, res):
    self.json_post_result(host, 'unreachable', res)

  def runner_on_no_hosts(self):
    pass

  def runner_on_async_poll(self, host, res, jid, clock):
    self.json_post_result(host, 'async_poll', res)

  def runner_on_async_ok(self, host, res, jid):
    self.json_post_result(host, 'async_ok', res)

  def runner_on_async_failed(self, host, res, jid):
    self.json_post_result(host, 'async_failed', res)

  def playbook_on_start(self):
    pass

  def playbook_on_notify(self, host, handler):
    pass

  def playbook_on_no_hosts_matched(self):
    pass

  def playbook_on_no_hosts_remaining(self):
    pass

  def playbook_on_task_start(self, name, is_conditional):
    pass

  def playbook_on_vars_prompt(self, varname, private=True, prompt=None, encrypt=None, confirm=False, salt_size=None, salt=None, default=None):
    pass

  def playbook_on_setup(self):
    pass

  def playbook_on_import_for_host(self, host, imported_file):
    pass

  def playbook_on_not_import_for_host(self, host, missing_file):
    pass

  def playbook_on_play_start(self, pattern):
    pass

  def playbook_on_stats(self, stats):
    pass
