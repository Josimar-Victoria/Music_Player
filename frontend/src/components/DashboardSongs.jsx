import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import { getAllSongs } from '../api'
import SongContainer from './SongContainer'
import { motion } from 'framer-motion'

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState('')
  const [isFoucs, setIsFoucs] = useState(false)
  const [filteredSongs, setFilteredSongs] = useState(null)
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

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        data =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      )
      setFilteredSongs(filtered)
    } else {
      setFilteredSongs(null)
    }
  }, [songFilter, allSongs, filteredSongs])

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
        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter('')
              setFilteredSongs(null)
            }}
          >
            <AiOutlineClear className='text-3xl text-textColor cursor-pointer' />
          </motion.i>
        )}
      </div>
      {/* Main Container */}
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>
              Count :
            </span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
          </p>
        </div>
        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  )
}

export default DashboardSongs
