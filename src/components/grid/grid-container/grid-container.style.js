import styled, { css } from 'styled-components';

const GridContainerStyle = styled.div`
  ${() => css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  width: auto;
  margin: 40px;
  grid-gap: 24px;

  @media screen and (max-width: 1259px) {
    margin: 32px;
  }

  @media screen and (max-width: 959px) {
    grid-gap: 16px;
    margin: 24px;
  }

  @media screen and (max-width: 599px) {
    margin: 16px;
  } 

`}`;

export { GridContainerStyle };