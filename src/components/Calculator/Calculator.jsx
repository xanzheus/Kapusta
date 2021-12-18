import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Calculator from 'awesome-react-calculator';

const style = {
  height: 250,
  width: 200,
  position: 'absolute',
  zIndex: 100,
  top: '20%',
  left: '85%',
};

class Calculate extends Component {
  static propTypes = {
    getAmountFromCalculator: PropTypes.func.isRequired,
  };
  render() {
    return (
      <Box style={style}>
        <Calculator onResultChange={this.props.getAmountFromCalculator} />
      </Box>
    );
  }
}

export default Calculate;
