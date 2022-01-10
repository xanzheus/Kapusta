import { makeStyles } from '@mui/styles';
import { COLORS } from '../../Constants';
const useStyles = makeStyles({
  field: {
    '& .MuiInputLabel-root': {
      fontSize: 14,
    },

    '& .MuiTypography-root': {
      fontSize: '14px',
    },

    '& .MuiOutlinedInput-root': {
      backgroundColor: `${COLORS.auxiliaryLight}`,
      borderRadius: 30,
      marginBottom: 15,
      '& fieldset': {
        borderRadius: 30,
        width: 265,
        height: 55,
        borderColor: 'transparent',
      },

      '& input': {
        padding: '13px 14px',
        borderRadius: 30,
      },
    },
  },
});

export default useStyles;
