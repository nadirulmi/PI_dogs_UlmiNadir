import { Button } from "../button/Button";
import style from "./Nav.module.css";
import wikidog from "./img/wikidog.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={style.navContainer}>
      <nav>
        <Link to={"/dogs"}>
          <img src={wikidog} alt="wiki dog logo" />
        </Link>
        <div className={style.menu} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? `${style.open}` : ""}>
          <li>
            <Button path="/dogs" text="Home" />
          </li>
          <li>
            <Button path="/create" text="Create your dog" />
          </li>
          <li>
            <Button path="/curiosities" text="Curiosities" />
          </li>
          <li>
            <Button path="/" text="Back to landing page" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

