import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchAnime, fetchManga, kitsuSelector, KitsuState} from "../../features/kitsu/KitsuSlice";
import {Button, Card} from "react-native-paper";
import {ActivityIndicator, View} from "react-native";

const KitsuScreen = ({navigation}) => {
    const dispatch = useAppDispatch();
    const {manga, anime} = useAppSelector(kitsuSelector) as KitsuState

    useEffect(() => {
        dispatch(fetchManga({}));
        dispatch(fetchAnime({}));
    }, []);

    return (<>


            <View style={{display: "flex", flexDirection: "row"}}>
                <View style={{width: '50%', alignItems: "center"}}>
                    {manga.length > 0 && <Card style={{width: '80%', display: 'flex'}}>
                        <Card.Title title="Manga" subtitle="Browse through manga"/>
                        <Card.Cover source={{uri: manga[Math.floor(Math.random() * 10)].attributes.posterImage.medium}}/>
                        <Card.Actions style={{display: "flex", "justifyContent": "center"}}>
                            <Button onPress={() => navigation.navigate("Manga")}>Go!</Button>
                        </Card.Actions>
                    </Card>}
                    {manga.length == 0 && <ActivityIndicator/>}
                </View>
                <View style={{width: '50%',alignItems:"center"}}>
                    {anime.length > 0 && <Card style={{width: '80%', display: 'flex'}}>
                        <Card.Title title="Anime" subtitle="Browse through anime"/>
                        <Card.Cover source={{uri: anime[Math.floor(Math.random() * 10)].attributes.posterImage.medium}}/>
                        <Card.Actions style={{display: "flex", "justifyContent": "center"}}>
                            <Button onPress={() => navigation.navigate("Anime")}>Go!</Button>
                        </Card.Actions>
                    </Card>}
                    {anime.length == 0 && <ActivityIndicator/>}
                </View>
            </View>
        </>
    );
};

export default KitsuScreen;
