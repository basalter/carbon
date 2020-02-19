import styled from 'styled-components';
import StyledAdvancedColorPickerCell from './advanced-color-picker-cell.style';
import { SimpleColorFieldset } from '../../__experimental__/components/simple-color-picker/simple-color-picker.style';
import StyledSimpleColor from '../../__experimental__/components/simple-color-picker/simple-color/simple-color.style';
import StyledSimpleColorInput from '../../__experimental__/components/simple-color-picker/simple-color-input/simple-color-input.style';
import StyledColorSampleBox from '../../__experimental__/components/simple-color-picker/color-sample-box/color-sample-box.style';
import { DialogContentStyle, DialogInnerContentStyle } from '../../components/dialog/dialog.style';
import Dialog from '../../components/dialog/dialog.component';

const StyledAdvancedColorPickerWrapper = styled.div`
  display: inline-block;
  margin: 15px auto auto 15px;
`;

const StyledAdvancedColorPickerPreview = styled(StyledAdvancedColorPickerCell)`
  margin-bottom: 15px;

  &:hover {
    cursor: initial;
  }
`;

const DialogStyle = styled(Dialog)`
  ${DialogContentStyle} {
    padding: 18px 18px 18px 17px;
  }

  ${DialogInnerContentStyle} {
    padding: 0;
  }

  ${SimpleColorFieldset} {
    max-width: 285px;
    ${StyledSimpleColor} {
      border: 1px solid #3C514E;
      margin-right: -1px;
      margin-bottom: -1px;
    }
  }

  .carbon-dialog__close {
    top: 20px;
    right: 13px;
  }
`;

export {
  StyledAdvancedColorPickerWrapper,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle
};
