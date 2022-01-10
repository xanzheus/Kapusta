import { makeStyles } from '@mui/styles';
import { COLORS } from '../../Constants';

const useStyles = makeStyles({
  field: {
    '& .MuiInputAdornment-root': {
      position: 'absolute ',
      right: '8px',
    },
    '& .MuiInputLabel-root': {
      fontSize: 14,
    },

    '& .MuiTypography-root': {
      fontSize: '14px',
    },

    '& .MuiOutlinedInput-root': {
      // Работает
      position: 'relative',
      backgroundColor: `${COLORS.auxiliaryLight}`,
      borderRadius: 30,
      marginBottom: 15,
      '& fieldset': {
        borderRadius: 30,
        width: 265,
        height: 55,
        // background: '#F6F7FB',
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
