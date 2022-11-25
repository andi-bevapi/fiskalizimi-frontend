import * as yup from 'yup';
import i18n from "i18next";

export const formFields = [
    {
        name: 'branchId',
        component: 'Select',
        label: i18n.t("branch"),
        options: [],
        identifier: 'branchList'
    },
    {
        name: 'name',
        component: 'Text',
        label: i18n.t("Name")
    },
    {
        name: 'description',
        component: 'Text',
        label: i18n.t("descriptionField")
    },
    {
        name: 'price',
        component: 'Number',
        label: i18n.t("priceWithVat")
    },
    {
        name: 'barcode',
        component: 'Text',
        label: i18n.t("barcode")
    },
    {
        name: 'vat',
        component: 'Select',
        label: i18n.t("vatClassification"),
        defaultValue: 2,
        options: [
            {
                value: 0,
                label: i18n.t("excludedFromVat")
            },
            {
                value: 1,
                label: i18n.t("vat_6")
            },
            {
                value: 2,
                label: i18n.t("vat_20")
            },
            {
                value: 3,
                label: i18n.t("no_vat")
            }
        ]
    },
    {
        name: 'stock',
        component: 'Number',
        label: i18n.t("quantity")
    },
    {
        name: 'categoryId',
        component: 'Select',
        label: i18n.t("category"),
        options: [],
        identifier: 'categoryList'
    },
    {
        name: 'supplierId',
        component: 'Select',
        label: i18n.t("supplier"),
        options: [],
        identifier: 'suppliersList'
    },
    {
        name: 'sellingUnitId',
        component: 'Select',
        label: i18n.t("measureUnit"),
        options: [],
        identifier: 'sellingUnitList'
    },
    {
        name: 'imageVirtualPath',
        component: 'Upload',
        label: i18n.t("uploadImage")
    },
    {
        name: 'stockCheck',
        component: 'Checkbox',
        label: i18n.t("checkQuantity") 
    }
];

export const validationSchema = yup.object({
    name: yup.string().trim().min(2, i18n.t("productNameMinLength")).max(50,i18n.t("productNameMaxLength")).required(i18n.t("productName")),
    description: yup.string().trim().max(100,i18n.t("productDescription")),
    price: yup.number().min(0, i18n.t("productPriceNoNegative")).required(i18n.t("productPrice")),
    barcode:yup.string().trim().min(8, i18n.t("productBarcodeLength")).max(13,i18n.t("productBarcodeMax")).required(i18n.t("productBarcode"))
    .required(i18n.t("productBarcode")),
    vat: yup.number().required(i18n.t("insertVat")),
    stock: yup.number().min(0 , i18n.t("stockNegativeMessage")).max(999999999,i18n.t("maxAmount")).required(i18n.t("insertAmount")),
    branchId:  yup.number().required(i18n.t("insertBranch")),
    categoryId:  yup.number().required(i18n.t("insertCategory")),
    sellingUnitId: yup.number().required(i18n.t("insertMeasureUnit")),
    supplierId: yup.number().required(i18n.t("chooseSupplier")),
    imageVirtualPath: yup.string().nullable(true)
});