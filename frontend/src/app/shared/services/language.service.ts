import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'zh' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _current$ = new BehaviorSubject<Lang>('zh');
  readonly current$ = this._current$.asObservable();

  get value(): Lang { return this._current$.value; }
  set(value: Lang) { this._current$.next(value); }
  toggle() { this.set(this.value === 'zh' ? 'en' : 'zh'); }
}
