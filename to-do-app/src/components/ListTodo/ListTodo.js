import React from 'react'
import Todo from './Todo'

export default function ListTodo(props) {
  console.log(props, 'in ListTodo')
  const onDeleteHandler = (e)=>{
    props.setTodo(prev=>prev.filter((v,i)=>i!==e))
  }
  const handleEdit = (text,index)=>{
    console.log(text, index, 'in handleEdit')
    props.setTodo(prev=>{
      const arr=prev;
      arr[index]=text;
      return arr;
    })
  }
  return (
    <div style={{overflow:'scroll'}}>
      {
        props.todo.map((todo,index)=>{
          return <Todo key={index} desc={todo} index={index} onDeleteHandler={onDeleteHandler} handleEdit={handleEdit}/>
        })
      }
    </div>
  )
}
