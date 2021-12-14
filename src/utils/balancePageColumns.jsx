import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const balancePageColumns = (category, deleteTransAction, handleOpen, updateTransAction) => {
  return [
    { field: 'id', hide: true, headerAlign: 'center' },
    {
      field: 'date',
      headerName: 'Дата',
      minWidth: 150,
      type: 'date',
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Описание',
      minWidth: 200,
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'category',
      headerName: 'Категория',
      minWidth: 150,
      editable: true,
      headerAlign: 'center',
      type: 'singleSelect',
      valueOptions: category,
    },
    {
      field: 'sum',
      headerName: 'Сумма',
      minWidth: 150,
      editable: true,
      headerAlign: 'center',
      // type: 'number',
    },
    {
      field: 'delete',
      headerName: '',
      minWidth: 50,
      headerAlign: 'center',
      renderCell: params => (
        <strong>
          <DeleteIcon
            onClick={deleteTransAction(params.id)}
            titleAccess="удалить"
            // className={style.button__delete}
          />
        </strong>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: params => [
        <EditIcon
          titleAccess="редактировать"
          onClick={handleOpen}
          // className={style.button__edit}
        />,
        <SaveIcon
          titleAccess="сохранит"
          onClick={updateTransAction(params)}
          // className={style.button__save}
        />,
      ],
    },
  ];
};

export default balancePageColumns;
