import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Box } from '@material-ui/core';

import { getUserData as getUser } from '../../store/Users';
import { getUserData as getUserLocalData } from '../../store/_selectors/user.selectors';

const UserDataPure = ({ userData, getUserData }) => {
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Box margin={2}>
      <Typography component="h1" variant="h4" color="primary" gutterBottom>
        {`Hello ${userData.firstName} ${userData.lastName}`}
      </Typography>
      <Typography>
        {`Your username: ${userData.username}`}
      </Typography>
      <Typography>
        {`Your email address: ${userData.email}`}
      </Typography>
    </Box>
  );
};

const mapStateToProps = (store) => ({
  userData: getUserLocalData(store),
});

const mapDispatchToProps = ({
  getUserData: getUser,
});

export const UserData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDataPure);
