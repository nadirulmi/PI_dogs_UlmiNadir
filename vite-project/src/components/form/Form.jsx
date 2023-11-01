import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions/actions";

export const Form = () => {
  const tempers = useSelector((state) => state.Alltemperaments);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const initialDogsForm = {
    name: "",
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    life_span: "",
    temperaments: [],
    image: "",
  };

  const [dogsForm, setDogsForm] = useState(initialDogsForm);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setDogsForm({
      ...dogsForm,
      [name]: value,
    });
  };

  const handleTemperaments = (event) => {
    const selectedTemperament = event.target.value;
    if (!selectedTemperaments.includes(selectedTemperament)) {
      setSelectedTemperaments([...selectedTemperaments, selectedTemperament]);
    }
  };

  const handleRemoveTemperament = (selectedTemperament) => {
    setSelectedTemperaments(
      selectedTemperaments.filter((temp) => temp !== selectedTemperament)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const combinedData = {
      weight: `${dogsForm.min_weight} - ${dogsForm.max_weight}`,
      height: `${dogsForm.min_height} - ${dogsForm.max_height}`,
      life_span: dogsForm.life_span,
      name: dogsForm.name,
      temperaments: selectedTemperaments,
      image: dogsForm.image,
    };
    dispatch(createDog(combinedData));
    alert("Datos cargados");
  };

  const handleReset = () => {
    setDogsForm(initialDogsForm);
    setSelectedTemperaments([]);
  };

  return (
    <div>
      <h1>Create your Dog</h1>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={dogsForm.name}
          id="name"
          name="name"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="min_weight">Min weight:</label>
        <input
          type="text"
          value={dogsForm.min_weight}
          id="min_weight"
          name="min_weight"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="max_weight">Max weight:</label>
        <input
          type="text"
          value={dogsForm.max_weight}
          id="max_weight"
          name="max_weight"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="min_height">Min height:</label>
        <input
          type="text"
          value={dogsForm.min_height}
          id="min_height"
          name="min_height"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="max_height">Max height:</label>
        <input
          type="text"
          value={dogsForm.max_height}
          id="max_height"
          name="max_height"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="life_span">Life span: </label>
        <input
          type="text"
          value={dogsForm.life_span}
          id="life_span"
          name="life_span"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="image">Add your url image:</label>
        <input
          type="url"
          value={dogsForm.image}
          id="image"
          name="image"
          onChange={handleForm}
        />
        <br />
        <br />
        <label htmlFor="temperaments">Add temperaments:</label>
        <select name="temperaments" onChange={handleTemperaments}>
          <option value="">Select temperaments</option>
          {tempers?.map((temp, index) => (
            <option key={index} value={temp.temperament}>
              {temp.temperament}
            </option>
          ))}
        </select>
        <br />
        <div className="selected-temperaments">
          {selectedTemperaments.map((selectedTemp, index) => (
            <div key={index}>
              {selectedTemp}
              <button
                type="button"
                onClick={() => handleRemoveTemperament(selectedTemp)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <br />
        <input type="submit" value="Create" />
        <input type="reset" value="Reset" />
      </form>
    </div>
  );
};
