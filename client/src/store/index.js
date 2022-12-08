import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "./store-request-api";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SET_ALL_PLAYLISTS: "SET_ALL_PLAYLISTS",
    SET_PLAYING_PLAYLIST: "SET_PLAYING_PLAYLIST",
    SET_PLAYING_SONG: "SET_PLAYING_SONG",  
    INCREMENT_PUBLISH_COUNT: "INCREMENT_PUBLISH_COUNT",
    SET_CURRENT_SCREEN: "SET_CURRENT_SCREEN",
    SET_CURRENTLY_SEARCHING: "SET_CURRENTLY_SEARCHING",
    CHANGE_LIKE_COUNT: "CHANGE_LIKE_COUNT",
    CHANGE_DISLIKE_COUNT: "CHANGE_DISLIKE_COUNT",
    SET_SORT_TYPE: "SET_SORT_TYPE",
    INCREMENT_SONG_INDEX: "INCREMENT_SONG_INDEX",
    SET_CURRENT_MODAL: "SET_CURRENT_MODAL"
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE: "NONE",
    DELETE_LIST: "DELETE_LIST",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    RENAME_LIST: "RENAME_LIST"
};

const CurrentScreen = {
    NONE: "NONE",
    HOME: "HOME",
    ALL_LISTS: "ALL_LISTS",
    USER_LISTS: "USER_LISTS",
}

