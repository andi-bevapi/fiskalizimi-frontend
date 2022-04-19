import * as yup from 'yup';
import i18n from "i18next";

export const validationSchema = yup.object({
    username: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    email: yup.string().email().min(2, "Adresa duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni email"),
    phone: yup.number().min(10, "Numri i telefonit i biznesit duhet te kete me shume se 10 karaktere").required("Ju lutem vendosni numrin e telefonit"),
    firstName: yup.string().min(4, "Emri duhet te kete me shume se 4 karaktere").required("Ju lutem vendosni emrin"),
    lastName: yup.string().min(4, "Mbiemri duhet te kete me shume se 4 karaktere").required("Ju lutem vendosni mbiemrin"),
    password: yup.string().min(6, "Fjalekalimi duhet te kete me shume se 6 karaktere"),
    passwordNew : yup.string().min(6, "Fjalekalimi duhet te kete me shume se 6 karaktere"),
    passwordConfirm: yup.string().min(6, "Fjalekalimi duhet te kete me shume se 6 karaktere").when("passwordNew", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
          [yup.ref("passwordNew")],
          "Te dyja fjalekalimet duhet te perputhen"
        )
      })
});