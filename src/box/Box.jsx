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
    round,
    reset,
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
        <div className="">
          <div className="btnArea">
            <button className='playOn' onClick={()=>emptyBoard()}>Play on</button>
            <button className= 'reset'onClick={()=>reset()}>Reset</button>
          </div>
          <div className="played">{round>0&&<span>Played:{round}</span>}</div>
        </div>
        
      </div>
    </main>

  )
}

export default Box