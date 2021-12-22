import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import COLORS from 'Constants/COLORS';
import { Box } from '@mui/system';
import ReportTable from 'components/Balance/ReportTable';
import BalancePageColumns from 'utils/balancePageColumns';
import InformationEditModal from 'components/Modal/InformationEditModal';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import { TRANSLATE_CATEGORIES } from 'Constants/category';
import {
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from 'redux/service/transactionApi';

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

    '& .css-1i9y1n9-MuiDataGrid-root': {
      borderRadius: '20px 20px 0px 0px',
    },

    '& .MuiDataGrid-columnHeaders.css-okt5j6-MuiDataGrid-columnHeaders': {
      borderRadius: '20px 20px 0px 0px',
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: 12,
      lineHeight: 1.16,
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: COLORS.mainBlack,
    },

    '& .MuiDataGrid-columnSeparator': {
      color: COLORS.auxiliaryLight,
    },

    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: COLORS.auxiliaryLight,
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

    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-cell--textCenter.MuiDataGrid-cell--withRenderer':
      {
        justifyContent: 'start',
      },

    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-row.Mui-selected': {
      backgroundColor: COLORS.auxiliaryLight,
    },

    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-cell--textLeft': {
      display: 'flex',
      justifyContent: 'center',
    },

    '& .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel': {
      color: COLORS.primary,
      fontSize: 12,
      lineHeight: 1.16,
    },

    '& .css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input':
      {
        color: COLORS.mainDark,
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 0,
      },

    '& .css-levciy-MuiTablePagination-displayedRows': {
      fontSize: 12,
    },
  },

  income: {
    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
      color: COLORS.positive,
      fontWeight: 900,
    },
  },

  expenses: {
    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
      color: COLORS.negative,
      fontWeight: 900,
    },
  },
}));

const BalanceTable = ({ data, reportData, category, Class }) => {
  const [open, setOpen] = useState(false);

  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteTransAction = useCallback(
    id => () => {
      deleteTransaction(id);
    },
    [deleteTransaction],
  );

  const updateTransAction = useCallback(
    params => () => {
      if (data.find(row => row === params.row)) {
        alert('Изменения не обнаружены, либо ещё не готовы к сохранению');
        return;
      }
      const preparedDate = params.row.date.toString();
      const splitDate = preparedDate.split('.');
      const resultDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;

      const result = {
        id: params.id,
        type: params.row.type,
        date: resultDate,
        category: TRANSLATE_CATEGORIES[params.row.category],
        comment: params.row.comment,
        amount: Number(params.row.amount.slice(2, -5)),
      };

      updateTransaction(result);

      alert('Изменения сохранены');
    },
    [data, updateTransaction],
  );

  const infoMessageByEdit = () => {
    alert('Если вы внесли изминение, не забудьте сохранить их!');
    return;
  };

  const columns = BalancePageColumns(category, deleteTransAction, handleOpen, updateTransAction);

  return (
    <>
      {open && <InformationEditModal open={open} handleClose={handleClose} />}
      <Box display={{ md: 'block', lg: 'flex' }} alignItems="center" justifyContent="space-between">
        <Stack className={[classes.balancetable, classes[Class]].join(' ')}>
          <DataGrid
            headerHeight={40}
            rowHeight={35}
            onCellEditCommit={infoMessageByEdit}
            rowsPerPageOptions={[8, 20]}
            pageSize={8}
            rows={data}
            columns={columns}
          />
        </Stack>
        <ReportTable data={reportData} />
      </Box>
    </>
  );
};

BalanceTable.propTypes = {
  data: PropTypes.array.isRequired,
  reportData: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  Class: PropTypes.string.isRequired,
};

export default BalanceTable;
