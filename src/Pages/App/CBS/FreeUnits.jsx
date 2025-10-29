import React from 'react';

export default function FreeUnits({ freeUnitInfos, formatAmount }) {
  if (!freeUnitInfos || freeUnitInfos.length === 0) return null;

  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #5a67d8', paddingBottom: '8px' }}>
        Free Units / Points
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {freeUnitInfos.map((unit, idx) => (
          <div key={idx} style={{ padding: '16px', background: '#ebf4ff', borderRadius: '6px', border: '1px solid #90cdf4' }}>
            <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a202c', margin: '0 0 4px 0' }}>
              {unit.freeUnitTypeName}
            </p>
            <p style={{ fontSize: '11px', color: '#2c5282', margin: '0 0 8px 0' }}>
              Unit: {unit.measureUnitName}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#5a67d8', margin: 0 }}>
                {formatAmount(unit.totalUnusedAmount)}
              </p>
              <p style={{ fontSize: '12px', color: '#2c5282', margin: 0 }}>
                of {formatAmount(unit.totalInitialAmount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}