import { inject, Injectable } from '@angular/core';
import { SourceType } from './ngx-source-type.model';
import { ISource } from './ngx-source.model';
import { ISourceLoadResult } from './ngx-source-load-result.model';

@Injectable()
export class NgxSourceService {
  private readonly document = inject(Document);
  private readonly sources: Map<string, ISource> = new Map();

  public addSources(...sources: ISource[]): void {
    sources.forEach(source => this.addSource(source));
  }

  public addSource(source: ISource): void {
    if (!this.sources.has(source.name)) {
      this.sources.set(source.name, source);
    }
  }

  public loadBySourceNames(...sourceNames: string[]): Promise<ISourceLoadResult[]> {
    return Promise.all(sourceNames.map(name => this.loadBySourceName(name)));
  }

  public loadBySourceName(sourceName: string): Promise<ISourceLoadResult> {
    const source = this.sources.get(sourceName);
    if (!source) {
      return Promise.reject({
        script: sourceName,
        loaded: false,
        status: 'Not found in source store',
      });
    }
    return this.loadSource(source);
  }

  public loadSources(sources: ISource[]): Promise<ISourceLoadResult[]> {
    this.addSources(...sources);
    return Promise.all(sources.map(source => this.loadSource(source)));
  }

  public loadSource(source: ISource): Promise<ISourceLoadResult> {
    this.addSource(source);
    if (source.loaded) {
      return Promise.resolve({
        script: source.name,
        loaded: true,
        status: 'Already loaded',
      });
    }

    return new Promise<ISourceLoadResult>((resolve, reject) => {
      let element: HTMLLinkElement | HTMLScriptElement;

      if (source.type === SourceType.STYLE) {
        element = this.document.createElement('link');
        element.rel = 'stylesheet';
        element.href = source.src;
      } else {
        element = this.document.createElement('script');
        element.type = 'text/javascript';
        element.src = source.src;
      }

      element.onload = () => {
        source.loaded = true;
        resolve({
          script: source.name,
          loaded: true,
          status: 'Loaded',
        });
      };

      element.onerror = () => {
        reject({
          script: source.name,
          loaded: false,
          status: 'Load failed',
        });
      };

      this.document.head.appendChild(element);
    });
  }
}
