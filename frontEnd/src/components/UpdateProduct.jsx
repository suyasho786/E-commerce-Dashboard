import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  // const navigate = Navigate();
  const navigate = useNavigate();
  const { id } = useParams();
  const isValid = (str) => {
    return str.toLowerCase().includes('sex');
  };

  const updateProductShow = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

   
    let result = await fetch(`http://localhost:5000/update/${id}`, {
      method: 'put',
      body: JSON.stringify({ name, price, company, category }),
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    },
    });
    result = await result.json();
    if(result){
      alert('Product Updated Successfully')
      navigate('/');
    }
    console.warn(result);
   
    
  };

  return (
    <div className="product">
      <h1 className="heading">Update Product</h1>
      
      <input
        type="text"
        className="addProductStyle"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
          setError(false); // Clear the error when the user starts typing
        }}
        value={name}
      />
      {error && !name && <span className="invalid-error">Enter valid Name</span>}
      {(name && isValid(name)) && <span className="invalid-error">Enter a valid Name</span>}

      <input
        type="text"
        className="addProductStyle"
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && <span className="invalid-error">Enter valid Price</span>}

      <input
        type="text"
        className="addProductStyle"
        placeholder="Enter Product Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && <span className="invalid-error">Enter valid Category</span>}

      <input
        type="text"
        className="addProductStyle"
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && <span className="invalid-error">Enter valid Company</span>}
      <button className="buttonStyle" onClick={updateProductShow}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
