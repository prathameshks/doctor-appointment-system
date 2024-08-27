import React from 'react'
import '../styles/LayoutStyles.css'
import { userMenu, adminMenu } from '../data/data'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'


const Layout = ({ children }) => {
    const location = useLocation();
    const { user } = useSelector(state => state.user)

    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h6>DOC APP</h6>
                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                            <hr />
                            <div className='menu-item'>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to={'/logout'}>Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='header-content'>
                                
                                <Badge count={user?.notification.length}>
                                    <i className='fa-solid fa-bell' ></i>
                                </Badge>
                                <Link to={'/profile'}>{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout