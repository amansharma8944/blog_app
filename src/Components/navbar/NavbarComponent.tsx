import React, { useEffect, useRef } from 'react'

import { useNavigate} from 'react-router-dom';
import PopDrawer from '../PopDrawer/PopDrawer';

const NavbarComponent = () => {




  
 
    const nav=useNavigate();



  return (
    <nav className='bg-[rgba(0,0,0,0.3)]  h-[8vh] flex border-b-[1px]'>

<div className='w-[50%] h-full flex justify-center items-center text-[#d38f42] text-[10px] md:text-[15px]' >
  {/* <p className='text-[15px] mr-[25px]'>BLOG</p> */}
  <img src="/aman.svg.svg" className=' mr-[25px] w-[30px] pl-[12px] md:pl-[0px]' alt="" />
  <p 
  className='mr-[25px] font-[600]'
  
  onClick={()=>{
    nav("/")
  }}>Home</p>

<button
onClick={()=>{
  nav("/createBlog")
}}
className='mr-[25px] font-[600] '
>Create Vlog</button>
    
</div>

<div className='w-[50%] h-full flex justify-end mr-[15px] items-center' >
 
<div >
  <PopDrawer />
</div>
    
</div>
</nav>
  )
}

export default NavbarComponent