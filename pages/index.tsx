import type { GetStaticProps, NextPage } from "next";
import { getCharacters } from "rickmortyapi";

type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

interface Props {
  /**
   * Advantage:
   * types are inferred. You don't need to import third party types
   */
  characters: AsyncReturnType<typeof getCharacters>["data"];
}
const Home: NextPage<Props> = ({ characters }) => {
  // type of results is Character[] | undefined
  const { results } = characters;
  return (
    <div>
      <ul>
        {results?.map((character) => (
          <li key={`${character.id}`}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // type of response is ApiResponse<Info<Character[]>>
  const response = await getCharacters();
  // rename data to 'characters'
  const { data: characters } = response;
  return {
    props: {
      // type of characters is Info<Character[]>
      characters,
    },
  };
};

/**
 * Example with imported types
 *
 * ```ts
 * import type {Info, Character} from "rickmortyapi/dist/interfaces"
 *
 * interface Props {
 *   characters: Info<Character[]>
 * }
 * ```
 */
