import React, { useContext } from 'react'
import { BoxContext } from '../context/box_context'
import EachBox from './EachBox'

const Box = () => {
  const {
    box,
    boxRef,
    winner,
    computerScore,
    playerScore,
    emptyBoard,
  } = useContext(BoxContext)
  return (
    <main className="">
      <div className='grid-col-3' ref={boxRef}>
        {box.map(boxes=><EachBox key={boxes.id} data={boxes}/>)}
      </div>
      <div className="">
        {winner&&<div className="winner"> <span>{winner}</span> </div>}
        <div className="scores">
          <div className="">Player: <span>{playerScore}</span> </div> vs <div className="">Computer: <span>{computerScore}</span> </div>
        </div>
        <div className="btn"><button onClick={()=>emptyBoard()}>Play on</button></div>
      </div>
    </main>

  )
}

export default Box