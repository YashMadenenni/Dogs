import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { slideIn } from "../utils/motion";

const CreateDog = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    breed: "",
    image: "",
    friendly: "",
    activeness: "",
    security: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>{
    const { target } = e;
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  }

 const handleSubmit = (e) => {
    console.log("Submit", e);
 }

  return (
    <div
      className="xl:mt-12 xl:flex-row
        flex-col-reverse flex gap-10 overflow-hidden py-20"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 0.5)}
        className="flex-[0.75] p-8 rounded-2xl bg-yellow-300 mx-auto"
      >
        <p
          className={`${styles.sectionHeadText} drop-shadow-[9px_0px_5px_#000000a3] `}
        >
          Submit Your Dog!
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-4"
        >
            <label className="flex flex-col w-96">
            <span className="text-black font-medium mb-2">Dog's Name</span>
            <input type="text" name="name" value={form.name}
                onChange={handleChange} 
                placeholder="Golden..."
                className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
             "/>
            </label>

            <label className="flex flex-col w-96">
            <span className="text-black font-medium mb-2">Dog's Breed</span>
            <input
              type="text"
              name="breed"
              value={form.breed}
              onChange={handleChange}
              placeholder="Retriver..."
              className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
            "
            />
          </label>

        <label  className="flex justify-between w-96">
          <span className="text-black font-medium my-4">Friendly</span>
            <input
              type="text"
              name=""
              value={form.friendly}
              onChange={handleChange}
              placeholder="Retriver..."
              className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
            "
            />
          </label>

          <label  className="flex justify-between w-96">
          <span className="text-black font-medium my-4">Activenes</span>
            <input
              type="text"
              name=""
              value={form.activeness}
              onChange={handleChange}
              placeholder="Retriver..."
              className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
            "
            />
          </label>
          
        <label  className="flex justify-between w-96">
          <span className="text-black font-medium my-4">Security</span>
            <input
              type="text"
              name=""
              value={form.security}
              onChange={handleChange}
              placeholder="Retriver..."
              className=" py-4 px-6 
            placeholder:text-secondary 
            text-black rounded-lg outlined-none
            border-none font-medium
            "
            />
          </label>
          <button
            type="submit"
            className=" w-fit py-3 px-8 outline-none text-white font-bold
            shadow-md shadow-primary rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
            hover:bg-gradient-to-br"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default CreateDog;
