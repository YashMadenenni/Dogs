import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Dog = () => {
    const {dogID} = useParams();
    const [dog,setDog] = useState(null);

    useEffect(()=>{
        fetch(`/dog/${dogID}`, {
            method: "GET",
        })
          .then((res) =>  res.json())
            .then((data) => {  
                 setDog(data[0])
                 console.log(data[0]); // Log the resolved data
                 console.log(setDog)
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
    },[])

    return (
        <div>
            {dog?`DOG ${dog.name}`:"Loding.."}
        </div>
    );
}

export default Dog;
