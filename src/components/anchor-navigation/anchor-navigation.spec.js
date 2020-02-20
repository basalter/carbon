import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { simulate, assertStyleMatch } from '../../__spec_helper__/test-utils';
import baseTheme from '../../style/themes/base';

import Textbox from '../../__experimental__/components/textbox';
import { AnchorNavigation, AnchorNavigationItem, AnchorSectionDivider } from '.';
import {
  StyledAnchorNavigation,
  StyledNavigation,
  StyledContent,
  StyledNavigationItem,
  StyledAnchorDivider
} from './anchor-navigation.style';

const expectNavigationItemToBeSelected = (index, wrapper) => assertStyleMatch({
  backgroundColor: baseTheme.colors.white,
  borderLeftColor: baseTheme.colors.primary
}, wrapper.find(StyledNavigationItem).at(index), { modifier: 'a' });

const Content = React.forwardRef(({ title, height, noFocusableElement }, ref) => <>
  <div ref={ ref } className='focusableContent'>
    {!noFocusableElement && <Textbox label={ title } />}
    <h2 style={ { height } }>
      {title}
    </h2>
  </div>
</>);

describe('AnchorNavigation', () => {
  let wrapper;
  let scrollIntoViewMock;

  let ref1;
  let ref2;
  let ref3;
  let ref4;
  let ref5;

  const render = (props) => {
    ref1 = React.createRef();
    ref2 = React.createRef();
    ref3 = React.createRef();
    ref4 = React.createRef();
    ref5 = React.createRef();

    function mockFunction(options) {
      return { options, element: this };
    }
    scrollIntoViewMock = jest.fn().mockImplementation(mockFunction);

    Element.prototype.scrollIntoView = scrollIntoViewMock;

    wrapper = mount(
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
        { ...props }
      >
        <Content
          ref={ ref1 }
          title='First section'
          height={ 300 }
        />
        <AnchorSectionDivider />
        <Content
          ref={ ref2 }
          title='Second section'
          height={ 300 }
        />
        <AnchorSectionDivider />
        <Content
          ref={ ref3 }
          title='Third section'
          height={ 300 }
          noFocusableElement
        />
        <AnchorSectionDivider />
        <Content
          ref={ ref4 }
          title='Fourth section'
          height={ 300 }
        />
        <AnchorSectionDivider />
        <Content
          ref={ ref5 }
          title='Fifth section'
          height={ 300 }
        />
      </AnchorNavigation>,
    );
  };

  beforeEach(() => {
    render();
  });

  it('has proper data attributes applied to elements', () => {
    expect(wrapper.find(StyledAnchorNavigation).getDOMNode().getAttribute('data-component')).toBe('anchor-navigation');
    expect(wrapper.find(StyledNavigation).getDOMNode().getAttribute('data-element')).toBe('anchor-sticky-navigation');
    wrapper.find(`${StyledNavigationItem} a`).forEach((navItem) => {
      expect(navItem.getDOMNode().getAttribute('data-element')).toBe('anchor-navigation-item');
    });
  });

  it.each(
    [[0, true], [1, true], [2, false], [3, true], [4, true]]
  )('clicking on navigation item scrolls to wanted section and focuses its first focusable element',
    (index, hasFocusableElement) => {
      const preventDefault = jest.fn();
      wrapper.find(`${StyledNavigationItem} a`).at(index).simulate('click', { preventDefault });
      if (hasFocusableElement) {
        expect(wrapper.find(Content).at(index).find('input')).toBeFocused();
      }
    });

  describe.each([['enter', 13], ['space', 32]])('%s', (key, keyCode) => {
    it.each(
      [[0, true], [1, true], [2, false], [3, true], [4, true]]
    )('pressed on navigation item scrolls to wanted section and focuses its first focusable element',
      (index, hasFocusableElement) => {
        const preventDefault = jest.fn();
        wrapper.find(`${StyledNavigationItem} a`).at(index).simulate('keydown', { preventDefault, which: keyCode });
        if (hasFocusableElement) {
          expect(wrapper.find(Content).at(index).find('input')).toBeFocused();
        }
        expect(scrollIntoViewMock).toHaveReturnedWith({
          element: wrapper.find('.focusableContent').at(index).getDOMNode(),
          options: { block: 'start', inline: 'nearest', behavior: 'smooth' }
        });
      });
  });

  it.each(
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 1]]
  )('focuses on the next navigation item in a loop when down arrow is pressed', (focused, shouldBeFocused) => {
    simulate.keydown.pressDownArrow(wrapper.find(`${StyledNavigationItem} a`).at(focused));
    expect(wrapper.find(`${StyledNavigationItem} a`).at(shouldBeFocused)).toBeFocused();
  });

  it.each(
    [[0, 4], [4, 3], [3, 2], [2, 1], [1, 0], [0, 4]]
  )('focuses on the previous navigation item in a loop when up arrow is pressed', (focused, shouldBeFocused) => {
    simulate.keydown.pressUpArrow(wrapper.find(`${StyledNavigationItem} a`).at(focused));
    expect(wrapper.find(`${StyledNavigationItem} a`).at(shouldBeFocused)).toBeFocused();
  });

  // coverage filler
  it('does nothing if key other than up, down, tab or space key is pressed', () => {
    simulate.keydown.pressRightArrow(wrapper.find(`${StyledNavigationItem} a`).at(0));
  });


  it.each(
    [[100, 0], [200, 1], [300, 1], [400, 2], [500, 2], [600, 3], [700, 3], [800, 4], [900, 4], [1000, 4]]
  )(
    'scroll triggers selection of proper navigation item based on the navigation and sections top position',
    (sectionsTopOffsetModifier, selectedAnchorIndex) => {
      const topEdgeOffsets = [200, 400, 600, 800, 1000];
      const refs = [ref1, ref2, ref3, ref4, ref5];

      refs.forEach((ref, index) => {
        jest.spyOn(ref.current, 'getBoundingClientRect').mockImplementation(() => ({
          top: topEdgeOffsets[index] - sectionsTopOffsetModifier
        }));
      });

      jest
        .spyOn(wrapper.find(StyledNavigation).getDOMNode(), 'getBoundingClientRect')
        .mockImplementation(() => ({ top: 200 }));

      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });
      wrapper.update();
      expectNavigationItemToBeSelected(selectedAnchorIndex, wrapper);
    }
  );

  it('cleans up event listeners after unmounting', () => {
    const addEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    wrapper.unmount();
    expect(addEventListenerSpy.mock.calls.filter(call => call[0] === 'scroll')).toHaveLength(1);
  });

  it('validates the incorrect stickyNavigation prop', () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});

    mount(<AnchorNavigation
      stickyNavigation={
        <>
          <p>Invalid children</p>
        </>
      }
    />);

    const expected = 'Warning: Failed prop type: `AnchorNavigation` only accepts children of'
        + ' type `AnchorNavigationItem`.\n    in AnchorNavigation';

    expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
  });

  describe('style overrides', () => {
    const randomStyleObject = {
      backgroundColor: 'red',
      display: 'flex',
      fontSize: '200px'
    };
    beforeEach(() => {
      render({
        styleOverride: {
          root: randomStyleObject,
          navigation: randomStyleObject,
          content: randomStyleObject
        }
      });
    });

    it('renders root element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledAnchorNavigation));
    });

    it('renders navigation container with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledNavigation));
    });

    it('renders content container with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledContent));
    });

    it('renders navigation item with properly assigned styles', () => {
      const navItemWrapper = mount(<AnchorNavigationItem styleOverride={ randomStyleObject } />);
      assertStyleMatch(randomStyleObject, navItemWrapper.find(StyledNavigationItem));
    });

    it('renders section divider with properly assigned styles', () => {
      const dividerWrapper = mount(<AnchorSectionDivider styleOverride={ randomStyleObject } />);
      assertStyleMatch(randomStyleObject, dividerWrapper);
    });
  });
});
