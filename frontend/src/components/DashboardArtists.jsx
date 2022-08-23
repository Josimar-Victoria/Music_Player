import React, { useEffect } from 'react'
import { getAllArtists } from '../api'
import { actionTypes } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

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

  return <div>DashboardArtists</div>
}

export default DashboardArtists
