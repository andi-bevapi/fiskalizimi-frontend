import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    password: yup.string().min(4, "Fjalekalimi duhet te kete me shume se 4 karaktere").required("Ju lutem vendosni fjalekalimin")
});