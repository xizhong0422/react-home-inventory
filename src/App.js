import logo from './logo.svg';
import './App.css';
import AddInventory from './components/addInventory';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Inventory created on Reactjs</h1>
        <AddInventory/>
      </header>

    </div>
  );
}

export default App;