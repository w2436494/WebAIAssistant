// background.ts
// 后台脚本，负责处理插件的全局事件和通信

// 监听来自内容脚本和弹出页面的消息
chrome.runtime.onMessage.addListener((
  request: { action: string; pageUrl?: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  console.log('Received message:', request);

  switch (request.action) {
    case 'openPopup':
      // 打开插件弹出页面
      chrome.action.openPopup();
      sendResponse({ success: true });
      break;

    case 'getPageInfo':
      // 获取当前页面信息
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          sendResponse({
            title: tabs[0].title,
            url: tabs[0].url,
            canGoBack: tabs[0].canGoBack,
            canGoForward: tabs[0].canGoForward,
          });
        } else {
          sendResponse({ error: 'No active tab found' });
        }
      });
      return true; // 表示异步响应

    case 'navigateBack':
      // 导航到上一页
      chrome.tabs.goBack();
      sendResponse({ success: true });
      break;

    case 'navigateForward':
      // 导航到下一页
      chrome.tabs.goForward();
      sendResponse({ success: true });
      break;

    case 'generateSummary':
      // 生成页面总结
      if (request.pageUrl) {
        // 在实际应用中，这里会调用AI API生成总结
        // 模拟API调用
        setTimeout(() => {
          const mockSummary = "这是一个模拟的页面总结。在实际应用中，这里会显示由AI生成的真实页面总结。";
          sendResponse({ summary: mockSummary });
        }, 1500);
      } else {
        sendResponse({ error: 'Page URL is required' });
      }
      return true; // 表示异步响应

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    console.log('Tab updated:', tab.url);
    // 可以在这里触发页面分析或其他操作
  }
});

// 监听标签页激活事件
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    console.log('Tab activated:', tab.url);
    // 可以在这里更新插件状态
  });
});

console.log('Web AI Assistant background script loaded');

// 初始化插件状态
const initExtension = () => {
  console.log('Web AI Assistant initialized');
  // 可以在这里执行初始化操作
};

// 启动初始化
initExtension();