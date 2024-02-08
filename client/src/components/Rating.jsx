import {React, useState} from 'react';
import {  FaPaw } from 'react-icons/fa';

const Rating = ({ name, value, setValue }) => {
    const [rating,setRating] = useState(null);
    const  [hover,setHover] = useState(null);


    const handleChange = (e) => {
        const { value: newValue } = e.target;
        setValue(newValue);
      };

    return (
        <div className='flex cursor-hand gap-2'>
           {[...Array(5)].map((star,index)=>{
            
            const currentRating = index + 1;
            
            return(
                <label key={index}> 
                    <input className='hidden' type="radio" 
                        name={name} 
                        value={currentRating} 
                        checked={currentRating === value}
                        onChange={(e) => {handleChange(e); setRating(currentRating)}}
                        />
                        <FaPaw
                         className= {`${(currentRating) <= (hover || rating) ? " text-amber-600" : " text-slate-400"  } cursor-pointer`}
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
