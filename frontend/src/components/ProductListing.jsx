import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
  } from "mdb-react-ui-kit";

import axios from 'axios'
import { baseUrl } from '../assets/constant';
import ProductCard from './ProductCard';

export default function ProductListing() {


    const [products, setProducts] = useState([]);

    const getProducts = async () => {

        try{

            const { data } = await axios.get (`${baseUrl}/product/all`);
            
            setProducts(data.products);

        }catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        getProducts()

    }, [])

  return (
    <MDBContainer fluid className="my-5">
        <div className = 'd-flex gap-4 flex-wrap justify-content-center'>
        {products.map(product => (
            <ProductCard key={product._id} product = {product} />

        ))}
        </div>
    </MDBContainer>
  )
}
