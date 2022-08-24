export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_ALL_USERS: 'SET_ALL_USERS',
  SET_ALL_ALBUMS: 'SET_ALL_ALBUMS',
  SET_ALL_SONGS: 'SET_ALL_SONGS',
  SET_ALL_ARTISTS: 'SET_ALL_ARTISTS',

  // FILTER TYPE
  SET_FILTER_TEM: 'SET_FILTER_TEM',
  SET_ARTIST_FILTER: 'SET_ARTIST_FILTER',
  SET_LENGUAGE_FILTER: 'SET_LENGUAGE_FILTER',
  SET_ALBUM_FILTER: 'SET_ALBUM_FILTER'
}

const reducer = (state, action) => {
  console.log(action)

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      }
    case actionTypes.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers
      }
    case actionTypes.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums
      }
    case actionTypes.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs
      }
    case actionTypes.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists
      }

    // FILTER CASE
    case actionTypes.SET_FILTER_TEM:
      return {
        ...state,
        filterTerm: action.filterTerm
      }
    case actionTypes.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter
      }
    case actionTypes.SET_LENGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter
      }
    case actionTypes.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter
      }
    default:
      return state
  }
}

export default reducer
