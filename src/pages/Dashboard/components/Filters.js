import { useEffect } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import FormRender from '../../../components/FormRender';
import { useContextProduct } from '../../../Context/ProductContext';
import { useCategoryContext } from '../../../Context/CategoryContext';
import { useSellingUnitContext } from '../../../Context/SellingUnitContext';
import { useSupplierContext } from '../../../Context/SuppliersContext';
import Button from '@mui/material/Button';

const SubmitListener = () => {
    const formik = useFormikContext();

    useEffect(() => {
        if (formik.values !== formik.initialValues) {
            formik.submitForm(); 
        }
    }, [formik.values]);

    return null;
}

const ClearValues = () => {
    const formik = useFormikContext();

    const clearValues = () => {
        formik.setValues({ searchText: '', categoryId: '', sellingUnitId: '', supplierId: '' });
        formik.submitForm(); 
    }
    return <Button variant="contained" onClick={clearValues} style={{height: 40, marginLeft: 70}}>Fshi</Button>
}

const Filters = () => {
    const { getProductsList } = useContextProduct();
    const { categoryList } = useCategoryContext();
    const { sellingUnitList } = useSellingUnitContext();
    const { suppliersList } = useSupplierContext();

    return (
        <Formik
            initialValues={{ searchText: '', categoryId: '', sellingUnitId: '', supplierId: '' }}
            onSubmit={(values) => {
                getProductsList(values);
            }}
        >
            <Form style={{ display: 'flex' }}>
                <FormRender
                    formFields={[
                        {
                            name: 'searchText',
                            component: 'Text',
                            label: 'Kerko',
                        },
                        {
                            name: 'categoryId',
                            component: 'Select',
                            label: 'Kategoria',
                            options: [
                                {
                                    value: null,
                                    label: 'Te Gjitha'
                                },
                                ...categoryList?.map(category => ({
                                    value: category.id,
                                    label: category.name
                                }))
                            ],
                            style: {
                                marginLeft: 20
                            }
                        },
                        {
                            name: 'sellingUnitId',
                            component: 'Select',
                            label: 'Njesia Matese',
                            options: [
                                {
                                    value: null,
                                    label: 'Te Gjitha'
                                },
                                ...sellingUnitList?.map(sellingUnit => ({
                                    value: sellingUnit.id,
                                    label: sellingUnit.name
                                }))
                            ],
                            style: {
                                marginLeft: 40
                            }
                        },
                        {
                            name: 'supplierId',
                            component: 'Select',
                            label: 'Furnitori',
                            options: [
                                {
                                    value: null,
                                    label: 'Te Gjitha'
                                },
                                ...suppliersList?.map(supplier => ({
                                    value: supplier.id,
                                    label: supplier.name
                                }))
                            ],
                            style: {
                                marginLeft: 60
                            }
                        }
                    ]}
                />

                <SubmitListener />
                <ClearValues/>
            </Form>
        </Formik>
    );
};

export default Filters;