import React from 'react'
import { bgColors } from '../utils/styles'

const DashboardCard = ({ icon, name, count }) => {
  const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)]

  return (
    <div
      style={{ background: `${bg_Color}` }}
      className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md'
    >
      {icon}
      <p className='text-xl text-textColor font-semibold'>{name}</p>
      <p className='text-lg text-textColor'>{count}</p>
    </div>
  )
}

export default DashboardCard