const SortTypes = {
    NONE: "NONE",
    CREATION_DATE: "CREATION_DATE",
    LAST_EDIT_DATE: "LAST_EDIT_DATE",
    NAME: "NAME",
    PUBLISH_DATE: "PUBLISH_DATE",
    LISTENS: "LISTENS",
    LIKES: "LIKES",
    DISLIKES: 'DISLIKES'
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex: -1,
        currentSong: null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        allPlaylists: [],
        playingPlaylist: null,
        playingSong: null,
        playingSongIndex: -1,
        publishCounter: -1,
        currentScreen: CurrentScreen.NONE,
        currentlySearching: "",
        likeCount: -1,
        dislikeCount: -1,
        sortType: SortTypes.NONE,
        listensCounter: -1,
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: payload.pairsArray,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: payload.playlists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal: CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            //
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal: CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal: CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.SET_ALL_PLAYLISTS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: payload,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.SET_PLAYING_PLAYLIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: payload.playlist,
                    playingSong: store.playingSong,
                    playingSongIndex: payload.index,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter+1,
                });
            }
            case GlobalStoreActionType.SET_PLAYING_SONG: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: payload.playingSong,
                    playingSongIndex: payload.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.INCREMENT_PUBLISH_COUNT: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: payload,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.SET_CURRENT_SCREEN: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: payload.screen,
                    currentlySearching: payload.searching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.SET_CURRENTLY_SEARCHING: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: payload,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                });
            }
            case GlobalStoreActionType.CHANGE_LIKE_COUNT: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: payload,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                })
            }
            case GlobalStoreActionType.CHANGE_DISLIKE_COUNT: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: payload,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                })
            }
            case GlobalStoreActionType.SET_SORT_TYPE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: payload,
                    listensCounter: store.listensCounter,
                })
            }
            case GlobalStoreActionType.INCREMENT_SONG_INDEX: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: payload,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                })
            }
            case GlobalStoreActionType.SET_CURRENT_MODAL: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    playingPlaylist: store.playingPlaylist,
                    playingSong: store.playingSong,
                    playingSongIndex: store.playingSongIndex,
                    publishCounter: store.publishCounter,
                    currentScreen: store.currentScreen,
                    currentlySearching: store.currentlySearching,
                    likeCount: store.likeCount,
                    dislikeCount: store.dislikeCount,
                    sortType: store.sortType,
                    listensCounter: store.listensCounter,
                })
            }
            default:
                return store;
        }
    };

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.
    store.setAllPlaylists = function () {
        async function getAllPlaylists() {
            let response = await api.getPlaylists();
            if (response.data.success) {
                let playlists = response.data.data;
                if (store.currentScreen === "ALL_LISTS") {
                    playlists = playlists.filter(function (playlist) {
                        return playlist.isPublished;
                    })
                }
                storeReducer({
                    type: GlobalStoreActionType.SET_ALL_PLAYLISTS,
                    payload: playlists
                });
            }
        }
        getAllPlaylists();
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(
                        playlist._id,
                        playlist
                    );
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: null,
                                    },
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    };

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {},
        });
        tps.clearAllTransactions();
        history.push("/");
    };

    store.clearTransactions = function () {
        tps.clearAllTransactions();
    };

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const res = await api.getPlaylists();
        if (res.data.success) {
            let playlists = res.data.data;
            playlists = playlists.filter(function (play) {
                return play.userName === auth.user.userName
            })
            while (playlists.some(p => p.name === newListName)) {
                newListName += "*"
            }
        }
        const response = await api.createPlaylist(
            newListName,
            [],
            auth.user.email,
            [],
            [],
            [],
            [],
            false,
            auth.user.userName
        );
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList,
            });
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        } else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    };

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            if (store.currentScreen === "NONE" || store.currentScreen === "HOME") {
                let response = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    switch (store.sortType) {
                        case "NAME": {
                            pairsArray = pairsArray.sort((a, b) => a.name.localeCompare(b.name));
                            break;
                        }
                        default: {
                            //nothing
                        }
                    }
                    let res = await api.getPlaylists();
                    if (res.data.success) {
                        let playlists = res.data.data;
                        if (store.currentlySearching !== "") {
                            console.log(store.currentlySearching)
                            playlists = playlists.filter(function (playlist) {
                                return playlist.name.toLowerCase().includes(store.currentlySearching);
                            })
                        }
                        
                        switch (store.sortType) {
                            case "LAST_EDIT_DATE": {
                                let userPlaylists = playlists.filter(function(playlist) {
                                    return playlist.userName === auth.user.userName
                                })
                                userPlaylists = userPlaylists.sort(function(a,b){
                                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                                });
                                pairsArray = [];
                                for (let key in userPlaylists) {
                                    let list = userPlaylists[key];
                                    let pair = {
                                        _id: list._id,
                                        name: list.name
                                    };
                                    pairsArray.push(pair);
                                }
                                break;
                            }
                            default: {
                                //nothing
                            }
                        }
                        console.log(playlists);
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                            payload: {pairsArray: pairsArray, playlists: playlists},
                        });
                    }
                } else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            if (store.currentScreen === "ALL_LISTS") {
                const response = await api.getPlaylists();
                if (response.data.success) {
                    let playlists = response.data.data;
                    playlists = playlists.filter(function (playlist) {
                        return playlist.isPublished
                    })
                    if (store.currentlySearching !== "") {
                        playlists = playlists.filter(function (playlist) {
                            return playlist.name.toLowerCase().includes(store.currentlySearching);
                        })
                    }
                    switch (store.sortType) {
                        case "NAME": {
                            playlists = playlists.sort((a, b) => a.name.localeCompare(b.name));
                            break;
                        }
                        case "PUBLISH_DATE": {
                            playlists = playlists.sort(function(a,b){
                                return b.publishedAt - a.publishedAt;
                            });
                            playlists = playlists.reverse();
                            break;
                        }
                        case "LIKES": {
                            playlists = playlists.sort(function(a,b) {
                                return b.likesCount.length - a.likesCount.length;
                            })
                            break;
                        }
                        case "DISLIKES": {
                            playlists = playlists.sort(function(a,b) {
                                return b.dislikesCount.length - a.dislikesCount.length;
                            })
                            break;
                        }
                        case "LISTENS": {
                            playlists = playlists.sort(function(a,b) {
                                return b.listens - a.listens;
                            })
                            break;
                        }
                        default:  {
                            //nothing
                        }
                    }
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name
                        };
                        pairs.push(pair);
                    }
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: {pairsArray: pairs, playlists: playlists},
                    });
                } else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            if (store.currentScreen === "USER_LISTS") {
                const response = await api.getPlaylists();
                if (response.data.success) {
                    let playlists = response.data.data;
                    playlists = playlists.filter(function (playlist) {
                        return playlist.userName.toLowerCase().includes(store.currentlySearching) && playlist.isPublished;
                    })
                    switch (store.sortType) {
                        case "NAME": {
                            playlists = playlists.sort((a, b) => a.name.localeCompare(b.name));
                            break;
                        }
                        case "PUBLISH_DATE": {
                            playlists = playlists.sort(function(a,b){
                                return b.publishedAt - a.publishedAt;
                            });
                            playlists = playlists.reverse();
                            break;
                        }
                        case "LIKES": {
                            playlists = playlists.sort(function(a,b) {
                                return b.likesCount.length - a.likesCount.length;
                            })
                            break;
                        }
                        case "DISLIKES": {
                            playlists = playlists.sort(function(a,b) {
                                return b.dislikesCount.length - a.dislikesCount.length;
                            })
                            break;
                        }
                        case "LISTENS": {
                            playlists = playlists.sort(function(a,b) {
                                return b.listens - a.listens;
                            })
                            break;
                        }
                        default:  {
                            //nothing
                        }
                    }
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name
                        };
                        pairs.push(pair);
                    }
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: {pairsArray: pairs, playlists: playlists},
                    });
                } else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
        }
        asyncLoadIdNamePairs();
    };

    store.sortByName = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                pairsArray.sort((a, b) => a.name.localeCompare(b.name));
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray,
                });
            } else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    };

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: { id: id, playlist: playlist },
                });
            }
        }
        getListToDelete(id);
    };
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            console.log(response);
            if (response.status === 200) {
                console.log("Hi")
                store.loadIdNamePairs();
            }
        }
        processDelete(id);
    };
    store.deleteMarkedList = function () {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    };
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: { currentSongIndex: songIndex, currentSong: songToEdit },
        });
    };
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: { currentSongIndex: songIndex, currentSong: songToRemove },
        });
    };
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {},
        });
    };
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    };
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    };
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    };

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist,
                    });
                    // history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    };

    store.setPlayingList = function (id) {
        async function aysncSetPlayingList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (playlist.isPublished) {
                    playlist.listens = playlist.listens + 1;
                }
                let res = await api.updatePlaylistById(id, playlist);
                if (res.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_PLAYING_PLAYLIST,
                        payload: { playlist: playlist, index: 0 }
                    });
                }
            }
            else {
                console.log("FAILLL")
            }
        }
        aysncSetPlayingList(id);
    };

    store.setPlayingSong = function (song, index) {
        storeReducer({
            type: GlobalStoreActionType.SET_PLAYING_SONG,
            payload: { playingSong: song, playingSongIndex: index }
        });
    };
    
    store.getPlaylistSize = function () {
        return store.currentList.songs.length;
    };
    store.addNewSong = function () {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    };
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function (index, song) {
        let list = store.currentList;
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    };
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function (start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        } else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    };
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function (index) {
        let list = store.currentList;
        list.songs.splice(index, 1);

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    };
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function (index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    };
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize,
            "Untitled",
            "?",
            "dQw4w9WgXcQ"
        );
    };
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId,
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    };
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    };
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    };
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId,
        };
        let transaction = new UpdateSong_Transaction(
            this,
            index,
            oldSongData,
            newSongData
        );
        tps.addTransaction(transaction);
    };
    store.updateCurrentList = function () {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(
                store.currentList._id,
                store.currentList
            );
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList,
                });
            }
        }
        asyncUpdateCurrentList();
    };
    store.undo = function () {
        tps.undoTransaction();
    };
    store.redo = function () {
        tps.doTransaction();
    };
    store.canAddNewSong = function () {
        return store.currentList !== null;
    };
    store.canUndo = function () {
        return store.currentList !== null && tps.hasTransactionToUndo();
    };
    store.canRedo = function () {
        return store.currentList !== null && tps.hasTransactionToRedo();
    };
    store.canClose = function () {
        return store.currentList !== null;
    };

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null,
        });
    };

    store.returnToSplash = function () {
        history.push("/");
        history.go(0);
    };

    store.resetCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: null,
        });
    };

    store.resetPlayingList = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_PLAYING_PLAYLIST,
            payload: {playlist: null, index:0},
        });
    };

    store.addComment = function (text) {
        async function asyncUpdate() {
            let playlist = store.playingPlaylist;
            playlist.comments.push({userName: auth.user.userName, text: text});
            console.log(playlist);
            const response = await api.updatePlaylistById(
                playlist._id,
                playlist
            );
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_PLAYING_PLAYLIST,
                    payload: {playlist: playlist, index: store.playingSongIndex}
                });
            }
        }
        asyncUpdate();
    }

    store.publishPlaylist = function (id) {
        async function publishId(id) {
            let playlist = store.currentList;
            let date = new Date();
            playlist.publishedAt = date;
            playlist.isPublished = true;
            const response = await api.updatePlaylistById(
                playlist._id,
                playlist
            )
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.INCREMENT_PUBLISH_COUNT,
                    payload: store.publishCounter+1,
                });
            }
        }
        publishId(id);
}

    store.setCurrentScreen = function (screen) {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SCREEN,
            payload: {screen: screen, searching: ""}
        });
    }

    store.setCurrentlySearching = function (text) {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENTLY_SEARCHING,
            payload: text,
        });
    }

    store.likePlaylist = function (id) {
        async function likeId(id) {
            const response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (playlist.dislikesCount.some((obj) => obj.userName === auth.user.userName)) {
                    playlist.dislikesCount = playlist.dislikesCount.filter(function(obj) {
                        return obj.userName !== auth.user.userName;
                    })
                    playlist.userInteractions = playlist.userInteractions.filter(function(obj) {
                        return obj.userName !== auth.user.userName;
                    })
                }
                playlist.likesCount.push({userName: auth.user.userName});
                playlist.userInteractions.push({userName: auth.user.userName, kind: true});
                const res = await api.updatePlaylistById(
                    playlist._id,
                    playlist
                )
                if (res.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CHANGE_LIKE_COUNT,
                        payload: store.likeCount+1,
                    });
                }
            }

        }
        likeId(id);
    }

    store.dislikePlaylist = function (id) {
        async function dislikeId(id) {
            const response = await api.getPlaylistById(id);
            if (response.data.success) {
                console.log(response.data.playlist)
                let playlist = response.data.playlist;
                if (playlist.likesCount.some((obj) => obj.userName === auth.user.userName)) {
                    playlist.likesCount = playlist.likesCount.filter(function(obj) {
                        return obj.userName !== auth.user.userName;
                    })
                    playlist.userInteractions = playlist.userInteractions.filter(function(obj) {
                        return obj.userName !== auth.user.userName;
                    })
                }
                playlist.dislikesCount.push({userName: auth.user.userName});
                playlist.userInteractions.push({userName: auth.user.userName, kind: false})
                const res = await api.updatePlaylistById(id, playlist);
                if (res.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CHANGE_DISLIKE_COUNT,
                        payload: store.dislikeCount+1,
                    });
                }
            }
        }
        dislikeId(id);
    }

    store.setSortType = function (type) {
        console.log(type);
        storeReducer({
            type: GlobalStoreActionType.SET_SORT_TYPE,
            payload: type,
        });
    }

    store.duplicatePlaylist = function (id) {
        async function duplicate(id) {
            const res = await api.getPlaylistById(id);
            if (res.data.success) {
                let playlist = res.data.playlist;
                let newListName = playlist.name;
                const res2 = await api.getPlaylists();
                if (res2.data.success) {
                    let playlists = res2.data.data;
                    playlists = playlists.filter(function (play) {
                        return play.userName === auth.user.userName
                    })
                    while (playlists.some(p => p.name === newListName)) {
                        newListName += "*"
                    }
                    const response = await api.createPlaylist(
                        newListName,
                        playlist.songs,
                        auth.user.email,
                        [],
                        [],
                        [],
                        [],
                        false,
                        auth.user.userName
                    );
                    if (response.status === 201) {
                        tps.clearAllTransactions();
                        let newList = response.data.playlist;
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload: newList,
                        });
                        // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                        // history.push("/playlist/" + newList._id);
                    } else {
                        console.log("API FAILED TO CREATE A NEW LIST");
                    }
                }
            }
        }
        duplicate(id);
    }

    store.incrementSongIndex = function (index) {
        storeReducer({
            type: GlobalStoreActionType.INCREMENT_SONG_INDEX,
            payload: index,
        });
    }

    store.setCurrentModal = function (text) {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_MODAL,
            payload: text,
        });
    }

    return (
        <GlobalStoreContext.Provider
            value={{
                store,
            }}
        >
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
