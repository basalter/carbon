import React, { useRef } from 'react';
import { State, Store } from '@sambego/storybook-state';

import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import Textbox from '../../__experimental__/components/textbox';
import Button from '../button';
import DialogFullScreen from '../dialog-full-screen';

import { AnchorNavigation, AnchorSectionDivider, AnchorNavigationItem } from '.';

const store = new Store({
  open: true
});

const Content = ({ title, height, noFocusableElement }) => <>
  {!noFocusableElement && <Textbox label={ title } />}
  <h2 style={ { height } }>
    {title}
  </h2>
</>;

const handleOpen = () => {
  store.set({ open: true });
};

export default {
  title: 'Test/AnchorNavigation',
  component: AnchorNavigation,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    }
  }
};

export const Basic = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return (
    <>
      <AnchorNavigation
        stickyNavigation={
            <>
              <AnchorNavigationItem target={ ref1 } href='#id1'>
                First
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref2 } href='#id2'>
                Second
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref3 } href='#id3'>
                Third
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref4 } href='#id4'>
                The slighly longer than expected fourth navigation item
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref5 } href='#id4'>
                Fifth
              </AnchorNavigationItem>
            </>
        }
      >
        <div ref={ ref1 }>
          <Content title='First section' height={ 300 } />
        </div>
        <AnchorSectionDivider />
        <div ref={ ref2 }>
          <Content title='Second section' height={ 300 } />
        </div>

        <div ref={ ref3 }>
          <Content
            noFocusableElement
            title='Third section'
            height={ 300 }
          />
        </div>

        <div ref={ ref4 }>
          <Content title='Fourth section' height={ 300 } />
        </div>

        <div ref={ ref5 }>
          <Content title='Fifth section' height={ 300 } />
        </div>
      </AnchorNavigation>
    </>
  );
};

export const InFullScreenDialog = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return <>
    <Button onClick={ handleOpen }>Open Preview</Button>

    <State store={ store }>
      <DialogFullScreen
        open={ store.get('open') }
        title='Title'
        subtitle='Subtitle'
      >
        <AnchorNavigation
          stickyNavigation={
            <>
              <AnchorNavigationItem target={ ref1 } href='#id1'>
                First
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref2 } href='#id2'>
                Second
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref3 } href='#id3'>
                Third
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref4 } href='#id4'>
                The slighly longer than expected fourth navigation item
              </AnchorNavigationItem>
              <AnchorNavigationItem target={ ref5 } href='#id4'>
                Fifth
              </AnchorNavigationItem>
            </>
          }
        >
          <div ref={ ref1 }>
            <Content title='First section' height={ 300 } />
          </div>
          <AnchorSectionDivider />
          <div ref={ ref2 }>
            <Content title='Second section' height={ 300 } />
          </div>

          <div ref={ ref3 }>
            <Content
              noFocusableElement
              title='Third section'
              height={ 300 }
            />
          </div>

          <div ref={ ref4 }>
            <Content title='Fourth section' height={ 300 } />
          </div>

          <div ref={ ref5 }>
            <Content title='Fifth section' height={ 300 } />
          </div>
        </AnchorNavigation>
      </DialogFullScreen>
    </State>
  </>;
};
