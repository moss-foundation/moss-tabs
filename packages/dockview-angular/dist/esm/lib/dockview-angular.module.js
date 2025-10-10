var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockviewAngularComponent } from './dockview/dockview-angular.component';
import { GridviewAngularComponent } from './gridview/gridview-angular.component';
import { PaneviewAngularComponent } from './paneview/paneview-angular.component';
import { SplitviewAngularComponent } from './splitview/splitview-angular.component';
let DockviewAngularModule = class DockviewAngularModule {
};
DockviewAngularModule = __decorate([
    NgModule({
        declarations: [
            DockviewAngularComponent,
            GridviewAngularComponent,
            PaneviewAngularComponent,
            SplitviewAngularComponent
        ],
        imports: [
            CommonModule
        ],
        exports: [
            DockviewAngularComponent,
            GridviewAngularComponent,
            PaneviewAngularComponent,
            SplitviewAngularComponent
        ]
    })
], DockviewAngularModule);
export { DockviewAngularModule };
