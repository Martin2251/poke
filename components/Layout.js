import Head from "next/head";
export default function Home({ children, title }) {
  // want to take in a property of title which we want to pass into this layout
  // import our header information from Next Head

  return (
    <div className="bg-gray-300">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
