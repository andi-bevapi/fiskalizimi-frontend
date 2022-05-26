import * as yup from 'yup';
import i18n from 'i18next';

export const formFields = [
  {
    name: 'name',
    component: 'Text',
    label: 'Emri',
  },
  {
    name: 'address',
    component: 'Text',
    label: 'Adresa',
  },
  {
    name: 'email',
    component: 'Text',
    label: 'Email',
  },
  {
    name: 'phoneNumber',
    component: 'Text',
    label: 'Numri i celularit',
  },
  {
    name: 'nuis',
    component: 'Text',
    label: 'NUIS',
  },
  {
    name: 'numberOfUsers',
    component: 'Number',
    label: 'Numri i perdoruesve',
  },
  {
    name: 'softCode',
    component: 'Text',
    label: 'Soft Code',
  },
  {
    name: 'validFrom',
    component: 'Date',
    label: 'Valid From',
  },
  {
    name: 'validTo',
    component: 'Date',
    label: 'Valid To',
  },
  {
    name: 'logoVirtualPath',
    component: 'Upload',
    label: 'Ngarko imazh, logo',
  },
];

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, i18n.t('Emri duhet te permbaje te pakten 2 karaktere'))
    .max(30, 'Emri nuk duhet te kete me shume se 30 karaktere')
    .required(i18n.t('Emri eshte i detyrueshem')),
  address: yup
    .string()
    .min(2, 'Adresa duhet te permbaje te pakten 2 karaktere')
    .required('Adresa eshte e detyrueshme'),
  email: yup
    .string()
    .min(2, 'Email duhet te permbaj te pakten 2 karaktere')
    .required('Email eshte i detyrueshem'),
  phoneNumber: yup.string().min(6, i18n.t('branchCityLength')).required(i18n.t('branchCity')),
  nuis: yup.string().min(5, i18n.t('branchCodeLength')).required(i18n.t('branchCode')),
});
