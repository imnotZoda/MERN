import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import { auth } from '../utils/firebase';

export default function AdminSidebar({ children }) {

    const navigate = useNavigate();

    const logout = () => {
        auth.signOut();
        navigate ('/login');
    }

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '1000vh' }}>
            <Sidebar>
                <Menu>
                    <SubMenu label="Product">
                        <MenuItem onClick={() => navigate("/products/list")}> List All</MenuItem>
                        <MenuItem onClick={() => navigate("/products/create")}> Create New </MenuItem>
                    </SubMenu>

                    <SubMenu label="Category">
                        <MenuItem onClick={() => navigate("/categories/list")} > List All</MenuItem>
                        <MenuItem onClick={() => navigate("/categories/create")}> Create New </MenuItem>
                    </SubMenu>

                    <MenuItem onClick={() => navigate("/orders")}> Orders </MenuItem>
                    <MenuItem 
                        onClick={logout}
                    >Logout </MenuItem>

                    <MenuItem> Calendar </MenuItem>

                </Menu>
            </Sidebar>
            <main className = 'flex-grow-1' style={{ padding: 10, oeverflow: 'hidden'}}>
                {children}
            </main>

        </div>
    )
}
