import { Injectable, signal } from '@angular/core';

export type Language = 'zh' | 'en';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly STORAGE_KEY = 'preferred-language';
  private readonly DEFAULT_LANGUAGE: Language = 'zh';
  
  // 使用 Angular signal 来管理当前语言状态
  private currentLanguage = signal<Language>(this.getInitialLanguage());
  
  constructor() {
    // 初始化时保存当前语言到 localStorage
    const initialLang = this.currentLanguage();
    localStorage.setItem(this.STORAGE_KEY, initialLang);
  }

  /**
   * 获取当前语言
   */
  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }

  /**
   * 获取当前语言的 signal
   */
  getCurrentLanguageSignal() {
    return this.currentLanguage.asReadonly();
  }

  /**
   * 切换语言
   */
  switchLanguage(language: Language): void {
    this.currentLanguage.set(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }

  /**
   * 获取双语对象中的当前语言内容
   * @param content 包含 zh 和 en 的对象
   * @returns 当前语言的内容
   */
  getLocalizedContent<T>(content: { zh: T; en: T } | T): T {
    if (typeof content === 'object' && content !== null && 'zh' in content && 'en' in content) {
      return content[this.currentLanguage()];
    }
    return content as T;
  }

  /**
   * 获取双语数组中的当前语言内容
   * @param items 双语数组
   * @returns 当前语言的内容数组
   */
  getLocalizedItems<T>(items: { zh: T[]; en: T[] } | T[]): T[] {
    if (Array.isArray(items)) {
      return items;
    }
    if (typeof items === 'object' && items !== null && 'zh' in items && 'en' in items) {
      return items[this.currentLanguage()];
    }
    return [];
  }

  /**
   * 获取初始语言设置
   */
  private getInitialLanguage(): Language {
    // 优先从 localStorage 获取用户偏好
    const saved = localStorage.getItem(this.STORAGE_KEY) as Language;
    if (saved && (saved === 'zh' || saved === 'en')) {
      return saved;
    }

    // 其次从浏览器语言设置获取
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    if (browserLang.startsWith('en')) {
      return 'en';
    }

    // 默认返回中文
    return this.DEFAULT_LANGUAGE;
  }
}
