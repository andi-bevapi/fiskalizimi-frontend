import { createContext , useState, useEffect ,useContext } from "react";
import {loginService} from "../services/user/index" ;
import { useHistory } from "umi";


const AuthContext = createContext({});

const AuthProvider = (props) =>{
    const history = useHistory();

    const login = async (user) =>{
        try{
            const response = await loginService(user);
            history.push(response);
            return response;
        }catch(error){
            console.log("error-----",error);
            return error;
        }
    }
    const authContext = {login}; 

    return <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
}

const useMainAuth = () =>  useContext(AuthContext)
export  {useMainAuth , AuthProvider}