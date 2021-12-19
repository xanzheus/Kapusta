import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import style from './Calculator.module.scss';

import Calculator from 'awesome-react-calculator';

class Calculate extends Component {
  static propTypes = {
    getAmountFromCalculator: PropTypes.func.isRequired,
  };
  render() {
    return (
      <Box className={style.calculator}>
        <Calculator onResultChange={this.props.getAmountFromCalculator} />
      </Box>
    );
  }
}

export default Calculate;
