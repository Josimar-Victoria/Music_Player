import React, { useState } from 'react'
import Logo from '../assets/img/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import { FaCrown } from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { motion } from 'framer-motion'

const Header = () => {
  const [{ user }, dispatch] = useStateValue()
  const [isMenu, setIsMenu] = useState(false)

  const navigate = useNavigate()

  const handleLogOut = () => {
    const firebaseAuth = getAuth(app)
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem('auth', false)
        window.localStorage.setItem('token', null)
      })
      .catch(error => {
        console.log(error)
        navigate('/login', { replace: true })
      })
  }

  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
      <NavLink to={'/'} className=''>
        <img src={Logo} alt='logo' className='w-16' />
      </NavLink>

      <ul className='flex items-center justify-center ml-7'>
        <li className='mx-5 text-lg'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Home
          </NavLink>
        </li>
        <li className='mx-5 text-lg'>
          <NavLink
            to={'/musics'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Music
          </NavLink>
        </li>
        <li className='mx-5 text-lg'>
          <NavLink
            to={'/premium'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Premium
          </NavLink>
        </li>
        <li className='mx-5 text-lg'>
          <NavLink
            to={'/contact'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className='flex items-center ml-auto cursor-pointer gap-2 relative'
      >
        <img
          src={user?.user?.imageUrl}
          alt=''
          className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg'
          referrerPolicy='no-referrer'
        />
        <div className='flex flex-col'>
          <p className='text-textColor text-lg hover:text-headingColor font-semibold'>
            {user?.user?.name}
          </p>
          <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>
            Premin Member.
            <FaCrown className='text-sm ml-1 text-yellow-500' />{' '}
          </p>

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className='absolute z-10 top-12 p-3 right-0 w-275 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'
            >
              <NavLink to={'/userProfile'}>
                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>
                  Perfil
                </p>
                <hr />
              </NavLink>
              <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>
                Mis Favoritos
              </p>

              {user?.user?.role === 'Admin' && (
                <>
                  <hr />
                  <NavLink
                    to={'/dashboard/home'}
                    className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'
                  >
                    Dashboard
                  </NavLink>
                </>
              )}
              <hr />
              <p
                className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'
                onClick={handleLogOut}
              >
                Cerrar Sesión
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
