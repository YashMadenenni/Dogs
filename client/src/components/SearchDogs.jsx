// import React, { useEffect, useState } from "react";



// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     console.log("React");
//     fetch("http://localhost:3001/allBreeds")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="flex flex-col App-header">
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

// export default Home;

import React from 'react';

const SearchDogs = () => {
    return (
        <div>
            Search
        </div>
    );
}

export default SearchDogs;
