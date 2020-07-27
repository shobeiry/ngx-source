import {Injectable} from '@angular/core';
import {SourceType} from './ngx-source-type.model';
import {ISource} from './ngx-source.model';

declare var document: any;

@Injectable({
  providedIn: 'root',
})
export class NgxSourceService {

  private sources: ISource[];

  constructor(sources: ISource[]) {
    this.sources = [];
    this.addSources(...sources);
  }

  public addSources(...sources: ISource[]): void {
    sources.forEach((source: ISource) => this.addSource(source));
  }

  public addSource(source: ISource): void {
    const notExist = !this.sources.find((existSource: ISource) => existSource.name === source.name);
    if (notExist) {
      this.sources.push(source);
    }
  }

  public loadBySourceNames(...sourceNames: string[]): Promise<any> {
    const promises: any[] = [];
    sourceNames.forEach((sourceName) => promises.push(this.loadBySourceName(sourceName)));
    return Promise.all(promises);
  }

  public loadBySourceName(sourceName: string): Promise<any> {
    return new Promise((resolve) => {
      const source = this.sources.find((value) => value.name === sourceName);
      if (!source) { // resolve if not find
        resolve({script: sourceName, loaded: false, status: 'Not Find in Source Store'});
      } else {
        return Promise.all([this.loadSource(source)]);
      }
    });
  }

  public loadSource(source: ISource): Promise<any> {
    this.addSource(source);
    return new Promise<any>((resolve) => {
      if (source.loaded) { // resolve if already loaded
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      } else {
        let element: any;
        if (source.type === SourceType.STYLE) { // load style
          element = document.createElement('link');
          element.rel = 'stylesheet';
          element.href = source.src;
        } else { // load script
          element = document.createElement('script');
          element.type = 'text/javascript';
          element.src = source.src;
        }

        if (element.readyState) {  // IE
          element.onreadystatechange = () => {
            if (element.readyState === 'loaded' || element.readyState === 'complete') {
              element.onreadystatechange = null;
              source.loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  // Others
          element.onload = () => {
            source.loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        element.onerror = () => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(element);
      }
    });
  }

}
