import React from 'react';
import DetailViewDialog from './DetailViewDialog';

export default function PackageRequiredViewDialog({ open, onClose, data }) {
  if (!data) return null;

  const sections = [
    {
      title: 'ຂໍ້ມູນທົ່ວໄປ (General Information)',
      icon: '📋',
      fields: [
        { label: 'ID', field: 'id' },
        { label: 'Package ID', field: 'packageId' },
        { label: 'Counter Name', field: 'counterName' },
        { label: 'Error Message', field: 'errorMessage' },
      ]
    },
    {
      // title: 'ຂໍ້ມູນການບັນທຶກ (Audit Info)',
      // icon: '🕐',
      fields: [
        { label: 'Created At', field: 'createdAt' },
        { label: 'Created By', field: 'createdBy' },
        { label: 'Updated At', field: 'updatedAt' },
        { label: 'Updated By', field: 'updatedBy' },
      ]
    }
  ];

  return (
    <DetailViewDialog
      open={open}
      onClose={onClose}
      data={data}
      title="Package Required Detail"
      icon="✅"
      color="#1976d2"
      sections={sections}
    />
  );
}
