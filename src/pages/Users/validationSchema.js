import * as yup from 'yup';

export const userFormSchema = yup.object({
    branch: yup.number("Dega duhet te jete numer").required("Ju lutem vendosni degen"),
    username: yup.string().min(2, "Emri i perdoruesit duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e perdoruesit"),
    name: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    lastname: yup.string().min(2, "Mbiemri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni mbiemrin"),
    operatorCode: yup.string().required("Ju lutem vendosni kodin e operatorit"),
    position: yup.string(),
    phone: yup.string(),
    email: yup.string(),
    password: yup.string().min(4, "Fjalekalimi duhet te kete me shume se 4 karaktere").required("Ju lutem vendosni fjalekalimin"),
    repeatPass: yup.string().oneOf([yup.ref("password"), null], "Fjalekalimet nuk perputhen")
});