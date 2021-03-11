import {createAsyncThunk, createSlice, PayloadAction, Slice,} from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RootState} from '../../store';

// Define a type for the slice state
export interface KitsuState {
    loading: boolean;
    animeLinks: {
        first?: string
        next?: string
        last?: string
    },
    mangaLinks: {
        first?: string
        next?: string
        last?: string
    }
    anime: Anime[];
    manga: Manga[];
}

export interface Manga {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        slug: string
        synopsis: string
        description: string
        posterImage: {
            tiny: string
            small: string
            medium: string
        }
    }
    links: {
        self: string
    },
    relationships: {
        [key: string]: { links: { related: string, self: string } }
    },
    type: string
}

export interface Anime {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        slug: string
        synopsis: string
        description: string
        titles: {
            en: string,
            en_jp: string,
            ja_jp: string
        }
        posterImage: {
            tiny: string
            small: string
            medium: string
            large: string
            original: string
        },
        coverImage: {
            tiny: string
            small: string
            medium: string
            large: string
            original: string
        }
    }
    links: {
        self: string
    },
    relationships: {
        [key: string]: { links: { related: string, self: string } }
    },
    type: string
}

// Define the initial state using that type
const initialState: KitsuState = {
    animeLinks: {
        first: undefined,
        last: undefined,
        next: undefined,
    },
    mangaLinks: {
        first: undefined,
        last: undefined,
        next: undefined,
    },
    manga: [],
    anime: [],
    loading: false,
};

interface FetchParams {
    text?: string
    first?: string
    next?: string
    last?: string
}


export const fetchAnime = createAsyncThunk('anime/fetch', async (params: FetchParams, {getState}) => {
    setLoading(true);
    let url = 'https://kitsu.io/api/edge/anime';
    if (params && params.first) {
        url = params.first;
    } else if (params && params.next) {
        url = params.next;
    } else if (params && params.last) {
        url = params.last;
    }
    const response = await fetch(url, {
        headers: new Headers({
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        }),
    });
    return await response.json();
});


export const fetchManga = createAsyncThunk('manga/fetch', async (params: FetchParams, {getState}) => {
    setLoading(true);
    let url = 'https://kitsu.io/api/edge/manga';
    if (params && params.first) {
        url = params.first;
    } else if (params && params.next) {
        url = params.next;
    } else if (params && params.last) {
        url = params.last;
    }
    const response = await fetch(url, {
        headers: new Headers({
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        }),
    });
    return await response.json();
});

export const kitsuSlice: Slice<KitsuState,
    {
        setLoading: (_: any, {payload}: PayloadAction<boolean>) => void;
    }> = createSlice({
    name: 'kitsu',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.loading = payload;
        },
    },
    extraReducers: {
        [fetchAnime.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchAnime.fulfilled.type]: (state, {payload}) => {
            state.anime = payload.data;
            state.animeLinks = payload.links
            state.loading = false;
        },
        [fetchManga.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchManga.fulfilled.type]: (state, {payload}) => {
            state.manga = payload.data;
            state.mangaLinks = payload.links
            state.loading = false;
        },
    },
});

const {setLoading} = kitsuSlice.actions;

export const kitsuSelector = (state: RootState) => state.kitsu;

export default kitsuSlice.reducer;
