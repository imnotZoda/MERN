import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../layouts/AdminSidebar'

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBContainer,
  MDBTextArea,
  MDBFile
} from 'mdb-react-ui-kit';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';

export default function ProductCreate() {

  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required'),

    description: Yup.string()
      .required('Description is required'),

    category: Yup.string()
      .required('Category is required'),

    sell_price: Yup.number()
      .required('Sell price is required')
      .positive('Sell price must be a positive number'),

    cost_price: Yup.number()
      .required('Cost price is required')
      .positive('Cost price must be a positive number'),

    stock_quantity: Yup.number()
      .required('Stock quantity is required')
      .integer('Stock quantity must be an integer')
      .min(0, 'Stock quantity cannot be negative'),

    images: Yup.string()
      .required('Images are required'),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: '',
      description: '',
      category: '',
      sell_price: '',
      cost_price: '',
      stock_quantity: '',
      images: '',
    },
    onSubmit: values => {
      saveData()
    },
  });

  const getCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/category/get/lahat')

      setCategories(data.categories);

    } catch (error) {
      console.error(error);
    }
  }

  const saveData = async () => {
    try {
      const formData = new FormData();
      
      formData.append('name', formik.values.name)
      formData.append('description', formik.values.description)
      formData.append('category', formik.values.category)
      formData.append('sell_price', formik.values.sell_price)
      formData.append('cost_price', formik.values.cost_price)
      formData.append('stock_quantity', formik.values.stock_quantity)

      for (let i = 0; i < formik.values.images.length; i++){
        formData.append('images', formik.values.images[i]);
      }
      const { data } = await axios.post('http://localhost:5000/product/create/', formData,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate('/products/list');
      alert(data.message);
      console.log(data.product)

    } catch (error) {

      alert("error")
      console.error(error)
    }

  }
  useEffect(() => {

    getCategories();

  }, [])

  console.log(categories);

  return (
    <AdminSidebar>
      <MDBContainer>
        <div>
          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <MDBInput name='name' label='Product Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.name}</small>
              )}
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <MDBTextArea name='description' label='Product Description' rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.description}</small>
              )}
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel id="category">Categories</InputLabel>
                  <Select labelId="demo-simple-select-label" id='category' name='category' label="Categories"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                  >
                    {categories.map(category => (
                      <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                    ))}


                  </Select>
                </FormControl>
              </Box>
              {formik.touched.category && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.category}</small>
              )}
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <MDBInput id="sell_price" name="sell_price" type='number' label='Sell Price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sell_price}
              />
              {formik.touched.sell_price && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.sell_price}</small>
              )}            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <MDBInput id="cost_price" name="cost_price" type='number' label='Cost Price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cost_price}
              />
              {formik.touched.cost_price && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.cost_price}</small>
              )}            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <MDBFile id="stock_quantity" name="stock_quantity" type='number' label='Stock Quantity'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock_quantity}
              />
              {formik.touched.stock_quantity && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.stock_quantity}</small>
              )}            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingBottom: 15 }}>
            <MDBCol>
              <MDBFile id="images" name="images" style={{ marginBottom: 20 }} label='Upload Image' multiple
                onChange={(e) => {
                  formik.setFieldValue("images", e.target.files)

                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.images && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.images}</small>
              )}             </MDBCol>
          </MDBRow>


          <MDBBtn onClick={formik.handleSubmit} className='mb-4' type='submit' block>
            Submit
          </MDBBtn>

        </div>
      </MDBContainer>
    </AdminSidebar>

  )
}
