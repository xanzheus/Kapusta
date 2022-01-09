import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { getYear } from 'date-fns';
import COLORS from 'Constants/COLORS';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
// LOCALISE
import { useTranslation } from 'react-i18next';

import { useGetMonthTransactionQuery } from 'redux/service/transactionApi';
// import { MONTH } from 'Constants/MONTH';

const useStyles = makeStyles(theme => ({
  reports__thumb: {
    width: 230,

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      position: 'absolute',
      top: 1050,
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      marginBottom: 'auto',
      position: 'static',
    },
  },

  report__title: {
    background: COLORS.auxiliaryLight,
    textAlign: 'center',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px 20px 0px 0px',
    marginBottom: 2,
    fontSize: 12,
    lineHeight: 1.16,
    letterSpacing: '0.02em',
    color: COLORS.mainDark,
    fontWeight: 700,
  },

  report__list: {
    paddingLeft: 0,
    listStyle: 'none',
    margin: 0,
  },

  report__item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: COLORS.auxiliaryLight,
    padding: '0px 35px',
    minHeight: 40,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.16,
    color: COLORS.primary,
    letterSpacing: '0.04em',
    '&:not(:last-child)': {
      marginBottom: 2,
    },

    '&:last-child': {
      borderRadius: '0px 0px 20px 0px',
    },
  },
}));

const ReportTable = ({ type, initialDate }) => {
  const year = getYear(initialDate);

  const { data, isSuccess } = useGetMonthTransactionQuery({
    type,
    year,
  });

  const reportsData = data?.data?.result;

  const classes = useStyles();
  // LOCALISE
  const { t } = useTranslation();
  const MONTH = t('MONTH', { returnObjects: true });
  return (
    <>
      {isSuccess && (
        <div className={classes.reports__thumb}>
          <h3 className={classes.report__title}>{t('reportTable.summary')}</h3>
          <ul className={classes.report__list}>
            {reportsData.map(item =>
              item.total === 0 ? null : (
                <li key={item.month} className={classes.report__item}>
                  <p>{MONTH[item.month]}</p>
                  <p>{item.total}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </>
  );
};

ReportTable.propTypes = {
  type: PropTypes.string.isRequired,
  initialDate: PropTypes.object.isRequired,
};

export default ReportTable;
