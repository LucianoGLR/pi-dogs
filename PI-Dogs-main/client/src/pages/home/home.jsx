import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getDogs, setSortOrder } from '../../redux/actions/index';
import Navbar from '../../components/navbar/navbar';
import Cards from '../../components/cards/cards';
import './home.styles.css';

function Home() {
  const dispatch = useDispatch();
  const {allDogs, filteredDogs,setSortOrder} = useSelector((state) => state);

  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(searchString));
  }

  // function handleSubmit(event) {
  //   const newSortOrder = event.target.value;
  //   //event.preventDefault();
  //   dispatch(setSortOrder(searchString));
  // }

  function handleSortChange(event) {
    dispatch(setSortOrder(event.target.value));
  }

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  return (
    <div className='home'>
        {/* <img src={imagen1} alt='foto' className='imagen-fondo'/> */}
      <h2 className='home-title'>Dogs</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} handleSortChange={handleSortChange}/>
      <Cards allDogs={currentDogs} />

      <div className="pagination">
        {Array.from({ length: Math.ceil(allDogs.length / dogsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;





// const [filtered, setFiltered] = useState(allDogs);
// const [searchString, setSearchString] = useState("");

// function handleChange(event){
  //   event.preventDefault();
  //   setSearchString(event.target.value)
  // }
  
  // function handleSubmit(event){
    //   event.preventDefault();
    //   const filtered = allDogs.filter((dog)=>
//     dog.name.includes(searchString)
//   );
//   setFiltered(filtered)
// }

// return (
//   <div className='home'>
//       <h2 className='home-title'>Home</h2>
//       <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
//       <Cards allDogs={filtered}/> 
//   </div>
// );