import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { getDogs, orderDogs, searchDogs } from "../../redux/actions/actions";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";

export default function Cards() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.Alldogs);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;


  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOrder = (event) => {
    // Ordenar la lista de perros en base a la selección del usuario
    dispatch(orderDogs(event.target.value));
  };

  const onSearch = (newName) => {
    try {
      if (newName.trim() === '') {
        // Si el valor de búsqueda está vacío, restablece el número de páginas al total original
        dispatch(getDogs());
        setCurrentPage(1);
      } else {
        dispatch(searchDogs(newName));
      }
    } catch (error) {
      throw Error(error.message);
      
    }
  }

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <select name="order" onChange={handleOrder}>
        <option key="asc" value="Ascendente">
          Ascendente
        </option>
        <option key="desc" value="Descendente">
          Descendente
        </option>
      </select>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <h1>Soy cards</h1>
      {currentDogs.map(({ id, name, image, temperament, weight }) => (
        <Card
          key={id}
          id={id}
          image={image}
          name={name}
          temperament={temperament}
          weight={weight}
        />
      ))}
    </div>
  );
}
