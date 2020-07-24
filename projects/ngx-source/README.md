# ngx source
[![Build Status](https://travis-ci.org/mehrabisajad/ngx-source.svg?branch=master)](https://travis-ci.org/mehrabisajad/ngx-source)
[![codecov](https://codecov.io/gh/mehrabisajad/ngx-source/branch/master/graph/badge.svg)](https://codecov.io/gh/mehrabisajad/ngx-source)
[![npm version](https://badge.fury.io/js/ngx-source.svg)](http://badge.fury.io/js/ngx-source)
[![devDependency Status](https://david-dm.org/mehrabisajad/ngx-source/dev-status.svg)](https://david-dm.org/mehrabisajad/ngx-source?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/ngx-source.svg)](https://github.com/mehrabisajad/ngx-source/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/ngx-source.svg)](https://github.com/mehrabisajad/ngx-source/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/ngx-source/master/LICENSE)

## Table of contents

- [About](#about)
- [Installation](#installation)

## About

angular source, can load js and css in runtime

## Installation

Install through npm:
```
npm install --save ngx-source
```

use in one of your apps components:
```typescript
import { Component,OnInit } from '@angular/core';
import { Source, SourceType, NgxSourceService } from "ngx-source";

@Component({
  template: ''
})
export class MyComponent implements OnInit {

    constructor(private ngxSourceService: NgxSourceService) {
        this.ngxSourceService.addSource(
            new Source('jquery', '/js/jquery.js', SourceType.SCRIPT)
        );
    }
    
    async ngOnInit() {
        await this.ngxSourceService.load('jquery');
        
        // use it
    }   


}
```
