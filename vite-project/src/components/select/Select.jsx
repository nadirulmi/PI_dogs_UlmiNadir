import style from "./Select.module.css"

const Select = ({ handleOrder, handleSource, handleWeightOrder, handleTemperaments, tempers }) => {
  return (
    <div className={style.select}>
      <p>Order :</p>
      <select name="order" onChange={handleOrder}>
        <option key="asc" value="Ascendente">
          Ascendente
        </option>
        <option key="desc" value="Descendente">
          Descendente
        </option>
      </select>
      <select name="weight" onChange={handleWeightOrder}>
        <option key="min_weight" value="minWeight">
          Min Weight
        </option>
        <option key="max_weight" value="maxWeight">
          Max Weight
        </option>
      </select>
      <p>Filters: </p>
      <select name="source" onChange={handleSource}>
        <option key="all" value="all">
          All dogs
        </option>
        <option key="api" value="api">
          Api dogs
        </option>
        <option key="dbb" value="dbb">
          My dogs
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
    </div>
  );
};

export default Select;
