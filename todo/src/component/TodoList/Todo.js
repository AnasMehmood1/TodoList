import React, { useEffect, useState } from 'react'
import "./style.css"
 
// get the local Storage

const getthelocalData = ()=>{
  const list = localStorage.getItem("myTodo");
  if(list){
    return JSON.parse(list)
  }
  else{
    return[]
  }
 
}


const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [edititem ,setEditItem] = useState("")
  const [items, setItems] = useState(getthelocalData());
  const [toggleButton ,setToggleButton] = useState(false)


  //  add the item function
  const addItem = () => {
    if (!inputData) {
      alert("please fill data");
   }
    else if( inputData && toggleButton){
      setItems(items.map((curElem)=>{
        if(curElem.id === edititem)
        {
          return {...curElem,name:inputData}
        }
        return curElem
      }))
      setInputData("");
      setEditItem("")
      setToggleButton(false)
    }
  
    else{
      const mynewInputData ={
        id:new Date().getTime().toString(),
        name:inputData,
      }
      setItems([...items, mynewInputData]);
      setInputData("")
    }

  }

  // Edit Item
    
  const editItem = (index) =>{
    const edit_todo = items.find((curElem)=>{
      return curElem.id === index
    })
    setInputData(edit_todo.name);
    setEditItem(index)
    setToggleButton(true)
  }



  //  how to delete item section
   const deleteitem = (index)=>{
    const update = items.filter((curElem)=>{
        return curElem.id !==  index
    })
    setItems(update)
   }

  //  Remove all items functon
     const removeall = ()=>{
      setItems([])
     }
 
//  adding localStorage

useEffect(()=>{
  localStorage.setItem("myTodo", JSON.stringify(items))
},[items])



       
  return (
    <>
      <div className="main-container">
        <div className="container">
            <figure>
            <img src="./image/todo.svg" alt="image" className='image' />
            <figcaption><h3>Add Your List Here</h3></figcaption>
            </figure>
            <div className="additem">
                <input type="text" placeholder='✍Add item' className='form-control'
                value={inputData}
                onChange={(event)=> setInputData(event.target.value)}
                 />
          {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
          ):  <i className="fa fa-plus add-btn" onClick={addItem}></i>}
            </div>
            <div className="showitem">
                {items.map((curElem,index)=>{
                    return (
                        <div className="eachitem" key={index}>
                    <h3>{curElem.name}</h3>
                     <div className="icon">
                     <i className="fa fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                <i className="fa fa-trash-alt add-btn"onClick={()=>{deleteitem(curElem.id)}}  ></i>
                     </div>
                </div>
                    )
                })}
            </div>
            <div className="showitem">
                <button className="btn" data-text="Remove All" onClick={
                    removeall
                }>CHECK LIST</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
