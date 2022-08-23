import axios from 'axios'

const baseUrl = 'http://localhost:4000/'

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
    const response = await axios.delete(`${baseUrl}v1/api/user/delete/${userId}`)
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

// Obter todos los artistas
export const getAllArtists = async () => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/artists/getAll`)
    return response.data.artists
  } catch (error) {
    console.log(error.message)
  }
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

// Obter todos las canciones
export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${baseUrl}v1/api/songs/getAll`)
    return response.data.songs
  } catch (error) {
    console.log(error.message)
  }
}



