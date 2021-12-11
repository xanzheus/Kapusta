import { useState } from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import s from './Categories.module.css';

const Categories = ({ updateData }) => {
  const [radioButton, setRadioButton] = useState(true);

  return (
    <div className={s.categories}>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend"></FormLabel> */}
        <RadioGroup row aria-label="balance" name="row-radio-buttons-group" defaultValue="costs">
          <FormControlLabel
            value="costs"
            control={<Radio />}
            label="Расходы"
            onChange={() => {
              setRadioButton(true);
              updateData(radioButton);
            }}
          />
          <FormControlLabel
            value="incoming"
            control={<Radio />}
            label="Доходы"
            onChange={() => {
              setRadioButton(false);
              updateData(radioButton);
            }}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

Categories.propTypes = {
  updateData: PropTypes.func,
};

export default Categories;
