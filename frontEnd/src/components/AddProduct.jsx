import React, { useState } from 'react';


const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const isValid = (str) => {
    return str.toLowerCase().includes('sex');
  };

  const addProductShow = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }





    const userId = JSON.parse(localStorage.getItem('user'));
    let result = await fetch('http://localhost:5000/add', {
      method: 'post',
      body: JSON.stringify({ name, price, company, category, userId }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    if (result) {
      alert('Product added Successfully')
    }
    console.warn(result);
  };

  return (
    <div className="product">
      <h1 className="heading">Add Product</h1>

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
      <button className="buttonStyle" onClick={addProductShow}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
