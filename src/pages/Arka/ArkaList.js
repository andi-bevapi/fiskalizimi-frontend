import React from 'react';
import TableComponent from '../../components/Table';
import { listFormat } from '../../helpers/listFormater';
import { formFields, validationSchema } from './formFields';
import { useContextArka } from '../../Context/ArkaContext';
import { useBranchListContext } from "../../Context/BranchListContext";
import { useTranslation } from 'react-i18next';

const tableHeaders = ['Id', 'Name', 'SerialNumber', 'ValidFrom', 'ValidTo', 'Actions'];

const ArkaList = () => {
  const { arkaList, setArkaList, isLoading, createArka, arkaToUpdate, arkaToDelete } = useContextArka();
  const formatedArkaList = listFormat(arkaList, tableHeaders);
  const { branchList } = useBranchListContext();
  const { t } = useTranslation();

  return (
    <TableComponent
      title={t('arkaList')}
      tableHeaders={tableHeaders}
      fullList={arkaList}
      data={formatedArkaList}
      setData={setArkaList}
      create={createArka}
      update={arkaToUpdate}
      delete={arkaToDelete}
      formFields={formFields}
      validationSchema={validationSchema}
      isLoading={isLoading}
      arka={true}
      contexts={{
        branchList,
      }}
      acceses={{
        create: 'canCreateArka',
        update: 'canUpdateArka',
        delete: 'canDeleteArka',
      }}
    />
  );
};

export default ArkaList;
