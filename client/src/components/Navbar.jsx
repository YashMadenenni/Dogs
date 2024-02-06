import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import dog from "../assets/dog-icon.svg";

const Navbar = () => {

    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
  
    return (
      <nav className={`${styles.paddingX} w-11/12  flex items-center py-5 fixed top-1 right-5 sm:right-14 z-20 rounded-full bg-black`}>
        <div className=' w-full flex justify-between items-center max-w-7xl mx-auto'>
          <Link to='/' className='flex items-center gap-2' onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
            <img src={dog} alt="logo" className='w-12 h-12 object-contain' />
          </Link>

          <ul className='list-none hidden md:flex flex-row gap-10'>
            {navLinks.map((Link) => (
              <li
              key={Link.id}
              className={`${
                active === Link.title? "text-[#F3BD3C]": "  text-white"
              } hover:text-[#F3BD3C] text-[18px] font-medium cursor-pointer`} onClick={()=> setActive(Link.title)}>
                <a href={`#${Link.id}`}>{Link.title}</a>
              </li>
            ))}
          </ul>
  
          <div className='md:hidden flex flex-1 justify-end items-center' >
            <img src={toggle? close:menu} alt="menu" className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() =>{ setToggle(!toggle)}} />
  
            <div className={`${!toggle ? 'hidden':'flex'} p-6 
            bg-gradient-to-r from-amber-500 to-orange-400
             absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className='list-none flex sm:flex justify-end items-start flex-col gap-4'>
            {navLinks.map((Link) => (
              <li
              key={Link.id}
              className={`${
                active === Link.title? "text-[#F3BD3C]": " text-white"
              } font-poppins text-[16px] font-medium cursor-pointer`} 
              onClick={()=> {setToggle(!toggle);
              setActive(Link.title)}}>
                <a href={`#${Link.id}`}>{Link.title}</a>
              </li>
            ))}
          </ul>
            </div>
  
          </div>
  
        </div>
      </nav>
    )
  }

export default Navbar;
