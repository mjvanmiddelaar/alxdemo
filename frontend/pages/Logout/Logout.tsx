import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  authenticationSelector,
  logout,
} from '../../features/authentication/AuthenticationSlice';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-paper';

const Logout = ({}) => {
  const dispatch = useAppDispatch();
  const {loading, token} = useAppSelector(authenticationSelector);

  setTimeout(() => {
    dispatch(logout());
  }, 100);

  return (
    <View style={{marginLeft:"auto",marginRight:"auto",width:"25%",minWidth:200}}>
      <Text style={{fontSize:24,marginBottom: 25,marginTop: 25,textAlign: "center"}}>Logging out...</Text>
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default Logout;
