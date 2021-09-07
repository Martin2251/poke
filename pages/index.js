import Link from "next/Link";
import Layout from "../components/Layout";
export default function Home({ pokemon }) {
  // wrapping all our content in a layout
  // each child inside the map needs a key, we use index as a key
  // import link from next Link
  // we need to increment the index by 1 to get a relevant info as index starts at 0

  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center ">The Nextjs Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  src={pokeman.image}
                  alt={pokeman.name}
                  className="w-20 h-20 mr-3"
                />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// this is statically rendered
// we want to return an object inside these props
// Next will grab all this information at build time from the api so its a fully static page
//data has a property called results we can get it from destructuring it
// we want to map the images to the results of the api
// it needs to be padded with 2 0s at the start
// the index is 0 based but pokemon start at 1
// we want to grab the last 3 digits which is why we call .slice
// we want to grab the last 3 digits out of there
export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
