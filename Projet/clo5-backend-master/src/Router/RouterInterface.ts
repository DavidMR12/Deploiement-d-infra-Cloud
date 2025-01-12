/**
 * RouterInterface
 * defines the methods that a router must implement
 */
export interface RouterInterface {
  controller: any;
  run(): void;
}
