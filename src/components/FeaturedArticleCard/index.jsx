import placeholder from '../../images/thought-catalog-EMX1eJ1BcgU-unsplash.jpg';

import { Wrapper, Img, Info, Title, Category, Link } from './styled-components';

const FeaturedArticleCard = ({ data }) => {
  const { title, content } = data;
  return (
    <Wrapper>
      <Img src={placeholder} />
      <Info>
        <Title>{title}</Title>
        <Category>{content}</Category>
        <Link href='/'>Read More</Link>
      </Info>
    </Wrapper>
  );
};

export default FeaturedArticleCard;
