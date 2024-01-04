import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { deleteDog } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

export default function Card({ id, name, weight, temperament, image }) {

  const dispatch = useDispatch()

  const handlerDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D4A373', 
      confirmButtonClass: 'no-border',
      cancelButtonColor: '#851E1E',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        dispatch(deleteDog(id));

        await Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          confirmButtonColor: '#D4A373', 
        });

      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the dog.',
          icon: 'error',
        });
      }
    }
  };

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
