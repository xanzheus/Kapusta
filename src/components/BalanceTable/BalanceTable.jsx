import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import ReportTable from 'components/BalanceTable/ReportTable';
import balancePageColumns from 'utils/balancePageColumns';
import InformationEditModal from 'components/Modal/InformationEditModal';
import style from './BalanceTable.module.scss';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const BalanceTable = ({ data, reportData, category }) => {
  const [rows, setRows] = useState(data);
  const [open, setOpen] = useState(false);

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
        <div className={style.balancetable__thumb}>
          <DataGrid
            onCellEditCommit={infoMessageByEdit}
            rowsPerPageOptions={[5, 20, 100]}
            rows={rows}
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
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
