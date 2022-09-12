import React, { useState } from 'react'

import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import { deleteAlbum, getAllAlbums } from '../api'
import { storage } from '../config/firebase.config'
import { deleteObject, ref } from 'firebase/storage'

const AlbumCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState(null)

  const [
    { allAlbums, song, isSongPlaying, alertType },
    dispatch
  ] = useStateValue()

  const handleDeleteAlbum = data => {
    // const deleteRef = ref(storage, data.imageURL)

    // deleteObject(deleteRef).then(() => {})

    deleteAlbum(data._id).then(res => {
      if (res.data.success) {
        setAlert('success')
        setAlertMsg(res.data.msg)
        getAllAlbums().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_ALBUMS,
            allAlbums: data
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
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className='relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    >
      <img
        src={data?.imageURL}
        className='w-full h-40 object-cover rounded-md'
        alt=''
      />
      {data.name.length > 20 ? `${data.name.slice(0, 15)}..` : data.name}

      <motion.i
        className='absolute bottom-2 right-2'
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=' text-gray-400 hover:text-red-400 text-xl cursor-pointer' />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className='absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4'
        >
          <p className='text-gray-100 text-base text-center'>
            Are you sure do you want to delete this?
          </p>
          <div className='flex items-center w-full justify-center gap-3'>
            <div
              className='bg-red-300 px-3 rounded-md'
              onClick={() => handleDeleteAlbum(data)}
            >
              <p className='text-headingColor text-sm'>Yes</p>
            </div>
            <div
              className='bg-green-300 px-3 rounded-md'
              onClick={() => setIsDelete(false)}
            >
              <p className='text-headingColor text-sm'>No</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default AlbumCard
