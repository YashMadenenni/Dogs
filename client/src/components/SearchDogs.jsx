import { React, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { SectionWrapper } from "../hoc";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { motion } from "framer-motion";

import { staggerContainer } from "../utils/motion";
import { styles } from "../styles";

const SearchDogs = ({reloadChild}) => {

const [dogs, setDogs] = useState(null);
const [limit, setLimit] = useState(156);
const [value, setValue] = useState(null);


useEffect(() => {

    // console.log(reloadChild);
    fetchAllDogs();
      
  },[reloadChild]);

  const fetchAllDogs = () =>{
    fetch('/allDogs', {
        method: "GET",
    })
      .then((res) =>  res.json())
        .then((data) => {  
            // Limiting the display content to the first 10 items
            // const limitDogs = data.slice(0, limit);
            setDogs(data);
            console.log(data); // Log the resolved data
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
  }

const dogOptions = dogs?dogs.map(dog => dog.name):[];

var ComboBox = () => {
    return (
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          handleSearch(newValue);
          setValue(newValue);
        }}
        id="combo-box"
        options={dogOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    );
  }

  var handleSearch =(newValue)=>{
    console.log(newValue);
    var searchResult = dogs.filter( (dog) =>dog.name === newValue);
    setDogs(searchResult);
     newValue?setValue(newValue):fetchAllDogs();
  }
  
  

    return (
        <>
        {
          // reloadChild?reloadChild:!reloadChild &&
           <>       
          {dogs ? (
       
       <motion.section
       variants={staggerContainer()}
       initial='hidden'
       whileInView='show'
       viewport={{ once: true, amount: 0.1}}
       className={`${styles.padding} max-w-7xl mx-auto relative z-0  flex flex-col`}
     >
       <span className='hash-span' id="search">
         &nbsp; 
       </span>
       <div className=" ms-auto ">
       <ComboBox />
       </div>
       <ul className=" flex flex-wrap justify-between gap-1 ">
         {dogs.length > 0 ?dogs.map((dog, index) => (
           <li className={`${index>limit? "hidden": ""}`} key={index} >
            <Link className="flex flex-wrap my-3  rounded-3xl bg-gradient-to-r from-amber-500 from-30% via-orange-400 to-yellow-600
           hover:bg-gradient-to-br" to={`/search/${dog._id}`}>
                  
           <img className="h-16 w-16 object-fit rounded-3xl" src={dog.image_src } alt={dog.name}  />
           <span className="text-white text-center font-medium text-sm w-28 py-2 mx-2">{dog.name} 
           </span>
            </Link>
           </li>
         )):
         (
           <li>
              <Link className="flex flex-wrap my-3  rounded-3xl bg-gradient-to-r from-amber-500 from-30% via-orange-400 to-yellow-600
             hover:bg-gradient-to-br" to={`/search/${dogs._id}`}>
                    
             <img className="h-16 w-16 object-fit rounded-3xl" src={ dogs.image_src} alt={dogs.name}  />
             <span className="text-white text-center font-medium text-sm w-28 py-2 mx-2">{dogs.name} 
             
             </span>)
             </Link>
             </li>
         )}
       </ul>
</motion.section>
       
     ) : (
       <p>Loading...</p>
     )}
       </>
        }
        </>
    
    );
}

export default SearchDogs
