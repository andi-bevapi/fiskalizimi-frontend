import { Form, Formik, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import FormRender from '../../../../components/FormRender';
import { useUsersListContext } from '../../../../Context/UsersListContext';

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
    const {t} = useTranslation();

    return (
        <Formik
            initialValues={{ userId: '' }}
            onSubmit={(values) => {
                getData(values);
            }}
        >
            <Form style={{minwidth:'100%', display: 'flex', flexWrap: window.innerWidth < 800 ? 'wrap' : 'nowrap', flexDirection: window.innerWidth < 800 ? 'column' : 'row'}}>
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
                                ...usersList?.map(user => ({
                                    value: user.id,
                                    label: user.username
                                }))
                            ],
                            style: {
                                marginTop: 20
                                // marginLeft: 20
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