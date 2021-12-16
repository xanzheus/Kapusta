import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import COLORS from 'Constants/COLORSS';
import { Box } from '@mui/system';
import ReportTable from 'components/BalanceTable/ReportTable';
import BalancePageColumns from 'utils/balancePageColumns';
import InformationEditModal from 'components/Modal/InformationEditModal';

const useStyles = makeStyles({
  balancetable: {
    height: '385px',
    minWidth: '760px',

    '& .css-1i9y1n9-MuiDataGrid-root': {
      borderRadius: '20px 20px 0px 0px',
    },

    '& .MuiDataGrid-columnHeaders.css-okt5j6-MuiDataGrid-columnHeaders': {
      borderRadius: '20px 20px 0px 0px',
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: '12px',
      lineHeight: '1.16',
      fontWeight: '700',
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
      fontSize: '12px',
      lineHeight: '1.16',
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

    // '& .MuiButton-root': {
    //   position: 'absolute',
    //   left: '10px',
    //   bottom: '10px',
    //   color: 'green',
    // },
  },

  income: {
    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
      color: COLORS.positive,
      fontWeight: '900',
    },
  },

  expenses: {
    '& .css-1i9y1n9-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
      textAlign: 'center',
      color: COLORS.negative,
      fontWeight: '900',
    },
  },
});

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer className={gridClasses.toolbarContainer}>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

const BalanceTable = ({ data, reportData, category, Class }) => {
  const [rows, setRows] = useState(data);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteTransAction = useCallback(
    id => () => {
      setTimeout(() => {
        setRows(prevRows => prevRows.filter(row => row.id !== id));
      });
    },
    [],
  );

  const updateTransAction = useCallback(
    params => () => {
      if (rows.find(row => row === params.row)) {
        alert('Изменения не обнаружены, либо ещё не готовы к сохранению');
        return;
      }

      setRows(prevRows => prevRows.map(row => (row.id === params.id ? { ...params.row } : row)));

      alert('Изменения сохранены');
    },
    [rows],
  );

  const infoMessageByEdit = () => {
    alert('Если вы внесли изминение, не забудьте сохранить их!');
    return;
  };

  const columns = BalancePageColumns(category, deleteTransAction, handleOpen, updateTransAction);

  return (
    <>
      {open && <InformationEditModal open={open} handleClose={handleClose} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack className={[classes.balancetable, classes[Class]].join(' ')}>
          <DataGrid
            headerHeight={40}
            rowHeight={35}
            onCellEditCommit={infoMessageByEdit}
            rowsPerPageOptions={[5, 20, 100]}
            // pageSize={20}
            rows={rows}
            columns={columns}
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
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
