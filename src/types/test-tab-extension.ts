// 测试Tab接口扩展
import { Tab } from 'chrome';

// 测试Tab接口是否包含canGoBack和canGoForward属性
export function testTabExtension() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      // 这些属性应该不会产生类型错误
      console.log('Can go back:', tabs[0].canGoBack);
      console.log('Can go forward:', tabs[0].canGoForward);
    }
  });
}