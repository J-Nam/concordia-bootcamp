import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 2em;
  padding: 20px 0;
`;

export const Button = styled.button`
  padding: 7px 20px;
  margin: 10px;
  border-radius: 30px;
  font-size: 25px;
  color: ${(p) => (p.isSelected ? 'white' : 'black')};
  border: none;
  background: #40e0d0; /* fallback for old browsers */
  background: ${(p) =>
    p.isSelected
      ? '-webkit-linear-gradient(to right,#ff0080,#ff8c00,#40e0d0)'
      : '#ddd'};
  background: ${(p) =>
    p.isSelected
      ? 'linear-gradient(to right,#ff0080,#ff8c00,#40e0d0)'
      : '#ddd'};

  &:hover {
    cursor: pointer;
  }
`;
