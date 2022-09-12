import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoTrash } from 'react-icons/io5'
import { useStateValue } from '../context/StateProvider'
import { deleteSong, getAllSongs } from '../api'
import { actionTypes } from '../context/reducer'
import { storage } from '../config/firebase.config'
import { deleteObject, ref } from 'firebase/storage'

const SongCard = ({ data }) => {
  const [isDelete, setIsDeleted] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState(null)

  const [
    { allSongs, song, isSongPlaying, alertType },
    dispatch
  ] = useStateValue()

  const handleDeleteSongs = data => {
    const deleteRef = ref(storage, data.imageURL)

    deleteObject(deleteRef).then(() => {})

    deleteSong(data._id).then(res => {
      if (res.data.success) {
        setAlert('success')
        setAlertMsg(res.data.msg)
        getAllSongs().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_SONGS,
            allSongs: data
          })
        })
        setTimeout(() => {
          setAlert(false)
        }, 4000)
      } else {
        setAlert('error')
        setAlertMsg(res.data.msg)
        setTimeout(() => {
          setAlert(false)
        }, 4000)
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className='relative w-40 min-w-210 px-2 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    >
      <div className='w-40 min-w-[160px] h-40 min-h-[169px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img
          whileHover={{ scale: 1.05 }}
          className='w-full h-full rounded-lg object-cover'
          src={data?.imageURL}
          alt='img'
        />
      </div>
      <p className='text-base text-center text-headingColor font-semibold my-2'>
        {data.name.length > 25 ? `${data.name.slice(0, 10)}..` : data.name}
        {data.artist && (
          <span className='block text-sm text-gray-400 my-1'>
            {data.artist.length > 25
              ? `${data.artist.slice(0, 15)}....`
              : data.artist}
          </span>
        )}
      </p>

      <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
        <motion.i
          whileTap={{ scale: 0.75 }}
          className='text-base text-red-400 drop-shadow-md hover:text-red-600'
          onClick={() => setIsDeleted(true)}
        >
          <IoTrash />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          className='absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center justify-center flex-col px-4 py-2 gap-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className='text-xl text-headingColor font-semibold text-center'>
            Are you sure do you want to detele it?
          </p>
          <div className='flex items-center gap-4'>
            <motion.button
              whileTap={{ scale: 0.7 }}
              className='px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500'
              onClick={() => handleDeleteSongs(data)}
            >
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.7 }}
              className='px-2 py-1 text-sm uppercase bg-green-300 hover:bg-green-500'
              onClick={() => setIsDeleted(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SongCard
