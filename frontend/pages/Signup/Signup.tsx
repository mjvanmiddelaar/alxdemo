import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Formik} from 'formik';
import {Button, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {signupSelector, signup} from '../../features/signup/SignupSlice';
import * as yup from 'yup';

const Signup = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {errors: apiErrors, loading} = useAppSelector(signupSelector);
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email address is a required field"),
    name: yup.string().required("Name is a required field"),
    password: yup.string().required("Password is a required field").min(5,"Minimum length is 5"),
  });

  return (
    <>
      <View style={{marginLeft:"auto",marginRight:"auto",width:"25%",minWidth:200}}>
        <Text style={{fontSize:24,marginBottom: 25,marginTop: 25,textAlign:"center"}}>Signup</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', name: '',password: ''}}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            dispatch(signup(values)).then(_ => navigation.navigate('Login'));
          }}>

          {({handleChange, handleBlur, handleSubmit, values, errors}) => {
            const allErrors = {
              ...errors,
              ...apiErrors,
            };
            return (
              <>
                <TextInput
                  name="name"
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={!!allErrors.name}
                />
                {allErrors.name && <Text>{allErrors.name}</Text>}
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  error={!!allErrors.email}
                />
                {allErrors.email && <Text>{allErrors.email}</Text>}
                <TextInput
                  name="password"
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  keyboardType="visible-password"
                  error={!!allErrors.password}
                />
                {allErrors.email && <Text>{allErrors.password}</Text>}
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

export default Signup;
