import {React, useState} from 'react';
import {  FaStar } from 'react-icons/fa';


const Rating = (props) => {
    const [rating,setRating] = useState(null);
    const  [hover,setHover] = useState(null);


    const handleChange = (e) =>{
        const { target } = e;
        const { name, value } = target;
    
        console.log(name , value);
      }

    return (
        <div className='flex cursor-hand'>
           {[...Array(5)].map((star,index)=>{
            
            const currentRating = index + 1;
            
            return(
                <label> 
                    <input className='hidden' type="radio" 
                        name={props.name} 
                        value={currentRating} 
                        onClick={(e) => {handleChange(e); setRating(currentRating)}}
                        />
                        <FaStar
                         className= {`${currentRating <= (hover || rating) ? " text-amber-600" : " text-slate-400"  } cursor-pointer`}
                         size={30}
                         onMouseEnter={() => setHover(currentRating)}
                         onMouseLeave={() => setHover(null)}
                         />
                 </label>
            )

           })} 
        </div>
    );
}

export default Rating;
