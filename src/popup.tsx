import { useState, useEffect } from 'react';
import './styles/popup.css';
import { ConversationPanel } from './components/ConversationPanel';
import { SummaryPanel } from './components/SummaryPanel';


export default function Popup() {
  const [activeTab, setActiveTab] = useState<'conversation' | 'summary'>('conversation');
  const [isLoading, setIsLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<{
    title: string;
    url: string;
    canGoBack: boolean;
    canGoForward: boolean;
  } | null>(null);

  useEffect(() => {
    // 获取当前页面信息
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        setPageInfo({
          title: tabs[0].title || 'Unknown Page',
          url: tabs[0].url || '',
          canGoBack: tabs[0].canGoBack || false,
          canGoForward: tabs[0].canGoForward || false,
        });
        setIsLoading(false);
      }
    });
  }, []);

  const handleTabChange = (tab: 'conversation' | 'summary') => {
    setActiveTab(tab);
  };

  const handleGoBack = () => {
    chrome.tabs.goBack();
  };

  const handleGoForward = () => {
    chrome.tabs.goForward();
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="popup-container">
      <div className="header">
        <h1>Web AI Assistant</h1>
        <div className="page-info">
          <div className="page-title">{pageInfo?.title}</div>
          <div className="page-controls">
            <button
              onClick={handleGoBack}
              disabled={!pageInfo?.canGoBack}
              className={!pageInfo?.canGoBack ? 'disabled' : ''}
            >
              ←
            </button>
            <button
              onClick={handleGoForward}
              disabled={!pageInfo?.canGoForward}
              className={!pageInfo?.canGoForward ? 'disabled' : ''}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'conversation' ? 'active' : ''}
          onClick={() => handleTabChange('conversation')}
        >
          对话
        </button>
        <button
          className={activeTab === 'summary' ? 'active' : ''}
          onClick={() => handleTabChange('summary')}
        >
          页面总结
        </button>
      </div>

      <div className="content">
        {activeTab === 'conversation' && <ConversationPanel />}
        {activeTab === 'summary' && <SummaryPanel pageUrl={pageInfo?.url || ''} />}
      </div>
    </div>
  );
}