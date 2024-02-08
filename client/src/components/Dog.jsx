import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaPaw, FaTrash, FaArrowLeft, FaPen } from "react-icons/fa";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
// import Rating from "./Rating";

const Dog = () => {
  const formRef = useRef();
  const { dogID } = useParams();
  const [dog, setDog] = useState(null);

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
  }, []);

  const getStars = (value) => {
    return (
      <div className="flex gap-4">
        {[...Array(5)].map((star, index) => (
          <FaPaw
            key={index}
            className={`${index < value ? "text-amber-600" : "text-slate-400"} cursor-pointer`}
            size={30}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/deleteDog/${dogID}`, {
        method: "DELETE",
      })
        .then((response) => {
         if (response.ok) {
            window.alert("Success!");
            window.location.href = "/"
        }else{
          window.alert("Faild!");
        }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

  };

  const handleChange = (e) => {};

  return (
    <>
      {dog ? (
        <>
          <div className="relative flex-[0.75] w-[450px]  rounded-3xl bg-yellow-300 mx-auto">
            <div className=" ">
              <img
                name="image"
                id="preview_img"
                className="h-60 w-[450px] object-cover rounded-t-3xl"
                src={dog.image_src}
                alt="Dog"
              />
            </div>

            <form
             
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 px-6 pb-2"
            >
              <label
                className={`${styles.sectionHeadText}  drop-shadow-[9px_0px_5px_#000000a3] text-center `}
              >
                <span>{dog.name}</span>
              </label>
              {/* <label className="flex justify-between">
                  <span className="text-black font-medium mb-2">
                    Dog's Name
                  </span>
                  <span className={`${styles.sectionHeadText}`}>
                    {dog.name.split(" ") ? dog.name.split(" ")[0] : dog.name}
                  </span>
                </label> */}

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

              <div className=" flex justify-between bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
             rounded-xl">
                <Link to={`/`} className="w-fit py-4 px-8 outline-none text-white hover:text-black "> 
                    <FaArrowLeft className="text-[24px] " />  
                </Link>
                {/* <button
                  type=""
                  className=" w-fit py-3 px-8 outline-none text-white font-bold
            shadow-md shadow-primary rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
            hover:bg-gradient-to-br"
                > */}
<button>
<FaPen className="text-[24px] hover:cursor-pointer text-white me-2 hover:text-black " />
</button>
                  
                  {/* {loading ? "Submitting..." : "Submit"}  */}
                {/* </button> */}
                {/* <button
                  type="submit"
                  className=" w-fit py-3 px-8 outline-none text-white font-bold
            shadow-md shadow-primary rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
            hover:bg-gradient-to-br"
                > */}
                <button onClick={ (e) => handleSubmit(e)}>
                <FaTrash  className="text-[24px] hover:cursor-pointer text-white me-2 hover:text-black " />
                </button>
                  {/* {loading ? "Submitting..." : "Submit"}  */}
                {/* </button> */}
              </div>
            </form>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default SectionWrapper(Dog, "dog");
