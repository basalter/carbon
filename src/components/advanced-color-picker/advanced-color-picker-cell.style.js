import styled, { css } from 'styled-components';

const StyledAdvancedColorPickerCell = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid #516562;
  ${({ color }) => color && css`
    background-color: ${color};
  `}

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: solid 3px #FFB500;
  }
`;

export default StyledAdvancedColorPickerCell;
