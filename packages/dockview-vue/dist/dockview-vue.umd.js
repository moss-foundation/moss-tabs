(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("dockview-core"), require("vue")) : typeof define === "function" && define.amd ? define(["exports", "dockview-core", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["dockview-vue"] = {}, global.DockviewCore, global.Vue));
})(this, function(exports2, dockviewCore, vue) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  function findComponent(parent, name) {
    var _a, _b;
    let instance = parent;
    let component = null;
    while (!component && instance) {
      component = (_a = instance.components) == null ? void 0 : _a[name];
      instance = instance.parent;
    }
    if (!component) {
      component = (_b = parent.appContext.components) == null ? void 0 : _b[name];
    }
    if (!component) {
      throw new Error(`Failed to find Vue Component '${name}'`);
    }
    return component;
  }
  function mountVueComponent(component, parent, props, element) {
    let vNode = vue.createVNode(component, Object.freeze(props));
    vNode.appContext = parent.appContext;
    vNode.appContext.provides = {
      ...vNode.appContext.provides ? vNode.appContext.provides : {},
      ...parent.provides ? parent.provides : {}
    };
    vue.render(vNode, element);
    let runningProps = props;
    return {
      update: (newProps) => {
        runningProps = { ...props, ...newProps };
        vNode = vue.cloneVNode(vNode, runningProps);
        vue.render(vNode, element);
      },
      dispose: () => {
        vue.render(null, element);
      }
    };
  }
  class AbstractVueRenderer {
    constructor(component, parent) {
      __publicField(this, "_element");
      this.component = component;
      this.parent = parent;
      this._element = document.createElement("div");
      this.element.className = "dv-vue-part";
      this.element.style.height = "100%";
      this.element.style.width = "100%";
    }
    get element() {
      return this._element;
    }
  }
  class VueRenderer extends AbstractVueRenderer {
    constructor() {
      super(...arguments);
      __publicField(this, "_renderDisposable");
      __publicField(this, "_api");
      __publicField(this, "_containerApi");
    }
    init(parameters) {
      var _a;
      this._api = parameters.api;
      this._containerApi = parameters.containerApi;
      const props = {
        params: parameters.params,
        api: parameters.api,
        containerApi: parameters.containerApi,
        tabLocation: parameters.tabLocation
      };
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.component,
        this.parent,
        { params: props },
        this.element
      );
    }
    update(event) {
      var _a;
      if (!this._api || !this._containerApi) {
        return;
      }
      const params = event.params;
      (_a = this._renderDisposable) == null ? void 0 : _a.update({
        params: {
          params,
          api: this._api,
          containerApi: this._containerApi
        }
      });
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  class VueWatermarkRenderer extends AbstractVueRenderer {
    constructor() {
      super(...arguments);
      __publicField(this, "_renderDisposable");
    }
    get element() {
      return this._element;
    }
    init(parameters) {
      var _a;
      const props = {
        group: parameters.group,
        containerApi: parameters.containerApi
      };
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.component,
        this.parent,
        { params: props },
        this.element
      );
    }
    update(event) {
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  class VueHeaderActionsRenderer extends AbstractVueRenderer {
    constructor(component, parent, group) {
      super(component, parent);
      __publicField(this, "_renderDisposable");
    }
    get element() {
      return this._element;
    }
    init(props) {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
      this._renderDisposable = mountVueComponent(
        this.component,
        this.parent,
        { params: props },
        this.element
      );
    }
    dispose() {
      var _a;
      (_a = this._renderDisposable) == null ? void 0 : _a.dispose();
    }
  }
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "dockview",
    props: {
      disableAutoResizing: { type: Boolean },
      hideBorders: { type: Boolean },
      singleTabMode: {},
      disableFloatingGroups: { type: Boolean },
      floatingGroupBounds: {},
      popoutUrl: {},
      defaultRenderer: {},
      debug: { type: Boolean },
      dndEdges: { type: [Boolean, Object] },
      rootOverlayModel: {},
      disableDnd: { type: Boolean },
      locked: { type: Boolean },
      className: {},
      noPanelsOverlay: {},
      theme: {},
      disableTabsOverflowList: { type: Boolean },
      scrollbars: {},
      watermarkComponent: {},
      defaultTabComponent: {},
      rightHeaderActionsComponent: {},
      leftHeaderActionsComponent: {},
      prefixHeaderActionsComponent: {}
    },
    emits: ["ready"],
    setup(__props, { emit: __emit }) {
      function extractCoreOptions(props2) {
        const coreOptions = dockviewCore.PROPERTY_KEYS_DOCKVIEW.reduce(
          (obj, key) => {
            obj[key] = props2[key];
            return obj;
          },
          {}
        );
        return coreOptions;
      }
      const emit = __emit;
      const props = __props;
      const el = vue.ref(null);
      const instance = vue.ref(null);
      dockviewCore.PROPERTY_KEYS_DOCKVIEW.forEach((coreOptionKey) => {
        vue.watch(
          () => props[coreOptionKey],
          (newValue, oldValue) => {
            if (instance.value) {
              instance.value.updateOptions({ [coreOptionKey]: newValue });
            }
          }
        );
      });
      vue.onMounted(() => {
        if (!el.value) {
          throw new Error("dockview-vue: element is not mounted");
        }
        const inst = vue.getCurrentInstance();
        if (!inst) {
          throw new Error("dockview-vue: getCurrentInstance() returned null");
        }
        const frameworkOptions = {
          createComponent(options) {
            const component = findComponent(
              inst,
              options.name
            );
            return new VueRenderer(component, inst);
          },
          createTabComponent(options) {
            let component = findComponent(inst, options.name);
            if (!component && props.defaultTabComponent) {
              component = findComponent(
                inst,
                props.defaultTabComponent
              );
            }
            if (component) {
              return new VueRenderer(component, inst);
            }
            return void 0;
          },
          createWatermarkComponent: props.watermarkComponent ? () => {
            const component = findComponent(
              inst,
              props.watermarkComponent
            );
            return new VueWatermarkRenderer(
              component,
              inst
            );
          } : void 0,
          createLeftHeaderActionComponent: props.leftHeaderActionsComponent ? (group) => {
            const component = findComponent(
              inst,
              props.leftHeaderActionsComponent
            );
            return new VueHeaderActionsRenderer(
              component,
              inst,
              group
            );
          } : void 0,
          createPrefixHeaderActionComponent: props.prefixHeaderActionsComponent ? (group) => {
            const component = findComponent(
              inst,
              props.prefixHeaderActionsComponent
            );
            return new VueHeaderActionsRenderer(
              component,
              inst,
              group
            );
          } : void 0,
          createRightHeaderActionComponent: props.rightHeaderActionsComponent ? (group) => {
            const component = findComponent(
              inst,
              props.rightHeaderActionsComponent
            );
            return new VueHeaderActionsRenderer(
              component,
              inst,
              group
            );
          } : void 0
        };
        const api = dockviewCore.createDockview(el.value, {
          ...extractCoreOptions(props),
          ...frameworkOptions
        });
        const { clientWidth, clientHeight } = el.value;
        api.layout(clientWidth, clientHeight);
        instance.value = vue.markRaw(api);
        emit("ready", { api });
      });
      vue.onBeforeUnmount(() => {
        if (instance.value) {
          instance.value.dispose();
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "el",
          ref: el
        }, null, 512);
      };
    }
  });
  exports2.DockviewVue = _sfc_main;
  Object.keys(dockviewCore).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k))
      Object.defineProperty(exports2, k, {
        enumerable: true,
        get: () => dockviewCore[k]
      });
  });
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
