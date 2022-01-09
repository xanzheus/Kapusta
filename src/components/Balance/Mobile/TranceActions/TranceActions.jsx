import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteTransactionMutation } from 'redux/service/transactionApi';
import toast from 'react-hot-toast';
import SelectionModal from 'components/Modal/SelectionModal';
import MobileOverlayToTransactions from './MobileOverlayToTransactions';
import {
  TRANSLATE_CATEGORIES,
  CATEGORYTYPE,
  // expensesCatagoryArray,
  // incomeCatagoryArray,
} from 'Constants/category';
import { COLORS } from 'Constants';
import MobileEditForm from 'components/Balance/Mobile/MobileEditForm';
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
    maxWidth: 70,
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
  const [tranceactionId, setTranceactionId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const classes = useStyles();
  const { t } = useTranslation();
  const expensesCatagoryArray = t('expensesCatagoryArray', { returnObjects: true });
  const incomeCatagoryArray = t('incomeCatagoryArray', { returnObjects: true });

  const transactionsArr = transactionsData.slice(0, transactionsData.length - 1);
  const [deleteTransaction] = useDeleteTransactionMutation();

  // const TRANSLATE_CATEGORIES = t('catagories', { returnObjects: true });

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

  const handleDeleteButton = id => {
    toggleModal();
    setTranceactionId(id);
  };

  return (
    <div className={classes.wrapper}>
      {transactionsArr.length === 0 && <MobileOverlayToTransactions />}

      {openModal && (
        <SelectionModal
          open={openModal}
          handleClose={reset}
          onClick={() => handleDeleteTransaction(tranceactionId)}
        />
      )}

      <ul className={classes.list}>
        {transactionsArr.map(item => {
          const preparedDate = item.date.slice(0, item.date.indexOf('T'));
          const splitDate = preparedDate.split('-');
          const resultDate = `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`;

          const categoryArray =
            item.type === 'income' ? incomeCatagoryArray : expensesCatagoryArray;

          return (
            <li className={classes.transaction} key={item._id}>
              <span className={classes.flexColumn}>
                <p className={classes.comment}>{item.comment}</p>
                <p className={classes.dateAndCategory}>{resultDate}</p>
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
                onClick={() => handleDeleteButton(item._id)}
                className={classes.buttonIcon}
              />

              <MobileEditForm
                initialAmount={item.amount}
                initialComment={item.comment}
                initialCategory={TRANSLATE_CATEGORIES[item.category]}
                categoryArray={categoryArray}
                type={item.type}
                id={item._id}
                editDate={item.date}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TranceActions.propTypes = {
  transactionsData: PropTypes.array.isRequired,
};

export default TranceActions;
