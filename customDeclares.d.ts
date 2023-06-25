declare module '*.png' {
    import { ImageSourcePropType } from 'react-native';
    const value: ImageSourcePropType;
    export default value;
}
declare module '*.jpg';
declare module '@yajanarao/react-native-get-music-files' {
    function getAll(options: {
        artist?: boolean,
        duration?: boolean,
        title?: boolean,
        id?: boolean,
        coverFolder?: string,
        cover?: boolean,
        coverResizeRatio?: number,
        icon?: boolean,
        iconSize?: number,
        coverSize?: number,
        genre?: boolean,
        album?: boolean,
        batchNumber?: number,
        minimumSongDuration?: number,
        delay?: number,
    }): Promise<Array<Song>>;

    function getSongByPath(options: {
        songUri: string;
        coverFolder?: string;
        cover?: boolean;
        coverResizeRatio?: number;
        icon?: boolean;
        iconSize?: number;
        coverSize?: number;
    }): Promise<Array<Song>>;

    function getAlbums(options?: {
        artist?: string;
    }): Promise<Array<Album>>;

    function getArtists(options?: {
        artist?: string;
    }): Promise<Array<Artist>>;

    function getSongs(options?: {
        artist?: string;
        album?: string;
    }): Promise<Array<Song>>;

    function search(options?: {
        searchParam: string;
    }): Promise<Array<Song>>;

    function getSongsByGenres(options?: {
        genre?: string;
    }): Promise<Array<Song> | Array<string>>;
};

interface Song {
    path: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    duration: number;
    cover?: string;
    icon?: string;
}

interface Album {
    album: string;
    artist: string;
    numberOfSongs: number;
    cover: string;
}

interface Artist {
    artist: string;
    numberOfAlbums: number;
    numberOfSongs: number;
    cover: string;
}
