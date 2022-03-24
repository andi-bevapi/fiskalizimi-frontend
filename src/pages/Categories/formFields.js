import * as yup from 'yup';

export const formFields = [
    {
        name: 'name',
        component: 'Text',
        label: 'Emri'
    }
]

export const validationSchema = yup.object({
    name: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
});