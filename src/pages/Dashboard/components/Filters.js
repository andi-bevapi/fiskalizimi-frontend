import { useEffect } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import FormRender from '../../../components/FormRender';
import { useContextProduct } from '../../../Context/ProductContext';
import { useBranchListContext } from '../../../Context/BranchListContext';
import { useCategoryContext } from '../../../Context/CategoryContext';
import { useSellingUnitContext } from '../../../Context/SellingUnitContext';
import { useSupplierContext } from '../../../Context/SuppliersContext';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import { useModel } from 'umi';

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
        formik.setValues({ searchText: '', categoryId: '', sellingUnitId: '', supplierId: '', branchId: '' });
        formik.submitForm(); 
    }
    return <Button variant="contained" onClick={clearValues} style={{height: 40, marginLeft: window.innerWidth < 800 ? 0 : 70, marginTop: 8, marginBottom: window.innerWidth < 800 ? 10 : 0}}>Fshi</Button>
}

const Filters = () => {
    const { initialState } = useModel('@@initialState');
    const { getProductsList } = useContextProduct();
    const { categoryList } = useCategoryContext();
    const { sellingUnitList } = useSellingUnitContext();
    const { suppliersList } = useSupplierContext();
    const { branchList } = useBranchListContext();
    const {t} = useTranslation();

    return (
        <Formik
            initialValues={{ searchText: '', categoryId: '', sellingUnitId: '', supplierId: '', branchId: '' }}
            onSubmit={(values) => {
                getProductsList(values);
            }}
        >
            <Form style={{ display: 'flex', flexDirection: window.innerWidth < 800 ? 'column' : 'row'}}>
                <FormRender
                    formFields={[
                        {
                            name: 'searchText',
                            component: 'Text',
                            label: t("search"),
                        },
                        {
                            name: 'categoryId',
                            component: 'SelectNoDefault',
                            label: t("category"),
                            options: [
                                {
                                    value: null,
                                    label: t("all")
                                },
                                ...categoryList?.map(category => ({
                                    value: category.id,
                                    label: category.name
                                }))
                            ],
                            style: {
                                marginLeft: window.innerWidth < 800 ? 0 : 10
                            }
                        },
                        {
                            name: 'sellingUnitId',
                            component: 'SelectNoDefault',
                            label: t("measureUnits"),
                            options: [
                                {
                                    value: null,
                                    label: t("all")
                                },
                                ...sellingUnitList?.map(sellingUnit => ({
                                    value: sellingUnit.id,
                                    label: sellingUnit.name
                                }))
                            ],
                            style: {
                                marginLeft: window.innerWidth < 800 ? 0 : 20
                            }
                        },
                        {
                            name: 'supplierId',
                            component: 'SelectNoDefault',
                            label: t("supplier"),
                            options: [
                                {
                                    value: null,
                                    label: t("all")
                                },
                                ...suppliersList?.map(supplier => ({
                                    value: supplier.id,
                                    label: supplier.name
                                }))
                            ],
                            style: {
                                marginLeft: window.innerWidth < 800 ? 0 : 30
                            }
                        },
                        initialState.currentUser?.branchId === 0 && 
                        {
                            name: 'branchId',
                            component: 'SelectNoDefault',
                            label: t("branch"),
                            options: [
                                {
                                    value: null,
                                    label: t("all")
                                },
                                ...branchList?.map(branch => ({
                                    value: branch.id,
                                    label: branch.name
                                }))
                            ],
                            style: {
                                marginLeft: window.innerWidth < 800 ? 0 : 40
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