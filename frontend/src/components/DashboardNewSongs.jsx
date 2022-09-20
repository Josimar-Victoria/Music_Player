import React, { useEffect, useState } from 'react'
import { ref, deleteObject } from 'firebase/storage'
import { motion } from 'framer-motion'
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
  // useState Audios
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [audioUploadProgress, setAudioUploadProgress] = useState(0)
  const [audioImageCover, setAudioImageCover] = useState(null)
  // useState Artist
  const [artistImageCover, setArtistImageCover] = useState(null)
  const [artistUploadProgress, setArtistUploadProgress] = useState(0)
  const [isArtistUploading, setIsArtistUploading] = useState(false)
  const [artistName, setArtistName] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  // useState Album
  const [albumImageCover, setAlbumImageCover] = useState(null)
  const [albumUploadProgress, setAlbumUploadProgress] = useState(0)
  const [isAlbumUploading, setIsAlbumUploading] = useState(false)
  const [albumName, setAlbumName] = useState('')

  const [
    {
      allArtists,
      allAlbums,
      allSongs,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType
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
      setIsArtistUploading(true)
      setIsAlbumUploading(true)

      // // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'danger'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
    }

    const deleteRef = ref(storage, url)

    deleteObject(deleteRef).then(() => {
      setSongImageCover(null)
      setAudioImageCover(null)
      setArtistImageCover(null)
      setAlbumImageCover(null)
      setIsImageLoading(false)
      setIsAudioLoading(false)
      setIsArtistUploading(false)
      setIsAlbumUploading(false)
    })
    // Alert msg
    // dispatch({
    //   type: actionTypes.SET_ALERT_TYPE,
    //   alertType: 'success'
    // })

    // setInterval(() => {
    //   dispatch({
    //     type: actionTypes.SET_ALERT_TYPE,
    //     alertType: null
    //   })
    // }, 4000)
  }

  const handleSaveSong = () => {
    if (!songImageCover || !audioImageCover) {
      // throw the alert
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'danger'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
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

      // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'success'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
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

  const handleSaveArtist = artist => {
    if (!artistImageCover || !artistName || !instagram) {
      // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'danger'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
    } else {
      setIsArtistUploading(true)
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        songUrl: audioImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram/${instagram}`
      }
      saveNewArtist(data).then(res => {
        getAllArtists().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_ARTISTS,
            allArtists: data
          })
        })
        // // Alert msg
        // dispatch({
        //   type: actionTypes.SET_ALERT_TYPE,
        //   alertType: 'success'
        // })

        // setInterval(() => {
        //   dispatch({
        //     type: actionTypes.SET_ALERT_TYPE,
        //     alertType: null
        //   })
        // }, 4000)
      })

      setIsArtistUploading(false)
      setArtistImageCover(null)
      setArtistName('')
      setTwitter('')
      setInstagram('')
    }
  }

  const handleSaveAlbum = () => {
    if (!albumImageCover || !albumName) {
      // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'danger'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
    } else {
      setIsAlbumUploading(true)

      const data = {
        name: albumName,
        imageURL: albumImageCover
      }
      saveNewAlbum(data).then(res => {
        getAllAlbums().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_ALBUMS,
            allAlbums: data
          })
        })
      })

      // // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'success'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)

      setIsAlbumUploading(false)
      setAlbumImageCover(null)
      setAlbumName('')
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
            onClick={handleSaveSong}
          >
            Save song
          </motion.button>
        )}
      </div>
      {/* Image Uploader for artist */}
      <p className='text-xl font-semibold text-headingColor'>Artist Details</p>
      <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-gray-300 cursor-pointer'>
        {isArtistUploading && <FileLoader progres={artistUploadProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateStatus={setArtistImageCover}
                setProgress={setArtistUploadProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img
                  src={artistImageCover}
                  alt=''
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() =>
                    handleDeleteFilteObject(artistImageCover, true)
                  }
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* artist Name */}
      <input
        type='text'
        placeholder='Artist Name'
        className='w-full p-3 rounded-md font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent'
        value={artistName}
        onChange={e => setArtistName(e.target.value)}
      />
      {/* Twitter */}
      <div className='flex items-center rounded-md p-3 border shadow-sm border-gray-300 w-full'>
        <p className='text-base font-semibold text-gray-400'>
          www.twitter.com/
        </p>
        <input
          type='text'
          placeholder='your twitter id'
          className='w-full text-base font-semibold text-textColor outline-none bg-transparent'
          value={twitter}
          onChange={e => setTwitter(e.target.value)}
        />
      </div>
      {/* Instagram */}
      <div className='flex items-center rounded-md p-3 border shadow-sm border-gray-300 w-full'>
        <p className='text-base font-semibold text-gray-400'>
          www.instagram.com/
        </p>
        <input
          type='text'
          placeholder='your instagram id'
          className='w-full text-base font-semibold text-textColor outline-none bg-transparent'
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
        />
      </div>
      <div className='flex items-center cursor-pointer justify-center w-60 p-4 '>
        {isArtistUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className='px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg'
            onClick={handleSaveArtist}
          >
            Save Artist
          </motion.button>
        )}
      </div>

      {/* ALBUM INFORMATION */}
      <p className='text-xl font-semibold text-headingColor'>Album Details</p>
      <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-gray-300 cursor-pointer'>
        {isAlbumUploading && <FileLoader progres={albumUploadProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateStatus={setAlbumImageCover}
                setProgress={setAlbumUploadProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img
                  src={albumImageCover}
                  alt=''
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => handleDeleteFilteObject(albumImageCover, true)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* album Name */}
      <input
        type='text'
        placeholder='Album Name'
        className='w-full p-3 rounded-md font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent'
        value={albumName}
        onChange={e => setAlbumName(e.target.value)}
      />
      {/* Save Album */}
      <div className='flex items-center cursor-pointer justify-center w-60 p-4 '>
        {isArtistUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className='px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg'
            onClick={handleSaveAlbum}
          >
            Save Album
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default DashboardNewSongs
