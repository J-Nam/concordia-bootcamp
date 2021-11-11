import GlobalStyle from './base-styles';
import { useStore } from './contexts/Store';

import Container from './components/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleCard from './components/ArticleCard';
import Categories from './components/Categories';
import styled from 'styled-components';
import FeaturedArticleCard from './components/FeaturedArticleCard';

function App() {
  const {
    state: {
      articles,
      isLoading,
      total,
      latestFeaturedArticle,
      categories,
      selected,
    },
    actions: { fetchPaginatedArticles, fetchByCategoryArticle },
  } = useStore();

  if (articles.length === 0) {
    //definitely can be better
    return <div>loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <main className='App'>
        <Header />
        <Container>
          <Title>Blog</Title>
          <FeaturedArticleCard data={latestFeaturedArticle.fields} />
          <Categories
            categories={categories}
            categoryClickHandler={fetchByCategoryArticle}
            selected={selected}
          />
          <ArticlesWrapper>
            {articles.map((article) => {
              return <ArticleCard key={article.sys.id} data={article.fields} />;
            })}
          </ArticlesWrapper>
          {/* show the load more button when there are more articles left */}
          {total > articles.length && selected === null && (
            <Button
              onClick={() => {
                // load additional 6 articles
                fetchPaginatedArticles();
              }}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          )}
        </Container>

        <Footer />
      </main>
    </>
  );
}

//styled components
const Title = styled.h1`
  font-size: 4em;
  padding: 30px 0;

  @media (max-width: 800px) {
    font-size: 2em;
    padding: 20px 0;
  }
`;

const ArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
`;

const Button = styled.button`
  padding: 15px 20px;
  font-size: 20px;
  color: black;
  background: transparent;
  border: 2px solid black;
  border-radius: 30px;
  transition: 0.4s;
  margin: 10px;
  width: 100%;
  &:hover {
    cursor: pointer;
    color: white;
    background: black;
  }
`;
export default App;
