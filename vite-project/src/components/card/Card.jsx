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
      cancelButtonColor: '#851E1E',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        // Realiza la acción de eliminación (puedes usar dispatch aquí)
        dispatch(deleteDog(id));

        // Muestra el SweetAlert2 de éxito después de realizar la acción
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });

        // Recarga la página si es necesario
        window.location.reload();
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la acción de eliminación
        console.error('Error deleting dog:', error);

        // Muestra un SweetAlert2 de error
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
