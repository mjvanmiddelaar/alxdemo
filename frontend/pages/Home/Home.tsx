import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authenticationSelector, me as callMe,} from '../../features/authentication/AuthenticationSlice';
import {ActivityIndicator, Text} from "react-native-paper";
import {View} from "react-native";

const Home = () => {
    const dispatch = useAppDispatch();
    const {me, token, loading} = useAppSelector(authenticationSelector);

    const loadMe = () => dispatch(callMe());
    useEffect(() => {
        if (token) {
            loadMe();
        }
    }, [token]);

    return (
        <View style={{marginLeft:"auto",marginRight:"auto",width:"25%",minWidth:200}}>
            <Text style={{fontSize:32,fontWeight: 700, marginTop: 25,textAlign:"center"}}>Hi, </Text>
            <Text style={{fontSize:20,marginTop: 25,textAlign:"center"}}>my name is Maarten van Middelaar.</Text>
            <Text style={{fontSize:20,marginTop: 25,textAlign:"center"}}>Welcome to my ALX demo application.</Text>
            <Text style={{fontSize:20,marginTop: 25,textAlign:"center"}}>Please signup, login, look around and let me know what you think at maarten@middelaar.dev</Text>
            {loading && <ActivityIndicator/>}
            {!loading && me && (
                <>
                    <Text style={{fontSize:20,textAlign:"center",marginTop:25}}>
                        Welcome!
                    </Text>
                    <Text style={{fontSize:20,textAlign:"center",marginTop:25}}>
                        Nice to meet you, {me.name}
                    </Text>
                    <Text style={{fontSize:20,textAlign:"center",marginTop:25}}>
                         If you write me, I'll write you back at {me.email}
                    </Text>
                </>
            )}
            {!loading && !me && (<>
                <Text style={{fontSize:20,marginTop: 25,textAlign:"center"}}>You are currently not logged in.</Text>
                </>
            )}
        </View>
    );
};

export default Home;
