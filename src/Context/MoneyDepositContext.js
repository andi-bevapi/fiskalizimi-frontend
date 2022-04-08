import { createContext, useContext, useState, useEffect } from 'react';
import { useModel } from 'umi';

const MoneyDepositContext = createContext({});

const MoneyDepositProvider = (props) => {
    const { initialState } = useModel('@@initialState');
    const [isLoading, setIsLoading] = useState(false);
    const [ depositAmount , setDepositAmunt] = useState(5000);

    useEffect(() => {

    }, []);

    const updateAmount = (newAmount) => {
        setDepositAmunt(newAmount);
    }

    const addAmountToDeposit = (value) => {
        setDepositAmunt(depositAmount + value );
    }

    const reduceAmountFromDeposit = (value) => {
        setDepositAmunt(depositAmount - value );
    }

    const values = {depositAmount, updateAmount, addAmountToDeposit, reduceAmountFromDeposit}

    return (
        <MoneyDepositContext.Provider value={values}>
            {props.children}
        </MoneyDepositContext.Provider>
    )
}

const useMoneyDepositContext = () => { return useContext(MoneyDepositContext) }

export { MoneyDepositProvider, useMoneyDepositContext }