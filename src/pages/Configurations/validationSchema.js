import * as yup from 'yup';

export const validationSchema = yup.object({
    printer: yup.string().required("Ju lutem zgjidhni emrin e printerit"),
    language: yup.string().required("Ju lutem zgjidhni gjuhen e perdorimit"),
    allowSellsWithZero: yup.boolean(),
    messageBill: yup.string().min(2, "Mesazhi duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni mesazhin"),
    description:  yup.string().min(2, "Pershkrimin duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni pershkrimin"),
});