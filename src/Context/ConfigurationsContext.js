import { useState, createContext,useContext , useEffect } from "react";
import { useModel } from 'umi';
import {getConfiguration} from "../services/configurations/";

const ConfigurationContext = createContext({});

const ConfigurationProvider = (props) => {
    const { initialState } = useModel('@@initialState');

    const [config,setConfig] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if(initialState?.currentUser?.branchId) getBranchConfiguration();
    },[initialState?.currentUser]);

    const getBranchConfiguration = async () => {
        setIsLoading(true);
        try {
            const result = await getConfiguration(initialState?.currentUser?.branchId);
            if(result.statusCode === 200){
                setConfig(result.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const values = {setConfig,config};

    return(
        <ConfigurationContext.Provider value={values}>
            {props.children}
        </ConfigurationContext.Provider>
    )
}

const useConfigProvider = () => {return useContext(ConfigurationContext)};

export {useConfigProvider,ConfigurationProvider};