import { useState, useEffect } from 'react';
import '../styles/popup.css';

type SummaryPanelProps = {
  pageUrl: string;
};

export function SummaryPanel({ pageUrl }: SummaryPanelProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSummary();
  }, [pageUrl]);

  const fetchSummary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 模拟获取页面总结
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 在实际应用中，这里会调用AI API获取页面内容并生成总结
      const mockSummary = "这是页面内容的总结示例。在实际应用中，这里会显示由AI生成的真实页面总结。总结会包含页面的主要内容、关键点和重要信息。";

      setSummary(mockSummary);
    } catch (err) {
      setError('获取页面总结失败，请重试。');
      console.error('Error fetching summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="summary-panel">
      <div className="summary-header">
        <div className="summary-title">页面总结</div>
        <button className="refresh-button" onClick={fetchSummary} disabled={isLoading}>
          {isLoading ? '刷新中...' : '刷新'}
        </button>
      </div>

      {isLoading ? (
        <div className="summary-loading">正在生成总结...</div>
      ) : error ? (
        <div className="summary-error">
          {error}
          <button onClick={fetchSummary}>重试</button>
        </div>
      ) : summary ? (
        <div className="summary-content">
          {summary}
        </div>
      ) : (
        <div className="summary-error">无法生成总结</div>
      )}
    </div>
  );
}