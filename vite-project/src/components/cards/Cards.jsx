import { getDogs } from "../../redux/actions/actions"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Card from "../card/Card"

export default function Cards (){

    const dispatch = useDispatch()
    const dogs = useSelector((state) => state.Alldogs);
    useEffect(()=>{
        dispatch(getDogs())
    },[])

return(
    <div>
        <h1>Soy cards</h1>
        {
            dogs?.map(({ id, name, image, temperament, weight }) => {
                return (
                  <Card
                    key={id}
                    id={id}
                    image={image}
                    name={name}
                    temperament={temperament}
                    weight={weight}
                />
                )
            }).slice(0,8)
        }
    </div>
)
}
