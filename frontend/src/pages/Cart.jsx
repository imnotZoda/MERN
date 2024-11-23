import React, { useState } from 'react'
import UserNavBar from '../layouts/UserNavBar'
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
import CartCard from '../components/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../assets/constant';
import axios from 'axios';
import { removeAllFromCart } from '../state/cartSlice';

const SHIPPING_METHODS = [
  { value: "JNT", label: "JNT" },
  { value: "Go Go Express", label: "Go go Express" },
  { value: "Door to Door", label: "Door to Door" }

]

const PAYMENT_METHODS = [
  { value: "GCASH", label: "GCASH" },
  { value: "CASH ON DELIVERY", label: "CASH ON DELIVERY" },
  { value: "PAYMAYA", label: "PAYMAYA" }
]

export default function Cart() {

  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)
  const { access_token } = useSelector(state => state.auth)
  const [shippingMethod, setShippingMethod] = useState("JNT")
  const [shippingAddress, setShippingAddress] = useState("Taguig")
  const [paymentMethod, setpaymentMethod] = useState("Gcash")
  const [contact, setContact] = useState("09959846482")
  const [loading, setLoading] = useState(false)

  const checkout = async () => {
    setLoading(true)

    const order = {
      order_items: cartItems.map(item => {
        return {
          product: item._id,
          quantity: item.quantity,

        }
      }),
      shipping_method: shippingMethod,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      contact_number: contact,
    }

    try {
      const { data } = await axios.post(`${baseUrl}/order/create`, order, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })
      alert("Order Created!")

      dispatch(
        removeAllFromCart()
      )

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const computetotal = () => {

    const totalPrice = cartItems.reduce((total, product) => {
      const totalProductPrice = product.sell_price * product.quantity;
      return total + totalProductPrice
    }, 0)
    return totalPrice;
  }
  return (
    <>

      <UserNavBar />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-muted">
                            items {cartItems.length}
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />

                        {cartItems.map(item => (
                          <CartCard item={item} />
                        ))}


                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <MDBCardText tag="a" href="#!" className="text-body">
                              <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                              to shop
                            </MDBCardText>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                          Summary
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-uppercase">
                            items {cartItems.length}
                          </MDBTypography>
                          <MDBTypography tag="h5">{computetotal()}</MDBTypography>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Shipping
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            value={shippingMethod}
                          >
                            {SHIPPING_METHODS.map((shipping, index) => (
                              <option key={index} value={shipping.value}>
                                {shipping.label}
                              </option>
                            )
                            )}
                          </select>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          SHIPPING ADDRESS
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput size="lg" label="Enter your address"
                            onChange={(e) => setShippingAddress(e.target.value)}
                            value={shippingAddress}
                          />
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          PAYMENT METHOD
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}
                            onChange={(e) => setpaymentMethod(e.target.value)}
                            value={paymentMethod}
                          >
                            {PAYMENT_METHODS.map((payment, index) => (
                              <option key={index} value={payment.value}>
                                {payment.label}
                              </option>
                            )
                            )}
                          </select>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          CONTACT NUMBER
                        </MDBTypography>

                        <div className="mb-5" >
                          <MDBInput size="lg" label="Enter your Phone Number"
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                          />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total price
                          </MDBTypography>
                          <MDBTypography tag="h5">{computetotal()}</MDBTypography>
                        </div>

                        <MDBBtn disabled={loading} onClick={checkout} color="dark" block size="lg">
                          {loading ? "Processing..." : "Checkout"}
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

    </>

  )
}
