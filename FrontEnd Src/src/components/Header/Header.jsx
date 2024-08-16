import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'> 
         <h2>Order your Favourite food here</h2>
         <p>"Experience exceptional dining on your train journey with our gourmet food delivery service. Enjoy hot, fresh meals delivered right to your seat, making travel more delightful."</p>
         <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header