import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMediaPredicate } from 'react-media-hook';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core';
import COLORS from 'Constants/COLORS';

// LOCALISE
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  iconButton: {
    '&.css-i4bv87-MuiSvgIcon-root': {
      width: 18,
      height: 18,
    },
  },

  delete: {
    '&.css-i4bv87-MuiSvgIcon-root': {
      '&:hover': {
        color: COLORS.negative,
      },
    },
  },

  edit: {
    '&.css-i4bv87-MuiSvgIcon-root': {
      justifyContent: 'start',
      '&:hover': {
        color: COLORS.positive,
      },
    },
  },

  save: {
    '&.css-i4bv87-MuiSvgIcon-root': {
      '&:hover': {
        color: COLORS.mainAccent,
      },
    },
  },
});

const BalancePageColumns = (category, openDeleteModale, handleOpen, updateTransAction) => {
  const classes = useStyles();

  // LOCALISE
  const { t } = useTranslation();
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  const columnMedium = useMemo(
    () => [
      { field: 'id', hide: true, headerAlign: 'center' },
      {
        field: 'date',
        headerName: 'Дата',
        minWidth: 100,
        type: 'date',
        editable: true,
        headerAlign: 'center',
      },
      {
        field: 'comment',
        headerName: 'Описание',
        minWidth: 180,
        editable: true,
        headerAlign: 'center',
      },
      {
        field: 'category',
        headerName: 'Категория',
        minWidth: 100,
        editable: true,
        headerAlign: 'center',
        type: 'singleSelect',
        valueOptions: category,
      },
      {
        field: 'amount',
        headerName: 'Сумма',
        minWidth: 150,
        editable: true,
        headerAlign: 'center',
        type: 'number',
      },

      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: params => [
          <GridActionsCellItem
            icon={<DeleteForeverIcon />}
            onClick={openDeleteModale(params.id)}
          />,

          <GridActionsCellItem icon={<EditIcon />} onClick={handleOpen} showInMenu />,

          <GridActionsCellItem
            icon={<SaveIcon />}
            onClick={updateTransAction(params)}
            showInMenu
          />,
        ],
      },
    ],
    [category, openDeleteModale, handleOpen, updateTransAction],
  );

  const columnLarge = [
    { field: 'id', hide: true, headerAlign: 'center' },
    {
      field: 'date',
      headerName: t('balanceColumns.date'),
      minWidth: 120,
      type: 'date',
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'comment',
      headerName: t('balanceColumns.description'),
      minWidth: 200,
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'category',
      headerName: t('balanceColumns.category'),
      minWidth: 120,
      editable: true,
      headerAlign: 'center',
      type: 'singleSelect',
      valueOptions: category,
    },
    {
      field: 'amount',
      headerName: t('balanceColumns.amount'),
      minWidth: 150,
      editable: true,
      headerAlign: 'center',
      type: 'number',
    },

    {
      field: 'delete',
      headerName: '',
      width: 50,

      renderCell: params => (
        <DeleteForeverIcon
          cursor="pointer"
          className={[classes.iconButton, classes.delete].join(' ')}
          onClick={openDeleteModale(params.id)}
          titleAccess={t('balanceColumns.delete')}
        />
      ),
    },
    {
      field: 'edit',
      headerName: '',
      width: 50,

      renderCell: params => (
        <EditIcon
          cursor="pointer"
          className={[classes.iconButton, classes.edit].join(' ')}
          titleAccess={t('balanceColumns.edit')}
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
          cursor="pointer"
          className={[classes.iconButton, classes.save].join(' ')}
          titleAccess={t('balanceColumns.save')}
          onClick={updateTransAction(params)}
        />
      ),
    },
  ];

  if (medium) {
    return columnMedium;
  }

  if (large) {
    return columnLarge;
  }
};

BalancePageColumns.propTypes = {
  category: PropTypes.array.isRequired,
  openDeleteModale: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  updateTransAction: PropTypes.func.isRequired,
};

export default BalancePageColumns;
