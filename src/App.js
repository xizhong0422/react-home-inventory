import logo from './logo.svg';
import './App.css';
import AddInventory from './components/addInventory';
import { useState, createRef, useRef, useEffect, useContext } from 'react';
import { Form, Button, Divider, Table, Input, Select, Space, Tooltip, Typography, Upload, InputNumber, DatePicker, message, Popconfirm } from "antd";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


function App() {
  const initialProducts = JSON.parse(localStorage.getItem('products')) || [];
  const [products, setProduct] = useState(initialProducts);
  
  const formData = createRef();
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  let imageElement;

  const createImageElement = (imageUrl) => {
    const img = document.createElement('img');
    img.src = imageUrl;
    return img;
  };

  const getPhoto = (base64) => {
    var base64Parts = base64.split(",");
    var fileFormat = base64Parts[0].split(";")[1];
    var fileContent = base64Parts[1];
    var file = new File([fileContent], "product image", {type: fileFormat});
    console.log("file is: ", file);
    return file;
 }
  
  //Function for form submission
  const onFinish = (formValue) => {
    console.log('Received values of form: ', formValue);
    imageElement = formValue.itemImage ? createImageElement(URL.createObjectURL(formValue.itemImage.file)) : null;
    console.log("image element is: ", imageElement);//对的
    const reader = new FileReader();
    let img64; 
    if (formValue.itemImage) { 
        reader.onload = function(e) {
            img64 = e.target.result; //correct
            // console.log("img64 is: ", img64);
            localStorage.setItem(formValue.itemName, img64);
        }
        reader.readAsDataURL(formValue.itemImage.file);
    }    
    const newProduct = {
      productName: formValue.itemName,
      productLocation: formValue.room,
      productQuantity: Number(formValue.itemQuantity),
      productPrice: Number(formValue.itemPrice),
      productMaintenanceDate: formValue.maintenanceDate ? formValue.maintenanceDate.format('YYYY-MM-DD') : null,
      productImage: formValue.itemImage ? URL.createObjectURL(formValue.itemImage.file) : null,
      
      // productImage: formValue.itemImage.file ? img64 : null,
    } 
    console.log("new product entered is: ", newProduct);
    setProduct([...products, newProduct]); 
    message.success('Item added successfully');
    form.resetFields();
  }; 

  useEffect(() => {
    // Retrieve products from local storage when the component mounts
    const storedProducts = localStorage.getItem('products');

    if (storedProducts) {
      setProduct(JSON.parse(storedProducts));
    }
  }, []); //only run once

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]); //runs whenever products change

  const clearLocalStorage = () => {
    localStorage.removeItem('products');
    setProduct([]);
    localStorage.clear();
  };

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileUploadProps = {
    onChange: (info) => {
      // If there's already an upload process going on, don't do anything
      if (!uploading) {
        setUploading(true); // Begin the upload process
  
        // Set a timeout to simulate a delay
        setTimeout(() => {
          // Perform your logic like updating fileList only after some time has passed
          setFileList(info.fileList);
  
          // Once the state is updated, reset the uploading status
          setUploading(false);
        }, 1000); // Delay in ms, here it's set to 1000ms or 1 second
      }
    }
  }

  //funtion for rooms
  let index = 0;
  const [rooms, setRooms] = useState(['Living room', 'Kitchen', 'Bedroom 1', 'Bedroom 2', 'Basement', 'Garage', 'Garden']); 
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

  //form
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleDelete = (key) => {
    // console.log("key is: ", key);
    const data = products.filter((item, index) => index !== key);
    // console.log("removed list is: ", data);
    setProduct(data);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    { title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    { title: 'Price (USD)',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    { title: 'Item Location',
      dataIndex: 'location',
      filters: rooms.map (room => ({
        text: room,
        value: room,})),
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
    { title: 'Maintenance Expected Date',
    dataIndex: 'maintenanceDate',
    sorter: (a, b) => (
      (a.maintenanceDate && b.maintenanceDate) // Check if both a and b have maintenanceDate field
        ? (
          new Date(...a.maintenanceDate.split('/').reverse()) - 
          new Date(...b.maintenanceDate.split('/').reverse())
        )  // Perform sorting based on maintenanceDate if available
        : 0  // Return 0 if maintenanceDate field is missing or null
    ) 
    },
    { title: "Image",
      dataIndex: "image",
      render: theImageURL => <img alt={""} src={theImageURL} height={80}/> 
    },
    {
      title: 'Relevant Links',
      dataIndex: 'link',
      render: (text, record) => (<a href={record.entry} target="_blank">Content relevant to {record.name}</a>),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) =>
          products.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ): null,
    }, 
  ];

  const tableData = products.map((product, index) => {
    const storedImageData = localStorage.getItem(product.productName);
    let imgsrc;
    if (storedImageData) {
      imgsrc = "data:image/png;base64," + storedImageData;
      // console.log("storedImageData is: ", storedImageData);
    }
    const entryForSearch = `https://www.google.com/search?q=${product.productName}`;
    return {
      key: index,
      name: product.productName,
      location: product.productLocation,
      quantity: product.productQuantity,
      price: product.productPrice ? product.productPrice : null,
      maintenanceDate: product.productMaintenanceDate ? product.productMaintenanceDate : null,
      // image: product.productImage ? product.productImage : null,
      entry: entryForSearch,
      image: storedImageData ? storedImageData : null,
      //localStorage.getItem('products')
    }});
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div className="App">

      <h1>Home Inventory</h1>
      {imageElement}
      
      <Form 
        form={form}
        name="add-item-form"
        onFinish={onFinish}
        layout="horizontal"
        className="add-item-form"
        labelCol={{
        }}
        wrapperCol={{ span: 26, }}
        style={{ maxWidth: "100%", }} >
        <Form.Item label="Item Name">
          <Space>
            <Form.Item name="itemName"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Item name is required',
                },
              ]}
            >
              <Input
                style={{
                  width: 160,
                }}
                placeholder="Input item name"
              />
            </Form.Item>
            <Tooltip title="Input the item name">
              <Typography.Link href="#help">Need Help?</Typography.Link>
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item label="Item Location">
          <Space.Compact>
            <Form.Item
              name="room"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Room Location is required',
                },
              ]}
            >
              <Select
                style={{
                  width: 300,
                }}
                placeholder="Select or enter a location of the item"
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
                        placeholder="Please enter room"
                        ref={inputRef}
                        value={roomName}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button type="text" icon={<PlusOutlined />} onClick={addRoomItem}>
                        Add a room
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


          </Space.Compact>
        </Form.Item>

        <Form.Item label="Quantity"
          name="itemQuantity"
          initialValue="1"
          rules={[
            {
              required: false,
            },
          ]} >
          <InputNumber
            style={{
              width: '100%',
            }} />
        </Form.Item>

        <Form.Item label="Price (USD)"
          name="itemPrice" >
          <InputNumber
            style={{
              width: '100%',
            }} />
        </Form.Item>

        <Form.Item label="Expected Maintenance Date"
          name="maintenanceDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Item Image" name="itemImage">
          <Upload 
          {...fileUploadProps}
          maxCount={1}
          beforeUpload={() => false}
          listType="picture-card"
          accept="image/*"> 
          <PlusOutlined />
          <div style={{ marginLeft: 4 }}>Upload</div>
          </Upload>  
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit" 
          style={{
            backgroundColor: "#134074",
            borderColor: "#FFFFFF",
            borderRadius: "5px",
            borderWidth: "2px",
          }}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={tableData} onChange={onChange} 
        
      />
      
      <Button type="primary" onClick={clearLocalStorage}
          style={{
            backgroundColor: "#134074",
            borderColor: "#ffffff",
            borderRadius: "5px",
            borderWidth: "2px",
          }}>
            Clear Inventory</Button>
    </div>
  );
}

export default App;
