import * as yup from 'yup';
import i18n from 'i18next';

export const formFields = [
  {
    name: 'name',
    component: 'Text',
    label: i18n.t('Name'),
    disabled: false
  },
  {
    name: 'serialNumber',
    component: 'Text',
    label: 'Serial Number',
    disabled: true
  },
  {
    name: 'validFrom',
    component: 'Date',
    label: 'Valid From',
    disabled: true,
  },
  {
    name: 'validTo',
    component: 'Date',
    label: 'Valid To',
    disabled: true,
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
  validFrom: yup.date().required(i18n.t('arkaDateRequired')),
  validTo: yup.date().when("validFrom", (validFrom, yup) => validFrom && yup.min(validFrom, i18n.t("endDateGreater"))).required(i18n.t('arkaDateRequired')),
});
