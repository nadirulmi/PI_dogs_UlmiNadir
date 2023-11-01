import { Button } from "../button/Button"

export const Nav = () =>{
    return(
        <div>
            <nav>
                <Button path="/dogs" text="Home"/>
                <Button path="/create" text="Create your dog"/>
            </nav>
        </div>
    )
}