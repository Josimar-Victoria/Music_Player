import React, { useEffect, useRef, useState } from 'react'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'
import { motion } from 'framer-motion'

import { BiCloudUpload } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

import { storage } from '../config/firebase.config'
import { useStateValue } from '../context/StateProvider'
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong
} from '../api'
import { actionTypes } from '../context/reducer'
import { filterByLanguage, filters } from '../utils/supportfunctions'
import { IoMusicalNote } from 'react-icons/io5'
import FilterButtons from './FilterButtons'
import FileLoader from './FileLoader'
import FileUploader from './FileUploader'
import DisabledButton from './DisabledButton'
// import AlertSuccess from './AlertSuccess'
// import AlertError from './AlertError'

const DashboardNewSongs = () => {
  const [songName, setSongName] = useState('')
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [imageUploadProgress, setImageUploadProgress] = useState(0)
  const [songImageCover, setSongImageCover] = useState(null)

  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [audioUploadProgress, setAudioUploadProgress] = useState(0)
  const [audioImageCover, setAudioImageCover] = useState(null)

  const [
    {
      allArtists,
      allAlbums,
      allSongs,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter
    },
    dispatch
  ] = useStateValue()

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ARTISTS,
          allArtists: data
        })
      })
    }

    if (!allAlbums) {
      getAllAlbums().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ALBUMS,
          allAlbums: data
        })
      })
    }
  }, [allArtists, allAlbums, dispatch])

  const handleDeleteFilteObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true)
      setIsAudioLoading(true)
    }
    const deleteRef = ref(storage, url)
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null)
      setAudioImageCover(null)
      setIsImageLoading(false)
      setIsAudioLoading(false)
    })
  }

  const saveSong = () => {
    if (!songImageCover || !audioImageCover) {
      // throw the alert
    } else {
      setIsAudioLoading(true)
      setIsImageLoading(true)

      const data = {
        name: songName,
        imageURL: songImageCover,
        songUrl: audioImageCover,
        artist: artistFilter,
        album: albumFilter,
        language: languageFilter,
        category: filterTerm
      }

      saveNewSong(data).then(res => {
        getAllSongs().then(songs => {
          dispatch({
            type: actionTypes.SET_ALL_SONGS,
            allSongs: songs
          })
        })
      })

      setSongName(null)
      setIsAudioLoading(false)
      setIsImageLoading(false)
      setSongImageCover(null)
      setAudioImageCover(null)

      dispatch({ type: actionTypes.SET_ALBUM_FILTER, albumFilter: null })
      dispatch({ type: actionTypes.SET_ARTIST_FILTER, artistFilter: null })
      dispatch({ type: actionTypes.SET_LENGUAGE_FILTER, languageFilter: null })
      dispatch({ type: actionTypes.SET_FILTER_TEM, filterTerm: null })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md'>
      <input
        type='text'
        placeholder='Type your sont name'
        className='w-full p-3 rounded-md font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent'
        value={songName}
        onChange={e => setSongName(e.target.value)}
      />
      <div className='flex w-full justify-between flex-wrap items-center gap-4'>
        <FilterButtons filterData={allArtists} flag={'Artist'} />
        <FilterButtons filterData={allAlbums} flag={'Album'} />
        <FilterButtons filterData={filterByLanguage} flag={'Language'} />
        <FilterButtons filterData={filters} flag={'Category'} />
      </div>
      <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-gray-300 cursor-pointer'>
        {isImageLoading && <FileLoader progres={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateStatus={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img
                  src={songImageCover}
                  alt=''
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => handleDeleteFilteObject(songImageCover, true)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* AUDIO FILE UPLOADING */}
      <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-gray-300 cursor-pointer'>
        {isAudioLoading && <FileLoader progres={audioUploadProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateStatus={setAudioImageCover}
                setProgress={setAudioUploadProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className='relative w-full h-full flex items-center justify-center overflow-hidden rounded-md'>
                <audio src={audioImageCover} controls />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() =>
                    handleDeleteFilteObject(audioImageCover, false)
                  }
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className='flex items-center cursor-pointer justify-center w-60 p-4 '>
        {isImageLoading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className='px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg'
            onClick={saveSong}
          >
            Save song
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default DashboardNewSongs
