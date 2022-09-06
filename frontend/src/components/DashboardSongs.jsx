import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import { getAllSongs } from '../api'
import SongContainer from './SongContainer'

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState('')
  const [isFoucs, setIsFoucs] = useState(false)
  const [{ allSongs }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_SONGS,
          allSongs: data
        })
      })
    }
  }, [allSongs, dispatch])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink
          to={'/dashboard/newSong'}
          className='flex items-center justify-center px-4 py-3 border rounded-md border-gray-300  hover:border-gray-500 hover:shadow-md cursor-pointer'
        >
          <IoAdd />
        </NavLink>
        <input
          className={`w-52 px-4 py-2 border ${
            isFoucs ? 'border-gray-500 shadow-md' : 'border-gray-300'
          } rounded-md bg-transparent outline-none duration-150 transition-all easein-out-out text-base text-textColor font-semibold`}
          type='text'
          placeholder='Search the is song'
          value={songFilter}
          onChange={e => setSongFilter(e.target.value)}
          onBlur={() => setIsFoucs(false)}
          onFocus={() => setIsFoucs(true)}
        />
        <i>
          <AiOutlineClear className='text-2xl text-textColor cursor-pointer' />
        </i>
      </div>
      {/* Main Container */}
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>
              Count :
            </span>
            {allSongs?.length}
          </p>
        </div>
        <SongContainer data={allSongs} />
      </div>
    </div>
  )
}

export default DashboardSongs
