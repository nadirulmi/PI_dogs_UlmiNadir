import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail, cleanDogs } from "../../redux/actions/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const dogsDetail = useSelector((state) => state.dogsDetail);
  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => dispatch(cleanDogs());
  }, [id]);
  console.log(dogsDetail);
  return (
    <div>
      <h1>{dogsDetail.name}</h1>
      <p>Id: {dogsDetail.id}</p>
      <p>Height: {dogsDetail.height}</p>
      <p>Weight {dogsDetail.weight}</p>
      <p>Temperament: {dogsDetail.temperament}</p>
      <p>Life span: {dogsDetail.life_span}</p>
      <img src={dogsDetail.image} alt={dogsDetail.name} width={300}></img>
    </div>
  );
};

export default Detail;
