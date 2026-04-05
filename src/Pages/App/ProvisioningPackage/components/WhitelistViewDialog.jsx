import React from 'react';
import DetailViewDialog from './DetailViewDialog';

export default function WhitelistViewDialog({ open, onClose, data }) {
  if (!data) return null;

  const sections = [
    {
      title: 'ຂໍ້ມູນທົ່ວໄປ (General Information)',
      icon: '📋',
      fields: [
        { label: 'MSISDN', field: 'msisdn' },
        { label: 'Start Time', field: 'startTime' },
        { label: 'End Time', field: 'endTime' },
        { label: 'Package ID', field: 'packageId' },
        { label: 'Package Codes', field: 'packageCodes' },
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
      title="Whitelist Detail"
      icon="🛡️"
      color="#00695c"
      sections={sections}
    />
  );
}
