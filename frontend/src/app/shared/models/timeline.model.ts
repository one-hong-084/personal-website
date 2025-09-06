export interface LocalizedText { zh: string; en: string; }

export interface TimelineItem {
  id: string;
  date: string;                 // YYYY-MM-DD
  title: LocalizedText;         // 标题（中/英）
  summary: LocalizedText;       // 摘要（中/英）
  image?: string;               // 新增：卡片配图（assets 路径或 URL）
  type?: 'award'|'product'|'replica'|'skill'|'milestone';  // 新增：语义分类
  tags?: string[];              // 新增：标签数组
  link?: string;                // 可选：点击跳转
}
