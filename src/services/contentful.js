import request, { GET } from './request';

const CONTENTFUL_URL = `https://cdn.contentful.com/spaces/6fmuqje9nkz0/environments/master/entries?access_token=yNcU-W6qITUmC18PRtK6Gyy32Vy7oGLRAWzW-2zyUaM&content_type=blog-entry`;

export const getAllArticles = async () => {
  try {
    const response = await request(GET, CONTENTFUL_URL);
    const categories = response.items.reduce((acc, cur) => {
      if (acc.indexOf(cur.fields.category) === -1) {
        return [...acc, cur.fields.category];
      }
      return [...acc];
    }, []);
    return { items: response.items, categories };
  } catch (e) {
    console.log('getAllArticles failed:', e);
  }
};

// get paginated articles
// we will fetch 6 articles at once for this workshop
export const getPaginatedArticles = async (skip, limit) => {
  try {
    const paginatedRequestURL = CONTENTFUL_URL + `&skip=${skip}&limit=${limit}`;
    const response = await request(GET, paginatedRequestURL);
    return { items: response.items, total: response.total };
  } catch (e) {
    console.log('getPaginatedArticles failed:', e);
  }
};

// get featured article
export const getFeaturedArticle = async (skip, limit) => {
  try {
    const featuredRequestURL =
      CONTENTFUL_URL + `&fields.featured=true&order=fields.date`;
    const response = await request(GET, featuredRequestURL);
    return response.items;
  } catch (e) {
    console.log('getPaginatedArticles failed:', e);
  }
};

export const getArticlesByCategory = async (category) => {
  try {
    const byCategoryRequestURL =
      category === 'all'
        ? CONTENTFUL_URL
        : CONTENTFUL_URL + `&fields.category=${category}`;

    const response = await request(GET, byCategoryRequestURL);

    return response.items;
  } catch (e) {
    console.log('getAllArticles failed:', e);
  }
};

// Possibly useful documentation:
// - https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters
// - https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entries-collection/get-all-entries-of-a-space/console
// - https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/collection-resources-and-pagination
