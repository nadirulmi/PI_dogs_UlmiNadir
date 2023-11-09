import dog from "./img/dog.jpg";
import blackdog from "./img/blackdog.webp";
import dogsupport from "./img/dogsupport.jpg";
import dogui from "./img/dogui.jpg"
import style from "./Curiosities.module.css";

export const Curiosities = () => {
  return (
    <div>
      <h1>AWESOME DOG FACTS</h1>
      <div className={style.container}>
        <div>
          <h2> Dogs are the most popular pet on the planet</h2>
          <p>
            A third of ALL households around the world have a dog. These
            playful, friendly, loyal animals make great companions, but they can
            also be fierce and tough protectors, or intelligent helpers.
          </p>
        </div>
        <div>
          <img src={dog} alt="dog with a flower" width="300"></img>
        </div>
      </div>
      <div className={style.reverse}>
        <div>
          <h2>Dog noses are at least 40x more sensitive than ours</h2>
          <p>
            These clever canines have an incredible sense of smell allowing them
            to follow scent trails days after they were left. Amazingly,
            bloodhounds sense of smell is so spot on that it can be used as
            evidence in court!
          </p>
        </div>
        <div>
          <img src={blackdog} alt="sniffing dog" width="300"></img>
        </div>
      </div>
      <div className={style.container}>
        <div>
          <h2> Many work as assistance dogs, helping humans</h2>
          <p>
            Many dogs are trained to work as guide dogs, helping blind people
            get around safely. Others are assistance dogs, who keep their owners
            calm and safe, while some brave hounds are search and rescue dogs,
            who help human rescuers save people from danger.
          </p>
        </div>
        <div>
          <img src={dogsupport} alt="dog support" width="300"></img>
        </div>
      </div>
      <div className={style.reverse}>
        <div>
          <h2>Owning a dog is a BIG responsibility!</h2>
          <p>
            Just like humans, dogs have feelings and needs, and they have to be
            taken care of properly. They need regular walking, healthy food, a
            clean, cosy place to sleep and lots and lots of love and affection!
            Make sure you and your family think carefully before you get a dog
            (or any pet!) to make sure you have the time and means to take one
            on.
          </p>
        </div>
        <div>
          <img src={dogui} alt="dog with pretal" width="300"></img>
        </div>
      </div>
    </div>
  );
};
