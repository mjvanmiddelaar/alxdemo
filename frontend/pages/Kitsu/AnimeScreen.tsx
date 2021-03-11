import React, {createRef, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Anime, fetchAnime, kitsuSelector, KitsuState} from "../../features/kitsu/KitsuSlice";
import Carousel from 'react-native-snap-carousel';
import {FlatList} from "react-native";
import {Button, Card, Paragraph, Title} from "react-native-paper";

interface AnimeComponentProps {
    index: number,
    anime: Anime
}

const AnimeComponent = ({
                            anime,
                            index,
                        }: AnimeComponentProps) => {


    return (
        <>
            <Card style={{width: "50%", marginRight: "auto", marginLeft: "auto", marginBottom: '20px'}}>
                <Card.Title title={anime.attributes.titles.ja_jp} subtitle={anime.attributes.titles.en_jp}
                            style={{marginRight: 'auto', marginLeft: 'auto'}}/>
                <Card.Content>
                    <Title>{anime.attributes.titles.en}</Title>
                    <Paragraph>{anime.attributes.description}</Paragraph>
                </Card.Content>
                <Card.Cover
                    source={{uri: anime.attributes.coverImage ? anime.attributes.coverImage.original : anime.attributes.posterImage.original}}/>
            </Card>
        </>
    );
};

const AnimeScreen = () => {
        const dispatch = useAppDispatch();
        const {anime: loadedAnime,animeLinks, loading} = useAppSelector(kitsuSelector) as KitsuState
        const ref = createRef<Carousel<Anime>>();

        const loadAnime = () => dispatch(fetchAnime({}))

        useEffect(() => {
            if (loadedAnime.length === 0) {
                loadAnime()
            }
        }, []);

        const [search, setSearch] = useState<string>()
        const [timeout, setTimout] = useState<ReturnType<typeof setTimeout>>()


        const handleSearch = (params: any) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            const newTimout: ReturnType<typeof setTimeout> = setTimeout(() => {
                dispatch(fetchAnime(params as any))
            }, 500);
            setTimout(newTimout)
        }

        const renderItem = ({item}) => (
            <AnimeComponent anime={item}/>
        );


        return (<>
                {!loading && (
                    <FlatList
                        data={loadedAnime}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />)}
                <Button onPress={()=> handleSearch({next: animeLinks.next})}>
                    Next
                </Button>
                <Button onPress={()=> handleSearch({first: animeLinks.first})}>
                    First
                </Button>
                <Button onPress={()=> handleSearch({last: animeLinks.last})}>
                    Last
                </Button>

            </>
        );
    }
;

export default AnimeScreen;
