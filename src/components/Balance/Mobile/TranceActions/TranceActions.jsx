import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteTransactionMutation } from 'redux/service/transactionApi';
import toast from 'react-hot-toast';
// import EditIcon from '@mui/icons-material/Edit';
import { TRANSLATE_CATEGORIES, CATEGORYTYPE } from 'Constants/category';
import { COLORS } from 'Constants';

// LOCALISE
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },

  transaction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    padding: '0 20px',

    '&:not(:last-child)': {
      borderBottom: `1px solid ${COLORS.auxiliaryLight}`,
    },
  },

  wrapper: {
    width: '100%',
    maxHeight: 150,
    overflow: 'scroll',
    marginTop: 50,
    marginBottom: 5,
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  comment: {
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 1.16,
    letterSpacing: '0.04em',
    marginBottom: 5,
  },

  dateAndCategory: {
    fontSize: 8,
    lineHeight: 0.88,
    letterSpacing: '0.04em',
    color: COLORS.primary,
  },

  category: {
    marginTop: 16,
  },

  amoun: {
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 1.16,
    letterSpacing: '0.04em',
  },

  negative: {
    color: COLORS.negative,
  },

  positive: {
    color: COLORS.positive,
  },

  buttonIcon: {
    width: 18,
    height: 18,
  },
});

const TranceActions = ({ transactionsData }) => {
  const classes = useStyles();
  const transactionsArr = transactionsData.slice(0, transactionsData.length - 1);

  const [deleteTransaction] = useDeleteTransactionMutation();

  // LOCALISE
  const { t } = useTranslation();

  const handelDeleteTransaction = id => {
    deleteTransaction(id);
    toast.error(t('tranceActions.transactionDeleted'));
  };

  return (
    <div className={classes.wrapper}>
      <ul className={classes.list}>
        {transactionsArr.map(item => (
          <li className={classes.transaction} key={item._id}>
            <span className={classes.flexColumn}>
              <p className={classes.comment}>{item.comment}</p>
              <p className={classes.dateAndCategory}>
                {item.date.slice(0, item.date.indexOf('T'))}
              </p>
            </span>

            <p className={[classes.dateAndCategory, classes.category].join(' ')}>
              {TRANSLATE_CATEGORIES[item.category]}
            </p>

            {item.type === CATEGORYTYPE.EXPENSE ? (
              <p className={[classes.amoun, classes.negative].join(' ')}>
                {` - ${item.amount.toFixed(2)} ${t('tranceActions.currencyUAH')}.`}
              </p>
            ) : (
              <p className={[classes.amoun, classes.positive].join(' ')}>{` ${item.amount.toFixed(
                2,
              )} ${t('tranceActions.currencyUAH')}.`}</p>
            )}

            <DeleteForeverIcon
              onClick={() => handelDeleteTransaction(item._id)}
              className={classes.buttonIcon}
            />
            {/* <EditIcon className={classes.buttonIcon} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

TranceActions.propTypes = {
  transactionsData: PropTypes.array.isRequired,
};

export default TranceActions;
