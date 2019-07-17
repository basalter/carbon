import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import LabelStyle from '../label/label.style';

export default ({
  checked, fieldHelpInline, reverse, theme
}) => theme.name === THEMES.classic && css`
  ${StyledCheckableInput},
  ${HiddenCheckableInputStyle},
  ${StyledCheckableInputSvgWrapper},
  svg {
    height: 15px;
    width: 15px;
  }

  ${FieldHelpStyle} {
    margin-left: 22px;
  }

  ${FieldHelpStyle}, ${LabelStyle} {
    padding: 0 6px;
  }

  ${StyledCheckableInput} {
    margin-right: 6px;
  }

  ${checked && `
    circle { fill: rgba(0, 0, 0, 0.85); }
  `}

  ${(fieldHelpInline || reverse) && `
    ${FieldHelpStyle} {
      margin-left: 0;
      margin-right: 6px;
    }

    ${StyledCheckableInput} {
      margin-left: 6px;
    }
  `}
`;