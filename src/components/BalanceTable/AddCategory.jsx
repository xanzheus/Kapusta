import { useState } from 'react';
import Button from 'components/Button';
import SelectionModal from 'components/Modal/SelectionModal';
import TextField from '@mui/material/TextField';

const AddCategory = ({ categoryArray }) => {
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (category.trim() === '') {
      alert('Empty category');
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChangeCategory = event => {
    setCategory(event.target.value);
  };

  const changeCategory = event => {
    event.preventDefault();

    categoryArray.push(category);
    setCategory('');
    setOpen(false);
    console.log(category);
    console.log(categoryArray);
  };

  const clearField = () => setCategory('');

  return (
    <>
      <TextField
        autoComplete="off"
        helperText="Добавьте категорию"
        id="category"
        label="Добавить категорию"
        onChange={handleChangeCategory}
        value={category}
        type="text"
        name="category"
        required
      />
      <Button name="Добавить" type="button" onClick={handleOpen} />
      <Button name="Очистить" type="button" onClick={clearField} />

      {open && <SelectionModal open={open} handleClose={handleClose} onClick={changeCategory} />}
    </>
  );
};

export default AddCategory;
