import * as React from 'react';

export interface AccordionSectionDividerProps {
  /** Allows to override existing component styles */
  styleOverride?: () => object | object
}

declare const AccordionSectionDivider: React.FunctionComponent<AccordionSectionDividerProps>;
export default AccordionSectionDivider;
