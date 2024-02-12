import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { fadeIn } from "../utils/motion";

import { staggerContainer } from "../utils/motion";
import { dog9 } from "../assets";

//@prop reloadChild to refresh when creat component is submitted to referesh results
const SearchDogs = ({ reloadChild }) => {
  const [dogs, setDogs] = useState(null);
  const [limit, setLimit] = useState(156);
  const [value, setValue] = useState(null);
  const [loader, setLoader] = useState(true);
  const [initial, setInitial] = useState(true);

  //TO fetch all dogs
  useEffect(() => {
    fetchAllDogs();
  }, [reloadChild]);

  const fetchAllDogs = () => {
    fetch("/dog", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // Limiting the display content to the first 20 items
        setLimit(20);
        setDogs(data); //Store all the results in dogs
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //To handle search by filtring through dogs for users input
  var handleSearch = (newValue) => {
    setInitial(false);
    var searchResult = dogs.filter((dog) => dog.name === newValue);
    setDogs(searchResult);
    newValue ? setValue(newValue) : fetchAllDogs();
    setLoader(false);
  };

  //Define Options for search
  const dogOptions = dogs ? dogs.map((dog) => dog.name) : [];

  //Component for search
  var ComboBox = () => {
    return (
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          handleSearch(newValue);
          setValue(newValue);
        }}
        id="combo-box"
        options={dogOptions}
        sx={{
          width: 250,
          "& .MuiAutocomplete-inputRoot": {
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
          },
          "& .MuiAutocomplete-input": {
            padding: "10px",
            color: "black",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            sx={{ color: "red" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <IconButton size="small">
                  <SearchIcon sx={{ color: "red" }} />
                </IconButton>
              ),
              sx: {
                "& input": {
                  color: "black",
                },
              },
            }}
          />
        )}
      />
    );
  };

  return (
    <>
      {
        <>
          {dogs && (
            <motion.section
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className={`flex flex-col mb-24`}
            >
              <span className="hash-span" id="search">
                &nbsp;
              </span>
              {/* <img src={dog9} alt="dog-search"  /> */}
              <div
                className=" sm:ms-auto mx-auto sm:mx-0 mb-8 
              flex flex-col"
              >
                <img src={dog9} alt="dog-search" className=" w-36 mx-auto" />
                <ComboBox />
              </div>
              <ul
                className=" flex flex-wrap flex-row 
              sm:justify-between gap-1 "
              >
                {dogs.length > 0 ? (
                  dogs.map(
                    (dog, index) =>
                      (
                        <motion.li
                          variants={
                            index < 20
                              ? fadeIn("up", "spring", index * 0.1, 1)
                              : fadeIn("up", "spring", 1, 1)
                          }
                          initial={`${initial ? "hidden" : ""}`}
                          whileInView={`${initial ? "show" : ""}`}
                          className={`${index > limit - 1 ? "hidden" : ""} 
                      mx-auto drop-shadow-[9px_0px_6px_#494845]`}
                          key={index}
                        >
                          <Link
                            className="flex flex-col sm:flex-row 
                         my-3  rounded-3xl 
                         bg-gradient-to-r from-amber-500 from-30% via-orange-400 to-yellow-500
                        hover:bg-gradient-to-br"
                            to={`/search/${dog._id}`}
                          >
                            <img
                              className="sm:h-16 sm:w-16 h-16  
                          object-cover rounded-3xl"
                              src={dog.image_src}
                              alt={dog.name}
                            />
                            <span
                              className="text-white 
                        text-center font-medium text-sm 
                        w-28 py-2 mx-2"
                            >
                              {dog.name}
                            </span>
                          </Link>
                        </motion.li>
                      ) || (
                        <button
                          className="flex  gap-1  
                    mx-auto 
                    text-3xl text-red-500 hover:text-blue-500 
                    underline"
                          onClick={() => {
                            limit < dogs.length
                              ? setLimit(limit + 10)
                              : setLoader(false);
                          }}
                        >
                          <p className="text-sm my-auto">Load more</p>
                          <FaCloudDownloadAlt />
                        </button>
                      )
                  )
                ) : (
                  <li>
                    <Link
                      className="flex flex-wrap 
                      my-3  
                      rounded-3xl 
                      bg-gradient-to-r from-amber-500 from-30% via-orange-400 to-yellow-600
                      hover:bg-gradient-to-br"
                      to={`/search/${dogs._id}`}
                    >
                      <img
                        className="h-16 w-16 
                        object-fit rounded-3xl"
                        src={dogs.image_src}
                        alt={dogs.name}
                      />
                      <span
                        className="text-white 
                      text-center 
                      font-medium text-sm 
                      w-28 py-2 mx-2"
                      >
                        {dogs.name}
                      </span>
                      )
                    </Link>
                  </li>
                )}
              </ul>
              {loader ? (
                <>
                  <button
                    className="flex  gap-1  
                mx-auto 
                text-3xl text-red-500 hover:text-blue-500 
                underline"
                    onClick={() => {
                      limit < dogs.length
                        ? setLimit(limit + 10)
                        : setLoader(false);
                    }}
                  >
                    <p className="text-sm my-auto">Load more</p>
                    <FaCloudDownloadAlt />
                  </button>
                </>
              ) : (
                <></>
              )}
            </motion.section>
          )}
        </>
      }
    </>
  );
};

export default SearchDogs;
