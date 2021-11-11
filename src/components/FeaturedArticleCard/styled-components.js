import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-top: 2.5px solid black;
  border-bottom: 2.5px solid black;
  padding: 20px 0;
`;
export const Img = styled.img`
  width: 50%;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Title = styled.h3`
  font-size: 25px;
`;

export const Category = styled.div`
  margin-top: 20px;
`;

export const Info = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 50%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: black;
  margin-top: 20px;

  &:hover {
    color: gray;
    cursor: pointer;
  }
`;
