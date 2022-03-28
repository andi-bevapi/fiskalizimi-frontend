import { useEffect } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import FormRender from '../../../components/FormRender';
import { useContextProduct } from '../../../Context/ProductContext';
import { useCategoryContext } from '../../../Context/CategoryContext';

const SubmitListener = () => {
    const formik = useFormikContext();

    useEffect(() => {
        if (formik.values !== formik.initialValues) {
            formik.submitForm(); 
        }
    }, [formik.values]);

    return null;
}

const Filters = () => {
    const { getProductsList } = useContextProduct();
    const { categoryList } = useCategoryContext();

    return (
        <Formik
            initialValues={{ searchText: '', categoryId: '' }}
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
                            options: categoryList.map(category => ({
                                value: category.id,
                                label: category.name
                            })),
                            style: {
                                marginLeft: 20
                            }
                        }
                    ]}
                />

                <SubmitListener />
            </Form>
        </Formik>
    );
};

export default Filters;