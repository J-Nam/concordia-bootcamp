import placeholder from '../../images/thought-catalog-EMX1eJ1BcgU-unsplash.jpg';
import { Wrapper, Img, Info, Title, Category } from './styled-components';

const ArticleCard = ({ data }) => {
  const { title, category } = data;
  return (
    <Wrapper>
      <Img src={placeholder} />
      <Info>
        <Title>{title}</Title>
        <Category>{category}</Category>
      </Info>
    </Wrapper>
  );
};

export default ArticleCard;
