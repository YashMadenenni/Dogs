import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Rating from "./Rating";
import { dog4 } from "../assets";

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

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    setLoading(true);
//curl -X POST -H "Content-Type: application/json" -d '{"name":"NewDogName","subcategory":false,"breed":null,"image_src":"","details":""}' http://localhost:3001/addDog
 
    var newDog = {
        "name":form.name,
        "subcategory":false,
        "breed":null,
        "image_src":form.image,
        "details":"",
        "friendly": form.friendly,
    }

    fetch('/addDog', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newDog)
    }).then(response => {
        // response.json();
        console.log(response.json())
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
        
        })
        .catch(err => {
            
            setLoading(false);
            console.error(err)})
        

   
  };

  var loadFile = function (event) {
    // var input = event.target;
    // var file = input.files[0];
    // var type = file.type;

    var output = document.getElementById("preview_img");

    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div
      className="xl:mt-12 xl:flex-row
        flex-col-reverse flex gap-10 overflow-hidden py-20"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 0.5)}
        className="flex-[0.75] flex-col p-8 rounded-2xl bg-yellow-300 mx-auto"
      >
        <p
          className={`${styles.sectionHeadText} drop-shadow-[9px_0px_5px_#000000a3] text-center`}
        >
          Submit Your Dog!
        </p>

        <div className="flex flex-row justify-between">
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
             "
              />
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

            <label className="flex w-96 my-4">
              <span className="text-black font-medium w-24">Friendly</span>
              <Rating name="friendly" />
            </label>

            <label className="flex w-96 my-4">
              <span className="text-black font-medium w-24">Activeness</span>
              <Rating name="activeness" />
            </label>

            <label className="flex w-96 my-4">
              <span className="text-black font-medium w-24 ">Security</span>
              <Rating name="Secutity" />
            </label>

            <label class="flex gap-4 my-4">
            <span className="text-black font-medium w-24 ">Image</span>
              <input
                type="file"
                onChange={(e) => loadFile(e)}
                class="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100"
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
          <div class="text-center">
            <img
                name="image"
              id="preview_img"
              class=" h-96 w-96 object-cover rounded-3xl mt-20"
              src={dog4}
              alt="Preview"
            />
            <p className="text-black font-medium mt-3">Preview Image</p>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(CreateDog, "create");
