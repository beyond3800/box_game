import React, { useContext } from 'react'
import { BoxContext } from '../context/box_context'

const EachBox = (props) => {
  const {handleClick} = useContext(BoxContext);
  const {id,on,col,row,vertical} = props.data
  return (
    <div 
    className='eachBox' 
    onClick={(e)=>handleClick(props,e)} 
    id={id} 
    data-row={row} 
    data-col={col}  
    data-vertical = {vertical}
    data-play=''
    >
    </div>
  )
}

export default EachBox