import React from 'react'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
import { useDispatch } from 'react-redux';
import { addQuantity, reduceQuantity, removeFromCart } from '../state/cartSlice';

export default function CartCard({item}) {

    const dispatch = useDispatch();

    const removeItemFromCart = () => {
        dispatch(
            removeFromCart(item._id)
        
        )
        console.log(item)
    }

  return (
    <>
    <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                    <MDBCol md="2" lg="2" xl="2">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                        fluid className="rounded-3" alt="Cotton T-shirt" />
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="3">
                      <MDBTypography tag="h6" className="text-muted">
                        {item.category.name}
                      </MDBTypography>
                      <MDBTypography tag="h6" className="text-black mb-0">
                        {item.name}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                      <MDBBtn color="link" className="px-2" onClick={() => 
                        dispatch(
                        reduceQuantity(item._id)
                        )
                      }>
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>

                      <MDBInput disabled = {true} type="number" min="0" value={item.quantity} size="sm" />

                      <MDBBtn color="link" className="px-2" onClick={() => 
                        dispatch(
                            addQuantity(item._id)
                        )
                      }>

                        <MDBIcon fas icon="plus" />
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                      <MDBTypography tag="h6" className="mb-0">
                        PHP{item.sell_price * item.quantity}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                      <a href="#!" className="text-muted" onClick={removeItemFromCart}>
                        <MDBIcon fas icon="times"/>
                      </a>
                    </MDBCol>
                  </MDBRow>

                  <hr className="my-4" />
    </>
  )
}
