import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
  loader: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <Stack sx={{ color: 'grey.500' }}>
        <CircularProgress color="inherit" />
      </Stack>
    </div>
  );
};

export default Loader;
