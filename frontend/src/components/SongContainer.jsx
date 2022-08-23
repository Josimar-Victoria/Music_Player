import React from 'react'
import SongCard from './SongCard'

const SongContainer = ({ data }) => {
  return (
    <div className=' w-full  flex flex-wrap gap-3  items-center justify-evenly'>
      {data && data.map((song, i) => <SongCard key={i} data={data} />)}
    </div>
  )
}

export default SongContainer
