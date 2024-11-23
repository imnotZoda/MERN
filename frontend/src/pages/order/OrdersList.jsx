import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../layouts/AdminSidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../assets/constant'
import { Button, fabClasses, TableCell, TableRow } from '@mui/material'
import MUIDataTable from 'mui-datatables'

export default function OrdersList() {
    const [orders, setOrders] = useState([])
    const { access_token } = useSelector(state => state.auth)

    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/order/all`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            setOrders(data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const tableData = orders.map(order => {
        return {
            user: order.user.username,
            order_date: order.createdAt,
            status: order.status,
            action: order,
            order: JSON.stringify(order), // added
        }
    })

    const columns = [
        {// added
            label: 'Order',
            name: 'order',
            options: {
                display: false,
            }
        },// added
        {
            label: 'Ordered Date',
            name: 'order_date',
            options: {
                customBodyRender: (orderDate) => { // added
                    const date = new Date(orderDate);
                    const options = { month: 'short', day: 'numeric', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    return formattedDate;
                }

            }
        },
        {
            label: 'Status',
            name: 'status'
        },
        {
            label: 'Action',
            name: 'action',
            options: {
                customBodyRender: (order) => {
                    if (order.status.toLowerCase() === "pending") {
                        return (
                            <div style={{ display: 'flex', gap: 5 }}>
                                <Button variant='outlined' color='error' size='small'
                                    onClick={() => updateStatus({ id: order._id, status: 'cancelled' })}>
                                    Cancel
                                </Button>
                                <Button variant='outlined' color='success' size='small'
                                    onClick={() => updateStatus({ id: order._id, status: 'confirmed' })}>
                                    Confirm
                                </Button>
                            </div>
                        )

                    } else if (order.status.toLowerCase() === "cancelled") {
                        return (
                            <Button variant='outlined' size='small' disabled={true} >
                                No Action
                            </Button>
                        )
                    } else if (order.status.toLowerCase() === "confirmed") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'on-delivery', id: order._id, })}>
                                Deliver
                            </Button>
                        )
                    }else if (order.status.toLowerCase() === "on-delivery") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'delivered', id: order._id, })}>
                                Delivered
                            </Button>
                        )
                    }else if (order.status.toLowerCase() === "delivered") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'finished', id: order._id, })}>
                                Deliver
                            </Button>
                        )
                    } else {
                        return (
                            <Button variant='outlined' size='small' disabled={true} >
                                No Action
                            </Button>
                        )
                    }

                    
                }
            }
        }


    ]
    const updateStatus = async ({ id, status }) => {
        try {
            const { data } = await axios.post(`${baseUrl}/order/update/status/${id}`, {
                status: status,
            }, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            alert("Order Updated")
            getAllOrders()
        } catch (err) {
            console.log(err)
        }
    }

    console.log(orders)
    return (

        <AdminSidebar>

            <MUIDataTable
                title={"Order List"}
                data={tableData}
                columns={columns}
                option={{
                    responsive: 'standard',
                    filterType: 'multiselect',
                    // selectableRows: 'none',
                    expandableRows: true,
                    renderExpandableRow: (rowData, rowMeta) => {// added
                        const order = JSON.parse(rowData[0]);
                        const orderItems = order.order_items
                        return (
                            <TableRow style={{ flexWrap: 'wrap' }}>
                                <TableCell />
                                {orderItems.map(item => (
                                    <>
                                        <TableCell style={{ minWidth: 'fit-content', }}>
                                            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                                <img src={item.product.images[0].url} width={60} height={60} />
                                                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{ fontWeight: 800 }}>Product:</span> {item.product.name}
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 800 }}>Quantity:</span> {item.quantity}
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 800 }}>Total Price:</span> P{item.quantity * item.product.sell_price}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        )
                    }
                }}

            />

        </AdminSidebar>
    )
}
