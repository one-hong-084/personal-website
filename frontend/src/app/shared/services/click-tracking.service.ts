import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ClickStats {
  [itemId: string]: number;
}

export type ClickType = 'project' | 'blog' | 'timeline';

@Injectable({
  providedIn: 'root'
})
export class ClickTrackingService {
  private readonly STORAGE_KEY = 'click_stats';
  private clickStatsSubject = new BehaviorSubject<ClickStats>(this.loadStats());
  
  public clickStats$ = this.clickStatsSubject.asObservable();

  constructor() {}

  /**
   * 记录点击
   */
  trackClick(itemId: string, type: ClickType = 'project'): void {
    const currentStats = this.clickStatsSubject.value;
    const newStats = {
      ...currentStats,
      [itemId]: (currentStats[itemId] || 0) + 1
    };
    
    this.saveStats(newStats);
    this.clickStatsSubject.next(newStats);
  }

  /**
   * 记录项目点击（向后兼容）
   */
  trackProjectClick(projectId: string): void {
    this.trackClick(projectId, 'project');
  }

  /**
   * 记录博客点击
   */
  trackBlogClick(blogId: string): void {
    this.trackClick(blogId, 'blog');
  }

  /**
   * 记录时间线点击
   */
  trackTimelineClick(timelineId: string): void {
    this.trackClick(timelineId, 'timeline');
  }

  /**
   * 获取项目点击次数
   */
  getClickCount(projectId: string): number {
    return this.clickStatsSubject.value[projectId] || 0;
  }

  /**
   * 获取所有点击统计
   */
  getAllStats(): ClickStats {
    return this.clickStatsSubject.value;
  }

  /**
   * 获取点击次数排名前三的项目ID
   */
  getTopClickedProjects(projectIds: string[]): string[] {
    const stats = this.getAllStats();
    
    return projectIds
      .map(id => ({ id, clicks: stats[id] || 0 }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 3)
      .map(item => item.id);
  }

  /**
   * 从localStorage加载统计数据
   */
  private loadStats(): ClickStats {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to load click stats from localStorage:', error);
      return {};
    }
  }

  /**
   * 保存统计数据到localStorage
   */
  private saveStats(stats: ClickStats): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.warn('Failed to save click stats to localStorage:', error);
    }
  }

  /**
   * 重置统计数据（用于测试）
   */
  resetStats(): void {
    this.saveStats({});
    this.clickStatsSubject.next({});
  }
}
