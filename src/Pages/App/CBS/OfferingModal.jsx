import React from 'react';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function OfferingModal({ selectedOffering, formatDate, onClose }) {
  if (!selectedOffering) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '85vh',
        overflow: 'auto',
        zIndex: 1000,
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
            Offering Details
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: '#718096' }}>
            <CloseIcon />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px', border: '1px solid #d6bcfa' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#553c9a', margin: '0 0 12px 0' }}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Offering ID</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {selectedOffering.offeringID}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Offering Name</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {selectedOffering.offeringName}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Offering Code</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {selectedOffering.offeringCode}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Primary Flag</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {selectedOffering.primaryFlag}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Bundle Flag</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {selectedOffering.bundleFlag}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Payment Mode</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {selectedOffering.paymentMode === '0' ? 'Prepaid' : selectedOffering.paymentMode === '1' ? 'Postpaid' : selectedOffering.paymentMode}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Effective Date</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {formatDate(selectedOffering.effDate)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b46c1', margin: '0 0 4px 0' }}>Expiration Date</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  {formatDate(selectedOffering.expDate)}
                </p>
              </div>
            </div>
          </div>

          {selectedOffering.products && selectedOffering.products.length > 0 && (
            <div style={{ padding: '16px', background: '#ebf4ff', borderRadius: '6px', border: '1px solid #90cdf4' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2c5282', margin: '0 0 12px 0' }}>
                Products ({selectedOffering.products.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
                {selectedOffering.products.map((product, idx) => (
                  <div key={idx} style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
                    <p style={{ fontWeight: '600', fontSize: '13px', color: '#1a202c', margin: '0 0 4px 0' }}>
                      {product.productName}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4a5568', margin: 0 }}>
                      Code: {product.productCode} | ID: {product.productId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedOffering.pricePlans && selectedOffering.pricePlans.length > 0 && (
            <div style={{ padding: '16px', background: '#fff5f7', borderRadius: '6px', border: '1px solid #feb2b2' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#742a2a', margin: '0 0 12px 0' }}>
                Price Plans ({selectedOffering.pricePlans.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
                {selectedOffering.pricePlans.map((plan, idx) => (
                  <div key={idx} style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
                    <p style={{ fontWeight: '600', fontSize: '13px', color: '#1a202c', margin: '0 0 4px 0' }}>
                      {plan.name}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4a5568', margin: 0 }}>
                      Code: {plan.code} | ID: {plan.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}