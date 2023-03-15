import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';

export default function UserList() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [sorter, setSorter] = useState({
    sort: 1,
    sortBy: 'firstName',
  });
  const [dataSource, setDataSource] = useState(false);

  const showMessage = (data) => {
    messageApi.open({
      type: data.type,
      content: data.message,
    });
  };
  const getUserData = async (pagination, sorter) => {
    setLoading(true);
    setPagination({
      pageSize: pagination.pageSize,
      current: pagination.current,
      total: pagination.total,
    });
    setSorter(sorter);
    try {
      const url = `http://localhost:3002/user?page=${pagination.current}&limit=${pagination.pageSize}&sort=${sorter.sort}&sortBy=${sorter.sortBy}`;
      const res = await axios.get(encodeURI(url));
      setDataSource(res.data.data.docs);
      setPagination({ ...pagination, total: res.data.data.totalDocs });
    } catch (error) {
      showMessage({
        type: 'error',
        message: error.response ? error.response.data.message : error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData(pagination, sorter);
  }, []);

  const onEditHandler = (record) => {
    setOpen(true);
    form.setFieldsValue({
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      dateOfBirth: dayjs(record.dateOfBirth),
      mobile: record.phoneNumber,
    });
    setEditId(record._id);
  };

  const onDeleteHandler = (record) => {
    Modal.confirm({
      title: 'Delete',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: `Are you sure you want to delete ?`,
      okText: 'Yes delete',
      onOk: () => deleteHandleOnOk(record),
      cancelText: 'Cancel',
      okButtonProps: { 'data-testid': 'CONFIRMDEL' },
      cancelButtonProps: { 'data-testid': 'cancelButton' },
    });
  };

  const deleteHandleOnOk = async (record) => {
    try {
      const res = await axios.delete('http://localhost:3002/user', {
        data: { id: record._id },
      });
      showMessage({ type: 'success', message: res.data.message });
      getUserData(pagination, sorter);
    } catch (error) {
      showMessage({
        type: 'error',
        message: error.response ? error.response.data.message : error.message,
      });
    }
  };

  const onEditFinishHandler = async (values) => {
    const payload = {
      ...values,
      id: editId,
      dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
    };
    try {
      const res = await axios.put('http://localhost:3002/user', payload);
      showMessage({ type: 'success', message: res.data.message });
      getUserData(pagination, sorter);
    } catch (err) {
      showMessage({
        type: 'success',
        message: err.response ? err.response.data.message : err.message,
      });
    } finally {
      //do loading stuff here
      setOpen(false);
    }
  };

  const onTableChange = (pagination, filter, sorter) => {
    const newSorter = {
      sortBy: 'firstName',
      sort: sorter.order === 'ascend' ? 1 : -1,
    };
    getUserData(pagination, newSorter);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return <Tag>{`${record.firstName} ${record.lastName}`}</Tag>;
      },
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'DOB',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (_, record) => {
        return moment(record.dateOfBirth).format('YYYY-MM-DD');
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '8%',
      fixed: 'right',
      render: (_action, record) => (
        <>
          <Space size="middle" direction="horizontal">
            <Tooltip title="Edit">
              <Button
                type="primary"
                ghost
                size="large"
                shape="circle"
                htmlType="button"
                data-testid="EDITBTN"
                onClick={() => onEditHandler(record)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="primary"
                onClick={() => onDeleteHandler(record)}
                ghost
                size="large"
                shape="circle"
                htmlType="button"
                data-testid="DELETEBTN"
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        </>
      ),
      onCell: () => ({
        onClick: (e) => e.stopPropagation(),
      }),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        rowKey="_id"
        dataSource={dataSource}
        columns={columns}
        onChange={onTableChange}
        pagination={pagination}
      />
      <Modal
        title="Edit user"
        centered
        open={open}
        footer={[
          <Button
            htmlType="submit"
            type="primary"
            key="submit"
            form="editUserForm"
            data-testid="okButton"
            loading={loading}
          >
            Submit
          </Button>,
          <Button onClick={(item) => setOpen(false)}>Cancel</Button>,
        ]}
        onCancel={() => setOpen(false)}
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 10,
          }}
          name="editUserForm"
          onFinish={onEditFinishHandler}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="First name" />
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
            <DatePicker
              placeholder="Date of birth"
              style={{
                width: '100%',
              }}
              format="YYYY-MM-DD"
              // defaultValue={moment().format('YYYY-MM-DD')}
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
            rules={[
              { required: true, message: 'This field is required' },
              {
                pattern: new RegExp(
                  /^(?=(?:\+|0{2})?(?:(?:[(\-)./ \t\f]*\d){7,10})?(?:[-./ \t\f]?\d{2,3})(?:[-\s]?[ext]{1,3}[-./ \t\f]?\d{1,4})?$)((?:\+|0{2})\d{0,3})?(?:[-./ \t\f]?)(\(0\d[ ]?\d{0,4}\)|\(\d{0,4}\)|\d{0,4})(?:[-./ \t\f]{0,2}\d){3,8}(?:[-\s]?(?:x|ext)[-\t\f ]?(\d{1,4}))?$/
                ),
                message: 'Please enter valid mobile number',
              },
            ]}
          >
            <Input placeholder="Mobile number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
