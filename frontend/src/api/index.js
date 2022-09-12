import axios from 'axios'

const baseUrl = 'http://localhost:4000/'

// Iniciar seccion
export const validateUser = async token => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/user/login`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

// Obter todos los users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/user/getUsers`)
    return response.data.users
  } catch (error) {
    console.log(error.message)
  }
}

// Eliminar Usuario
export const removeUser = async userId => {
  try {
    const response = await axios.delete(
      `${baseUrl}v1/api/user/delete/${userId}`
    )
    return response
  } catch (error) {}
}

// Atualizar el Rol de Usuario
export const changingUserRole = async (userId, role) => {
  try {
    const response = await axios.put(
      `${baseUrl}v1/api/user/updateRole/${userId}`,
      { role }
    )
    return response.data.user.role
  } catch (error) {
    console.log(error.message)
  }
}

// CREAR ATISTA
export const saveNewArtist = async data => {
  try {
    const res = axios.post(`${baseUrl}v1/api/artists/save`, { ...data })
    return (await res).data.savedArtist
  } catch (error) {}
}

// Obter todos los artistas
export const getAllArtists = async () => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/artists/getAll`)
    return response.data.artists
  } catch (error) {
    console.log(error.message)
  }
}

// Eliminar artista
export const deleteArtistas = async id => {
  try {
    const res = axios.delete(`${baseUrl}v1/api/albums/delete/${id}`)
    return res
  } catch (error) {}
}

//CREAR ALBUMS
export const saveNewAlbum = async data => {
  try {
    const res = axios.post(`${baseUrl}v1/api/albums/save`, { ...data })
    return (await res).data.savedAlbum
  } catch (error) {}
}

// Obter todos los albunes
export const getAllAlbums = async () => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/albums/getAll`)
    return response.data.albums
  } catch (error) {
    console.log(error.message)
  }
}

// Eliminar Album
export const deleteAlbum = async id => {
  try {
    const res = await axios.delete(`${baseUrl}v1/api/albums/delete/${id}`)
    return res
  } catch (error) {}
}
// CRAER canciones
export const saveNewSong = async data => {
  try {
    const res = axios.post(`${baseUrl}v1/api/songs/save`, { ...data })
    return (await res).data.savedSong
  } catch (error) {}
}

// Obter todos las canciones
export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/songs/getAll`)
    return response.data.songs
  } catch (error) {
    console.log(error.message)
  }
}

// Eliminar Cancion
export const deleteSong = async id => {
  try {
    const res = await axios.delete(`${baseUrl}v1/api/songs/delete/${id}`)
    return res
  } catch (error) {}
}
