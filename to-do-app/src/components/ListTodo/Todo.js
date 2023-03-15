import { Button } from 'antd';
import React from 'react';

export default function Todo(props) {
  return (
    <div
      style={{
        color: 'yellow',
        background: 'orange',
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        display: 'flex',
      }}
    >
      <div style={{ flex: 10 }} contentEditable="true" onBlur={(e)=>props.handleEdit(e.target.innerText,props.index)}>{props.desc}</div>
      <Button
        style={{
          fontSize: '20px',
          flex: 1,
          alignSelf: 'end',
          color: 'red',
        }}
        onClick={()=>{
          console.log(props.onDeleteHandler, 'in delete')
          return props.onDeleteHandler(props.index)
        }}
      >
        Delete
      </Button>
    </div>
  );
}
