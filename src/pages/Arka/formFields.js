import * as yup from 'yup';
import i18n from 'i18next';

export const formFields = [
  {
    name: 'name',
    component: 'Text',
    label: i18n.t('Name'),
  },
  {
    name: 'serialNumber',
    component: 'Text',
    label: 'Serial Number',
    disabled: true
  },
  {
    name: 'validFrom',
    component: 'Text',
    label: 'Valid From',
    disabled: true
  },
  {
    name: 'validTo',
    component: 'Text',
    label: 'Valid To',
    disabled: true
  },
  {
    name: 'branchId',
    component: 'Select',
    label: i18n.t("branch"),
    options: [],
    identifier: 'branchList',
    disabled: true
  },
];

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, i18n.t('arkaEmriLength'))
    .max(20, i18n.t('arkaEmriLength'))
    .required(i18n.t('arkaEmriRequired')),
  serialNumber: yup.string().required(i18n.t('arkaSerialNrRequired')),
  validFrom: yup.string().required(i18n.t('arkaDateRequired')),
  validTo: yup.string().required(i18n.t('arkaDateRequired')),
});
