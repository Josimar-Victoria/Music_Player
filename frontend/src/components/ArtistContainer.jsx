import React from 'react'
import ArtistCard from './ArtistCard'

function ArtistContainer ({ data }) {
  return (
    <div className=' w-full  flex flex-wrap gap-3  items-center justify-evenly'>
      {data && data.map((song, i) => <ArtistCard key={i} data={song} />)}
    </div>
  )
}

export default ArtistContainer
