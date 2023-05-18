// import React from "react"
// import { BsArrowRightCircleFill } from 'react-icons/bs'

import { useNavigate } from "react-router-dom"

export default function Home() {

  let nav = useNavigate();
  const nextPage = ()=>{
    nav('/pdf')
  }
  return (
    <div className='Home'>
      <h1>Note Fusion</h1>
      {/* <button>Next <BsArrowRightCircleFill/></button> */}
      <button onClick={nextPage}>Next</button>
    </div>
  )
}
