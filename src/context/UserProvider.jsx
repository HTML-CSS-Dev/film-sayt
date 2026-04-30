import { useState } from "react";
import {UserContext} from "./UserContext";

export default function UserProvider({children}) {
    const [ type , setType ] = useState('top_rated');
    const [ data , setData ] = useState([]);
    const [ name , setName ] = useState("harry");

    return (
        <UserContext.Provider value = { {type , setType , data , setData , name , setName} }>
            {children}
        </UserContext.Provider>
    )
}