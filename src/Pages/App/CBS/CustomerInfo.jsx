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
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchOfferingInfo = async (offeringID) => {
    if (offeringDetails[offeringID]) {
      setSelectedOffering(offeringDetails[offeringID]);
      setShowModal(true);
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
        setSelectedOffering(result.offeringInfo);
        setShowModal(true);
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
      '1': '#718096',  // Gray for IDLE
      '2': '#48bb78',  // Green for ACTIVE
      '3': '#ed8936',  // Orange for CALLBARRING/SUSPEND
      '4': '#f56565',  // Red for DISABLE
      '8': '#4299e1',  // Blue for POOL
      '9': '#a0aec0'   // Gray for DEACTIVE
    };
    return colorMap[statusCode] || '#718096';
  };

  const isPrepaid = data?.paymentType === '0';
  const isPostpaid = data?.paymentType === '1';

  // SVG Icons
  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const WalletIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>
  );

  const CreditCardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const AlertIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
          padding: '32px',
          marginBottom: '24px'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#1a202c', 
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            CBS Customer Information
          </h1>
          <p style={{ color: '#718096', margin: 0 }}>Query customer details by MSISDN</p>
        </div>

        {/* Search Box */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
          padding: '32px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={msisdn}
              onChange={(e) => setMsisdn(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter MSISDN (e.g., 2055539299)"
              style={{
                flex: 1,
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <button
              onClick={handleQuery}
              disabled={loading}
              style={{
                padding: '14px 24px',
                background: loading ? '#cbd5e0' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = '#5568d3')}
              onMouseLeave={(e) => !loading && (e.target.style.background = '#667eea')}
            >
              <SearchIcon />
              {loading ? 'Searching...' : 'Query'}
            </button>
          </div>
          {error && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: '#fff5f5',
              border: '1px solid #feb2b2',
              borderRadius: '8px',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Basic Info */}
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              padding: '32px'
            }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1a202c', 
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 0 24px 0'
              }}>
                <span style={{ color: '#667eea' }}><UserIcon /></span>
                Basic Information
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '16px' 
              }}>
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>Status</p>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: getStatusColor(data.status),
                    margin: 0 
                  }}>
                    {getStatusName(data.status)}
                  </p>
                </div>
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>Type</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                    {isPrepaid ? 'Prepaid' : isPostpaid ? 'Postpaid' : 'Unknown'}
                  </p>
                </div>
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>Activation Time</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                    {formatDate(data.activationTime)}
                  </p>
                </div>
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>Active Time Limit</p>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                    {formatDate(data.activeTimeLimit)}
                  </p>
                </div>
              </div>
            </div>

            {/* Lifecycle Status */}
            {data.lifeCycleDetails?.[0] && (
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                padding: '32px'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a202c', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 0 24px 0'
                }}>
                  <span style={{ color: '#48bb78' }}><ClockIcon /></span>
                  Lifecycle Status
                </h2>
                
                {/* Blacklist Status */}
                <div style={{ 
                  padding: '20px', 
                  background: data.lifeCycleDetails[0].rBlacklistStatus === '1' ? '#fff5f5' : '#f0fff4',
                  borderRadius: '8px',
                  border: `2px solid ${data.lifeCycleDetails[0].rBlacklistStatus === '1' ? '#fc8181' : '#9ae6b4'}`,
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>Blacklist Status:</p>
                    <p style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: data.lifeCycleDetails[0].rBlacklistStatus === '1' ? '#c53030' : '#22543d',
                      margin: 0 
                    }}>
                      {data.lifeCycleDetails[0].rBlacklistStatus === '1' ? 'BLACKLIST' : 'NO'}
                    </p>
                  </div>
                </div>

                {/* Lifecycle Statuses */}
                {data.lifeCycleDetails[0].lifeCycleStatuses?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.lifeCycleDetails[0].lifeCycleStatuses.map((status, idx) => (
                      <div key={idx} style={{ 
                        padding: '20px', 
                        background: '#f7fafc', 
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                              {status.statusName}
                            </p>
                            <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                              Index: {status.statusIndex}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>Expires</p>
                            <p style={{ fontWeight: '600', color: '#1a202c', margin: 0 }}>
                              {formatDate(status.statusExpireTime)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Account Balance */}
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              padding: '32px'
            }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1a202c', 
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 0 24px 0'
              }}>
                <span style={{ color: '#ecc94b' }}><WalletIcon /></span>
                Account Balance
              </h2>
              {data.accountInfo?.balanceResult?.map((balance, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    padding: '24px', 
                    background: 'linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%)', 
                    borderRadius: '8px',
                    border: '1px solid #f6e05e'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div>
                        <p style={{ fontSize: '14px', color: '#744210', marginBottom: '4px' }}>
                          {balance.balanceTypeName}
                        </p>
                        <p style={{ fontSize: '12px', color: '#975a16', margin: 0 }}>
                          Type: {balance.balanceType}
                        </p>
                      </div>
                      <div style={{ 
                        padding: '4px 12px', 
                        background: balance.depositFlag === 'Y' ? '#c6f6d5' : '#fed7d7',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: balance.depositFlag === 'Y' ? '#22543d' : '#742a2a'
                      }}>
                        {balance.depositFlag === 'Y' ? 'DEPOSIT' : 'NO DEPOSIT'}
                      </div>
                    </div>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a202c', margin: '0 0 12px 0' }}>
                      {formatAmount(balance.totalAmount)} LAK
                    </p>
                    <p style={{ fontSize: '14px', color: '#744210', margin: 0 }}>
                      Reserved: {formatAmount(balance.reservedAmount)} LAK
                    </p>
                  </div>
                  {balance.balanceDetails?.map((detail, didx) => (
                    <div key={didx} style={{ 
                      marginTop: '8px', 
                      padding: '16px', 
                      background: '#f7fafc', 
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div>
                          <span style={{ color: '#718096' }}>Effective: </span>
                          <span style={{ color: '#1a202c' }}>{formatDate(detail.effectiveTime)}</span>
                        </div>
                        <div>
                          <span style={{ color: '#718096' }}>Expires: </span>
                          <span style={{ color: '#1a202c' }}>{formatDate(detail.expireTime)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Outstanding Bills */}
            {isPostpaid && data.accountInfo?.outStandingList?.length > 0 && (
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                padding: '32px'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a202c', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 0 24px 0'
                }}>
                  <span style={{ color: '#f56565' }}><CreditCardIcon /></span>
                  Outstanding Bills
                </h2>
                {data.accountInfo.outStandingList.map((bill, idx) => (
                  <div key={idx} style={{ 
                    padding: '20px', 
                    background: '#fff5f5', 
                    borderRadius: '8px',
                    border: '1px solid #feb2b2',
                    marginBottom: '12px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>Bill Cycle</p>
                        <p style={{ fontWeight: '600', color: '#1a202c', margin: 0 }}>{bill.billCycleID}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>Due Date</p>
                        <p style={{ fontWeight: '600', color: '#c53030', margin: 0 }}>
                          {formatDate(bill.dueDate)}
                        </p>
                      </div>
                    </div>
                    {bill.outStandingDetails?.map((detail, didx) => (
                      <div key={didx} style={{ marginTop: '8px' }}>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#c53030', margin: 0 }}>
                          {formatAmount(detail.outStandingAmount)} LAK
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Credit Info */}
            {isPostpaid && data.accountInfo?.accountCredit?.totalCreditAmount && (
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                padding: '32px'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a202c', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 0 24px 0'
                }}>
                  <span style={{ color: '#9f7aea' }}><CreditCardIcon /></span>
                  Credit Information
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '16px' 
                }}>
                  <div style={{ padding: '20px', background: '#faf5ff', borderRadius: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#553c9a', marginBottom: '8px' }}>Total Credit</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                      {formatAmount(data.accountInfo.accountCredit.totalCreditAmount)} LAK
                    </p>
                  </div>
                  <div style={{ padding: '20px', background: '#faf5ff', borderRadius: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#553c9a', marginBottom: '8px' }}>Used Amount</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                      {formatAmount(data.accountInfo.accountCredit.totalUsageAmount)} LAK
                    </p>
                  </div>
                  <div style={{ padding: '20px', background: '#faf5ff', borderRadius: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#553c9a', marginBottom: '8px' }}>Remaining</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#48bb78', margin: 0 }}>
                      {formatAmount(data.accountInfo.accountCredit.totalRemainAmount)} LAK
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Free Units */}
            {data.freeUnitInfos?.length > 0 && (
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                padding: '32px'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a202c', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 0 24px 0'
                }}>
                  <span style={{ color: '#5a67d8' }}><CalendarIcon /></span>
                  Free Units / Points
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {data.freeUnitInfos.map((unit, idx) => (
                    <div key={idx} style={{ 
                      padding: '20px', 
                      background: '#ebf4ff', 
                      borderRadius: '8px',
                      border: '1px solid #90cdf4'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'
                      }}>
                        <div>
                          <p style={{ fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                            {unit.freeUnitTypeName}
                          </p>
                          <p style={{ fontSize: '14px', color: '#2c5282', margin: 0 }}>
                            Unit: {unit.measureUnitName}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#5a67d8', margin: '0 0 4px 0' }}>
                            {formatAmount(unit.totalUnusedAmount)}
                          </p>
                          <p style={{ fontSize: '14px', color: '#2c5282', margin: 0 }}>
                            of {formatAmount(unit.totalInitialAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offering Instances */}
            {data.accounts?.[0]?.offeringInsts?.length > 0 && (
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                padding: '32px'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#1a202c', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 0 24px 0'
                }}>
                  <span style={{ color: '#805ad5' }}><CalendarIcon /></span>
                  Offering Instances
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {data.accounts[0].offeringInsts.map((offering, idx) => (
                    <div key={idx} style={{ 
                      padding: '20px', 
                      background: '#faf5ff', 
                      borderRadius: '8px',
                      border: '1px solid #d6bcfa'
                    }}>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <p style={{ fontWeight: '600', color: '#1a202c', margin: 0, fontSize: '18px' }}>
                              Offering ID: {offering.offeringID}
                            </p>
                            {offeringDetails[offering.offeringID] && (
                              <p style={{ fontSize: '14px', color: '#6b46c1', margin: 0 }}>
                                ({offeringDetails[offering.offeringID].offeringName})
                              </p>
                            )}
                            <button
                              onClick={() => fetchOfferingInfo(offering.offeringID)}
                              disabled={loadingOffering[offering.offeringID]}
                              style={{
                                padding: '6px 12px',
                                background: '#805ad5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: loadingOffering[offering.offeringID] ? 'not-allowed' : 'pointer',
                                opacity: loadingOffering[offering.offeringID] ? 0.6 : 1
                              }}
                            >
                              {loadingOffering[offering.offeringID] ? 'Loading...' : 'View Details'}
                            </button>
                          </div>
                          <div style={{ 
                            padding: '4px 12px', 
                            background: offering.status === '2' ? '#c6f6d5' : '#fed7d7',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: offering.status === '2' ? '#22543d' : '#742a2a'
                          }}>
                            {getStatusName(offering.status)}
                          </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#6b46c1', margin: '0 0 8px 0' }}>
                          Purchase Seq: {offering.purchaseSeq}
                        </p>
                      </div>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid #e9d8fd'
                      }}>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Class</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {offering.offeringClass}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Bundled Flag</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {offering.bundledFlag}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Activation Mode</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {offering.activationMode}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Effective Time</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {formatDate(offering.effectiveTime)}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Expiration Time</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {formatDate(offering.expirationTime)}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Activation Time</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                            {formatDate(offering.activationTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal for Offering Details */}
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
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              zIndex: 1000,
              padding: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                  Offering Details
                </h2>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#718096'
                  }}
                >
                  <CloseIcon />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Basic Info */}
                <div style={{ padding: '20px', background: '#faf5ff', borderRadius: '8px', border: '1px solid #d6bcfa' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#553c9a', margin: '0 0 16px 0' }}>
                    Basic Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Offering ID</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {selectedOffering.offeringID}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Offering Name</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {selectedOffering.offeringName}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Offering Code</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {selectedOffering.offeringCode}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Primary Flag</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {selectedOffering.primaryFlag}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Bundle Flag</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {selectedOffering.bundleFlag}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Payment Mode</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {selectedOffering.paymentMode === '0' ? 'Prepaid' : selectedOffering.paymentMode === '1' ? 'Postpaid' : selectedOffering.paymentMode}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Effective Date</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {formatDate(selectedOffering.effDate)}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b46c1', margin: '0 0 4px 0' }}>Expiration Date</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                        {formatDate(selectedOffering.expDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                {selectedOffering.products && selectedOffering.products.length > 0 && (
                  <div style={{ padding: '20px', background: '#ebf4ff', borderRadius: '8px', border: '1px solid #90cdf4' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2c5282', margin: '0 0 16px 0' }}>
                      Products ({selectedOffering.products.length})
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedOffering.products.map((product, idx) => (
                        <div key={idx} style={{ padding: '12px', background: 'white', borderRadius: '6px' }}>
                          <p style={{ fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                            {product.productName}
                          </p>
                          <p style={{ fontSize: '12px', color: '#4a5568', margin: 0 }}>
                            Code: {product.productCode} | ID: {product.productId}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Plans */}
                {selectedOffering.pricePlans && selectedOffering.pricePlans.length > 0 && (
                  <div style={{ padding: '20px', background: '#fff5f7', borderRadius: '8px', border: '1px solid #feb2b2' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#742a2a', margin: '0 0 16px 0' }}>
                      Price Plans ({selectedOffering.pricePlans.length})
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedOffering.pricePlans.map((plan, idx) => (
                        <div key={idx} style={{ padding: '12px', background: 'white', borderRadius: '6px' }}>
                          <p style={{ fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                            {plan.name}
                          </p>
                          <p style={{ fontSize: '12px', color: '#4a5568', margin: 0 }}>
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