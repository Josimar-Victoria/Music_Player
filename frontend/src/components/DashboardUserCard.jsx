import React from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useStateValue } from '../context/StateProvider'
import { useState } from 'react'
import { changingUserRole, getAllUsers, removeUser } from '../api'
import { actionTypes } from '../context/reducer'
import { MdDelete } from 'react-icons/md'

const DashboardUserCard = ({ data, index }) => {
  const [{ user, allUsers }, dispatch] = useStateValue()
  const [isUserRoleUpdate, setIsUserRoleUpdate] = useState(false)

  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY')

  const handleUpdateUserRole = (userId, role) => {
    setIsUserRoleUpdate(false)
    changingUserRole(userId, role).then(data => {
      if (data) {
        getAllUsers().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_USERS,
            allUsers: data
          })
        })
      }
    })
  }

  const handleDeleteUser = userId => {
    removeUser(userId).then(data => {
      if(data){
        dispatch({
          type:actionTypes.SET_ALL_USERS,
          allUsers: data
        })
      }
    })
  }

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'
    >
      <div
        className='absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200'
        onClick={() => handleDeleteUser(data._id)}
      >
        <MdDelete className='text-xl text-red-400 hover:text-red-500' />
      </div>
      <div className='w-275 min-w-[160px] flex items-center justify-center'>
        {/* user img */}
        <img
          src={data?.imageUrl}
          alt=''
          className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'
        />
      </div>
      {/* user Name */}

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.name}
      </p>

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.email}
      </p>

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.email_verified ? 'True' : 'False'}
      </p>

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {createdAt}
      </p>

      <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
        <p className='text-base text-textColor text-center'>{data.role}</p>
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className='text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md'
            onClick={() => setIsUserRoleUpdate(true)}
          >
            {data.role === 'Admin' ? 'Member' : 'Admin'}
          </motion.p>
        )}
        {isUserRoleUpdate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='absolute z-10 top-6 ring-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'
          >
            <p className='text-textColor text-[13px] font-semibold '>
              Are you sure, do you want to mark the user as{' '}
              <span>{data.role === 'Admin' ? 'Member' : 'Admin'}</span>?
            </p>
            <div className='flex items-center gap-4'>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md'
                onClick={() =>
                  handleUpdateUserRole(
                    data._id,
                    data.role === 'Admin' ? 'Member' : 'Admin'
                  )
                }
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md'
                onClick={() => setIsUserRoleUpdate(false)}
              >
                Not
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default DashboardUserCard
