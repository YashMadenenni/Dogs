import { React, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { SectionWrapper } from "../hoc";

const SearchDogs = () => {

const [dogs, setDogs] = useState(null);
const [limit, setLimit] = useState(121);

useEffect(() => {
   
    fetch('/allDogs', {
        method: "GET",
    })
      .then((res) =>  res.json())
        .then((data) => {  
            // Limiting the display content to the first 10 items
            const firstTenDogs = data.slice(0, limit);
            setDogs(firstTenDogs);
            console.log(data); // Log the resolved data
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      
  }, [limit]);

    return (
        <>
           {dogs ? (
        <ul className=" flex flex-wrap justify-between gap-1 ">
          {dogs.map((dog, index) => (
            <li key={index} >
             <Link className="flex flex-wrap my-3  rounded-3xl bg-gradient-to-r from-amber-500 from-30% via-orange-400 to-yellow-600
            hover:bg-gradient-to-br" to={`/search/${dog._id}`}>
                   
            <img className="h-16 w-16 object-fit rounded-3xl" src={dog.image_src} alt="" srcset="" />
            <span className="text-white text-center font-medium text-sm w-28 py-2 mx-2">{dog.name} 
            {/* <br />
            
            <i className=" font-normal pt-5">
                {dog.breed}
            </i> */}
            </span>
             </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
        </>
    );
}

export default SectionWrapper(SearchDogs,"search");
