import styled, { css } from 'styled-components';

import { baseTheme } from '../../style/themes';

const StyledAnchorNavigation = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;

  ${({ styleOverride }) => styleOverride}
`;

const StyledNavigation = styled.ul`
  position: sticky;
  top: 32px;
  box-shadow: inset 3px 0px 0px 0px ${({ theme }) => theme.disabled.background};
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 240px;

  ${({ styleOverride }) => styleOverride}
`;

const StyledContent = styled.div`
  flex: 1;
  margin-left: 32px;

  ${({ styleOverride }) => styleOverride}
`;

const StyledNavigationItem = styled.li`
  width: 100%;

  a {
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: ${({ theme }) => theme.text.color};
    background-color: transparent;
    border-left: 3px solid ${({ theme }) => theme.disabled.background};
    font-weight: 700;
    padding: 12px 24px;

    &:hover {
      background-color: ${({ theme }) => theme.anchorNavigation.navItemHoverBackground};
    }

    &:focus {
      box-shadow: 0 0 6px ${({ theme }) => theme.colors.focus};
      outline: none;
      z-index: 1;
    }

    ${({ isSelected }) => isSelected && css`
      background-color: ${({ theme }) => theme.colors.white};
      border-left-color: ${({ theme }) => theme.colors.primary};
    `}
  }

  ${({ styleOverride }) => styleOverride}
`;

const StyledAnchorDivider = styled.div.attrs({ 'data-element': 'anchor-navigation-divider' })`
  background-color: ${({ theme }) => theme.anchorNavigation.divider};
  height: 1px;

  ${({ styleOverride }) => styleOverride}
`;


StyledAnchorNavigation.defaultProps = {
  theme: baseTheme
};
StyledNavigation.defaultProps = {
  theme: baseTheme
};
StyledNavigationItem.defaultProps = {
  theme: baseTheme
};
StyledContent.defaultProps = {
  theme: baseTheme
};
StyledAnchorDivider.defaultProps = {
  theme: baseTheme
};

export {
  StyledAnchorNavigation,
  StyledNavigation,
  StyledNavigationItem,
  StyledContent,
  StyledAnchorDivider
};
