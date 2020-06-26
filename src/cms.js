import config from '../est.config.yaml';

const CMS_ENDPOINT = config.cms;

/**
 * Executes a [GraphQL](https://graphql.org/) query to the
 * HackGT CMS and returns the `data` field of the response if it exists
 *
 * @param {string} query - A GraphQL query string
 * @return {Object} data - The `data` field of the response if it exists
 * @throws Will throw an error if the query failed. The query may have failed
 * because it didn't validate at the server, or the endpoint is incorrect.
 */
export async function fetchCms(query) {
    const response = await fetch(CMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
    });
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

/**
 * @typedef {Object} Block
 * @property {string} name - The name of the block
 * @property {string} content - The content of the block in markdown format
 */

/**
 * Fetches the block corresponding to the `blogSlug` from the HackGT CMS
 * by executing a [GraphQL](https://graphql.org/) query
 *
 * @param {string} blockSlug - The slug of the block in CMS
 * @return {Block} block - The first element of the array of blocks returned
 * from CMS if it exists
 * @throws Will throw an error if the query failed. The query may have failed
 * because it didn't validate at the server, or the endpoint is incorrect.
 */
export async function fetchBlock(blockSlug) {
    const query = `
    {
      allBlocks (where: { slug: "${blockSlug}" }) 
      {
        name
        content
      }
    }`;
    const data = await fetchCms(query);
    return data.allBlocks[0];
}

/**
 * @typedef {Object} Social
 * @property {string} name - The name of the social media account
 * @property {string} url -  The url to the social media account
 */

/**
 * Fetches all social media accounts of HackGT from the HackGT CMS by
 * executing a [GraphQL](https://graphql.org/) query
 *
 * @return {Social[]} socials - A list of HackGT's social media accounts
 * @throws Will throw an error if the query failed. The query may have failed
 * because it didn't validate at the server, or the endpoint is incorrect.
 */
export async function fetchSocials() {
    const query = `
    {
      allSocialAccounts 
      {
        name
        url
      }
    }`;

    const data = await fetchCms(query);
    return data.allSocialAccounts;
}
