import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../Assets/logo.png'
import cart_icon from '../../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../../Assets/nav_dropdown.png'

const Navbar = () => {

  const [menu,setMenu] = useState('Shop')
  const {getTotalCartItems,setCartItems,getDefaultCart} = useContext(ShopContext)
  const menuRef = useRef()
  const navigate = useNavigate()

  

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const handleLogout=()=>{
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
      setCartItems(getDefaultCart())
      navigate('/login')
      
    }
    else{
      alert('You are not logged in.');
    }
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img  src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("Shop")}}><Link style={{textDecoration:'none',color:'inherit'}} to={'/'}>Shop</Link>{menu==='Shop' ? <hr /> : <></>} </li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none',color:'inherit'}} to={'/mens'}>Men</Link> {menu==='mens' ? <hr /> : <></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none',color:'inherit'}} to={'/womens'}>Women</Link> {menu==='womens' ? <hr /> : <></>}</li>
        <li onClick={()=>{setMenu("Kids")}}><Link style={{textDecoration:'none',color:'inherit'}} to={'/kids'}>Kids</Link> {menu==='Kids' ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
       {localStorage.getItem('token') ? <button onClick={handleLogout}>Logout</button> 

       :

       <Link  to={'/login'}><button style={{cursor:'pointer'}}>Login</button></Link>
       
      }
       
       <Link to={'/cart'}> <img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
