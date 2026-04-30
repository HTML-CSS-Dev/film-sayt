import { useState } from "react";
import {UserContext} from "./UserContext";

export default function UserProvider({children}) {
    const [ type , setType ] = useState('top_rated');
    const [ data , setData ] = useState([]);

    return (
        <UserContext.Provider value = { {type , setType , data , setData} }>
            {children}
        </UserContext.Provider>
    )
}