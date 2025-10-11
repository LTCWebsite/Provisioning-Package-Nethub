import React from 'react';

export default function AccountBalance({ balanceResult, formatAmount }) {
  if (!balanceResult || balanceResult.length === 0) return null;

  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #ecc94b', paddingBottom: '8px' }}>
        Account Balance
      </h2>
      {balanceResult.map((balance, idx) => (
        <div key={idx} style={{ marginBottom: idx < balanceResult.length - 1 ? '12px' : '0' }}>
          <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%)', borderRadius: '6px', border: '1px solid #f6e05e' }}>
            <div style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', color: '#975a16', margin: '0 0 2px 0' }}>{balance.balanceTypeName}</p>
              <p style={{ fontSize: '11px', color: '#975a16', margin: 0 }}>Type: {balance.balanceType}</p>
            </div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', margin: '0 0 8px 0' }}>
              {formatAmount(balance.totalAmount)} LAK
            </p>
            <p style={{ fontSize: '12px', color: '#744210', margin: 0 }}>
              Reserved: {formatAmount(balance.reservedAmount)} LAK
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}