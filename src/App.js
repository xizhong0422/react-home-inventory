import logo from './logo.svg';
import './App.css';
import AddInventory from './components/addInventory';
import { Form, Button, Table } from "react-bootstrap";
import { useState, createRef, Component } from 'react';
// import { Form, Button, Table} from "antd";

function App() {
  const [products, setProduct] = useState([]);
  const formData = createRef();

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Inventory 1</h1>
        <AddInventory/>
        <h1>Home Inventory 2</h1>
      </header>

      <Form onSubmit={addProduct} ref={formData}>
        <Form.Group controlId="formBasicProductName">
            <Form.Label>Product Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Name" name="product_name"/>
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" placeholder="Price" name="price"/>
        </Form.Group>

        <Form.Group controlId="formBasicQty">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control type="number" placeholder="How many: qty" name="qty"/>
        </Form.Group>

        <Button variant="primary" type="submit">
            Add to Inventory
        </Button>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>Index</th>
                <th>Product Name:</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {
                products.map((item, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.product_name}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                            <td>
                                <Button variant="success" onClick={event=>increaseQty(event)} value={index}>+</Button>
                                <Button variant="danger" onClick={event => decreaseQty(event)} value={index}>-</Button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </Table>
      

    </div>
  );
}

export default App;
