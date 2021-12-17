import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core';
import COLORS from 'Constants/COLORSS';

const useStyles = makeStyles({
  button: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },

  delete: {
    '&:hover': {
      color: COLORS.negative,
    },
  },

  edit: {
    justifyContent: 'start',
    '&:hover': {
      color: COLORS.positive,
    },
  },

  save: {
    '&:hover': {
      color: COLORS.mainAccent,
    },
  },
});

const BalancePageColumns = (category, deleteTransAction, handleOpen, updateTransAction) => {
  const classes = useStyles();
  return [
    { field: 'id', hide: true, headerAlign: 'center' },
    {
      field: 'date',
      headerName: 'Дата',
      minWidth: 120,
      type: 'date',
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'comment',
      headerName: 'Описание',
      minWidth: 200,
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'category',
      headerName: 'Категория',
      minWidth: 110,
      editable: true,
      headerAlign: 'center',
      type: 'singleSelect',
      valueOptions: category,
    },
    {
      field: 'amount',
      headerName: 'Сумма',
      minWidth: 120,
      editable: true,
      headerAlign: 'center',
      type: 'number',
    },
    {
      field: 'delete',
      headerName: '',
      minWidth: 100,

      renderCell: params => (
        <DeleteForeverIcon
          className={[classes.button, classes.delete].join(' ')}
          onClick={deleteTransAction(params.id)}
          titleAccess="удалить"
        />
      ),
    },
    {
      field: 'edit',
      headerName: '',
      width: 50,

      renderCell: params => (
        <EditIcon
          className={[classes.button, classes.edit].join(' ')}
          titleAccess="редактировать"
          onClick={handleOpen}
        />
      ),
    },

    {
      field: 'save',
      headerName: '',
      width: 50,

      renderCell: params => (
        <SaveIcon
          className={[classes.button, classes.save].join(' ')}
          titleAccess="сохранит"
          onClick={updateTransAction(params)}
        />
      ),
    },
  ];
};

export default BalancePageColumns;
