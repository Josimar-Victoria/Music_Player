import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Dashboard, Home, Login, MusicPlayer } from './components'

import { getAuth } from 'firebase/auth'
import { app } from './config/firebase.config'
import { AnimatePresence, motion } from 'framer-motion'
import { validateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionTypes } from './context/reducer'

function App () {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem('auth') === 'true'
  )

  const [{ user, isSongPlaying }, dispatch] = useStateValue()

  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(token => {
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('auth', true)
          validateUser(token).then(data => {
            dispatch({
              type: actionTypes.SET_USER,
              user: data
            })
          })
        })
        setAuth(true)
      } else {
        window.localStorage.setItem('auth', false)
        window.localStorage.setItem('token', null)
        navigate('/login')
        setAuth(false)
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        })
      }
    })
  }, [firebaseAuth, navigate, dispatch])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='h-auto min-w-[680px] bg-primary flex justify-center items-center'>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}

export default App
