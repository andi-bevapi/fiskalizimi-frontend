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
    name: 'NUIS',
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
    name: 'signature',
    component: 'Text',
    label: 'Signature',
  },
  {
    name: 'certificate',
    component: 'Text',
    label: 'Certificate',
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
  phoneNumber: yup
    .string()
    .min(6, 'Numri duhet te permbaj te pakten 6 shifra')
    .required('Numri eshte i detyrueshem'),
  NUIS: yup
    .string()
    .min(10, 'Nuis duhet te permbaje te pakten 10 karaktere')
    .required('Nuis eshte i detyrueshem'),
  softCode: yup
    .string()
    .min(5, 'SoftCode duhet te permbaje te pakten 5 karaktere')
    .required('SoftCode eshte i detyrueshem'),
  numberOfUsers: yup
    .number()
    .min(1)
    .positive('Numri i perdoruesve duhet te jete pozitiv')
    .required('Numri i perdoruesve eshte i detyrueshem'),
  signature: yup
    .string()
    .min(5, 'Signature duhet te permbaje te pakten 5 karaktere')
    .required('Signature eshte i detyrueshem'),
  certificate: yup
    .string()
    .min(5, 'Certifikata duhet te permbaje te pakten 5 karaktere')
    .required('Certifikata eshte e detyruesheme'),
  validFrom: yup.date().required('Data e fillimit eshte e detyrueshme'),
  validTo: yup
    .date()
    .when(
      'validFrom',
      (validFrom, yup) =>
        validFrom &&
        yup.min(validFrom, 'Data e mbarimit duhet te jete me e madhe se ajo e fillimit'),
    )
    .required('Data e mbarimit eshte e detyrueshme'),
    logoVirtualPath: yup
    .string()
    .required('Logo eshte e detyruesheme'),
});
