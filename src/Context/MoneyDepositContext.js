import { createContext, useContext, useState, useEffect } from 'react';
import { useModel } from 'umi';
import { getLastAmount, updateSavedAmount, checkAutoInsertDeclaration } from '../services/arka';
import {dateFormatInvoiceFiscalized} from "../helpers/formatDate";

const MoneyDepositContext = createContext({});
const MoneyDepositProvider = (props) => {
  const { initialState } = useModel('@@initialState');
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0.0);
  const [disableField, setDisableField] = useState(false);
  const [validAction, setValidAction] = useState(false);
  useEffect(() => {
    getActualAmount();
  }, []);
  useEffect(() => {}, [validAction]);
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
  };
  const updateAmount = async (id, newAmount) => {
    try {
      const data = {
        totalAmount: newAmount,
        arkaId: id, // !!get arkaId  !!!
        userId: initialState?.currentUser?.id,
        action: 'INITIAL',
        actionTime: dateFormatInvoiceFiscalized(),
      };
      const response = await updateSavedAmount(data);
      if (response.statusCode === 200) {
        setDepositAmount(newAmount);
        setDisableField(true);
        setValidAction(true);
      }
    } catch (error) {
      setValidAction(false);
      console.log('Error', error);
    }
  };
  
  const addAmountToDeposit = async (id, value) => {

    try {
      const data = {
        totalAmount: value,
        arkaId: id, // !!get arkaId  !!!
        userId: initialState?.currentUser?.id,
        action: 'DEPOSIT',
        actionTime: dateFormatInvoiceFiscalized(),
        serialNumber: JSON.parse(localStorage.getItem('deposit')).serialNumber
      };
      const result = await checkAutoInsertDeclaration({id :initialState?.currentUser?.id, item : id});
      if (result?.status != 409) {
        updateAmount(id, 0);
      }
      const response = await updateSavedAmount(data);
      if (response.statusCode === 200) {
        setDepositAmount(depositAmount + value);
        setValidAction(true);
      }
    } catch (error) {
      setValidAction(false);
      console.log('Error', error);
    }
  };

  const reduceAmountFromDeposit = async (id, value) => {
    try {
      const data = {
        totalAmount: value,
        arkaId: id, // !!get arkaId  !!!
        userId: initialState?.currentUser?.id,
        action: 'WITHDRAW',
        actionTime: dateFormatInvoiceFiscalized(),
      };
       const result = await checkAutoInsertDeclaration({id :initialState?.currentUser?.id, item : id});
      if (result?.status != 409) {
        updateAmount(id, 0);
      }
      const response = await updateSavedAmount(data);
      if (response.statusCode === 200) {
        setDepositAmount(depositAmount - value);
        setValidAction(true);
      }
    } catch (error) {
      setValidAction(false);
      console.log('Error', error);
    }
  };
  const values = {
    depositAmount,
    updateAmount,
    addAmountToDeposit,
    reduceAmountFromDeposit,
    disableField,
    setDisableField,
    validAction,
  };
  return (
    <MoneyDepositContext.Provider value={values}>{props.children}</MoneyDepositContext.Provider>
  );
};
const useMoneyDepositContext = () => {
  return useContext(MoneyDepositContext);
};
export { MoneyDepositProvider, useMoneyDepositContext };