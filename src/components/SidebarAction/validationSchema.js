import * as yup from 'yup';

export const validateFormInput = yup.object({
    name: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    description : yup.string().min(2, "Pershkrimi duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni pershkrimin"),
    barcode:  yup.number().min(2, "Barkodi duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni barkodin"),
    branchId:  yup.number().required("Ju lutem vendosni Id e branch"),
    categoryId:  yup.number().required("Ju lutem vendosni id e kategorise"),
    description:  yup.string().min(2, "Pershkrimin duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni pershkrimin"),
    imageVirtualPath: yup.string().required("Ju lutem vendosni Imazhi"),
    price: yup.number().min(2, "Cmimi duhet te kete me shume se 2 numra").required("Ju lutem vendosni cmimi"),
    sellingUnitId: yup.number().min(2, "Id e njesise duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni id e njesise"),
    stock: yup.number().required("Ju lutem vendosni Stokun"),
    stockCheck: yup.boolean().required("Ju lutem vendosni stock check"),
    supplierId: yup.number().min(2, "Id e furnizuesit duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni id furnizuesit"),
    vat: yup.number().min(2, "TVSH duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni TVSH"),
    address: yup.string().min(2, "Adresa duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni adresen"),
    businessUnitCode: yup.string().min(2, "Kodi i biznesit duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni kodin e biznesit"),
    city: yup.string().min(2, "Qyteti duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e qytetit"),
    clientId: yup.number().required("Ju lutem vendosni Id e klientit"),
    code: yup.string().min(5, "Kodi duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e kodin"),
    maintainerCode: yup.string().min(5, "Kodi i mirembajtjes duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni kodi i mirembajtjes"),
});