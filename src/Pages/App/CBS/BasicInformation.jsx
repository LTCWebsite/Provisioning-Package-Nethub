import React from 'react';

export default function BasicInformation({ 
  data, 
  offeringDetails, 
  getStatusName, 
  getStatusColor, 
  formatDate, 
  isPrepaid, 
  isPostpaid,
  onFetchOfferingInfo 
}) {
  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #667eea', paddingBottom: '8px' }}>
        Basic Information
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ padding: '12px', background: '#f7fafc', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Status</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: getStatusColor(data.status), margin: 0 }}>
            {getStatusName(data.status)}
          </p>
        </div>
        <div style={{ padding: '12px', background: '#f7fafc', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Type</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
            {isPrepaid ? 'Prepaid' : isPostpaid ? 'Postpaid' : 'Unknown'}
          </p>
        </div>
        <div 
          style={{ 
            padding: '12px', 
            background: '#f7fafc', 
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => onFetchOfferingInfo(data.primaryOffering)}
          onMouseEnter={(e) => e.currentTarget.style.background = '#edf2f7'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f7fafc'}
        >
          <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Primary Offering</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#667eea', margin: 0, textDecoration: 'underline', cursor: 'pointer' }}>
            {data.primaryOffering}
          </p>
          {offeringDetails[data.primaryOffering] && (
            <p style={{ fontSize: '13px', color: '#667eea', margin: '4px 0 0 0' }}>
              {offeringDetails[data.primaryOffering].offeringName}
            </p>
          )}
          <p style={{ fontSize: '11px', color: '#667eea', margin: '4px 0 0 0', fontStyle: 'italic' }}>
            Click to view details
          </p>
        </div>
        <div style={{ padding: '12px', background: '#f7fafc', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Activation Time</p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
            {formatDate(data.activationTime)}
          </p>
        </div>
        <div style={{ padding: '12px', background: '#f7fafc', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Active Time Limit</p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
            {formatDate(data.activeTimeLimit)}
          </p>
        </div>
      </div>
    </div>
  );
}