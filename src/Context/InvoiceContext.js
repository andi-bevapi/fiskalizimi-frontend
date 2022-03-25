import { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext({});

const InvoiceProvider = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [listedInvoiceProducts, setListedInvoiceProducts] = useState([]);

    useEffect(() => {

    }, [])

    const addToInvocieList = async (product) => {
        setListedInvoiceProducts([...listedInvoiceProducts, product]);
     }

const values = { isLoading, addToInvocieList}

return (
    <InvoiceContext.Provider value={values}>
        {props.children}
    </InvoiceContext.Provider>
)
}

const useInvoiceContext = () => { return useContext(InvoiceContext) }

export { InvoiceProvider, useInvoiceContext }