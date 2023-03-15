import { Button, DatePicker, Form, Input, message } from 'antd';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';
export default function AddUser() {
  const [messageApi, contextHolder] = message.useMessage();


  const showMessage = (data) => {
    messageApi.open({
      type: data.type,
      content: data.message,
    });
  };
  const onFinishHandler =async (values) => {
    const payload ={
      ...values,
      dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
    }
    try{
      const res = await axios.post('http://localhost:3002/user',payload);
      console.log(res);
      showMessage({type:'success',message:res.data.message})
      window.location.href='/user'
    } catch(err){
      showMessage({type:'error',message: err.response ? err.response.data.message : err.message})
    }
    finally{
      //do loading stuff here
    }
  };
  return (
    <>
    {contextHolder}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        onFinish={onFinishHandler}
        initialValues={
          {
            dateOfBirth:dayjs().add(-18,'years')
          }
        }
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="First name"  />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          label="DOB"
          name="dateOfBirth"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <DatePicker placeholder="Date of birth" style={{
        width: '100%',
      }}
      disabledDate={(current) => {
        return moment().add(-18, 'years')  <= current
        }}
      />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          type="email"  
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, message: 'This field is required' },
          {
            pattern: new RegExp(
              /^(?=(?:\+|0{2})?(?:(?:[(\-)./ \t\f]*\d){7,10})?(?:[-./ \t\f]?\d{2,3})(?:[-\s]?[ext]{1,3}[-./ \t\f]?\d{1,4})?$)((?:\+|0{2})\d{0,3})?(?:[-./ \t\f]?)(\(0\d[ ]?\d{0,4}\)|\(\d{0,4}\)|\d{0,4})(?:[-./ \t\f]{0,2}\d){3,8}(?:[-\s]?(?:x|ext)[-\t\f ]?(\d{1,4}))?$/
            ),
            message: 'Please enter valid mobile number',
          }]}
        >
          <Input placeholder="Mobile number"  />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
}
