import logo from './logo.svg';
import './App.css';
import AddInventory from './components/addInventory';
// import { Form, Button, Table } from "react-bootstrap";
import { useState, createRef, Component, useRef } from 'react';
import { Form, Button, Divider, Table, Input, Select, Space, Tooltip, Typography } from "antd";
// const {  Button, Form, Table, Input, Select, Space, Tooltip, Typography  } = antd;
// const {  PlusOutlined  } = icons;
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


function App() {
  const [products, setProduct] = useState([]);
  const formData = createRef();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  let index = 0;

  //add product
  const addProduct = (e)=>{
    e.preventDefault();
    //console.log(e.target.product_name.value);
    // const formData = e.target;
    // const newProduct = {
    //     product_name: formData.product_name.value,
    //     price: formData.price.value,
    //     qty: formData.qty.value
    // }
    //console.log(e.target.current)
    const newProduct = {
        product_name: formData.current.product_name.value,
        price: formData.current.price.value,
        qty: Number(formData.current.qty.value)
    }
    //console.log(newProduct);
    setProduct([...products,newProduct]);
    //console.log(products);
  }
  // increment qty value by 1
  const increaseQty = (event)=>{
    //console.log(event.target.value)
    const indexOfArray = event.target.value;
    products[indexOfArray].qty = products[indexOfArray].qty + 1;
    setProduct([...products])
  }
    // decrement qty value by 1
  const decreaseQty = (event)=>{
    const indexOfArray = event.target.value;
    products[indexOfArray].qty = products[indexOfArray].qty - 1;
    setProduct([...products])
  }

  const [rooms, setRooms] = useState(['jack', 'lucy']); //items, setItems
  const [roomName, setRoomName] = useState('');//name, setName
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setRoomName(event.target.value);

  };
  const addRoomItem = (e) => {
    e.preventDefault();
    setRooms([...rooms, roomName || `New item ${index++}`]);
    setRoomName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Inventory 1</h1>
        <AddInventory/>
      </header>

      <h1>Home Inventory 2</h1>

      <Form
        name="complex-form"
        onFinish={onFinish}
        layout="horizontal"
        className="input-form"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }} >
        <Form.Item label="Username">
          <Space>
            <Form.Item
              name="username"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Username is required',
                },
              ]}
            >
              <Input
                style={{
                  width: 160,
                }}
                placeholder="Please input"
              />
            </Form.Item>
            <Tooltip title="Useful information">
              <Typography.Link href="#API">Need Help?</Typography.Link>
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item label="Room 2">
          <Space.Compact>
            <Form.Item
              name={['address', 'province']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Province is required',
                },
              ]}
            >
              <Select
                style={{
                  width: 300,
                }}
                placeholder="custom dropdown render"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: '8px 0',
                      }}
                    />
                    <Space
                      style={{
                        padding: '0 8px 4px',
                      }}
                    >
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={roomName}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button type="text" icon={<PlusOutlined />} onClick={addRoomItem}>
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={rooms.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item
              name={['address', 'street']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Street is required',
                },
              ]}
            >
              <Input
                style={{
                  width: '100%',
                }}
                placeholder="Input street"
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="Room">
          <Space.Compact>
            <Form.Item
              name={['address', 'province']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Province is required',
                },
              ]}
            >
              <Select placeholder="Select province">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={['address', 'street']}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Street is required',
                },
              ]}
            >
              <Input
                style={{
                  width: '100%',
                }}
                placeholder="Input street"
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="BirthDate"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item name="year"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <Input placeholder="Input birth year" />
          </Form.Item>
          <Form.Item name="month"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input placeholder="Input birth month" />
          </Form.Item>
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
}

export default App;
