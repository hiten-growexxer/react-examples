import { Button, Form, Input } from 'antd';
import React from 'react';

export default function AddTodo(props) {
  const onFinishHandler =(e)=>{
    props.setTodo(prev=>[...prev,e.item])
  }
  return (
    <div style={{
        background:'wheat',
        height:'15vh',
        display:'flex',
        justifyContent: 'center',
        }}>
      <Form
        name="basic"
        onFinish={onFinishHandler}
      >
        <Form.Item label="item" name="item">
          <Input/>
        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit" >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
