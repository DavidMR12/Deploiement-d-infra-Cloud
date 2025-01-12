import Head from "next/head";
import { useRouter } from "next/router";

const HeadCustom = () => {
  useRouter();

  return (
    <Head>
      <title>Quantum Motors Configurateur</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="configurateur de quantum motors" />
    </Head>
  );
};

export default HeadCustom;
