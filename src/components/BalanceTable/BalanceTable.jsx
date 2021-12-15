import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import ReportTable from 'components/BalanceTable/ReportTable';
import balancePageColumns from 'utils/balancePageColumns';
import InformationEditModal from 'components/Modal/InformationEditModal';
import style from './BalanceTable.module.scss';
import { makeStyles } from '@material-ui/core';
import COLORS from 'Constants/COLORSS';

const useStyles = makeStyles({
  balancetable: {
    height: '400px',
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
      color: '#F5F6FB',
    },

    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#F5F6FB',
    },

    '& .MuiDataGrid-row': {
      color: COLORS.primary,
      fontSize: '12px',
      lineHeight: '1.16',
    },

    // '& .MuiTableRow-root': {
    //   color: 'red',
    //   backgroundColor: 'red',
    // },
  },
});

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer className={gridClasses.toolbarContainer}>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

const BalanceTable = ({ data, reportData, category }) => {
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

  const columns = balancePageColumns(category, deleteTransAction, handleOpen, updateTransAction);

  return (
    <>
      {open && <InformationEditModal open={open} handleClose={handleClose} />}
      <div className={style.tables__thumb}>
        <div className={classes.balancetable}>
          <DataGrid
            headerHeight={40}
            rowHeight={40}
            onCellEditCommit={infoMessageByEdit}
            rowsPerPageOptions={[5, 20, 100]}
            pageSize={9}
            rows={rows}
            columns={columns}
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
          />
        </div>
        <ReportTable data={reportData} />
      </div>
    </>
  );
};

BalanceTable.propTypes = {
  data: PropTypes.array.isRequired,
  reportData: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
};

export default BalanceTable;
