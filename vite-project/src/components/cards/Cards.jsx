import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import {
  getDogs,
  orderDogs,
  searchDogs,
  orderSource,
  getTemperaments,
  temperamentFilter,
} from "../../redux/actions/actions";


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

  const onSearch = (newName) => {
    try {
      if (newName.trim() === "") {
        // Si el valor de busqueda esta vacio restablezco el número de páginas 
        dispatch(getDogs());
        setCurrentPage(1);
      } else {
        dispatch(searchDogs(newName));
        setCurrentPage(1);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

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
      <select name="source" onChange={handleSource}>
        <option key="all" value="all">
          All
        </option>
        <option key="api" value="api">
          Api
        </option>
        <option key="dbb" value="dbb">
          Data Base
        </option>
      </select>
      <select name="weight">
        <option key="min_weight" value="minWeight">
          Min Weight
        </option>
        <option key="max_weight" value="maxWeight">
          Max Weight
        </option>
      </select>
      <select name="temperaments" onChange={handleTemperaments}>
        <option key="all_temperaments" value="">
          All
        </option>
        {tempers?.map((temp, index) => (
          <option key={index} value={temp.temperament}>
            {temp.temperament}
          </option>
        ))}
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
