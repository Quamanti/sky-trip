import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Box } from '@material-ui/core';

import { getUserData as getUser } from '../../store/Users';
import { getUserData } from '../../store/_selectors/user.selectors';

const UserDataPure = ({ userData, getUserData }) => {
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Box margin={2}>
      <Typography component="h1" variant="h4" color="primary" gutterBottom>
        {`Hello ${userData.name} ${userData.surname}`}
      </Typography>
      <Typography>
        {`Your username: ${userData.login}`}
      </Typography>
      <Typography>
        {`Your email: ${userData.email}`}
      </Typography>
    </Box>
  );
};

const mapStateToProps = (store) => ({
  userData: getUserData(store),
});

const mapDispatchToProps = ({
  getUserData: getUser,
});

export const UserData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDataPure);
