import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Formik} from 'formik';
import {Button, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  authenticationSelector,
  login,
} from '../../features/authentication/AuthenticationSlice';
import * as yup from 'yup';


const Login = () => {
  const dispatch = useAppDispatch();
  const {errors: apiErrors, loading, token} = useAppSelector(authenticationSelector);


  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email address is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  return (
    <>
      <View style={{marginLeft:"auto",marginRight:"auto",width:"25%",minWidth:200}}>
        <Text style={{fontSize:24,marginBottom: 25,marginTop: 25,textAlign:"center"}}>Login</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', password: ''}}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            dispatch(login(values));
          }}>
          {({handleChange, handleBlur, handleSubmit, values,errors}) => {
            const allErrors = {
              ...errors,
              ...apiErrors,
            };
            return (
              <>
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  error={!!allErrors.email}
                />
                {allErrors.email && <Text>{allErrors.email}</Text>}
                <TextInput
                  name="password"
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  error={!!allErrors.password}
                />
                {allErrors.password && <Text>{allErrors.password}</Text>}
                <Button onPress={handleSubmit}>Submit</Button>
                {loading && <ActivityIndicator />}
              </>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default Login;
