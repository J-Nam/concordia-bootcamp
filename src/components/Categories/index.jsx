import { Wrapper, CategoryWrapper, Button, Title } from './styled-components';

const Categories = ({ categories, categoryClickHandler, selected }) => {
  return (
    <Wrapper>
      <Title>Categories</Title>
      <CategoryWrapper>
        <Button
          onClick={() => categoryClickHandler('all')}
          isSelected={selected === null || selected === 'all'}
        >
          All
        </Button>
        {categories.map((category, i) => {
          return (
            <Button
              isSelected={selected === category}
              key={i}
              onClick={() => categoryClickHandler(category)}
            >
              {category}
            </Button>
          );
        })}
      </CategoryWrapper>
    </Wrapper>
  );
};

export default Categories;
