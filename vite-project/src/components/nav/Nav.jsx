import { Button } from "../button/Button"
import { SearchBar } from "../searchBar/SearchBar"

export const Nav = () =>{
    return(
        <div>
            <nav>
                <Button path="/dogs" text="Home"/>
                <Button path="/form" text="Form"/>
                <SearchBar/>
            </nav>
        </div>
    )
}