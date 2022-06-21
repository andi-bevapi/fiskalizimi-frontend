import { createContext, useContext, useState, useEffect } from 'react';
import { useModel } from 'umi';
import { getLastAmount, updateSavedAmount } from '../services/arka';

const MoneyDepositContext = createContext({});

const MoneyDepositProvider = (props) => {
    const { initialState } = useModel('@@initialState');
    const [isLoading, setIsLoading] = useState(false);
    const [ depositAmount , setDepositAmount] = useState(0.00);
    const [ disableField , setDisableField] = useState(false);

    useEffect(() => {
        getActualAmount();
    }, []);

    const getActualAmount = async () => {
        setIsLoading(true);
        try {
            ///! get arkaId !!!
            const response = await getLastAmount();
            if (response.statusCode === 200) {
                setDisableField(true);
                setDepositAmount(response.data.totalAmount);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const updateAmount = async (id, newAmount) => {
        try {
            const data = {
                totalAmount: newAmount,
                arkaId: id, // !!get arkaId  !!!
                userId: initialState?.currentUser?.id,
                action: "Gjendje Fillestare",
                actionTime: new Date()
            }
            const response = await updateSavedAmount(data);
            console.log("response-----",response);
            if (response.statusCode === 200)
            setDepositAmount(newAmount);
            setDisableField(true);
        } catch (error) {
            console.log("error------",error);
        }
    }

    const addAmountToDeposit = async (id, value) => {
        try {
            const data = {
                totalAmount: value,
                arkaId: id, // !!get arkaId  !!!
                userId: initialState?.currentUser?.id,
                action: 'Shtim',
                actionTime: new Date()
            }
            const response = await updateSavedAmount(data);
            if (response.statusCode === 200) setDepositAmount(depositAmount + value );
        } catch (error) {
            console.log(error);
        }
    }

    const reduceAmountFromDeposit = async (id, value) => {
        try {
            const data = {
                totalAmount: value,
                arkaId: id, // !!get arkaId  !!!
                userId: initialState?.currentUser?.id,
                action: 'Heqje',
                actionTime: new Date()
            }
            const response = await updateSavedAmount(data);
            if (response.statusCode === 200) setDepositAmount(depositAmount - value );
        } catch (error) {
            console.log(error);
        }
    }

    const values = {depositAmount, updateAmount, addAmountToDeposit, reduceAmountFromDeposit , disableField , setDisableField}

    return (
        <MoneyDepositContext.Provider value={values}>
            {props.children}
        </MoneyDepositContext.Provider>
    )
}

const useMoneyDepositContext = () => { return useContext(MoneyDepositContext) }

export { MoneyDepositProvider, useMoneyDepositContext }