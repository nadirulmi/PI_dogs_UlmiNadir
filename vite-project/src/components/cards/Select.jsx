const Select = ({ handleOrder, handleSource, handleWeightOrder, handleTemperaments, tempers }) => {
  return (
    <div>
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
      <select name="weight" onChange={handleWeightOrder}>
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
    </div>
  );
};

export default Select;
