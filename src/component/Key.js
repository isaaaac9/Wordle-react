import React, {useContext} from 'react'
import {AppContext} from '../App'


function Key({keyVal, bigKey, disabled }) {
  const { onSelectLetter, onDel, onEnter} = useContext(AppContext)

  const selectLetter = () => {
    if(keyVal === "Enter") {
      onEnter()

    }else if (keyVal === "Del") { 
      onDel()
    }else{
      onSelectLetter(keyVal)
    }
    

  }
  return (
    <div className='key' id={bigKey ? "big" : disabled && "disabled"} 
    onClick={selectLetter}>{keyVal}</div>
  )
}

export default Key