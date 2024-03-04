import './App.css';
import Nav from './components/Nav.jsx'
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import PrivateComponent from './components/PrivateComponent.jsx';
import AddProduct from './components/AddProduct.jsx';
import ProductList from './components/ProductList.jsx';
import UpdateProduct from './components/UpdateProduct.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element= {<PrivateComponent/>}> 
          <Route path='/' element= {<ProductList/>}></Route>
          <Route path='/add' element= {<AddProduct/>}></Route>
          <Route path='/update/:id' element= {<UpdateProduct/>}></Route>
          <Route path='/logout' element= {<h1> logout Component</h1>}></Route>
          <Route path='/profile' element= {<h1>Product profile Component</h1>}></Route>
          </Route>
          <Route path='/Signup' element = {<Signup/>}></Route>
          <Route path='/Login' element = {<Login/>}></Route>

        </Routes>        
      </BrowserRouter>
      <Footer/>
    </div>
  );
}
export default App;
  
