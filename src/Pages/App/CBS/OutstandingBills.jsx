import React from 'react';

export default function OutstandingBills({ outStandingList, formatDate, formatAmount }) {
  if (!outStandingList || outStandingList.length === 0) return null;

  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #f56565', paddingBottom: '8px' }}>
        Outstanding Bills
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {outStandingList.map((bill, idx) => (
          <div key={idx} style={{ padding: '16px', background: '#fff5f5', borderRadius: '6px', border: '1px solid #feb2b2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px 0' }}>Bill Cycle</p>
                <p style={{ fontWeight: '600', fontSize: '13px', color: '#1a202c', margin: 0 }}>{bill.billCycleID}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px 0' }}>Due Date</p>
                <p style={{ fontWeight: '600', fontSize: '13px', color: '#c53030', margin: 0 }}>
                  {formatDate(bill.dueDate)}
                </p>
              </div>
            </div>
            {bill.outStandingDetails?.map((detail, didx) => (
              <p key={didx} style={{ fontSize: '24px', fontWeight: 'bold', color: '#c53030', margin: 0 }}>
                {formatAmount(detail.outStandingAmount)} LAK
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}