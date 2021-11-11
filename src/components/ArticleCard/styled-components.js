import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #ddd;
  width: 45%;
  margin: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
    margin: 10px 0;
  }
`;
export const Img = styled.img`
  width: 100%;
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
`;
