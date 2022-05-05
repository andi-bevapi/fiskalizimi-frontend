import i18n, { t } from "i18next";
import * as yup from 'yup';


export const formFields = [
  {
    name: 'branchId',
    component: 'Select',
    label: t("branch"),
    options: [],
    identifier: 'branchList'
  },
  {
    name: 'username',
    component: 'Text',
    label: t("Username"),
  },
  {
    name: 'firstName',
    component: 'Text',
    label: t("Firstname"),
  },
  {
    name: 'lastName',
    component: 'Text',
    label: t("Lastname"),
  },
  {
    name: 'operatorCode',
    component: 'Text',
    label: t("operatorCode"),
  },
  {
    name: 'position',
    component: 'Text',
    label: t("position"),
  },
  {
    name: 'email',
    component: 'Text',
    label: t("Email"),
  },
  {
    name: 'phone',
    component: 'Text',
    label: t("phone"),
  },
  {
    name: 'password',
    component: 'Text',
    label: i18n.t("password"),
  }
];

export const validationSchema = yup.object({
  branchId: yup.number().required(i18n.t("insertBranch")),
  username: yup.string().min(2, i18n.t("usernameLength")).required(i18n.t("insertUsername")),
  firstName: yup.string().min(2, i18n.t("usernameLength")).required(i18n.t("insertUsername")),
  lastName: yup.string().min(2, t("lastnameLength")).required(t("lastname")),
  operatorCode: yup.string().required(t("insertOperatorCode")),
  position: yup.string(),
  phone: yup.string(),
  email: yup.string(),
  password: yup.string().min(6, i18n.t("editProfilePass")).required(i18n.t("insertPass"))
});