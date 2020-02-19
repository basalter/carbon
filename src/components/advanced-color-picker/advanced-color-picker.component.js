import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyledAdvancedColorPickerWrapper,
  StyledAdvancedColorPickerCell,
  StyledAdvancedColorPickerPreview,
  DialogStyle
} from './advanced-color-picker.style';
import { SimpleColorPicker, SimpleColor } from '../../__experimental__/components/simple-color-picker';
import Events from '../../utils/helpers/events';

const AdvancedColorPicker = ({
  name,
  open,
  onOpen,
  onClose,
  onChange,
  onBlur,
  availableColors,
  defaultColor,
  selectedColor
}) => {
  const color = selectedColor || defaultColor;

  useEffect(() => {
    if (open) {
      const selectedInput = document.querySelector('input[name="' + name  + '"][aria-checked="true"]');
      selectedInput.focus();
    }
  });

  const handleOnKeyDown = (e) => {
    if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
      onOpen(e);
    }
  };

  return (
    <StyledAdvancedColorPickerWrapper>
      <StyledAdvancedColorPickerCell
        onClick={ onOpen }
        onKeyDown={ handleOnKeyDown }
        color={ color }
        tabIndex='0'
      />
      <DialogStyle
        open={ open }
        size='auto'
        onCancel={ onClose }
        >
        <StyledAdvancedColorPickerPreview
          color={ color }
        />
        <SimpleColorPicker
          name={ name }
          legend=''
          onChange={ onChange }
          onBlur={ onBlur }
        >
          {availableColors.map(({ value, label }) => (
            <SimpleColor
              value={ value }
              key={ value }
              aria-label={ label }
              id={ value }
              defaultChecked={ value === color }
            />
          ))}
        </SimpleColorPicker>
      </DialogStyle>
    </StyledAdvancedColorPickerWrapper>
  );
};

AdvancedColorPicker.defaultProps = {
  open: false
};

AdvancedColorPicker.propTypes = {
  defaultColor: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onBlur: PropTypes.func
};

export default AdvancedColorPicker;
