import React from "react";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { dog3 } from "../assets";
import { motion } from "framer-motion";
// import { Icon } from "@iconify/react";
import "../../src/index.css";
import { Link } from "react-router-dom";
import { fadeIn, textVariant } from "../utils/motion";

const Home = () => {
  const [data, setData] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [initialrender, setInitialRender] = useState(true);

  useEffect(() => {
    if (buttonClicked || initialrender) {
      fetch("https://dogapi.dog/api/v2/facts")
        .then((res) => res.json())
        .then((responsedata) => {
          // setTimeout(() => {
          setData(responsedata.data[0].attributes.body);
          // }, 1000);
          setButtonClicked(false);
          setInitialRender(false);
        });
    }
  }, [buttonClicked]);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute 
      inset-0 top-[100px] max-w-7xl `}
      >
        <div className="flex justify-center flex-col mt-10">
          <motion.div variants={textVariant()} className="text-center">
            <p className={styles.heroHeadText}>Woof!</p>
            <h2 className={styles.sectionSubText}>Did You Know?</h2>
          </motion.div>

          <div className=" flex sm:flex-row flex-col-reverse mt-10">
            <motion.div
              variants={fadeIn("right", "spring", 1, 5)}
              className=" mx-auto mt-5 "
              alt="user_image"
            >
              <img
                className=" h-96 shadow-2xl rounded-t-full"
                src={dog3}
                alt=""
              />
            </motion.div>

            <div className=" sm:w-1/2  w-full  flex flex-col gap-5 relative ">
              <div className="flex flex-col justify-center items-center mt-5 absolute -top-16 -left-0.5 ">
                <div className="w-5 h-5 rounded-full bg-[#a09e9b]" />
                <div className="w-1 h-32 bg-gradient-to-t from-yellow-300 from-20% via-gray-300 to-gray-400   " />
              </div>
              <motion.p
                variants={fadeIn("up", " spring", 1, 5)}
                className=" h-90 p-5 shadow-xl my-auto justify-center text-[25px] text-[#e57926] font-medium lg:text-[25px] sm:text-[20px] xs:text-[15px] lg:leading-[40px] "
              >
                {data}
              </motion.p>

              <div className="">
                <button
                  type="button"
                  className="text-white 
                  bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
                  hover:bg-gradient-to-br            
                 font-medium 
                  rounded-lg text-sm px-5 py-2.5 
                  text-center me-2 mb-2 inline-flex items-center justify-center w-40"
                  onClick={() => {
                    setButtonClicked(true);
                  }}
                >
                  New Fact
                </button>

                {/* <Link to="/" target="_blank" rel="noopener noreferrer">
                  <button
                    type="button"
                    className="text-white
                  bg-gradient-to-r from-amber-500 via-red-600 to-amber-700
                  hover:bg-gradient-to-br            
                 font-medium 
                  rounded-lg text-sm px-5 py-2.5 
                  text-center me-2 mb-2 inline-flex items-center justify-center w-40"
                  >
                    Browse More +
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
