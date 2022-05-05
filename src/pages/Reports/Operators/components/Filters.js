import { Form, Formik, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import FormRender from '../../../../components/FormRender';
import { useContextUser } from '../../../../Context/UserContext';

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
    const { users } = useContextUser();
    const {t} = useTranslation();

    return (
        <Formik
            initialValues={{ userId: '' }}
            onSubmit={(values) => {
                getData(values);
            }}
        >
            <Form style={{ display: 'flex' }}>
                <FormRender
                    formFields={[
                        {
                            name: 'userId',
                            component: 'Select',
                            label: "Operator",
                            options: [
                                {
                                    value: null,
                                    label: t("all")
                                },
                                ...users?.map(user => ({
                                    value: user.id,
                                    label: user.username
                                }))
                            ]
                        }
                    ]}
                />

                <SubmitListener />
            </Form>
        </Formik>
    );
};

export default Filters;