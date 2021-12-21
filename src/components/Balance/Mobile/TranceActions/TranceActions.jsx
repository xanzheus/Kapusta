import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
import { COLORS } from 'Constants';

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },

  tranceAction: {
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
    marginTop: 60,
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
    color: COLORS.negative,
  },

  buttonIcon: {
    width: 18,
    height: 18,
  },
}));

const TranceActions = ({ tranceActionsData }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ul className={classes.list}>
        {tranceActionsData.map(tranceAction => (
          <li className={classes.tranceAction} key={tranceAction.id}>
            <span className={classes.flexColumn}>
              <p className={classes.comment}>{tranceAction.comment}</p>
              <p className={classes.dateAndCategory}>{tranceAction.date}</p>
            </span>
            <p className={[classes.dateAndCategory, classes.category].join(' ')}>
              {tranceAction.category}
            </p>
            <p className={classes.amoun}>{tranceAction.amount}</p>

            <DeleteForeverIcon className={classes.buttonIcon} />
            {/* <EditIcon className={classes.buttonIcon} />
            <SaveIcon className={classes.buttonIcon} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

TranceActions.propTypes = {
  tranceActionsData: PropTypes.array.isRequired,
};

export default TranceActions;
