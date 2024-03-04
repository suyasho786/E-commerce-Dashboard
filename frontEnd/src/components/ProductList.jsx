import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    const getToken = ()=>localStorage.getItem('')
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProduct(result);
    }
    // console.warn(products);
    const deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`,
            {
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                method: "Delete"
            }
        );
        result = await result.json();
        // console.warn(result);
        if (result) {
            alert('record deleted')
        }

    }
    const inputSearch =async (event) => {
        let key = event.target.value;
        if(!key){
            getProducts();
        }
        let result = await fetch(`http://localhost:5000/search/${key}`,
        {
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await  result.json();
        if(result)  setProduct(result);
    }
    return (
        <div className="product-list">

            <h1 >Product List</h1>
            <input type="text" placeholder="search" className="searchStyle" onChange={inputSearch}></input>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>

            {

            products.length > 1 ?    products.map((item, index) =>
                    <ul key={item._id}>

                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price + "₹"}</li>
                        <li>{item.category ?? 'Default Category'}</li>
                        <li> <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>

                    </ul>
                ):<h1 >No Result Found </h1>
            }


        </div>
    )
}
export default ProductList;