import React, { useState } from 'react';
import BasicInformation from './BasicInformation';
import LifecycleStatus from './LifecycleStatus';
import AccountBalance from './AccountBalance';
import OutstandingBills from './OutstandingBills';
import CreditInformation from './CreditInformation';
import FreeUnits from './FreeUnits';
import OfferingInstances from './OfferingInstances';
import SupplementaryOfferings from './SupplementaryOfferings';
import OfferingModal from './OfferingModal';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

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

  const handleFetchOffering = (offeringID) => {
    fetchOfferingInfo(offeringID, false);
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header & Search */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
          padding: '24px',
          marginBottom: '20px'
        }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 'bold', color: '#1a202c', margin: '0 0 16px 0' }}>
            CBS Customer Information
          </h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={msisdn}
              onChange={(e) => setMsisdn(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter MSISDN (e.g., 2055539299)"
              style={{
                flex: '1 1 300px',
                minWidth: '200px',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
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
          <div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Column 1 - Basic Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <BasicInformation 
                  data={data}
                  offeringDetails={offeringDetails}
                  getStatusName={getStatusName}
                  getStatusColor={getStatusColor}
                  formatDate={formatDate}
                  isPrepaid={isPrepaid}
                  isPostpaid={isPostpaid}
                  onFetchOfferingInfo={handleFetchOffering}
                />
              </div>

              {/* Column 2 - Lifecycle Status */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <LifecycleStatus 
                  lifeCycleDetails={data.lifeCycleDetails}
                  formatDate={formatDate}
                />
              </div>

              {/* Column 3 - Account Balance & Outstanding Bills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <AccountBalance 
                  balanceResult={data.accountInfo?.balanceResult}
                  formatAmount={formatAmount}
                />
                {isPostpaid && (
                  <OutstandingBills 
                    outStandingList={data.accountInfo?.outStandingList}
                    formatDate={formatDate}
                    formatAmount={formatAmount}
                  />
                )}
              </div>

              {/* Column 4 - Credit Info & Free Units */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {isPostpaid && (
                  <CreditInformation 
                    accountCredit={data.accountInfo?.accountCredit}
                    formatAmount={formatAmount}
                  />
                )}
                <FreeUnits 
                  freeUnitInfos={data.freeUnitInfos}
                  formatAmount={formatAmount}
                />
              </div>
            </div>

            {/* Full Width - Offering Instances */}
            <OfferingInstances 
              offeringInsts={data.accounts?.[0]?.offeringInsts}
              offeringDetails={offeringDetails}
              loadingOffering={loadingOffering}
              getStatusName={getStatusName}
              formatDate={formatDate}
              onFetchOfferingInfo={handleFetchOffering}
            />

            {/* Full Width - Supplementary Offerings */}
            <SupplementaryOfferings 
              supplementaryOfferings={data.subscribers?.[0]?.supplementaryOfferings}
              offeringDetails={offeringDetails}
              loadingOffering={loadingOffering}
              getStatusName={getStatusName}
              formatDate={formatDate}
              onFetchOfferingInfo={handleFetchOffering}
            />
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <OfferingModal 
            selectedOffering={selectedOffering}
            formatDate={formatDate}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}