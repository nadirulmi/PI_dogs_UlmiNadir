import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail, cleanDogs } from "../../redux/actions/actions";
import style from "./Detail.module.css";
import { Button } from "../button/Button";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const dogsDetail = useSelector((state) => state.dogsDetail);
  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => dispatch(cleanDogs());
  }, [id]);
 
  return (
    <div>
      <h1>{dogsDetail.name}</h1>
      <div className={style.detailContainer}>
        <div className={style.detailCenter}>
          <p>Id: {dogsDetail.id}</p>
          <p>Height: {dogsDetail.height}</p>
          <p>Weight {dogsDetail.weight}</p>
          <p>Temperament: {dogsDetail.temperament}</p>
          <p>Life span: {dogsDetail.life_span}</p>
        </div>
        <div>
          <img src={dogsDetail.image} alt={dogsDetail.name} width={300}></img>
        </div>
      </div>
      <div className={style.bottom}>
      <Button path="/dogs" text="Back" />
      </div>
    </div>
  );
};

export default Detail;
