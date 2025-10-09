import React, { useState } from 'react';

export default function QueryCustomerInfo() {
  const [msisdn, setMsisdn] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offeringDetails, setOfferingDetails] = useState({});
  const [loadingOffering, setLoadingOffering] = useState({});
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleQuery = async () => {
    if (!msisdn.trim()) {
      setError('Please enter a valid MSISDN');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);
    setOfferingDetails({});

    try {
      const response = await fetch(
        `http://10.30.6.148:9999/api/QueryCustomerInfo?msisdn=${msisdn}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      
      // Fetch primary offering info if exists
      if (result.primaryOffering) {
        fetchOfferingInfo(result.primaryOffering, true);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchOfferingInfo = async (offeringID, skipModal = false) => {
    if (offeringDetails[offeringID]) {
      if (!skipModal) {
        setSelectedOffering(offeringDetails[offeringID]);
        setShowModal(true);
      }
      return;
    }

    setLoadingOffering(prev => ({ ...prev, [offeringID]: true }));

    try {
      const response = await fetch(
        `http://10.30.6.148:9999/api/QueryOfferingInfo?offeringID=${offeringID}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.resultCode === '0' && result.offeringInfo) {
        setOfferingDetails(prev => ({ ...prev, [offeringID]: result.offeringInfo }));
        if (!skipModal) {
          setSelectedOffering(result.offeringInfo);
          setShowModal(true);
        }
      }
    } catch (err) {
      console.error('Failed to fetch offering info:', err);
    } finally {
      setLoadingOffering(prev => ({ ...prev, [offeringID]: false }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOffering(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuery();
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === '20370101000000') return 'No Expiry';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const minute = dateStr.substring(10, 12);
    const second = dateStr.substring(12, 14);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const getStatusName = (statusCode) => {
    const statusMap = {
      '1': 'IDLE',
      '2': 'ACTIVE',
      '3': 'CALLBARRING/SUSPEND',
      '4': 'DISABLE',
      '8': 'POOL',
      '9': 'DEACTIVE'
    };
    return statusMap[statusCode] || `Status ${statusCode}`;
  };

  const getStatusColor = (statusCode) => {
    const colorMap = {
      '1': '#718096',
      '2': '#48bb78',
      '3': '#ed8936',
      '4': '#f56565',
      '8': '#4299e1',
      '9': '#a0aec0'
    };
    return colorMap[statusCode] || '#718096';
  };

  const isPrepaid = data?.paymentType === '0';
  const isPostpaid = data?.paymentType === '1';

  // SVG Icons
  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  const AlertIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '24px' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        {/* Header & Search */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', margin: '0 0 16px 0' }}>
            CBS Customer Information Query
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={msisdn}
              onChange={(e) => setMsisdn(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter MSISDN (e.g., 2055539299)"
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <button
              onClick={handleQuery}
              disabled={loading}
              style={{
                padding: '12px 32px',
                background: loading ? '#cbd5e0' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <SearchIcon />
              {loading ? 'Searching...' : 'Query'}
            </button>
          </div>
          {error && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#fff5f5',
              border: '1px solid #feb2b2',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#c53030'
            }}>
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results */}
        {data && data.resultCode === '0' && (
          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>
            {/* Left Column - Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Basic Info Card */}
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #667eea', paddingBottom: '8px' }}>
                  Basic Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Status</p>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: getStatusColor(data.status), margin: 0 }}>
                      {getStatusName(data.status)}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Type</p>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                      {isPrepaid ? 'Prepaid' : isPostpaid ? 'Postpaid' : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Primary Offering</p>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                      {data.primaryOffering}
                    </p>
                    {offeringDetails[data.primaryOffering] && (
                      <p style={{ fontSize: '13px', color: '#667eea', marginTop: '2px' }}>
                        {offeringDetails[data.primaryOffering].offeringName}
                      </p>
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Activation Time</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                      {formatDate(data.activationTime)}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Active Time Limit</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                      {formatDate(data.activeTimeLimit)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lifecycle Status */}
              {data.lifeCycleDetails?.[0] && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #48bb78', paddingBottom: '8px' }}>
                    Lifecycle Status
                  </h3>
                  <div style={{ 
                    padding: '12px', 
                    background: data.lifeCycleDetails[0].rBlacklistStatus === '1' ? '#fff5f5' : '#f0fff4',
                    borderRadius: '6px',
                    border: `2px solid ${data.lifeCycleDetails[0].rBlacklistStatus === '1' ? '#fc8181' : '#9ae6b4'}`,
                    marginBottom: '12px'
                  }}>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 4px 0' }}>Blacklist Status</p>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: data.lifeCycleDetails[0].rBlacklistStatus === '1' ? '#c53030' : '#22543d',
                      margin: 0 
                    }}>
                      {data.lifeCycleDetails[0].rBlacklistStatus === '1' ? 'BLACKLIST' : 'NO'}
                    </p>
                  </div>

                  {data.lifeCycleDetails[0].lifeCycleStatuses?.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {data.lifeCycleDetails[0].lifeCycleStatuses.map((status, idx) => (
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
              )}

              {/* Account Balance */}
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #ecc94b', paddingBottom: '8px' }}>
                  Account Balance
                </h3>
                {data.accountInfo?.balanceResult?.map((balance, idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%)', borderRadius: '6px', border: '1px solid #f6e05e' }}>
                      <p style={{ fontSize: '11px', color: '#975a16', marginBottom: '2px' }}>{balance.balanceTypeName}</p>
                      <p style={{ fontSize: '12px', color: '#975a16', marginBottom: '8px' }}>Type: {balance.balanceType}</p>
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
            </div>

            {/* Right Column - Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Outstanding Bills */}
              {isPostpaid && data.accountInfo?.outStandingList?.length > 0 && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #f56565', paddingBottom: '8px' }}>
                    Outstanding Bills
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
                    {data.accountInfo.outStandingList.map((bill, idx) => (
                      <div key={idx} style={{ padding: '16px', background: '#fff5f5', borderRadius: '6px', border: '1px solid #feb2b2' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div>
                            <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 2px 0' }}>Bill Cycle</p>
                            <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a202c', margin: 0 }}>{bill.billCycleID}</p>
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
              )}

              {/* Credit Info */}
              {isPostpaid && data.accountInfo?.accountCredit?.totalCreditAmount && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #9f7aea', paddingBottom: '8px' }}>
                    Credit Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px' }}>
                      <p style={{ fontSize: '12px', color: '#553c9a', marginBottom: '6px' }}>Total Credit</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                        {formatAmount(data.accountInfo.accountCredit.totalCreditAmount)} LAK
                      </p>
                    </div>
                    <div style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px' }}>
                      <p style={{ fontSize: '12px', color: '#553c9a', marginBottom: '6px' }}>Used Amount</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                        {formatAmount(data.accountInfo.accountCredit.totalUsageAmount)} LAK
                      </p>
                    </div>
                    <div style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px' }}>
                      <p style={{ fontSize: '12px', color: '#553c9a', marginBottom: '6px' }}>Remaining</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#48bb78', margin: 0 }}>
                        {formatAmount(data.accountInfo.accountCredit.totalRemainAmount)} LAK
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Free Units */}
              {data.freeUnitInfos?.length > 0 && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #5a67d8', paddingBottom: '8px' }}>
                    Free Units / Points
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
                    {data.freeUnitInfos.map((unit, idx) => (
                      <div key={idx} style={{ padding: '16px', background: '#ebf4ff', borderRadius: '6px', border: '1px solid #90cdf4' }}>
                        <p style={{ fontWeight: '600', fontSize: '14px', color: '#1a202c', margin: '0 0 4px 0' }}>
                          {unit.freeUnitTypeName}
                        </p>
                        <p style={{ fontSize: '11px', color: '#2c5282', marginBottom: '8px' }}>
                          Unit: {unit.measureUnitName}
                        </p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#5a67d8', margin: '0 0 2px 0' }}>
                          {formatAmount(unit.totalUnusedAmount)}
                        </p>
                        <p style={{ fontSize: '12px', color: '#2c5282', margin: 0 }}>
                          of {formatAmount(unit.totalInitialAmount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Offering Instances */}
              {data.accounts?.[0]?.offeringInsts?.length > 0 && (
                <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 16px 0', borderBottom: '2px solid #805ad5', paddingBottom: '8px' }}>
                    Offering Instances
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.accounts[0].offeringInsts.map((offering, idx) => (
                      <div key={idx} style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px', border: '1px solid #d6bcfa' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <p style={{ fontWeight: '600', color: '#1a202c', margin: 0, fontSize: '16px' }}>
                                {offering.offeringID}
                              </p>
                              {offeringDetails[offering.offeringID] && (
                                <p style={{ fontSize: '13px', color: '#6b46c1', margin: 0 }}>
                                  ({offeringDetails[offering.offeringID].offeringName})
                                </p>
                              )}
                            </div>
                            <p style={{ fontSize: '12px', color: '#6b46c1', margin: 0 }}>
                              Seq: {offering.purchaseSeq}
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div style={{ 
                              padding: '4px 10px', 
                              background: offering.status === '2' ? '#c6f6d5' : '#fed7d7',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '600',
                              color: offering.status === '2' ? '#22543d' : '#742a2a'
                            }}>
                              {getStatusName(offering.status)}
                            </div>
                            <button
                              onClick={() => fetchOfferingInfo(offering.offeringID)}
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
                                opacity: loadingOffering[offering.offeringID] ? 0.6 : 1
                              }}
                            >
                              {loadingOffering[offering.offeringID] ? 'Loading...' : 'Details'}
                            </button>
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', paddingTop: '12px', borderTop: '1px solid #e9d8fd' }}>
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
                            <p style={{ fontSize: '12px', fontWeight: '600', color: '#1a202c', margin: 0 }}>{formatDate(offering.expirationTime)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedOffering && (
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
              onClick={closeModal}
            />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
              maxWidth: '900px',
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
                <button onClick={closeModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: '#718096' }}>
                  <CloseIcon />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', background: '#faf5ff', borderRadius: '6px', border: '1px solid #d6bcfa' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#553c9a', margin: '0 0 12px 0' }}>Basic Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
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
        )}
      </div>
    </div>
  );
}