import React, {createRef, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Manga, fetchManga, kitsuSelector, KitsuState} from "../../features/kitsu/KitsuSlice";
import Carousel from 'react-native-snap-carousel';
import {FlatList} from "react-native";
import {Button, Card, Paragraph, Title} from "react-native-paper";

interface MangaComponentProps {
    manga: Manga
}

const MangaComponent = ({
                            manga,
                        }: MangaComponentProps) => {


    return (
        <>
            <Card style={{width: "50%", marginRight: "auto", marginLeft: "auto", marginBottom: '20px'}}>
                <Card.Title title={manga.attributes.titles.ja_jp} subtitle={manga.attributes.titles.en_jp}
                            style={{marginRight: 'auto', marginLeft: 'auto'}}/>
                <Card.Content>
                    <Title>{manga.attributes.titles.en}</Title>
                    <Paragraph>{manga.attributes.description}</Paragraph>
                </Card.Content>
                <Card.Cover
                    source={{uri: manga.attributes.coverImage ? manga.attributes.coverImage.original : manga.attributes.posterImage.original}}/>
            </Card>
        </>
    );
};

const MangaScreen = () => {
        const dispatch = useAppDispatch();
        const {manga: loadedManga,mangaLinks, loading} = useAppSelector(kitsuSelector) as KitsuState
        const ref = createRef<Carousel<Manga>>();

        const loadManga = () => dispatch(fetchManga({}))

        useEffect(() => {
            if (loadedManga.length === 0) {
                loadManga()
            }
        }, []);

        const [search, setSearch] = useState<string>()
        const [timeout, setTimout] = useState<ReturnType<typeof setTimeout>>()


        const handleSearch = (params: any) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            const newTimout: ReturnType<typeof setTimeout> = setTimeout(() => {
                dispatch(fetchManga(params as any))
            }, 500);
            setTimout(newTimout)
        }

        const renderItem = ({item}) => (
            <MangaComponent manga={item}/>
        );


        return (<>
                {!loading && (
                    <FlatList
                        data={loadedManga}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />)}
                <Button onPress={()=> handleSearch({next: mangaLinks.next})}>
                    Next
                </Button>
                <Button onPress={()=> handleSearch({first: mangaLinks.first})}>
                    First
                </Button>
                <Button onPress={()=> handleSearch({last: mangaLinks.last})}>
                    Last
                </Button>

            </>
        );
    }
;

export default MangaScreen;
