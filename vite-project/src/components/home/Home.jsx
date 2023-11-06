import { Button } from "../button/Button";
import style from "./Home.module.css";
import dogs from "./img/dogs.jpg";

export default function Home() {
  return (
    <div className={style.container}>
      <div>
        <h2>
          Welcome to wiki Dog, a page where you can learn about the different
          dog breeds that will captivate your heart, you can also experiment and
          create the dog breeds you want!
        </h2>
        <Button path="/dogs" text="Log in" />
      </div>
      <div>
        <img src={dogs} alt="dogs"></img>
      </div>
    </div>
  );
}
