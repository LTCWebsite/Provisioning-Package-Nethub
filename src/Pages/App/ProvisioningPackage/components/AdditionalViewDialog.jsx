import React from 'react';
import DetailViewDialog from './DetailViewDialog';

export default function AdditionalViewDialog({ open, onClose, data }) {
  if (!data) return null;

  const sections = [
    {
      title: 'ຂໍ້ມູນທົ່ວໄປ (General Information)',
      icon: '📋',
      fields: [
        { label: 'ID', field: 'id' },
        { label: 'Package ID', field: 'packageId' },
        { label: 'Counter Name', field: 'counterName' },
        { label: 'Refill Stop Day', field: 'refillStopDay' },
        { label: 'SMS', field: 'sms' },
        { label: 'Start Time', field: 'startTime' },
        { label: 'End Time', field: 'endTime' },
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
      title="Additional Detail"
      icon="📦"
      color="#388e3c"
      sections={sections}
    />
  );
}
