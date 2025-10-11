import React from 'react';

export default function CreditInformation({ accountCredit, formatAmount }) {
  if (!accountCredit || !accountCredit.totalCreditAmount) return null;

  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #9f7aea', paddingBottom: '8px' }}>
        Credit Information
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ padding: '14px', background: '#faf5ff', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#553c9a', margin: '0 0 6px 0' }}>Total Credit</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
            {formatAmount(accountCredit.totalCreditAmount)} LAK
          </p>
        </div>
        <div style={{ padding: '14px', background: '#faf5ff', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#553c9a', margin: '0 0 6px 0' }}>Used Amount</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
            {formatAmount(accountCredit.totalUsageAmount)} LAK
          </p>
        </div>
        <div style={{ padding: '14px', background: '#faf5ff', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#553c9a', margin: '0 0 6px 0' }}>Remaining</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#48bb78', margin: 0 }}>
            {formatAmount(accountCredit.totalRemainAmount)} LAK
          </p>
        </div>
      </div>
    </div>
  );
}