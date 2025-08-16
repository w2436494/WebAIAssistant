// 这个文件是内容脚本，会被注入到网页中
// 它可以访问和修改网页DOM，但不能直接访问Chrome扩展API

// 与后台脚本通信的函数
const sendMessageToBackground = (message: { action: string; [key: string]: any }) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
};

// 获取页面内容的函数
const getPageContent = () => {
  // 获取可见区域的文本内容
  const bodyText = document.body.innerText;

  // 获取页面标题
  const title = document.title;

  // 获取页面URL
  const url = window.location.href;

  return {
    title,
    url,
    bodyText,
  };
};

// 监听来自扩展的消息
chrome.runtime.onMessage.addListener((
  request: { action: string; [key: string]: any },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  if (request.action === 'getPageContent') {
    const pageContent = getPageContent();
    sendResponse(pageContent);
  }
  return true;
});

console.log('Web AI Assistant content script loaded');

// 这里可以添加UI组件，如果需要在网页中显示内容
// 例如，可以创建一个悬浮按钮

// 创建一个简单的悬浮按钮示例
const createFloatingButton = () => {
  const button = document.createElement('div');
  button.id = 'web-ai-assistant-button';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#4285f4';
  button.style.color = 'white';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.fontSize = '24px';
  button.style.cursor = 'pointer';
  button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  button.style.zIndex = '9999';
  button.textContent = 'AI';

  // 点击按钮时打开扩展 popup
  button.addEventListener('click', () => {
    sendMessageToBackground({
      action: 'openPopup',
    });
  });

  document.body.appendChild(button);
};

// 页面加载完成后创建悬浮按钮
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingButton);
} else {
  createFloatingButton();
}