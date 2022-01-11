import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { format } from 'date-fns';
import COLORS from 'Constants/COLORS';
import toast from 'react-hot-toast';
import { Box } from '@mui/system';
import ReportTable from 'components/Balance/ReportTable';
import BalancePageColumns from 'utils/balancePageColumns';
import InformationEditModal from 'components/Modal/InformationEditModal';
import SelectionModal from 'components/Modal/SelectionModal';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import { TRANSLATE_CATEGORIES } from 'Constants/category';
import {
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from 'redux/service/transactionApi';
import OverlayToGridTable from './OverlayToGridTable';

// LOCALISE
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  balancetable: {
    height: 385,
    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      minWidth: 605,
      marginBottom: 40,
    },
    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      minWidth: 760,
      marginBottom: 0,
    },
  },

  balanceGrid: {
    '&.css-2c3rf6-MuiDataGrid-root': {
      borderRadius: '20px 20px 0px 0px',
    },

    '& .MuiDataGrid-columnHeaders.css-okt5j6-MuiDataGrid-columnHeaders': {
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: COLORS.auxiliaryLight,
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: 12,
      lineHeight: 1.16,
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: COLORS.mainBlack,
    },

    '&.css-2c3rf6-MuiDataGrid-root .MuiDataGrid-iconSeparator': {
      color: 'transparent',
    },

    '& .MuiDataGrid-row': {
      color: COLORS.primary,
      fontSize: 12,
      lineHeight: 1.16,
      cursor: 'cell',
      '&:hover': {
        backgroundColor: COLORS.auxiliaryLight,
      },
    },

    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-row.Mui-selected': {
      backgroundColor: COLORS.auxiliaryLight,
    },

    '&.css-2c3rf6-MuiDataGrid-root .MuiDataGrid-cell--textLeft': {
      textAlign: 'center',
    },

    '&.css-2c3rf6-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
    },

    '& .css-pdct74-MuiTablePagination-selectLabel': {
      color: COLORS.primary,
      fontSize: 12,
      lineHeight: 1.16,
    },

    '& .css-16c50h-MuiInputBase-root-MuiTablePagination-select ': {
      color: COLORS.mainDark,
      fontSize: 12,
    },

    '& .css-levciy-MuiTablePagination-displayedRows': {
      fontSize: 12,
      fontWeight: 700,
    },

    '& .css-1b34haf-MuiDataGrid-footerContainer': {
      minHeight: 28,
      height: 28,
      backgroundColor: COLORS.auxiliaryLight,
    },
  },

  income: {
    '&.css-2c3rf6-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
      color: COLORS.positive,
      fontWeight: 900,
    },
  },

  expenses: {
    '&.css-2c3rf6-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
      color: COLORS.negative,
      fontWeight: 900,
    },
  },
}));

const BalanceTable = ({ data, initialDate, category, Class, type }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tranceactionId, setTranceactionId] = useState(null);

  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // LOCALISE
  const { t } = useTranslation();
  // const TRANSLATE_CATEGORIES = t('catagories', { returnObjects: true });

  const openDeleteModale = useCallback(
    id => () => {
      setOpenModal(true);
      setTranceactionId(id);
    },
    [],
  );

  const updateTransAction = useCallback(
    params => () => {
      if (data.find(row => row === params.row)) {
        toast(p => (
          <span>
            <b>{t('balanceTable.noChangesFound')}</b>
            <button onClick={() => toast.dismiss(p.id)}>{t('balanceTable.itsClear')}</button>
          </span>
        ));

        return;
      }

      const preparedDate = params.row.date.toString();
      const splitDate = preparedDate.split('.');
      const resultDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;

      const bodyObj = {
        id: params.id,
        type: params.row.type,
        date: '',
        category: TRANSLATE_CATEGORIES[params.row.category],
        comment: params.row.comment,
        amount: '',
      };

      typeof params.row.date === 'object'
        ? (bodyObj.date = format(params.row.date, 'yyyy-MM-dd'))
        : (bodyObj.date = resultDate);

      isNaN(params.row.amount)
        ? (bodyObj.amount = Number(params.row.amount.slice(2, -8)))
        : (bodyObj.amount = Number(params.row.amount));

      updateTransaction(bodyObj);

      toast.success(t('balanceTable.сhangesSaved'));
    },
    [data, updateTransaction, t],
  );

  const infoMessageByEdit = () => {
    alert(t('balanceTable.madeChange'));
    return;
  };

  const toggleModal = () => setOpenModal(!openModal);

  const reset = () => {
    toggleModal();
    setTranceactionId(null);
  };

  const handleDeleteTransaction = id => {
    deleteTransaction(id);
    reset();
    toast.error(t('tranceActions.transactionDeleted'));
  };

  const columns = BalancePageColumns(category, openDeleteModale, handleOpen, updateTransAction);

  return (
    <>
      {open && <InformationEditModal open={open} handleClose={handleClose} />}

      {openModal && (
        <SelectionModal
          open={openModal}
          handleClose={reset}
          onClick={() => handleDeleteTransaction(tranceactionId)}
        />
      )}

      <Box display={{ md: 'block', lg: 'flex' }} alignItems="center" justifyContent="space-between">
        <Stack className={classes.balancetable}>
          <DataGrid
            className={[classes.balanceGrid, classes[Class]].join(' ')}
            headerHeight={40}
            rowHeight={35}
            onCellEditCommit={infoMessageByEdit}
            rowsPerPageOptions={[9]}
            pageSize={9}
            rows={data}
            columns={columns}
            components={{
              NoRowsOverlay: OverlayToGridTable,
            }}
          />
        </Stack>
        <ReportTable type={type} initialDate={initialDate} />
      </Box>
    </>
  );
};

BalanceTable.propTypes = {
  data: PropTypes.array.isRequired,
  initialDate: PropTypes.object.isRequired,
  category: PropTypes.array.isRequired,
  Class: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default BalanceTable;
