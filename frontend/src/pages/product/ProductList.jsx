import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../layouts/AdminSidebar'
import axios from 'axios'

//dataable
import { MDBDataTable } from 'mdbreact';
import { Button, Hidden } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const BASE_URL = "http://localhost:5000/product/all"

export default function ProductList() {


  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const tableData = products.map(product => (
    {
      image: (
        <div style={{ display: 'flex', gap: '5px' }}>
          {product.images.slice(0, 3).map(image => (
            <img 
              key={image._id} 
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
              src={image.url}
              alt={product.name}
              onClick={() => window.open(image.url, '_blank')}
            />
          ))}
          {product.images.length > 3 && (
            <span style={{ color: '#007bff', cursor: 'pointer' }}>+{product.images.length - 3}</span>
          )}
        </div>
      ),
      name: product.name,
      description: product.description,
      cost_price: product.cost_price,
      category: product.category.name,
      sell_price: product.sell_price,
      stock_quantity: product.stock_quantity,
      action: (
        <div>
          <Button onClick={() => navigate(`/products/update/${product._id}`)} color='success' size='small'>
            Edit
          </Button>
          <Button onClick={() => deleteProduct(product._id)} color='error' size='small'>
            Delete
          </Button>
        </div>
      )
    }
  ));
  

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await axios.delete(`http://localhost:5000/product/delete/${id}`);
      alert("Deleted");

      getProducts();
    }
  }

  const data = {
    columns: [
      {
        label: 'Images',
        field: 'image',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Cost Price',
        field: 'cost_price',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Category',
        field: 'category',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Sell Price',
        field: 'sell_price',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Stocks',
        field: 'stock_quantity',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100
      },
    ],
    rows: tableData
  }



  useEffect(() => {

    getProducts();

  }, [])

  const getProducts = async () => {

    const { data } = await axios.get(BASE_URL);
    setProducts(data.products);
  }

  return (
    <AdminSidebar>

      <MDBDataTable
        // exportToCSV={true}
        stripped
        bordered
        hover
        data={data}
      />

    </AdminSidebar>
  )
}