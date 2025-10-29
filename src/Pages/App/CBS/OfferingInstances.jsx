import React from 'react';

export default function OfferingInstances({ 
  offeringInsts, 
  offeringDetails, 
  loadingOffering, 
  getStatusName, 
  formatDate, 
  onFetchOfferingInfo 
}) {
  if (!offeringInsts || offeringInsts.length === 0) return null;

  return (
    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #805ad5', paddingBottom: '8px' }}>
        Offering Instances
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '12px' }}>
        {offeringInsts.map((offering, idx) => (
          <div key={idx} style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px', border: '1px solid #d6bcfa' }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <p style={{ fontWeight: '600', color: '#1a202c', margin: 0, fontSize: '15px' }}>
                    {offering.offeringID}
                  </p>
                  {offeringDetails[offering.offeringID] && (
                    <p style={{ fontSize: '13px', color: '#6b46c1', margin: '2px 0 0 0' }}>
                      {offeringDetails[offering.offeringID].offeringName}
                    </p>
                  )}
                  <p style={{ fontSize: '11px', color: '#6b46c1', margin: '4px 0 0 0' }}>
                    Seq: {offering.purchaseSeq}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ 
                    padding: '3px 8px', 
                    background: offering.status === '2' ? '#c6f6d5' : '#fed7d7',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontWeight: '600',
                    color: offering.status === '2' ? '#22543d' : '#742a2a',
                    whiteSpace: 'nowrap'
                  }}>
                    {getStatusName(offering.status)}
                  </div>
                  <button
                    onClick={() => onFetchOfferingInfo(offering.offeringID)}
                    disabled={loadingOffering[offering.offeringID]}
                    style={{
                      padding: '4px 10px',
                      background: '#805ad5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      cursor: loadingOffering[offering.offeringID] ? 'not-allowed' : 'pointer',
                      opacity: loadingOffering[offering.offeringID] ? 0.6 : 1,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {loadingOffering[offering.offeringID] ? 'Loading...' : 'Details'}
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', paddingTop: '12px', borderTop: '1px solid #e9d8fd' }}>
              <div>
                <p style={{ fontSize: '10px', color: '#6b46c1', margin: '0 0 2px 0' }}>Class</p>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#1a202c', margin: 0 }}>{offering.offeringClass}</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#6b46c1', margin: '0 0 2px 0' }}>Bundle</p>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#1a202c', margin: 0 }}>{offering.bundledFlag}</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#6b46c1', margin: '0 0 2px 0' }}>Mode</p>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#1a202c', margin: 0 }}>{offering.activationMode}</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#6b46c1', margin: '0 0 2px 0' }}>Expires</p>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {formatDate(offering.expirationTime).split(' ')[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}