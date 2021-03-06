import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StyledSpinner from './spinner.style';
import warnOfDeprecation from '../../../utils/helpers/warn-as-deprecated';

let deprecatedWarnTriggered = false;

const Spinner = (props) => {
  const { as, ...spinnerProps } = props;
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    warnOfDeprecation('Spinner', '/components/loader');
  }
  return (
    <StyledSpinner
      type={ as } { ...spinnerProps }
      { ...tagComponent('spinner', props) }
    />
  );
};

Spinner.defaultProps = {
  as: 'info',
  size: 'medium'
};

Spinner.propTypes = {
  /** Sets the theme for the component. */
  as: PropTypes.oneOf(OptionsHelper.colors),
  /** Custom className */
  className: PropTypes.string,
  /** Size of the spinner */
  size: PropTypes.oneOf(OptionsHelper.sizesFull)
};

export default Spinner;
