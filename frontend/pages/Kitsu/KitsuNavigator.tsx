import AnimeScreen from "./AnimeScreen";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import KitsuScreen from "./KitsuScreen";
import MangaScreen from "./MangaScreen";

const Stack = createStackNavigator();

const KitsuNavigator = () => <Stack.Navigator initialRouteName="Kitsu">
        <Stack.Screen name="Kitsu" component={KitsuScreen}/>
        <Stack.Screen name="Anime" component={AnimeScreen}/>
        <Stack.Screen name="Manga" component={MangaScreen}/>
    </Stack.Navigator>

export default KitsuNavigator
