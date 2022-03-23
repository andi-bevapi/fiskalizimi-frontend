export default [
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
        label: 'Cmimi'
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
        options: []
    },
    {
        name: 'supplierId',
        component: 'Select',
        label: 'Furnizuesi',
        options: []
    },
    {
        name: 'sellingUnitId',
        component: 'Select',
        label: 'Njesia Matese',
        options: []
    },
    {
        name: 'branchId',
        component: 'Select',
        label: 'Dega',
        options: []
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