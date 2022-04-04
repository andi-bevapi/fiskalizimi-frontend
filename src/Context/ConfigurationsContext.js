import { useState, createContext,useContext , useEffect } from "react";
import { useModel } from 'umi';
import {getConfiguration} from "../services/configurations/";

const ConfigurationContext = createContext({});

const ConfigurationProvider = (props) => {
    const { initialState } = useModel('@@initialState');
    const [currentLang,setCurrentLang] = useState();
    const [config,setConfig] = useState();

    useEffect(()=>{
        setConfig(initialState?.currentUser);
        console.log("getConfiguration-----",getConfiguration);
    },[]);

    console.log("config-----",config);
    console.log("config-----",config);

    const values = {currentLang,setCurrentLang};

    return(
        <ConfigurationContext.Provider value={values}>
            {props.children}
        </ConfigurationContext.Provider>
    )
}

const useConfigProvider = () => {return useContext(ConfigurationContext)};

export {useConfigProvider,ConfigurationProvider};