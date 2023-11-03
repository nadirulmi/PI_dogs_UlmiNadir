import { Link } from "react-router-dom";

export const Button = ({ path, text }) => {
  return (
    <Link to={path}>
      <button>{text}</button>
    </Link>
  );
};
