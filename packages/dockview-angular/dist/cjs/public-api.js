"use strict";
/*
 * Public API Surface of dockview-angular
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Re-export everything from dockview-core
__exportStar(require("dockview-core"), exports);
// Angular module
__exportStar(require("./lib/dockview-angular.module"), exports);
// Components
__exportStar(require("./lib/dockview/dockview-angular.component"), exports);
__exportStar(require("./lib/gridview/gridview-angular.component"), exports);
__exportStar(require("./lib/paneview/paneview-angular.component"), exports);
__exportStar(require("./lib/splitview/splitview-angular.component"), exports);
// Utilities
__exportStar(require("./lib/utils/angular-renderer"), exports);
__exportStar(require("./lib/utils/component-factory"), exports);
__exportStar(require("./lib/utils/lifecycle-utils"), exports);
