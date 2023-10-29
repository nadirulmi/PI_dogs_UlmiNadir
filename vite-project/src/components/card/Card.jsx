import { Link } from "react-router-dom";

export default function Card({id,name,weight,temperament,image}) {
  return (
    <div>
      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>Weight: {weight}</p>
      <p>{temperament}</p>
      <img src={image} alt={name} width={200} />
    </div>
  );
}

