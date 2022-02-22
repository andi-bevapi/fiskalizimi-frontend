import { createContext , useState, useEffect ,useContext } from "react";
import {loginService} from "../../services/user/index" ;

const AuthContext = createContext({});

const AuthProvider = (props) =>{

    const [isLoggedIn , setIsLoggedIn] = useState(null);
   
    const login = (username,password) =>{
        console.log("context------");
        loginService(username,password);
    }
    
    const authContext = {isLoggedIn,login}; 
    
    return <AuthContext.Provider value={authContext}>
        {props.children}
        </AuthContext.Provider>
}

const useMainAuth = () =>  useContext(AuthContext)
export  {useMainAuth , AuthProvider}