// 自定义Chrome Tab接口扩展
import { Tab } from 'chrome';

declare module 'chrome' {
  export interface Tab {
    /**
     * 是否可以后退
     */
    canGoBack: boolean;
    
    /**
     * 是否可以前进
     */
    canGoForward: boolean;
  }
}