import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { deleteDog } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

export default function Card({ id, name, weight, temperament, image }) {

  const dispatch = useDispatch()

  const handlerDelete = () =>{
    const result = window.confirm("Are you sure?")
    if(result){
      dispatch(deleteDog(id))
      window.location.reload()
    }
  }

  return (
    <div className={style.cardContainer}>
      <div className={style.singleCard}>
      {
        isNaN(id) ? 
          <button onClick={handlerDelete}>X</button>
        : ""
      }
        <Link style={{textDecoration: "none", color: "black"}} to={`/detail/${id}`}>
          <h2>{name}</h2>
        
        <p>Weight: {weight}</p>
        <p>Temperament: {temperament}</p>
        <img src={image} alt={name}  />
        </Link>
        <div>
        </div>
      </div>
    </div>
  );
}
