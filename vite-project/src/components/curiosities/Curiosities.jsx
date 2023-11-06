import dog from "./img/dog.jpg"
import blackdog from "./img/blackdog.webp"
import dogsupport from "./img/dogsupport.jpg"
import style from "./Curiosities.module.css"

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
          <img src={blackdog} alt= "sniffing dog"  width="300"></img>
        </div>
      </div>
      <div className={style.container}>
        <div>
          <h2> Many work as assistance dogs, helping humans</h2>
          <p>
          Many dogs are trained to work as guide dogs, helping blind people get
          around safely. Others are assistance dogs, who keep their owners calm
          and safe, while some brave hounds are search and rescue dogs, who help
          human rescuers save people from danger.
          </p>
        </div>
        <div>
          <img src={dogsupport} alt="dog support" width="300"></img>
        </div>
      </div>
    </div>
  );
};
