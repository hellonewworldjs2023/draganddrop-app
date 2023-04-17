import React from 'react'

const CreateCard = ({onClick,handleChange,e}) => {

  // const handlechange = (e) => {
  //   var inputtext = e.target.value;
  //   console.log(inputtext);
  // }

  return (
    <>
      <h3>Cardを作成する</h3>
      <form>
        <input className='card-name' type="text" onChange={handleChange}></input>
        <button onClick={onClick}>追加</button>
      </form>
    </>
    



  )
}

export default CreateCard