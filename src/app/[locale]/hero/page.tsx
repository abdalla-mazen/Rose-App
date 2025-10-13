import React from 'react'
import Services from './_components/service'
import Occasion from './_components/occasion'
import ValentineCarousel from './_components/carousel'

export default function page() {
  return (
    <div className="px-20 py-16 space-y-16" >
      <ValentineCarousel/>
      <Occasion/>
      <Services />
    </div>
  )
}
