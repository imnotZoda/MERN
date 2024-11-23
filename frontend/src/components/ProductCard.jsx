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
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../state/cartSlice';


export default function ProductCard({product}) {

    const dispatch = useDispatch();
    const {cartItems } =useSelector(state => state.cart)

    const addProductToCart = () => {
        dispatch(
            addToCart({
                ...product,
                quantity: 1,})
        )
    }
    console.log(cartItems)
  return (
    <MDBCard style={{ borderRadius: "15px", maxWidth: 300 }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <MDBCardImage
                src= {product.images[0].url}
                fluid
                className="w-100"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  height: "200px", 
                  minWidth: "300px",
                  objectFit: 'cover',
                }}
              />
              <a href="#!">
                <div className="mask"></div>
              </a>
            </MDBRipple>
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <a href="#!" className="text-dark">
                      {product.name}
                    </a>
                  </p>
                  <p className="small text-muted">{product.category.name}</p>
                </div>
                <div>
                  <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                  </div>
                  <p className="small text-muted">Rated 4.0/5</p>
                </div>
              </div>
            </MDBCardBody>
            <hr class="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <p>
                  <a href="#!" className="text-dark">
                    PHP{product.sell_price}
                  </a>
                </p>
                <p className="text-dark"> Stocks: {product.stock_quantity} </p>
              </div>
              {/* <p className="small text-muted">VISA Platinum</p> */}
            </MDBCardBody>
            <hr class="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                <MDBBtn color="primary"style={{width: '100%'}}
                onClick={addProductToCart}> 
                Buy now
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
  )
}
