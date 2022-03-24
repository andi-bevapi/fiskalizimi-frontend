import * as yup from 'yup';

export const formFields = [
    {
        name: 'name',
        component: 'Text',
        label: 'Emri'
    },
    {
        name: 'address',
        component: 'Text',
        label: 'Adresa'
    },
    {
        name: 'city',
        component: 'Text',
        label: 'Qyteti'
    },
    {
        name: 'businessUnitCode',
        component: 'Text',
        label: 'Business UnitCode'
    },
    {
        name: 'maintainerCode',
        component: 'Text',
        label: 'Maintainer Code'
    },
    {
        name: 'code',
        component: 'Text',
        label: 'Code'
    },
]

export const validationSchema = yup.object({
    name: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    address: yup.string().min(2, "Adresa duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni adresen"),
    businessUnitCode: yup.string().min(2, "Kodi i biznesit duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni kodin e biznesit"),
    city: yup.string().min(2, "Qyteti duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e qytetit"),
    code: yup.string().min(5, "Kodi duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e kodin"),
    maintainerCode: yup.string().min(5, "Kodi i mirembajtjes duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni kodi i mirembajtjes"),
});