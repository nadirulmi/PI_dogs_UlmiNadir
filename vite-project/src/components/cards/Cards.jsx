import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import { Nav } from "../nav/Nav";
import style from "./Cards.module.css"
import {
  getDogs,
  orderDogs,
  searchDogs,
  orderSource,
  getTemperaments,
  temperamentFilter,
  orderWeight,
} from "../../redux/actions/actions";
import Select from "../select/Select";

export default function Cards() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.Alldogs);
  const tempers = useSelector((state) => state.Alltemperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
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
    dispatch(orderDogs(event.target.value));
  };

  const handleSource = (event) => {
    dispatch(orderSource(event.target.value));
  };

  const handleTemperaments = (event) => {
    dispatch(temperamentFilter(event.target.value));
    setCurrentPage(1);
  };

  const handleWeightOrder = (event) => {
    dispatch(orderWeight(event.target.value));
  };

  const onSearch = (newName) => {
    
      if (newName.trim() === "") {
        // Si el valor de busqueda esta vacio restablezco el número de páginas
        dispatch(getDogs());
        setCurrentPage(1);
      } else {
        dispatch(searchDogs(newName));
        setCurrentPage(1);
      }
    
  };

  return (
    <div>
      <div>
      <SearchBar onSearch={onSearch} />
      <Select
        handleOrder={handleOrder}
        handleSource={handleSource}
        handleWeightOrder={handleWeightOrder}
        handleTemperaments={handleTemperaments}
        tempers={tempers}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      </div>
      <div className={style.cardsContainer}>
      {currentDogs.map(({ id, name, image, temperament, weight }) => (
        <div  key={id}>
          <Card
            id={id}
            image={image}
            name={name}
            temperament={temperament}
            weight={weight}
          />
        </div>
      ))}
    </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}
