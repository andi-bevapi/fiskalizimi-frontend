import * as yup from 'yup';

export const formFields = [
  {
    name: 'branchId',
    component: 'Select',
    label: 'Dega',
    options: [],
    identifier: 'branchList'
  },
  {
    name: 'username',
    component: 'Text',
    label: 'Username',
  },
  {
    name: 'firstName',
    component: 'Text',
    label: 'Emri',
  },
  {
    name: 'lastName',
    component: 'Text',
    label: 'Mbiemri',
  },
  {
    name: 'operatorCode',
    component: 'Text',
    label: 'Kodi operatorit',
  },
  {
    name: 'position',
    component: 'Text',
    label: 'Pozicioni',
  },
  {
    name: 'email',
    component: 'Text',
    label: 'Email',
  },
  {
    name: 'phone',
    component: 'Text',
    label: 'Celulari',
  },
  {
    name: 'password',
    component: 'Text',
    label: 'Fjalekalimi',
  }
];

export const validationSchema = yup.object({
  branchId: yup.number().required("Ju lutem zgjidhni degen"),
  username: yup.string().min(2, "Emri i perdoruesit duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin e perdoruesit"),
  firstName: yup.string().min(2, "Emri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni emrin"),
  lastName: yup.string().min(2, "Mbiemri duhet te kete me shume se 2 karaktere").required("Ju lutem vendosni mbiemrin"),
  operatorCode: yup.string().required("Ju lutem vendosni kodin e operatorit"),
  position: yup.string(),
  phone: yup.string(),
  email: yup.string(),
  password: yup.string().min(6, "Fjalekalimi duhet te kete me shume se 6 karaktere").required("Ju lutem vendosni fjalekalimin")
});