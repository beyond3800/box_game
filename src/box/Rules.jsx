import React from 'react'

const Rules = () => {
  return (
    <div>
        <div className="about">
            <div className="header">
                <h2 className=''> How to play</h2>
                <div className="underline"></div>
            </div>
            <ul className='contents'>
                <li>A 3by3 free box board, player color black computer color red .</li>
                <li>If either player or computer is able to connect a box on a row,col,or vertical with his color </li>
                <li> that is the winner of that round to another round till game stop.</li>
                <li>The board will alway refresh when one wins or both draw</li>
            </ul>
        </div>
    </div>
  )
}

export default Rules