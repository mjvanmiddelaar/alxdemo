// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {RandomJokes} from '../../pages/RandomJokes';
import {Kitsu, KitsuScreen} from '../../pages/Kitsu';
import {Home} from '../../pages/Home';
import {Login} from '../../pages/Login';
import {Logout} from '../../pages/Logout';
import {Signup} from '../../pages/Signup';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authenticationSelector,} from '../../features/authentication/AuthenticationSlice';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import KitsuNavigator from "../../pages/Kitsu/KitsuNavigator";

const styles = StyleSheet.create({
    appbar: {
        height: 80,
        backgroundColor: 'yellow',
    },
});
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main: FC = () => {
    const {token} = useAppSelector(authenticationSelector);
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            {!token && <Tab.Screen name="Login" component={Login} />}
            {!token && <Tab.Screen name="Signup" component={Signup} />}
            {token && <Tab.Screen name="Jokes" component={RandomJokes} />}
            {token && <Tab.Screen name="View kitsu" component={KitsuNavigator} />}
            {token && <Tab.Screen name="Logout" component={Logout} />}

        </Tab.Navigator>
    );
};

export default Main;
