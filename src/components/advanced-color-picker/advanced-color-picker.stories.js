import React from 'react';
import { text, object, withKnobs } from '@storybook/addon-knobs';
import AdvancedColorPicker from '.';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Test/Advanced Colour Picker',
  component: AdvancedColorPicker,
  decorators: [withKnobs]
};

const store = new Store({
  selectedColor: null,
  open: false
});

const onClose = (evt) => {
  store.set({ open: false });
  action('Close')(evt);
};

const onOpen = (evt) => {
  store.set({ open: true });
  action('Open')(evt);
};

const onChange = (e) => {
  const { value } = e.target;
  store.set({
    selectedColor: value
  });
  action(`Selected - ${value}`)(e);
};

const onBlur = (e) => {
  action(`Blur`)(e);
};

export const basic = () => {
  const name = text('name', 'advancedPicker');
  const demoColors = [
    { value: '#FFFFFF', label: 'white' },
    { value: 'nofill', label: 'transparent' },
    { value: '#000000', label: 'black' },
    { value: '#A3CAF0', label: 'blue' },
    { value: '#FD9BA3', label: 'pink' },
    { value: '#B4AEEA', label: 'purple' },
    { value: '#ECE6AF', label: 'goldenrod' },
    { value: '#EBAEDE', label: 'orchid' },
    { value: '#EBC7AE', label: 'desert' },
    { value: '#AEECEB', label: 'turqoise' },
    { value: '#AEECD6', label: 'mint' }
  ];
  const availableColors = object('availableColors', demoColors);

  return (
    <State store={ store }>
      <AdvancedColorPicker
        name={ name }
        onOpen={ onOpen }
        onClose={ onClose }
        onChange={ onChange }
        onBlur={ onBlur }
        availableColors={ availableColors }
        selectedColor={ store.selectedColor }
        defaultColor='#EBAEDE'
      />
    </State>
  );
};

basic.story = {
  name: 'default',
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    }
  }
};
