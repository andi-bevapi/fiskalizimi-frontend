import { createContext, useContext, useEffect, useState } from 'react';
import { useModel } from 'umi';
import { getTodayShift } from '../services/shiftHistory';

const ShiftContext = createContext({});

const ShiftProvider = (props) => {
  const { initialState } = useModel('@@initialState');
  const [shiftIsOpen, setShiftIsOpen] = useState(true);

  const getShift = async () => {
    try {
      const response = await getTodayShift(initialState?.currentUser?.id);
      if (response.statusCode === 200) {
        if (response.data.shiftEnd) setShiftIsOpen(false);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getShift();
  }, [initialState?.currentUser]);

  const values = {
    shiftIsOpen,
    setShiftIsOpen,
  };

  return <ShiftContext.Provider value={values}>{props.children}</ShiftContext.Provider>;
};

const useContextShift = () => {
  return useContext(ShiftContext);
};

export { ShiftProvider, useContextShift };
