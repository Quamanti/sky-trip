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
      sizeSmall: {
        backgroundColor: '#846C5B',
      },
    },
  },
});

export default theme;
