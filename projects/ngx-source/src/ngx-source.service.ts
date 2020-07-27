import {Injectable} from '@angular/core';
import {SourceType} from './ngx-source-type.model';
import {ISource} from './ngx-source.model';


declare var document: any;

@Injectable({
  providedIn: 'root',
})
export class NgxSourceService {

    private sources: ISource[] = [];

    constructor() {
    }

    public addSource(...sources: ISource[]): void {
        sources.forEach((source) => this.sources.push(source));
    }

    public load(...scripts: string[]): Promise<any> {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    public loadScript(name: string): Promise<any> {
        return new Promise((resolve) => {
            const source = this.sources.find((value) => value.name === name);
            if (!source) { // resolve if not find
                resolve({script: name, loaded: false, status: 'Not Find in Source Store'});
            } else if (source.loaded) { // resolve if already loaded
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
