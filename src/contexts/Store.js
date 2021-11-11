import React, { useEffect, useContext, useReducer } from 'react';
import {
  getAllArticles,
  getPaginatedArticles,
  getFeaturedArticle,
  getArticlesByCategory,
} from '../services/contentful';

export const StoreContext = React.createContext();

const actions = {
  FETCH_REQUEST: 'fetch-request',
  GET_PAGINATED_ARTICLES: 'get-pagenated-articles',
  GET_LATEST_FEATURED_ARTICLE: 'get-featured-article',
  GET_BYCATEGORY_ARTICLE: 'get-byCategory-article',
  GET_ALL_CATEGORIES: 'get-all-categories',
  FETCH_SUCCESS: 'fetch-success',
  FETCH_FAILURE: 'fetch-failure',
};

const initialState = {
  articles: [],
  latestFeaturedArticle: null,
  skip: 0,
  isLoading: false,
  error: null,
  total: 0,
  categories: [],
  selected: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actions.GET_PAGINATED_ARTICLES:
      // we could skip the featured article in the list
      // const filtered = action.payload.paginatedArticles.filter(
      //   (item) => item.sys.id !== state.latestFeaturedArticle.sys.id
      // );
      return {
        ...state,
        skip: state.skip + 6,
        articles: [...state.articles, ...action.payload.paginatedArticles],
        isLoading: false,
        total: action.payload.total,
      };
    case actions.GET_LATEST_FEATURED_ARTICLE:
      return {
        ...state,
        latestFeaturedArticle: action.payload.latestFeaturedArticle,
        isLoading: false,
      };
    case actions.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case actions.GET_BYCATEGORY_ARTICLE:
      return {
        ...state,
        articles: [...action.payload.bycategoryArticles],
        selected: action.payload.selected,
        isLoading: false,
      };
    case actions.FETCH_SUCCESS:
      return { ...state, isLoading: false };
    case actions.FETCH_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return { ...state };
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // action creators
  const requestFetch = () => {
    dispatch({
      type: actions.FETCH_REQUEST,
    });
  };

  const fetchPaginatedArticles = async () => {
    // fetch begins
    requestFetch();
    const { items, total } = await getPaginatedArticles(state.skip, 6);

    return dispatch({
      type: actions.GET_PAGINATED_ARTICLES,
      payload: {
        paginatedArticles: items,
        total,
      },
    });
  };

  const fetchLatestFeaturedArticle = async () => {
    // fetch begins
    requestFetch();
    // fetch all featured articles
    const items = await getFeaturedArticle();
    return dispatch({
      type: actions.GET_LATEST_FEATURED_ARTICLE,
      payload: { latestFeaturedArticle: items[items.length - 1] },
    });
  };

  const fetchByCategoryArticle = async (category) => {
    // fetch begins
    requestFetch();
    // fetch articles by the category
    const items = await getArticlesByCategory(category);
    return dispatch({
      type: actions.GET_BYCATEGORY_ARTICLE,
      payload: { bycategoryArticles: items, selected: category },
    });
  };

  const fetchAllCategories = async () => {
    // fetch begins
    requestFetch();

    const { categories } = await getAllArticles();
    return dispatch({
      type: actions.GET_ALL_CATEGORIES,
      payload: { categories },
    });
  };

  useEffect(() => {
    const onLoading = async () => {
      try {
        // fetch all categories
        await fetchAllCategories();
        // fetch latest featured articles
        await fetchLatestFeaturedArticle();
        // fetch the first 6 articles
        await fetchPaginatedArticles();
      } catch {}
    };

    onLoading();
  }, []); // eslint-disable-line

  return (
    <StoreContext.Provider
      value={{
        state,
        actions: { fetchPaginatedArticles, fetchByCategoryArticle },
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
