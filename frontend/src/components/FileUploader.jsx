import React from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.config'
import { actionTypes } from '../context/reducer'

const FileUploader = ({
  updateStatus,
  setProgress,
  isLoading,
  isImage,
  dispatch
}) => {
  const uploadFile = e => {
    isLoading(true)
    const uploadedFile = e.target.files[0]
    console.log(uploadedFile)

    const storageRef = ref(
      storage,
      `${isImage ? 'images' : 'Audio'}/${Date.now()}-${uploadedFile.name}`
    )

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile)

    uploadTask.on(
      'state_changed',
      snapshot => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      error => {
        console.log(error)
        // Alert msg
        dispatch({
          type: actionTypes.SET_ALERT_TYPE,
          alertType: 'danger'
        })

        setInterval(() => {
          dispatch({
            type: actionTypes.SET_ALERT_TYPE,
            alertType: null
          })
        }, 4000)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          updateStatus(downloadURL)
          isLoading(false)
        })

        // Alert msg
        dispatch({
          type: actionTypes.SET_ALERT_TYPE,
          alertType: 'success'
        })

        setInterval(() => {
          dispatch({
            type: actionTypes.SET_ALERT_TYPE,
            alertType: null
          })
        }, 4000)
      }
    )
  }

  return (
    <label>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='flex flex-col justify-center items-center cursor-pointer'>
          <p className='font-bold text-2xl '>
            <BiCloudUpload />
          </p>
          <p className='text-lg'>
            Click to upload {isImage ? 'an image' : 'an audio'}
          </p>
        </div>
      </div>
      <input
        type='file'
        name='upload-fila'
        accept={`${isImage ? 'image/*' : 'audio/*'}`}
        onChange={uploadFile}
        className='w-0 h-0'
      />
    </label>
  )
}

export default FileUploader
