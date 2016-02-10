import 'npm/purecss/build/grids';
import 'npm/purecss/build/grids-responsive';
import 'stl/index';

import 'es6-shim/es6-shim.js';
import 'es6-promise/dist/es6-promise.js';
import 'reflect-metadata/Reflect.js';
import 'zone.js/dist/zone-microtask.js';
import 'zone.js/dist/long-stack-trace-zone.js';

import {Component, Directive, ElementRef, Renderer} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
	selector: 'app',
	directives: [

	],
	template: `
  <div>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>
    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
class App {
	name = 'Angular 2';
}

import {bootstrap} from 'angular2-universal-preview';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(App, [
	...ROUTER_PROVIDERS
]);