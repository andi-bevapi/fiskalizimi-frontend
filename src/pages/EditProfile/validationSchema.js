import * as yup from 'yup';

export const validationSchema = yup.object({
    username: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    email: yup.string().email().min(2, "Adresa duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni email"),
    phone: yup.number().min(10, "Numri i telefonit i biznesit duhet te kete me shume se 10 karaktere").required("Ju lutem vendosni numrin e telefonit"),
    firstName: yup.string().min(5, "Emri duhet te kete me shume se 5 karaktere").required("Ju lutem vendosni emrin"),
    lastName: yup.string().min(5, "Mbiemri duhet te kete me shume se 5 karaktere").required("Ju lutem vendosni mbiemrin"),
    password: yup.string().min(6, "Fjalekalimi duhet te kete me shume se 6 karaktere").required("Fjalekalimi eshte i detyrueshem")
});