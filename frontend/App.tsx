import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {Main} from './layout';
import {storage} from './utils';
import {useAppDispatch} from './hooks';
import {setToken} from './features/authentication/AuthenticationSlice';
import {NavigationContainer} from "@react-navigation/native";

const App = () => {
  const InnerApp = () => {
    const dispatch = useAppDispatch();
    storage.load({key: 'token'}).then(
      (token) => dispatch(setToken(token)),
      () => {},
    );

    return (
        <Main />
    );
  };

  return (
      <NavigationContainer>
          <Provider store={store}>
            <InnerApp />
          </Provider>
      </NavigationContainer>
  );
};

export default App;
