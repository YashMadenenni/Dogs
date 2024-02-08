import React from "react";
import { useState,useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Compressor from 'compressorjs';
import { Link } from "react-router-dom";
import {  FaArrowLeft, FaTrash } from "react-icons/fa";


import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Rating from "./Rating";
import { dog4, dog6 } from "../assets";
// import SearchDogs from "./SearchDogs";
import { staggerContainer } from "../utils/motion";



const CreateDog = ({editDog,isEdit,handleDelete}) => {

  console.log(editDog)
  const formRef = useRef();
   //Image file Base64
   const [file, setFile] = useState(null);
   

   const [reloadChild, setReloadChild] = useState(false);
   
   // State to store rating values
   const [friendlyRating, setFriendlyRating] = useState(null);
   const [activenessRating, setActivenessRating] = useState(null);
   const [securityRating, setSecurityRating] = useState(null);
 
   const [loading, setLoading] = useState(false);
   const [form, setForm] = useState(() => {
    if (isEdit) {
      let { name, breed, image_src, friendly, activeness, security } = editDog;
       let image=image_src;
      let nameValue = name.split(" ").length>0?name.split(" ")[0]:name;
      let breedValue = name.split(" ").length>0?name.split(" ")[1]:breed;
      name = nameValue;
      breed = breedValue;
      // let breedValue = !breed?" ":breed;
      setFriendlyRating(friendly);
      setActivenessRating(activeness);
      setSecurityRating(security);
      setFile(image);
     
      return { name, breed, image, friendly, activeness, security };
    } else {
      setFile(dog4);
      return {
        name: "",
        breed: "",
        image: "",
        friendly: "",
        activeness: "",
        security: "",
      };
    }
  });
console.log(form)
  
//Handle form value changes
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };


//Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    

    //console.log(newDog);
if (!isEdit) {
  var newDog = {
    "name":(form.breed.length >0 ? form.name+" "+form.breed:form.name),
    "subcategory":(form.breed.length >0 ? true:false),
    "breed":(form.breed.length >0 ? form.breed:null),
    "image_src": file,
    "details":"",
    "friendly": friendlyRating,
    "activeness": activenessRating,
    "security": securityRating
}
  
  fetch('/addDog', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newDog)
}).then(response => {
    // response.json();
    setLoading(false);

    if (response.ok) {
        setForm({
            name: "",
            breed: "",
            friendly: "",
            activeness: "",
            security: "",
            image: "",
          });

          window.alert("Success!");
          
      }else{
        window.alert("Faild!");
      }

      setReloadChild(!reloadChild);
    })
    .catch(err => {            
        setLoading(false);
        console.error(err)})
}else{
  
  //Edit DOG

  var newEditDog = {
    "_id":editDog._id,
    "name":(form.breed.length >0 ? form.name+" "+form.breed:form.name),
    "subcategory":(form.breed.length >0 ? true:false),
    "breed":(form.breed.length >0 ? form.breed:null),
    "image_src": file,
    "details":"",
    "friendly": friendlyRating,
    "activeness": activenessRating,
    "security": securityRating
}

  fetch(`/updateDog/${editDog._id}`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newEditDog)
}).then(response => {
    // response.json();
    setLoading(false);

    if (response.ok) {
          window.alert("Success!");
          
      }else{
        window.alert("Faild!");
      }

      setReloadChild(!reloadChild);
    })
    .catch(err => {            
        setLoading(false);
        console.error(err)})
}
  };

//Preview file
  var loadFile = function (event) {
    var input = event.target;
    var eventFile = input.files[0];
    // var reader = new FileReader();

    // reader.onload = function () {
        var output = document.getElementById("preview_img");
        // output.src = reader.result;

        //compress file
        new Compressor(eventFile, {
            quality: 0.8, 
            success: (compressedResult) => {
              
                // Set file data in React state
                setFile(compressedResult);
                output.src = URL.createObjectURL(compressedResult);
            },
          });
        console.log(typeof(file) )
            // };

    // reader.readAsDataURL(eventFile);
};


  return (
    <>
    <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.1}} // if condition as there is bug in works section if amount value is added more than 0.1
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id="create">
          &nbsp;
        </span>
    <div
      className="xl:mt-12 xl:flex-row
        flex-col-reverse flex gap-10 overflow-hidden my-20"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 0.5)}
        className="flex-[0.75] flex-col p-8 rounded-2xl bg-yellow-300 mx-auto"
      >
       {isEdit? <p
          className={`${styles.sectionHeadText} drop-shadow-[9px_0px_5px_#000000a3] text-center`}
        >
          Edit
        </p>:<p
          className={`${styles.sectionHeadText} drop-shadow-[9px_0px_5px_#000000a3] text-center`}
        >
          Submit Your Dog!
        </p>}

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-6">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-4"
          >
            <label className="flex flex-col w-96">
              <span className="text-black font-medium mb-2">Dog's Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Golden..."
                className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
            focus:outline-none 
             "
             required
              />
            </label>

            <label className="flex flex-col w-96">
              <span className="text-black font-medium mb-2">Dog's Breed</span>
              <input
                type="text"
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder={!form.breed?"Retriver...": form.breed}
                className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
            focus:outline-none
            "
              />
            </label>

            <label className="flex w-96 my-4">
              <span className="text-black font-medium w-24">Friendly</span>
              <Rating name="friendly" value={friendlyRating} setValue={setFriendlyRating}/>
            </label>

            <label className="flex w-96 my-4">
              <span className="text-black font-medium w-24">Activeness</span>
              <Rating name="activeness" value={activenessRating} setValue={setActivenessRating}/>
            </label>

            <label className="flex w-96 my-4">
              <span className="text-black font-medium w-24 ">Security</span>
              <Rating name="Secutity" value={securityRating} setValue={setSecurityRating} />
            </label>

            <label className="flex gap-4 my-4">
            <span className="text-black font-medium w-24 ">Image</span>
              <input
                type="file"
                name="image"
                onChange={(e) => {loadFile(e); }}
                className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100"
              />
            </label>
{isEdit?<div
              className=" flex justify-between bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
           rounded-xl"
            ><Link
                to={`/`}
                className="w-fit py-4 px-8 outline-none text-white hover:text-black "
              >
                <FaArrowLeft className="text-[24px] " />
              </Link>
              <button
              type="submit"
              className=" w-fit py-3 px-8 outline-none text-white font-bold
            shadow-md shadow-primary rounded-xl "
            >
              {loading ? "Editing..." : "Edit"}
            </button>

            <button onClick={(e) => handleDelete(e)}>
                <FaTrash className="text-[24px] hover:cursor-pointer text-white me-2 hover:text-black " />
              </button>
              </div>:
            <button
              type="submit"
              className=" w-fit py-3 px-8 outline-none text-white font-bold
            shadow-md shadow-primary rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
            hover:bg-gradient-to-br"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            }
          </form>
          <div className="text-center">
            <img
                name="image"
              id="preview_img"
              className=" h-96 w-96 object-cover rounded-3xl mt-10"
              src={file}
              alt="Preview"
            />
            <p className="text-black font-medium mt-3 ">Preview Image</p>
            
          </div>
        </div>
      </motion.div>
    </div>
    </motion.section>
    </>
  );
};

export default CreateDog;
