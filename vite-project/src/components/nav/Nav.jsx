import { Button } from "../button/Button"
import style from "./Nav.module.css"
import wikidog from "./img/wikidog.png"
import { Link } from "react-router-dom";


export const Nav = () =>{
    
    return(
        <div>
            <nav className={style.navBar}>
                <Link to={"/dogs"}>
                <img src={wikidog} alt="wiki dog logo"></img>
                </Link>
                <Button path="/dogs" text="Home"/>
                <Button path="/create" text="Create your dog"/>
                <Button path="/curiosities" text="Curiosities"/>
                <Button path="/" text="Back to landing page"/>
            </nav>
        </div>
    )
}