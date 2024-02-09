import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaPaw, FaTrash, FaArrowLeft, FaPen } from "react-icons/fa";
import { motion } from "framer-motion";

import { staggerContainer } from "../utils/motion";
// import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { dog7 } from "../assets";
import CreateDog from "./CreateDog";



// import Rating from "./Rating";

const Dog = () => {
  const formRef = useRef();
  const { dogID } = useParams();
  const [dog, setDog] = useState(null);
  const [editDog, setEditDog] = useState(false);

  useEffect(() => {
    fetch(`/dog/${dogID}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDog(data[0]);
        console.log(data[0]); // Log the resolved data
        // console.log(setDog);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dogID, editDog]);

  const getStars = (value) => {
    return (
      <div className="flex gap-4">
        {[...Array(5)].map((star, index) => (
          <FaPaw
            key={index}
            className={`${
              index < value ? "text-amber-600" : "text-slate-400"
            } cursor-pointer`}
            size={30}
          />
        ))}
      </div>
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`/deleteDog/${dogID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.alert("Success!");
          window.location.href = "/";
        } else {
          window.alert("Faild!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(dog)
    setEditDog(true);
  };

  return (
    <>
    
      {dog ? (
        editDog ? (
          
          <CreateDog editDog={dog} isEdit={true} setEditDog={setEditDog} handleDelete={handleDelete}/>
          
        ) : (

          <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.1}} 
        className={` h-screen sm:p-0  sm:w-full max-w-7xl relative z-0 flex `}
      >
        <span className='hash-span' id="dog">
          &nbsp;
        </span>
        <div className="flex sm:flex-row flex-col-reverse m-auto   ">
          
       
        <img
          className=" sm:block hidden  w-34 h-60 mt-auto ms-auto sm:-mb-28 -me-2"
          src={dog7}
          alt="Dog-pointing"
        />
        

        <div className="   relative flex sm:flex-row flex-col  rounded-3xl bg-yellow-300  gap-8 sm:me-auto mx-auto sm:mx-0">
          <img
            name="image"
            id="preview_img"
            className=" h-60 sm:h-96 sm:w-96  object-cover sm:object-cover rounded-3xl"
            src={dog.image_src}
            alt="Dog"
          />

          <form
            ref={formRef}
            // onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:px-6 p-4 sm:p-0 pb-2"
          >
            <label
              className={`${styles.sectionHeadText}  drop-shadow-[9px_0px_5px_#000000a3] text-center `}
            >
              <span>{dog.name}</span>
            </label>

            <label className="flex gap-4 my-3">
              <span className="text-black font-medium mb-2">Dog's Breed</span>
              <span className={`${styles.cardSubText} `}>
                {dog.breed ? dog.breed : "None"}
              </span>
            </label>

            <label className="flex my-3">
              <span className="text-black font-medium w-24">Friendly</span>
              {getStars(dog.friendly)}
            </label>

            <label className="flex my-3">
              <span className="text-black font-medium w-24">Activeness</span>
              {getStars(dog.activeness)}
            </label>

            <label className="flex my-3">
              <span className="text-black font-medium w-24 ">Security</span>
              {getStars(dog.security)}
            </label>

            <div
              className=" flex justify-between bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
           rounded-xl"
            >
              <Link
                to={`/`}
                className="w-fit py-4 px-8 outline-none text-white hover:text-black "
              >
                <FaArrowLeft className="text-[24px] " />
              </Link>

              <button onClick={(e) => handleEdit(e)}>
                <FaPen className="text-[24px] hover:cursor-pointer text-white me-2 hover:text-black " />
              </button>

              <button onClick={(e) => handleDelete(e)}>
                <FaTrash className="text-[24px] hover:cursor-pointer text-white me-2 hover:text-black " />
              </button>
            </div>
          </form>
        </div>
      </div>
      </motion.section>
        )
      ) : (
        <div className="h-screen"> 
          "Loading..."
        </div>
      )}
      
      
    </>
  );
};

export default Dog
