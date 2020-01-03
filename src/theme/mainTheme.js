import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      colorPrimary: {
        color: '#5F4036',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#5F4036',
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#846C5B',
        '&:hover': {
          backgroundColor: '#5F4036',
        },
      },
      outlinedPrimary: {
        color: '#846C5B',
        borderColor: '#846C5B',
        '&:hover': {
          color: '#5F4036',
          border: '1px solid #5F4036',
          backgroundColor: 'rgba(#5F4036, .08)',
        },
      },
    },
  },
});

export default theme;
