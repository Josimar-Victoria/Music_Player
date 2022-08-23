export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_ALL_USERS: 'SET_ALL_USERS',
  SET_ALL_ALBUMS: 'SET_ALL_ALBUMS',
  SET_ALL_SONGS: 'SET_ALL_SONGS',
  SET_ALL_ARTISTS: 'SET_ALL_ARTISTS'
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
    default:
      return state
  }
}

export default reducer
