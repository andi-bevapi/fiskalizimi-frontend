import { useEffect } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import FormRender from '../../../../components/FormRender';
import { useCategoryContext } from '../../../../Context/CategoryContext';
import { useSellingUnitContext } from '../../../../Context/SellingUnitContext';
import { useSupplierContext } from '../../../../Context/SuppliersContext';
import { useUsersListContext } from '../../../../Context/UsersListContext';
import { useTranslation } from "react-i18next";
import { Grid } from '@mui/material';

const SubmitListener = () => {
    const formik = useFormikContext();

    useEffect(() => {
        if (formik.values !== formik.initialValues) {
            formik.submitForm();
        }
    }, [formik.values]);

    return null;
}

const Filters = ({ getData }) => {
    const { usersList } = useUsersListContext();
    const { categoryList } = useCategoryContext();
    const { sellingUnitList } = useSellingUnitContext();
    const { suppliersList } = useSupplierContext();
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{ categoryId: '' }}
            onSubmit={(values) => {
                getData(values);
            }}
        >
            <Grid container>
                {/* Nuk behet grida per filters pasi eshte array me objekte, i njejti problem si ne homepage dashboard*/}
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Form>
                        <FormRender
                            formFields={[
                                {
                                    name: 'operatorId',
                                    component: 'Select',
                                    label: "Operator",
                                    options: [
                                        {
                                            value: null,
                                            label: t("all")
                                        },
                                        ...usersList?.map(user => ({
                                            value: user.id,
                                            label: user.username
                                        }))
                                    ]
                                },
                                {
                                    name: 'categoryId',
                                    component: 'Select',
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
                                        marginLeft: 20
                                    }
                                },
                                {
                                    name: 'sellingUnitId',
                                    component: 'Select',
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
                                        marginLeft: 40
                                    }
                                },
                                {
                                    name: 'supplierId',
                                    component: 'Select',
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
                                        marginLeft: 60
                                    }
                                }
                            ]}
                        />

                        <SubmitListener />
                    </Form>
                </Grid>
            </Grid>
        </Formik>
    );
};

export default Filters;