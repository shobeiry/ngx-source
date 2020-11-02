# ngx source
angular source, can load js and css in runtime

[![npm version](https://badge.fury.io/js/ngx-source.svg)](http://badge.fury.io/js/ngx-source)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/ngx-source.svg)](https://github.com/mehrabisajad/ngx-source/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/ngx-source.svg)](https://github.com/mehrabisajad/ngx-source/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/ngx-source/master/LICENSE)

## Installation

Install through npm:
```
npm install --save ngx-source
```

use in one of your apps components:
```typescript
import { Component, OnInit } from '@angular/core'; 
import { Source, SourceType, NgxSourceService } from 'ngx-source';

@Component({
  template: 'your-component'
})
export class YourComponent implements OnInit {

    constructor(private ngxSourceService: NgxSourceService) {
        this.ngxSourceService.addSources([
            new Source('yourJsName', '/js/yourJsFile.js', SourceType.SCRIPT),
            new Source('yourCssName', '/css/yourCssFile.js', SourceType.STYLE)
        ]);
    }
    
    async ngOnInit() {
        await this.ngxSourceService.loadBySourceName('yourJsName');
        await this.ngxSourceService.loadBySourceName('yourCssName');
        
        // or

        await this.ngxSourceService.loadBySourceNames('yourJsName', 'yourCssName');
    }   
}
```
