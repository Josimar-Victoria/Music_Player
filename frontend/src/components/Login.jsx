import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import { validateUser } from '../api'

import { LoginBg } from '../assets/video'

const Login = ({ setAuth }) => {
  const [{ user }, dispatch] = useStateValue()

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const navigation = useNavigate()

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, provider).then(user => {
        if (user) {
          window.localStorage.setItem('auth', true)
          setAuth(true)

          firebaseAuth.onAuthStateChanged(user => {
            if (user) {
              user.getIdToken().then(token => {
                window.localStorage.setItem('token', token)
                validateUser(token).then(data => {
                  dispatch({
                    type: actionTypes.SET_USER,
                    user: data
                  })
                })
              })
              navigation('/', { replace: true })
            } else {
              setAuth(false)
              window.localStorage.setItem('auth', false)
              window.localStorage.setItem('token', null)
              navigation('/login')
              dispatch({
                type: actionTypes.SET_USER,
                user: null
              })
            }
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('auth') === 'true') {
      setAuth(true)
      navigation('/', { replace: true })
    }
  }, [navigation, setAuth])

  return (
    <div className='relative w-screen h-screen'>
      <video
        src={LoginBg}
        type='video/mp4'
        autoPlay
        muted
        loop
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
        <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
          <div
            className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in'
            onClick={loginWithGoogle}
          >
            <FcGoogle className='text-xl' />
            Inicia sesión con Google
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
