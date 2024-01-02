import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail, cleanDogs } from "../../redux/actions/actions";
import style from "./Detail.module.css";
import { Button } from "../button/Button";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogsDetail = useSelector((state) => state.dogsDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getDogDetail(id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => dispatch(cleanDogs());
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <div style={{height: "82vh",display: "flex", justifyContent:"center", alignItems: "center"}}>
          <span className={style.loader}></span>
        </div>
      ) : dogsDetail ? (
        <>
          <h1 style={{ fontSize: "35px" }}>{dogsDetail.name}</h1>
          <div className={style.detailContainer}>
            <div className={style.detailCenter}>
              <p>Id: {dogsDetail.id}</p>
              <p>Height: {dogsDetail.height}</p>
              <p>Weight {dogsDetail.weight}</p>
              <p>Temperament: {dogsDetail.temperament}</p>
              <p>Life span: {dogsDetail.life_span}</p>
            </div>
            <div>
              <img src={dogsDetail.image} alt={dogsDetail.name} width={300} />
            </div>
          </div>
          <div className={style.bottom}>
            <Button path="/dogs" text="Back" />
          </div>
        </>
      ) : (
        <span>Data not found</span>
      )}
    </div>
  );
};

export default Detail;
