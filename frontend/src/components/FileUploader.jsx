import React from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'
import { storage } from '../config/firebase.config'

const FileUploader = ({ updateStatus, setProgress, isLoading, isImage }) => {
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          updateStatus(downloadURL)
          isLoading(false)
        })
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
