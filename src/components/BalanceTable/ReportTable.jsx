import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import COLORS from 'Constants/COLORSS';
import style from '../BalanceTable/BalanceTable.module.scss';

const useStyles = makeStyles({
  reports__thumb: {
    minWidth: '230px',
    marginBottom: 'auto',
  },

  report__title: {
    background: COLORS.auxiliaryLight,
    textAlign: 'center',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px 20px 0px 0px',
    marginBottom: '2px',
    fontSize: '12px',
    lineHeight: '1.16',
    letterSpacing: '0.02em',
    color: COLORS.mainDark,
    fontWeight: '700',
  },

  report__list: {
    paddingLeft: '0',
    listStyle: 'none',
    margin: '0',
  },

  report__item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: COLORS.auxiliaryLight,
    padding: '0px 35px',
    minHeight: '40px',
    '&:not(:last-child)': {
      marginBottom: '2px',
    },

    '&:last-child': {
      borderRadius: '0px 0px 20px 0px',
    },
  },
});

const ReportTable = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.reports__thumb}>
      <h3 className={classes.report__title}>Сводка за текущий год</h3>
      <ul className={classes.report__list}>
        {data.map(item => (
          <li key={item.id} className={classes.report__item}>
            <p>{item.month}</p>
            <p>{item.totalsum}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReportTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ReportTable;
