import React, { useEffect } from 'react'
import { getAllArtists } from '../api'
import { actionTypes } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import ArtistContainer from './ArtistContainer'

const DashboardArtists = () => {
  const [{ allArtists }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ARTISTS,
          allArtists: data
        })
      })
    }
  }, [allArtists, dispatch])

  return (
    <div className='min-w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  )
}

export default DashboardArtists
