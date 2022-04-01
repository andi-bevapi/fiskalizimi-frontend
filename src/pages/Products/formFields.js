import * as yup from 'yup';

export const formFields = [
    {
        name: 'name',
        component: 'Text',
        label: 'Emri'
    },
    {
        name: 'description',
        component: 'Text',
        label: 'Pershkrimi'
    },
    {
        name: 'price',
        component: 'Number',
        label: 'Cmimi meTVSH'
    },
    {
        name: 'barcode',
        component: 'Text',
        label: 'Barkodi'
    },
    {
        name: 'vat',
        component: 'Select',
        label: 'Klasifikimi i TVSH-se',
        options: [
            {
                value: 0,
                label: 'Perjashtuar nga TVSH-ja'
            },
            {
                value: 1,
                label: 'TVSH 6%'
            },
            {
                value: 2,
                label: 'TVSH 20%'
            },
            {
                value: 3,
                label: 'Pa TVSH'
            }
        ]
    },
    {
        name: 'stock',
        component: 'Number',
        label: 'Sasia'
    },
    {
        name: 'categoryId',
        component: 'Select',
        label: 'Kategoria',
        options: [],
        identifier: 'categoryList'
    },
    {
        name: 'supplierId',
        component: 'Select',
        label: 'Furnitoret',
        options: [],
        identifier: 'suppliersList'
    },
    {
        name: 'sellingUnitId',
        component: 'Select',
        label: 'Njesia Matese',
        options: [],
        identifier: 'sellingUnitList'
    },
    {
        name: 'branchId',
        component: 'Select',
        label: 'Dega',
        options: [],
        identifier: 'branchList'
    },
    {
        name: 'imageVirtualPath',
        component: 'Upload',
        label: 'Ngarko Imazh'
    },
    {
        name: 'stockCheck',
        component: 'Checkbox',
        label: 'Kontrollo Sasine'
    }
];

export const validationSchema = yup.object({
    name: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
    description:  yup.string().min(2, "Pershkrimin duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni pershkrimin"),
    price: yup.number().required("Ju lutem vendosni cmimi"),
    barcode:  yup.number().min(2, "Barkodi duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni barkodin"),
    vat: yup.number().required("Ju lutem vendosni TVSH"),
    stock: yup.number().required("Ju lutem vendosni sasine"),
    branchId:  yup.number().required("Ju lutem zgjidhni degen"),
    categoryId:  yup.number().required("Ju lutem zgjidhni kategorine"),
    sellingUnitId: yup.number().required("Ju lutem zgjidhni njesine matese"),
    supplierId: yup.number().required("Ju lutem zgjidhni Furnitoret"),
    imageVirtualPath: yup.string()
});