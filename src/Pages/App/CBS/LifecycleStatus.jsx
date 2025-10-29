import React from 'react';

export default function LifecycleStatus({ lifeCycleDetails, formatDate }) {
  if (!lifeCycleDetails?.[0]) return null;

  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #48bb78', paddingBottom: '8px' }}>
        Lifecycle Status
      </h2>
      <div style={{ 
        padding: '12px', 
        background: lifeCycleDetails[0].rBlacklistStatus === '1' ? '#fff5f5' : '#f0fff4',
        borderRadius: '6px',
        border: `2px solid ${lifeCycleDetails[0].rBlacklistStatus === '1' ? '#fc8181' : '#9ae6b4'}`,
        marginBottom: '12px'
      }}>
        <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Blacklist Status</p>
        <p style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: lifeCycleDetails[0].rBlacklistStatus === '1' ? '#c53030' : '#22543d',
          margin: 0 
        }}>
          {lifeCycleDetails[0].rBlacklistStatus === '1' ? 'BLACKLIST' : 'NO'}
        </p>
      </div>
      {lifeCycleDetails[0].lifeCycleStatuses?.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {lifeCycleDetails[0].lifeCycleStatuses.map((status, idx) => (
            <div key={idx} style={{ padding: '12px', background: '#f7fafc', borderRadius: '6px', borderLeft: '3px solid #667eea' }}>
              <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a202c', margin: '0 0 4px 0' }}>
                {status.statusName}
              </p>
              <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>
                Expires: {formatDate(status.statusExpireTime)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}