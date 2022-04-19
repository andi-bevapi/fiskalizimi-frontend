import * as yup from 'yup';
import i18n from "i18next";

export const formFields = [
    {
        name: 'name',
        component: 'Text',
        label: i18n.t("Name")
    },
    {
        name: 'address',
        component: 'Text',
        label: i18n.t("Address")
    },
    {
        name: 'city',
        component: 'Text',
        label: i18n.t("City")
    },
    {
        name: 'businessUnitCode',
        component: 'Text',
        label: i18n.t("BusinessUnitCode")
    },
    {
        name: 'maintainerCode',
        component: 'Text',
        label: i18n.t("MaintainerCode")
    },
    {
        name: 'code',
        component: 'Text',
        label: i18n.t("Code")
    },
]

export const validationSchema = yup.object({
    name: yup.string().min(2, i18n.t("codeIdentifierLength")).required(i18n.t("codeIdentifier")),
    address: yup.string().min(2, "Adresa duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni adresen"),
    businessUnitCode: yup.string().min(2, "Kodi i biznesit duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni kodin e biznesit"),
    city: yup.string().min(2, "Qyteti duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e qytetit"),
    code: yup.string().min(5, "Kodi duhet te kete me shume se 5 karaktere").required("Ju lutem vendosni emrin e kodin"),
    maintainerCode: yup.string().min(5, "Kodi i mirembajtjes duhet te kete me shume se 5 karaktere").required("Ju lutem vendosni kodi i mirembajtjes"),
});