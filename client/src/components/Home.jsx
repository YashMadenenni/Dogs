import React from "react";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { dog3 } from "../assets";
import "../../src/index.css";
import { fadeIn, textVariant,staggerContainer } from "../utils/motion";
import CreateDog from "./CreateDog";
import Navbar from "./Navbar";

const Home = () => {
  const [data, setData] = useState(null);// TO store fact data
  const [buttonClicked, setButtonClicked] = useState(false);// To check if button clicked
  const [initialrender, setInitialRender] = useState(true);// To check if its initial render


  //Fetch an random fact
  useEffect(() => {
    if (buttonClicked || initialrender) {
      fetch("https://dogapi.dog/api/v2/facts")
        .then((res) => res.json())
        .catch((err) => setData("The most intelligent breed of dog is the Border Collie."))
        .then((responsedata) => {
          setData(responsedata.data[0].attributes.body);
          setButtonClicked(false);
          setInitialRender(false);
        });
    }
  }, [buttonClicked,initialrender]);

  return (
    <>
    
    <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.1}} // if condition as there is bug in works section if amount value is added more than 0.1
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id="home">
          &nbsp;
        </span>
        <Navbar />
    <section className="relative w-full h-[750px] sm:h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute 
      inset-0 max-w-7xl top-8 sm:top-0`}
      >
        <div className="flex justify-center flex-col mt-10">
          <motion.div variants={textVariant()} className="text-center">
         
           <p className={`${styles.heroHeadText} drop-shadow-[9px_0px_5px_#000000a3] `}>Woof!</p>
            <h2 className={styles.sectionSubText}>Did You Know?</h2>
          </motion.div>

          <div className=" flex sm:flex-row flex-col">
            <motion.div
              variants={fadeIn("up", "spring", 0, 2)}
              className=" mx-auto "
              alt="user_image"
            >
              <img
                className="sm:h-[450px] h-60 shadow-2xl sm:rounded-t-full"
                src={dog3}
                alt="Dog"
              />
            </motion.div>

            <div className=" sm:w-1/2  w-full  flex flex-col gap-5 relative ">
              <motion.div variants={fadeIn("up", " spring", 0, 2)} className="flex flex-col justify-center items-center mt-5 absolute -top-5 -left-2  ">
                <div className="w-5 h-5 bg-[#a09e9b]" />
                <div className="w-1 h-32  sm:bg-gradient-to-t from-yellow-300 from-20% via-gray-300 to-gray-400    " />
              </motion.div>
              <motion.p
                variants={fadeIn("left", " spring", 0.5, 1.5)}
                className=" h-90 p-5 shadow-xl my-auto justify-center text-[18px] text-[#e57926] font-medium sm:text-[20px]  lg:leading-[40px] "
              >
                {data}
              </motion.p>
                <button
                  type="button"
                  className="text-white 
                  bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
                  hover:bg-gradient-to-br            
                  font-medium 
                  rounded-lg text-sm px-5 py-2.5 
                  text-center sm:mx-0 inline-flex items-center justify-center w-40 mx-auto"
                  onClick={() => {
                    setButtonClicked(true);
                  }}
                >
                  New Fact
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CreateDog />
    
    </motion.section>
    
    
    </>

  );
};

export default Home
