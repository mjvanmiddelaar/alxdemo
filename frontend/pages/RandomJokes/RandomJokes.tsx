import React, {createRef, useEffect, useState} from 'react';
import {fetchJokes, Joke, randomJokeState,} from '../../features/randomJokes/RandomJokesSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ActivityIndicator, Button, Dimensions, ListRenderItemInfo, StyleSheet, Text, View,} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {ProgressBar} from 'react-native-paper';

interface JokeComponentProps {
    joke: Joke;
    index: number;
}

const JokeComponent = ({
                           joke: {setup, punchline},
                           index,
                       }: JokeComponentProps) => {
    return (
        <View style={styles.joke}>
            <Text>{index + 1} / 10 </Text>
            <Text style={styles.setup}>{setup}</Text>
            <Text style={styles.punchline}>{punchline}</Text>
        </View>
    );
};

const RandomJokes = () => {
    const dispatch = useAppDispatch();
    const {jokes, rateLimited, loading} = useAppSelector(randomJokeState);
    const ref = createRef<Carousel<Joke>>();
    const loadJokes = () => dispatch(fetchJokes());
    const [tick, setTick] = useState<number>(0)
    const [id, setId] = useState<ReturnType<typeof setInterval>>()
    useEffect(() => {
        loadJokes();
    }, []);

    const add1second = () => setTick(tick + 1)
    useEffect(() => {
        if (id) {
            clearInterval(id,)
        }
        if (loading) {
           const newId = setInterval(_ => add1second(),1000 )
            setId(newId)
        }


    }, [loading])


    return (
        <>
            <View>
                <Button
                    onPress={loadJokes}
                    title="Load more..."
                    color="#000"
                    accessibilityLabel="Load more jokes"
                    testID="loadJokes"
                />
                {loading && <ActivityIndicator/>}
                {rateLimited && (
                    <Text>
                        You have reloaded too many times in the last 15 minutes... please wait
                    </Text>
                )}
                {!loading && !rateLimited && (
                    <Carousel
                        autoplay
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                        layout={'default'}
                        ref={ref}
                        data={jokes}
                        inactiveSlideShift={0}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        autoplayInterval={5000}
                        firstItem={0}
                        loop={true}
                        onSnapToItem={() => setTick(0)}
                        renderItem={(item: ListRenderItemInfo<Joke>) => (
                            <JokeComponent joke={item.item} index={item.index}/>
                        )}
                    />

                )}

            </View>
        </>
    );
};

export default RandomJokes;

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.7);
const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: 50,
    },
    button: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue',
        borderWidth: 1,
        borderColor: 'black',
    },
    setup: {
        color: '#333',
        fontSize: 24,
        marginBottom: 10,
    },
    punchline: {
        color: '#333',
        fontSize: 28,
        fontStyle: 'italic',
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    joke: {
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
