import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ id, name, weight, temperament, image }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.singleCard}>
        <Link style={{textDecoration: "none", color: "black"}} to={`/detail/${id}`}>
          <h2>{name}</h2>
        
        <p>Weight: {weight}</p>
        <p>Temperament: {temperament}</p>
        <img src={image} alt={name}  />
        </Link>
      </div>
    </div>
  );
}
