// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8wwSb":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "852b4c630ff99339";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"7Oq6l":[function(require,module,exports,__globalThis) {
var _javascriptJs = require("../src/mergeTools/languages/javascript/javascript.js");
const manipulator = new (0, _javascriptJs.javascriptManipulator)();
document.getElementById('mergeButton').addEventListener('click', merge);
async function merge() {
    const original = document.getElementById('original').value;
    const snippet = document.getElementById('snippet').value;
    await manipulator.setCode(original);
    await manipulator.parse();
    const result = await manipulator.mergeCode(snippet);
    document.getElementById('original').value = result;
    console.log(result);
}

},{"../src/mergeTools/languages/javascript/javascript.js":"6z78H"}],"6z78H":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "javascriptManipulator", ()=>javascriptManipulator);
var _escodegen = require("escodegen");
var _esprimaNext = require("esprima-next");
var _esprimaNextDefault = parcelHelpers.interopDefault(_esprimaNext);
var _estraverse = require("estraverse");
var _estraverseDefault = parcelHelpers.interopDefault(_estraverse);
const debug = true;
class javascriptManipulator {
    constructor(code = ''){
        this.code = code;
    }
    async setCode(code) {
        this.code = code;
        await this.parse();
        return this.code;
    }
    async mergeCode(newCode) {
        try {
            await (0, _esprimaNextDefault.default).parseScript(newCode, {
                tolerant: true,
                range: true,
                loc: true,
                attachComment: true
            });
        } catch (e) {
            console.error(e);
            debugLog('Error parsing the new code snippet');
            return false;
        }
        this.code = this.code + '\n\n\n\n' + newCode;
        await this.parse();
        await this.mergeDuplicates();
        return await this.generateCode();
    }
    async mergeDuplicates() {
        try {
            await this.parse();
            console.log('parsed');
            await this.cleanUpComments();
            console.log('cleaned up comments');
            await this.makeAllFunctionsExported();
            console.log('made all functions exported');
            await this.makeAllClassesExported();
            console.log('made all classes exported');
            await this.mergeDuplicateImports();
            console.log('merged duplicate imports');
            await this.mergeDuplicateVariables();
            console.log('merged duplicate variables');
            await this.mergeDuplicateFunctions();
            console.log('merged duplicate functions');
            await this.mergeDuplicateClasses();
            console.log('merged duplicate classes');
            await this.removeEmptyExports();
            console.log('removed empty exports');
            return await this.generateCode();
        } catch (e) {
            console.error(e);
            debugLog('Error parsing the new code snippet');
            return false;
        }
    }
    async removeEmptyExports() {
        // Remove empty export statements
        await (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                if (node.type === 'ExportNamedDeclaration' && !node.declaration && (!node.specifiers || node.specifiers.length === 0)) return this.removeNodeFromParent(node, parent);
                return node;
            }
        });
    }
    async mergeDuplicateFunctions() {
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        const functionMap = new Map();
        // Traverse the AST to collect all function declarations
        (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.type === 'FunctionDeclaration') {
                    const functionName = node.id.name;
                    debugLog(`Processing function: ${functionName}`);
                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);
                        debugLog(`Duplicate function found: ${functionName}`);
                        // Check if the new function contains code
                        const hasCode = node.body.body && node.body.body.length > 0;
                        const existingHasCode = existingFunction.body.body && existingFunction.body.body.length > 0;
                        // Handle JSDoc comments
                        const jsDocComment = node.leadingComments?.find((comment)=>comment.type === 'Block' && comment.value.startsWith('*'));
                        if (hasCode) {
                            debugLog(`Replacing existing function '${functionName}' with new implementation.`);
                            functionMap.set(functionName, node);
                            // Update map to hold the new function
                            // Copy JSDoc comments from the new function if exists
                            if (jsDocComment) existingFunction.leadingComments = [
                                ...existingFunction.leadingComments || [],
                                jsDocComment
                            ];
                        } else if (existingHasCode) debugLog(`Keeping existing function '${functionName}' as it has valid implementation.`);
                        else debugLog(`Both functions '${functionName}' are stubs; keeping the first one.`);
                        // Keep the original stub
                        // Mark the duplicate function for removal (the one that is lower in the file)
                        if (hasCode) existingFunction.remove = true;
                        else node.remove = true;
                    } else // If duplicate stubs, mark the later one for removal
                    {
                        debugLog(`Adding function '${functionName}' to map.`);
                        functionMap.set(functionName, node);
                    }
                }
            }
        });
        // Store the new function in the map
        // Remove marked duplicate functions
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                if (node.remove) {
                    debugLog(`Removing duplicate function: ${node.id.name}`);
                    return this.removeNodeFromParent(node, parent);
                }
                return node;
            }
        });
        // Check for exported functions and ensure they stay distinct
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node)=>{
                if (node.type === 'ExportNamedDeclaration' && node.declaration && node.declaration.type === 'FunctionDeclaration') {
                    const functionName = node.declaration.id.name;
                    debugLog(`Processing exported function: ${functionName}`);
                    if (functionMap.has(functionName)) {
                        const existingFunction = functionMap.get(functionName);
                        if (existingFunction !== node.declaration) {
                            debugLog(`Marking old exported function '${functionName}' for removal.`);
                            existingFunction.remove = true;
                        }
                    }
                }
            }
        });
        // Mark the old function for removal
        return this.ast;
    }
    async mergeDuplicateImports() {
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        const importMap = new Map();
        const importNodes = [];
        debugLog('Merging duplicate imports');
        // Traverse the AST to collect and combine imports
        (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node, parent)=>{
                if (node.type === 'ImportDeclaration') {
                    const source = node.source.value;
                    debugLog(`import {${node.specifiers.map((s)=>s.local.name).join(', ')}} from '${source}'`);
                    if (importMap.has(source)) {
                        // Merge specifiers from the duplicate import
                        const existingNode = importMap.get(source);
                        const existingSpecifiers = existingNode.specifiers;
                        const newSpecifiers = node.specifiers;
                        // Avoid duplicates in specifiers
                        newSpecifiers.forEach((specifier)=>{
                            if (!existingSpecifiers.some((existing)=>existing.local.name === specifier.local.name)) existingSpecifiers.push(specifier);
                        });
                        // Mark the duplicate node for removal
                        node.remove = true;
                    } else {
                        // Add the import to the map
                        importMap.set(source, node);
                        importNodes.push(node);
                    }
                }
            }
        });
        // Keep track of import nodes
        // Remove duplicate import nodes
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                if (node.type === 'ImportDeclaration' && node.remove) return this.removeNodeFromParent(node, parent);
                return node;
            }
        });
        // Move all imports to the top of the program
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node)=>{
                if (node.type === 'Program') {
                    // Remove all imports from their original position
                    node.body = node.body.filter((child)=>child.type !== 'ImportDeclaration');
                    // Add the combined import statements to the top
                    node.body.unshift(...importNodes);
                }
                return node;
            }
        });
        return this.ast;
    }
    async mergeDuplicateVariables() {
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        const variableMap = new Map();
        // Traverse the AST to collect root-level variable declarations
        (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node, parent)=>{
                // Only process root-level variable declarations
                if (node.type === 'VariableDeclaration' && parent.type === 'Program') node.declarations.forEach((declaration)=>{
                    const variableName = declaration.id.name;
                    if (variableMap.has(variableName)) {
                        const existingDeclaration = variableMap.get(variableName);
                        existingDeclaration.id = declaration.id;
                        existingDeclaration.init = declaration.init;
                        // Mark the new (later) declaration for removal
                        declaration.remove = true;
                    } else // Add the variable to the map
                    variableMap.set(variableName, declaration);
                });
            }
        });
        // Remove duplicate variable declarations
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                if (node.type === 'VariableDeclaration' && node.declarations.every((decl)=>decl.remove)) return this.removeNodeFromParent(node, parent);
                // Filter out removed declarations from VariableDeclaration nodes
                if (node.type === 'VariableDeclaration') node.declarations = node.declarations.filter((decl)=>!decl.remove);
                return node;
            }
        });
        return this.ast;
    }
    async mergeDuplicateClasses() {
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        const classMap = new Map();
        // Traverse the AST to collect all class declarations
        (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.type === 'ClassDeclaration') {
                    const className = node.id.name;
                    if (classMap.has(className)) {
                        const existingClass = classMap.get(className);
                        const existingMethods = new Map(existingClass.body.body.filter((method)=>method.type === 'MethodDefinition').map((method)=>[
                                method.key.name,
                                method
                            ]));
                        node.body.body.forEach((method)=>{
                            if (method.type === 'MethodDefinition') {
                                const methodName = method.key.name;
                                if (existingMethods.has(methodName)) {
                                    const existingMethod = existingMethods.get(methodName);
                                    // Handle JSDoc comments
                                    const jsDocComment = method.leadingComments?.find((comment)=>comment.type === 'Block' && comment.value.startsWith('*'));
                                    // Replace method only if the new method has code
                                    if (method.value.body && method.value.body.body.length > 0) {
                                        existingMethod.value = method.value;
                                        if (jsDocComment) existingMethod.leadingComments = [
                                            ...existingMethod.leadingComments || [],
                                            jsDocComment
                                        ];
                                    } else if (jsDocComment) existingMethod.leadingComments = [
                                        ...existingMethod.leadingComments || [],
                                        jsDocComment
                                    ];
                                } else // Add the new method if it does not exist
                                existingClass.body.body.push(method);
                            }
                        });
                        // Mark the current class for removal
                        node.remove = true;
                    } else // Add the class to the map
                    classMap.set(className, node);
                }
            }
        });
        // Remove duplicate classes
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                if (node.remove) return this.removeNodeFromParent(node, parent);
                return node;
            }
        });
        return this.ast;
    }
    async cleanUpComments() {
        // iterate over the AST and remove adjacent duplicate leading comments
        await (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.leadingComments) {
                    for(let i = 0; i < node.leadingComments.length - 1; i++)if (node.leadingComments[i].value === node.leadingComments[i + 1].value) node.leadingComments.splice(i, 1);
                }
            }
        });
        await (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.leadingComments) node.leadingComments = node.leadingComments.filter((comment)=>!comment.value.match(/... existing/i));
            }
        });
        // if a comment includes "" remove the string "" (case insensitive)
        await (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.leadingComments) node.leadingComments = node.leadingComments.map((comment)=>{
                    return {
                        type: comment.type,
                        value: comment.value.replace(/New method:/i, '')
                    };
                });
            }
        });
    }
    removeNodeFromParent(node, parent) {
        if (!parent) return null;
        if (Array.isArray(parent.body)) parent.body = parent.body.filter((child)=>child !== node);
        return null;
    }
    async makeAllClassesExported() {
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        await (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                // Check if the node is a class declaration
                if (node.type === 'ClassDeclaration') // If the parent is not already an export declaration, modify it
                {
                    if (!parent || parent.type !== 'ExportNamedDeclaration') {
                        // Wrap in ExportNamedDeclaration only if not already exported
                        // copy the comments from the function to the export statement
                        const leadingComments = node.leadingComments;
                        const trailingComments = node.trailingComments;
                        node.leadingComments = [];
                        node.trailingComments = [];
                        return {
                            type: 'ExportNamedDeclaration',
                            declaration: node,
                            specifiers: [],
                            source: null,
                            leadingComments,
                            trailingComments
                        };
                    }
                }
                return node;
            }
        });
        await this.generateCode();
        return this.ast;
    }
    async makeAllFunctionsExported() {
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        (0, _estraverseDefault.default).replace(this.ast, {
            enter: (node, parent)=>{
                // Check if the node is a FunctionDeclaration
                if (node.type === 'FunctionDeclaration') {
                    // Ensure the parent is the root Program node
                    if (parent && parent.type === 'Program') // If not already an ExportNamedDeclaration, wrap it
                    {
                        if (!parent.body.some((child)=>child.type === 'ExportNamedDeclaration' && child.declaration === node)) {
                            // Handle comments
                            const leadingComments = node.leadingComments || [];
                            const trailingComments = node.trailingComments || [];
                            node.leadingComments = [];
                            node.trailingComments = [];
                            return {
                                type: 'ExportNamedDeclaration',
                                declaration: node,
                                specifiers: [],
                                source: null,
                                leadingComments,
                                trailingComments
                            };
                        }
                    }
                }
                return node;
            }
        });
        await this.generateCode();
        return this.ast;
    }
    async parse() {
        this.ast = {};
        this.ast = await (0, _esprimaNextDefault.default).parseScript(this.code, {
            tolerant: true,
            range: true,
            loc: true,
            attachComment: true,
            sourceType: 'module'
        });
        // remove trailing comments from the original code except for the last one under the particular node
        (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.trailingComments) node.trailingComments = [];
            }
        });
        // iterate over the AST and remove adjacent duplicate leading comments
        (0, _estraverseDefault.default).traverse(this.ast, {
            enter: (node)=>{
                if (node.leadingComments) {
                    for(let i = 0; i < node.leadingComments.length - 1; i++)if (node.leadingComments[i].value === node.leadingComments[i + 1].value) node.leadingComments.splice(i, 1);
                }
            }
        });
        //debugLog(this.ast);
        return this.ast;
    }
    async generateCode() {
        //debugLog('Generating code', this.code);
        if (!this.ast) throw new Error('AST not parsed. Call the `parse` method first.');
        //debugLog(this.ast)
        const newCode = await _escodegen.generate(this.ast, {
            comment: true,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: true,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: true
            }
        });
        //debugLog(`this is the new code: ${newCode}`);
        //debugLog(this.ast);
        this.code = newCode;
        await this.parse();
        return this.code;
    }
}
async function debugLog(...args) {
    if (debug) console.log(...args);
}

},{"escodegen":"6jXBs","esprima-next":"8OjJS","estraverse":"dppLK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6jXBs":[function(require,module,exports,__globalThis) {
var global = arguments[3];
/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2020 Apple Inc. All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ /*global exports:true, require:true, global:true*/ (function() {
    'use strict';
    var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS;
    estraverse = require("799f69c44c76494b");
    esutils = require("860044db75801fad");
    Syntax = estraverse.Syntax;
    // Generation is done by generateExpression.
    function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type);
    }
    // Generation is done by generateStatement.
    function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type);
    }
    Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        Coalesce: 3,
        LogicalOR: 4,
        LogicalAND: 5,
        BitwiseOR: 6,
        BitwiseXOR: 7,
        BitwiseAND: 8,
        Equality: 9,
        Relational: 10,
        BitwiseSHIFT: 11,
        Additive: 12,
        Multiplicative: 13,
        Exponentiation: 14,
        Await: 15,
        Unary: 15,
        Postfix: 16,
        OptionalChaining: 17,
        Call: 18,
        New: 19,
        TaggedTemplate: 20,
        Member: 21,
        Primary: 22
    };
    BinaryPrecedence = {
        '??': Precedence.Coalesce,
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative,
        '**': Precedence.Exponentiation
    };
    //Flags
    var F_ALLOW_IN = 1, F_ALLOW_CALL = 2, F_ALLOW_UNPARATH_NEW = 4, F_FUNC_BODY = 8, F_DIRECTIVE_CTX = 16, F_SEMICOLON_OPT = 32, F_FOUND_COALESCE = 64;
    //Expression flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_ALLOW_CALL
    // F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
    //Statement flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_FUNC_BODY
    // F_DIRECTIVE_CTX
    // F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0x00, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false,
                preserveBlankLines: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null,
            sourceCode: null
        };
    }
    function stringRepeat(str, num) {
        var result = '';
        for(num |= 0; num > 0; num >>>= 1, str += str)if (num & 1) result += str;
        return result;
    }
    function hasLineTerminator(str) {
        return /[\r\n]/g.test(str);
    }
    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }
    function merge(target, override) {
        var key;
        for(key in override)if (override.hasOwnProperty(key)) target[key] = override[key];
        return target;
    }
    function updateDeeply(target, override) {
        var key, val;
        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }
        for(key in override)if (override.hasOwnProperty(key)) {
            val = override[key];
            if (isHashObject(val)) {
                if (isHashObject(target[key])) updateDeeply(target[key], val);
                else target[key] = updateDeeply({}, val);
            } else target[key] = val;
        }
        return target;
    }
    function generateNumber(value) {
        var result, point, temp, exponent, pos;
        if (value !== value) throw new Error('Numeric literal whose value is NaN');
        if (value < 0 || value === 0 && 1 / value < 0) throw new Error('Numeric literal whose value is negative');
        if (value === 1 / 0) return json ? 'null' : renumber ? '1e400' : '1e+400';
        result = '' + value;
        if (!renumber || result.length < 3) return result;
        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30 /* 0 */  && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while(temp.charCodeAt(temp.length + pos - 1) === 0x30 /* 0 */ )--pos;
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) temp += 'e' + exponent;
        if ((temp.length < result.length || hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length) && +temp === value) result = temp;
        return result;
    }
    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine
    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & -2) === 0x2028) return (previousIsBackslash ? 'u' : '\\u') + (ch === 0x2028 ? '2028' : '2029');
        else if (ch === 10 || ch === 13) return (previousIsBackslash ? '' : '\\') + (ch === 10 ? 'n' : 'r');
        return String.fromCharCode(ch);
    }
    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
        result = reg.toString();
        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) return result;
            flags = match[1];
            result = '';
            characterInBrack = false;
            previousIsBackslash = false;
            for(i = 0, iz = reg.source.length; i < iz; ++i){
                ch = reg.source.charCodeAt(i);
                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) characterInBrack = false;
                    } else {
                        if (ch === 47) result += '\\';
                        else if (ch === 91) characterInBrack = true;
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92; // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }
            return '/' + result + '/' + flags;
        }
        return result;
    }
    function escapeAllowedCharacter(code, next) {
        var hex;
        if (code === 0x08 /* \b */ ) return '\\b';
        if (code === 0x0C /* \f */ ) return '\\f';
        if (code === 0x09 /* \t */ ) return '\\t';
        hex = code.toString(16).toUpperCase();
        if (json || code > 0xFF) return '\\u' + '0000'.slice(hex.length) + hex;
        else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) return '\\0';
        else if (code === 0x000B /* \v */ ) return '\\x0B';
        else return '\\x' + '00'.slice(hex.length) + hex;
    }
    function escapeDisallowedCharacter(code) {
        if (code === 0x5C /* \ */ ) return '\\\\';
        if (code === 0x0A /* \n */ ) return '\\n';
        if (code === 0x0D /* \r */ ) return '\\r';
        if (code === 0x2028) return '\\u2028';
        if (code === 0x2029) return '\\u2029';
        throw new Error('Incorrectly classified character');
    }
    function escapeDirective(str) {
        var i, iz, code, quote;
        quote = quotes === 'double' ? '"' : '\'';
        for(i = 0, iz = str.length; i < iz; ++i){
            code = str.charCodeAt(i);
            if (code === 0x27 /* ' */ ) {
                quote = '"';
                break;
            } else if (code === 0x22 /* " */ ) {
                quote = '\'';
                break;
            } else if (code === 0x5C /* \ */ ) ++i;
        }
        return quote + str + quote;
    }
    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
        for(i = 0, len = str.length; i < len; ++i){
            code = str.charCodeAt(i);
            if (code === 0x27 /* ' */ ) ++singleQuotes;
            else if (code === 0x22 /* " */ ) ++doubleQuotes;
            else if (code === 0x2F /* / */  && json) result += '\\';
            else if (esutils.code.isLineTerminator(code) || code === 0x5C /* \ */ ) {
                result += escapeDisallowedCharacter(code);
                continue;
            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20 /* SP */  || !json && !escapeless && (code < 0x20 /* SP */  || code > 0x7E /* ~ */ ))) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }
        single = !(quotes === 'double' || quotes === 'auto' && doubleQuotes < singleQuotes);
        quote = single ? '\'' : '"';
        if (!(single ? singleQuotes : doubleQuotes)) return quote + result + quote;
        str = result;
        result = quote;
        for(i = 0, len = str.length; i < len; ++i){
            code = str.charCodeAt(i);
            if (code === 0x27 /* ' */  && single || code === 0x22 /* " */  && !single) result += '\\';
            result += String.fromCharCode(code);
        }
        return result + quote;
    }
    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */ function flattenToString(arr) {
        var i, iz, elem, result = '';
        for(i = 0, iz = arr.length; i < iz; ++i){
            elem = arr[i];
            result += Array.isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }
    /**
     * convert generated to a SourceNode when source maps are enabled.
     */ function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (Array.isArray(generated)) return flattenToString(generated);
            else return generated;
        }
        if (node == null) {
            if (generated instanceof SourceNode) return generated;
            else node = {};
        }
        if (node.loc == null) return new SourceNode(null, null, sourceMap, generated, node.name || null);
        return new SourceNode(node.loc.start.line, node.loc.start.column, sourceMap === true ? node.loc.source || null : sourceMap, generated, node.name || null);
    }
    function noEmptySpace() {
        return space ? space : ' ';
    }
    function join(left, right) {
        var leftSource, rightSource, leftCharCode, rightCharCode;
        leftSource = toSourceNodeWhenNeeded(left).toString();
        if (leftSource.length === 0) return [
            right
        ];
        rightSource = toSourceNodeWhenNeeded(right).toString();
        if (rightSource.length === 0) return [
            left
        ];
        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
        rightCharCode = rightSource.charCodeAt(0);
        if ((leftCharCode === 0x2B /* + */  || leftCharCode === 0x2D /* - */ ) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) || leftCharCode === 0x2F /* / */  && rightCharCode === 0x69 /* i */ ) return [
            left,
            noEmptySpace(),
            right
        ];
        else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) return [
            left,
            right
        ];
        return [
            left,
            space,
            right
        ];
    }
    function addIndent(stmt) {
        return [
            base,
            stmt
        ];
    }
    function withIndent(fn) {
        var previousBase;
        previousBase = base;
        base += indent;
        fn(base);
        base = previousBase;
    }
    function calculateSpaces(str) {
        var i;
        for(i = str.length - 1; i >= 0; --i){
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) break;
        }
        return str.length - 1 - i;
    }
    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;
        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;
        // first line doesn't have indentation
        for(i = 1, len = array.length; i < len; ++i){
            line = array[i];
            j = 0;
            while(j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j)))++j;
            if (spaces > j) spaces = j;
        }
        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') specialBase += ' ';
            base = specialBase;
        } else {
            if (spaces & 1) // /*
            //  *
            //  */
            // If spaces are odd number, above pattern is considered.
            // We waste 1 space.
            --spaces;
            previousBase = base;
        }
        for(i = 1, len = array.length; i < len; ++i){
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }
        base = previousBase;
        return array.join('\n');
    }
    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) return '//' + comment.value;
            else {
                // Always use LineTerminator
                var result = '//' + comment.value;
                if (!preserveBlankLines) result += '\n';
                return result;
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        return '/*' + comment.value + '*/';
    }
    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;
            if (preserveBlankLines) {
                comment = stmt.leadingComments[0];
                result = [];
                extRange = comment.extendedRange;
                range = comment.range;
                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;
                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }
                prevRange = range;
                for(i = 1, len = stmt.leadingComments.length; i < len; i++){
                    comment = stmt.leadingComments[i];
                    range = comment.range;
                    infix = sourceCode.substring(prevRange[1], range[0]);
                    count = (infix.match(/\n/g) || []).length;
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                    prevRange = range;
                }
                suffix = sourceCode.substring(range[1], extRange[1]);
                count = (suffix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
            } else {
                comment = stmt.leadingComments[0];
                result = [];
                if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) result.push('\n');
                result.push(generateComment(comment));
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push('\n');
                for(i = 1, len = stmt.leadingComments.length; i < len; ++i){
                    comment = stmt.leadingComments[i];
                    fragment = [
                        generateComment(comment)
                    ];
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) fragment.push('\n');
                    result.push(addIndent(fragment));
                }
            }
            result.push(addIndent(save));
        }
        if (stmt.trailingComments) {
            if (preserveBlankLines) {
                comment = stmt.trailingComments[0];
                extRange = comment.extendedRange;
                range = comment.range;
                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;
                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }
            } else {
                tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
                specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([
                    base,
                    result,
                    indent
                ]).toString()));
                for(i = 0, len = stmt.trailingComments.length; i < len; ++i){
                    comment = stmt.trailingComments[i];
                    if (tailingToStatement) {
                        // We assume target like following script
                        //
                        // var t = 20;  /**
                        //               * This is comment of t
                        //               */
                        if (i === 0) // first case
                        result = [
                            result,
                            indent
                        ];
                        else result = [
                            result,
                            specialBase
                        ];
                        result.push(generateComment(comment, specialBase));
                    } else result = [
                        result,
                        addIndent(generateComment(comment))
                    ];
                    if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result = [
                        result,
                        '\n'
                    ];
                }
            }
        }
        return result;
    }
    function generateBlankLines(start, end, result) {
        var j, newlineCount = 0;
        for(j = start; j < end; j++)if (sourceCode[j] === '\n') newlineCount++;
        for(j = 1; j < newlineCount; j++)result.push(newline);
    }
    function parenthesize(text, current, should) {
        if (current < should) return [
            '(',
            text,
            ')'
        ];
        return text;
    }
    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for(i = 1, iz = result.length; i < iz; i++)result[i] = newline + base + result[i];
        return result;
    }
    function generateVerbatim(expr, precedence) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];
        if (typeof verbatim === 'string') result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
        else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = verbatim.precedence != null ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, precedence);
        }
        return toSourceNodeWhenNeeded(result, expr);
    }
    function CodeGenerator() {}
    // Helpers.
    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
        var result, noLeadingComment, that = this;
        noLeadingComment = !extra.comment || !stmt.leadingComments;
        if (stmt.type === Syntax.BlockStatement && noLeadingComment) return [
            space,
            this.generateStatement(stmt, flags)
        ];
        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) return ';';
        withIndent(function() {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });
        return result;
    };
    CodeGenerator.prototype.maybeBlockSuffix = function(stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) return [
            result,
            space
        ];
        if (ends) return [
            result,
            base
        ];
        return [
            result,
            newline,
            base
        ];
    };
    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }
    function generateAsyncPrefix(node, spaceRequired) {
        return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
    }
    function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator;
        return isGenerator ? '*' + space : '';
    }
    function generateMethodPrefix(prop) {
        var func = prop.value, prefix = '';
        if (func.async) prefix += generateAsyncPrefix(func, !prop.computed);
        if (func.generator) // avoid space before method name
        prefix += generateStarSuffix(func) ? '*' : '';
        return prefix;
    }
    CodeGenerator.prototype.generatePattern = function(node, precedence, flags) {
        if (node.type === Syntax.Identifier) return generateIdentifier(node);
        return this.generateExpression(node, precedence, flags);
    };
    CodeGenerator.prototype.generateFunctionParams = function(node) {
        var i, iz, result, hasDefault;
        hasDefault = false;
        if (node.type === Syntax.ArrowFunctionExpression && !node.rest && (!node.defaults || node.defaults.length === 0) && node.params.length === 1 && node.params[0].type === Syntax.Identifier) // arg => { } case
        result = [
            generateAsyncPrefix(node, true),
            generateIdentifier(node.params[0])
        ];
        else {
            result = node.type === Syntax.ArrowFunctionExpression ? [
                generateAsyncPrefix(node, false)
            ] : [];
            result.push('(');
            if (node.defaults) hasDefault = true;
            for(i = 0, iz = node.params.length; i < iz; ++i){
                if (hasDefault && node.defaults[i]) // Handle default values.
                result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                else result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) result.push(',' + space);
            }
            if (node.rest) {
                if (node.params.length) result.push(',' + space);
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }
            result.push(')');
        }
        return result;
    };
    CodeGenerator.prototype.generateFunctionBody = function(node) {
        var result, expr;
        result = this.generateFunctionParams(node);
        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }
        if (node.expression) {
            result.push(space);
            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
            if (expr.toString().charAt(0) === '{') expr = [
                '(',
                expr,
                ')'
            ];
            result.push(expr);
        } else result.push(this.maybeBlock(node.body, S_TTFF));
        return result;
    };
    CodeGenerator.prototype.generateIterationForStatement = function(operator, stmt, flags) {
        var result = [
            'for' + (stmt.await ? noEmptySpace() + 'await' : '') + space + '('
        ], that = this;
        withIndent(function() {
            if (stmt.left.type === Syntax.VariableDeclaration) withIndent(function() {
                result.push(stmt.left.kind + noEmptySpace());
                result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
            });
            else result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
            result = join(result, operator);
            result = [
                join(result, that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)),
                ')'
            ];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    };
    CodeGenerator.prototype.generatePropertyKey = function(expr, computed) {
        var result = [];
        if (computed) result.push('[');
        result.push(this.generateExpression(expr, Precedence.Assignment, E_TTT));
        if (computed) result.push(']');
        return result;
    };
    CodeGenerator.prototype.generateAssignment = function(left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) flags |= F_ALLOW_IN;
        return parenthesize([
            this.generateExpression(left, Precedence.Call, flags),
            space + operator + space,
            this.generateExpression(right, Precedence.Assignment, flags)
        ], Precedence.Assignment, precedence);
    };
    CodeGenerator.prototype.semicolon = function(flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) return '';
        return ';';
    };
    // Statements.
    CodeGenerator.Statement = {
        BlockStatement: function(stmt, flags) {
            var range, content, result = [
                '{',
                newline
            ], that = this;
            withIndent(function() {
                // handle functions without any code
                if (stmt.body.length === 0 && preserveBlankLines) {
                    range = stmt.range;
                    if (range[1] - range[0] > 2) {
                        content = sourceCode.substring(range[0] + 1, range[1] - 1);
                        if (content[0] === '\n') result = [
                            '{'
                        ];
                        result.push(content);
                    }
                }
                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) bodyFlags |= F_DIRECTIVE_CTX;
                for(i = 0, iz = stmt.body.length; i < iz; ++i){
                    if (preserveBlankLines) {
                        // handle spaces before the first line
                        if (i === 0) {
                            if (stmt.body[0].leadingComments) {
                                range = stmt.body[0].leadingComments[0].extendedRange;
                                content = sourceCode.substring(range[0], range[1]);
                                if (content[0] === '\n') result = [
                                    '{'
                                ];
                            }
                            if (!stmt.body[0].leadingComments) generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                        }
                        // handle spaces between lines
                        if (i > 0) {
                            if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                        }
                    }
                    if (i === iz - 1) bodyFlags |= F_SEMICOLON_OPT;
                    if (stmt.body[i].leadingComments && preserveBlankLines) fragment = that.generateStatement(stmt.body[i], bodyFlags);
                    else fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        if (preserveBlankLines && i < iz - 1) // don't add a new line if there are leading coments
                        // in the next statement
                        {
                            if (!stmt.body[i + 1].leadingComments) result.push(newline);
                        } else result.push(newline);
                    }
                    if (preserveBlankLines) {
                        // handle spaces after the last line
                        if (i === iz - 1) {
                            if (!stmt.body[i].trailingComments) generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                        }
                    }
                }
            });
            result.push(addIndent('}'));
            return result;
        },
        BreakStatement: function(stmt, flags) {
            if (stmt.label) return 'break ' + stmt.label.name + this.semicolon(flags);
            return 'break' + this.semicolon(flags);
        },
        ContinueStatement: function(stmt, flags) {
            if (stmt.label) return 'continue ' + stmt.label.name + this.semicolon(flags);
            return 'continue' + this.semicolon(flags);
        },
        ClassBody: function(stmt, flags) {
            var result = [
                '{',
                newline
            ], that = this;
            withIndent(function(indent) {
                var i, iz;
                for(i = 0, iz = stmt.body.length; i < iz; ++i){
                    result.push(indent);
                    result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) result.push(newline);
                }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
            result.push(base);
            result.push('}');
            return result;
        },
        ClassDeclaration: function(stmt, flags) {
            var result, fragment;
            result = [
                'class'
            ];
            if (stmt.id) result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
            if (stmt.superClass) {
                fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(stmt.body, S_TFFT));
            return result;
        },
        DirectiveStatement: function(stmt, flags) {
            if (extra.raw && stmt.raw) return stmt.raw + this.semicolon(flags);
            return escapeDirective(stmt.directive) + this.semicolon(flags);
        },
        DoWhileStatement: function(stmt, flags) {
            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
            result = this.maybeBlockSuffix(stmt.body, result);
            return join(result, [
                'while' + space + '(',
                this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')' + this.semicolon(flags)
            ]);
        },
        CatchClause: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
                var guard;
                if (stmt.param) {
                    result = [
                        'catch' + space + '(',
                        that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                        ')'
                    ];
                    if (stmt.guard) {
                        guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                        result.splice(2, 0, ' if ', guard);
                    }
                } else result = [
                    'catch'
                ];
            });
            result.push(this.maybeBlock(stmt.body, S_TFFF));
            return result;
        },
        DebuggerStatement: function(stmt, flags) {
            return 'debugger' + this.semicolon(flags);
        },
        EmptyStatement: function(stmt, flags) {
            return ';';
        },
        ExportDefaultDeclaration: function(stmt, flags) {
            var result = [
                'export'
            ], bodyFlags;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            // export default HoistableDeclaration[Default]
            // export default AssignmentExpression[In] ;
            result = join(result, 'default');
            if (isStatement(stmt.declaration)) result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
            else result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
            return result;
        },
        ExportNamedDeclaration: function(stmt, flags) {
            var result = [
                'export'
            ], bodyFlags, that = this;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            // export VariableStatement
            // export Declaration[Default]
            if (stmt.declaration) return join(result, this.generateStatement(stmt.declaration, bodyFlags));
            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            if (stmt.specifiers) {
                if (stmt.specifiers.length === 0) result = join(result, '{' + space + '}');
                else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
                else {
                    result = join(result, '{');
                    withIndent(function(indent) {
                        var i, iz;
                        result.push(newline);
                        for(i = 0, iz = stmt.specifiers.length; i < iz; ++i){
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) result.push(',' + newline);
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
                    result.push(base + '}');
                }
                if (stmt.source) result = join(result, [
                    'from' + space,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ]);
                else result.push(this.semicolon(flags));
            }
            return result;
        },
        ExportAllDeclaration: function(stmt, flags) {
            // export * FromClause ;
            return [
                'export' + space,
                '*' + space,
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        },
        ExpressionStatement: function(stmt, flags) {
            var result, fragment;
            function isClassPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 5) !== 'class') return false;
                code = fragment.charCodeAt(5);
                return code === 0x7B /* '{' */  || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
            }
            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 8) !== 'function') return false;
                code = fragment.charCodeAt(8);
                return code === 0x28 /* '(' */  || esutils.code.isWhiteSpace(code) || code === 0x2A /* '*' */  || esutils.code.isLineTerminator(code);
            }
            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment.slice(0, 5) !== 'async') return false;
                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) return false;
                for(i = 6, iz = fragment.length; i < iz; ++i){
                    if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) break;
                }
                if (i === iz) return false;
                if (fragment.slice(i, i + 8) !== 'function') return false;
                code = fragment.charCodeAt(i + 8);
                return code === 0x28 /* '(' */  || esutils.code.isWhiteSpace(code) || code === 0x2A /* '*' */  || esutils.code.isLineTerminator(code);
            }
            result = [
                this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)
            ];
            // 12.4 '{', 'function', 'class' is not allowed in this position.
            // wrap expression with parentheses
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charCodeAt(0) === 0x7B /* '{' */  || // ObjectExpression
            isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string') result = [
                '(',
                result,
                ')' + this.semicolon(flags)
            ];
            else result.push(this.semicolon(flags));
            return result;
        },
        ImportDeclaration: function(stmt, flags) {
            // ES6: 15.2.1 valid import declarations:
            //     - import ImportClause FromClause ;
            //     - import ModuleSpecifier ;
            var result, cursor, that = this;
            // If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (stmt.specifiers.length === 0) // import ModuleSpecifier ;
            return [
                'import',
                space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
            // import ImportClause FromClause ;
            result = [
                'import'
            ];
            cursor = 0;
            // ImportedBinding
            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
                result = join(result, [
                    this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
                ++cursor;
            }
            if (stmt.specifiers[cursor]) {
                if (cursor !== 0) result.push(',');
                if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) // NameSpaceImport
                result = join(result, [
                    space,
                    this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
                else {
                    // NamedImports
                    result.push(space + '{');
                    if (stmt.specifiers.length - cursor === 1) {
                        // import { ... } from "...";
                        result.push(space);
                        result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                        result.push(space + '}' + space);
                    } else {
                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        withIndent(function(indent) {
                            var i, iz;
                            result.push(newline);
                            for(i = cursor, iz = stmt.specifiers.length; i < iz; ++i){
                                result.push(indent);
                                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                                if (i + 1 < iz) result.push(',' + newline);
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
                        result.push(base + '}' + space);
                    }
                }
            }
            result = join(result, [
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ]);
            return result;
        },
        VariableDeclarator: function(stmt, flags) {
            var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
            if (stmt.init) return [
                this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                space,
                '=',
                space,
                this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
            ];
            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
        },
        VariableDeclaration: function(stmt, flags) {
            // VariableDeclarator is typed as Statement,
            // but joined with comma (not LineTerminator).
            // So if comment is attached to target node, we should specialize.
            var result, i, iz, node, bodyFlags, that = this;
            result = [
                stmt.kind
            ];
            bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;
            function block() {
                node = stmt.declarations[0];
                if (extra.comment && node.leadingComments) {
                    result.push('\n');
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(noEmptySpace());
                    result.push(that.generateStatement(node, bodyFlags));
                }
                for(i = 1, iz = stmt.declarations.length; i < iz; ++i){
                    node = stmt.declarations[i];
                    if (extra.comment && node.leadingComments) {
                        result.push(',' + newline);
                        result.push(addIndent(that.generateStatement(node, bodyFlags)));
                    } else {
                        result.push(',' + space);
                        result.push(that.generateStatement(node, bodyFlags));
                    }
                }
            }
            if (stmt.declarations.length > 1) withIndent(block);
            else block();
            result.push(this.semicolon(flags));
            return result;
        },
        ThrowStatement: function(stmt, flags) {
            return [
                join('throw', this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)),
                this.semicolon(flags)
            ];
        },
        TryStatement: function(stmt, flags) {
            var result, i, iz, guardedHandlers;
            result = [
                'try',
                this.maybeBlock(stmt.block, S_TFFF)
            ];
            result = this.maybeBlockSuffix(stmt.block, result);
            if (stmt.handlers) // old interface
            for(i = 0, iz = stmt.handlers.length; i < iz; ++i){
                result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                if (stmt.finalizer || i + 1 !== iz) result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
            }
            else {
                guardedHandlers = stmt.guardedHandlers || [];
                for(i = 0, iz = guardedHandlers.length; i < iz; ++i){
                    result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                }
                // new interface
                if (stmt.handler) {
                    if (Array.isArray(stmt.handler)) for(i = 0, iz = stmt.handler.length; i < iz; ++i){
                        result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                        if (stmt.finalizer || i + 1 !== iz) result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                    }
                    else {
                        result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                        if (stmt.finalizer) result = this.maybeBlockSuffix(stmt.handler.body, result);
                    }
                }
            }
            if (stmt.finalizer) result = join(result, [
                'finally',
                this.maybeBlock(stmt.finalizer, S_TFFF)
            ]);
            return result;
        },
        SwitchStatement: function(stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function() {
                result = [
                    'switch' + space + '(',
                    that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                    ')' + space + '{' + newline
                ];
            });
            if (stmt.cases) {
                bodyFlags = S_TFFF;
                for(i = 0, iz = stmt.cases.length; i < iz; ++i){
                    if (i === iz - 1) bodyFlags |= F_SEMICOLON_OPT;
                    fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) result.push(newline);
                }
            }
            result.push(addIndent('}'));
            return result;
        },
        SwitchCase: function(stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function() {
                if (stmt.test) result = [
                    join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                    ':'
                ];
                else result = [
                    'default:'
                ];
                i = 0;
                iz = stmt.consequent.length;
                if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                    fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                    result.push(fragment);
                    i = 1;
                }
                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
                bodyFlags = S_TFFF;
                for(; i < iz; ++i){
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) bodyFlags |= F_SEMICOLON_OPT;
                    fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                    result.push(fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) result.push(newline);
                }
            });
            return result;
        },
        IfStatement: function(stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function() {
                result = [
                    'if' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) bodyFlags |= F_SEMICOLON_OPT;
            if (stmt.alternate) {
                result.push(this.maybeBlock(stmt.consequent, S_TFFF));
                result = this.maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) result = join(result, [
                    'else ',
                    this.generateStatement(stmt.alternate, bodyFlags)
                ]);
                else result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
            } else result.push(this.maybeBlock(stmt.consequent, bodyFlags));
            return result;
        },
        ForStatement: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
                result = [
                    'for' + space + '('
                ];
                if (stmt.init) {
                    if (stmt.init.type === Syntax.VariableDeclaration) result.push(that.generateStatement(stmt.init, S_FFFF));
                    else {
                        // F_ALLOW_IN becomes false.
                        result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                        result.push(';');
                    }
                } else result.push(';');
                if (stmt.test) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                    result.push(';');
                } else result.push(';');
                if (stmt.update) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                    result.push(')');
                } else result.push(')');
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },
        ForInStatement: function(stmt, flags) {
            return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },
        ForOfStatement: function(stmt, flags) {
            return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },
        LabeledStatement: function(stmt, flags) {
            return [
                stmt.label.name + ':',
                this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
            ];
        },
        Program: function(stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt.body.length;
            result = [
                safeConcatenation && iz > 0 ? '\n' : ''
            ];
            bodyFlags = S_TFTF;
            for(i = 0; i < iz; ++i){
                if (!safeConcatenation && i === iz - 1) bodyFlags |= F_SEMICOLON_OPT;
                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (!stmt.body[0].leadingComments) generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                    }
                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                    }
                }
                fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
                result.push(fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines) {
                        if (!stmt.body[i + 1].leadingComments) result.push(newline);
                    } else result.push(newline);
                }
                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                    }
                }
            }
            return result;
        },
        FunctionDeclaration: function(stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                'function',
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt.id ? generateIdentifier(stmt.id) : '',
                this.generateFunctionBody(stmt)
            ];
        },
        ReturnStatement: function(stmt, flags) {
            if (stmt.argument) return [
                join('return', this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)),
                this.semicolon(flags)
            ];
            return [
                'return' + this.semicolon(flags)
            ];
        },
        WhileStatement: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
                result = [
                    'while' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },
        WithStatement: function(stmt, flags) {
            var result, that = this;
            withIndent(function() {
                result = [
                    'with' + space + '(',
                    that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        }
    };
    merge(CodeGenerator.prototype, CodeGenerator.Statement);
    // Expressions.
    CodeGenerator.Expression = {
        SequenceExpression: function(expr, precedence, flags) {
            var result, i, iz;
            if (Precedence.Sequence < precedence) flags |= F_ALLOW_IN;
            result = [];
            for(i = 0, iz = expr.expressions.length; i < iz; ++i){
                result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
                if (i + 1 < iz) result.push(',' + space);
            }
            return parenthesize(result, Precedence.Sequence, precedence);
        },
        AssignmentExpression: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
        },
        ArrowFunctionExpression: function(expr, precedence, flags) {
            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
        },
        ConditionalExpression: function(expr, precedence, flags) {
            if (Precedence.Conditional < precedence) flags |= F_ALLOW_IN;
            return parenthesize([
                this.generateExpression(expr.test, Precedence.Coalesce, flags),
                space + '?' + space,
                this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                space + ':' + space,
                this.generateExpression(expr.alternate, Precedence.Assignment, flags)
            ], Precedence.Conditional, precedence);
        },
        LogicalExpression: function(expr, precedence, flags) {
            if (expr.operator === '??') flags |= F_FOUND_COALESCE;
            return this.BinaryExpression(expr, precedence, flags);
        },
        BinaryExpression: function(expr, precedence, flags) {
            var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr.operator];
            leftPrecedence = expr.operator === '**' ? Precedence.Postfix : currentPrecedence;
            rightPrecedence = expr.operator === '**' ? currentPrecedence : currentPrecedence + 1;
            if (currentPrecedence < precedence) flags |= F_ALLOW_IN;
            fragment = this.generateExpression(expr.left, leftPrecedence, flags);
            leftSource = fragment.toString();
            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */  && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) result = [
                fragment,
                noEmptySpace(),
                expr.operator
            ];
            else result = join(fragment, expr.operator);
            fragment = this.generateExpression(expr.right, rightPrecedence, flags);
            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' || expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                result.push(noEmptySpace());
                result.push(fragment);
            } else result = join(result, fragment);
            if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) return [
                '(',
                result,
                ')'
            ];
            if ((expr.operator === '||' || expr.operator === '&&') && flags & F_FOUND_COALESCE) return [
                '(',
                result,
                ')'
            ];
            return parenthesize(result, currentPrecedence, precedence);
        },
        CallExpression: function(expr, precedence, flags) {
            var result, i, iz;
            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [
                this.generateExpression(expr.callee, Precedence.Call, E_TTF)
            ];
            if (expr.optional) result.push('?.');
            result.push('(');
            for(i = 0, iz = expr['arguments'].length; i < iz; ++i){
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) result.push(',' + space);
            }
            result.push(')');
            if (!(flags & F_ALLOW_CALL)) return [
                '(',
                result,
                ')'
            ];
            return parenthesize(result, Precedence.Call, precedence);
        },
        ChainExpression: function(expr, precedence, flags) {
            if (Precedence.OptionalChaining < precedence) flags |= F_ALLOW_CALL;
            var result = this.generateExpression(expr.expression, Precedence.OptionalChaining, flags);
            return parenthesize(result, Precedence.OptionalChaining, precedence);
        },
        NewExpression: function(expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr['arguments'].length;
            // F_ALLOW_CALL becomes false.
            // F_ALLOW_UNPARATH_NEW may become false.
            itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF;
            result = join('new', this.generateExpression(expr.callee, Precedence.New, itemFlags));
            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result.push('(');
                for(i = 0, iz = length; i < iz; ++i){
                    result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                    if (i + 1 < iz) result.push(',' + space);
                }
                result.push(')');
            }
            return parenthesize(result, Precedence.New, precedence);
        },
        MemberExpression: function(expr, precedence, flags) {
            var result, fragment;
            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [
                this.generateExpression(expr.object, Precedence.Call, flags & F_ALLOW_CALL ? E_TTF : E_TFF)
            ];
            if (expr.computed) {
                if (expr.optional) result.push('?.');
                result.push('[');
                result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result.push(']');
            } else {
                if (!expr.optional && expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    fragment = toSourceNodeWhenNeeded(result).toString();
                    // When the following conditions are all true,
                    //   1. No floating point
                    //   2. Don't have exponents
                    //   3. The last character is a decimal digit
                    //   4. Not hexadecimal OR octal number literal
                    // we should add a floating point.
                    if (fragment.indexOf('.') < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48 // '0'
                    )) result.push(' ');
                }
                result.push(expr.optional ? '?.' : '.');
                result.push(generateIdentifier(expr.property));
            }
            return parenthesize(result, Precedence.Member, precedence);
        },
        MetaProperty: function(expr, precedence, flags) {
            var result;
            result = [];
            result.push(typeof expr.meta === "string" ? expr.meta : generateIdentifier(expr.meta));
            result.push('.');
            result.push(typeof expr.property === "string" ? expr.property : generateIdentifier(expr.property));
            return parenthesize(result, Precedence.Member, precedence);
        },
        UnaryExpression: function(expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);
            if (space === '') result = join(expr.operator, fragment);
            else {
                result = [
                    expr.operator
                ];
                if (expr.operator.length > 2) // delete, void, typeof
                // get `typeof []`, not `typeof[]`
                result = join(result, fragment);
                else {
                    // Prevent inserting spaces between operator and argument if it is unnecessary
                    // like, `!cond`
                    leftSource = toSourceNodeWhenNeeded(result).toString();
                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                    rightCharCode = fragment.toString().charCodeAt(0);
                    if ((leftCharCode === 0x2B /* + */  || leftCharCode === 0x2D /* - */ ) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode)) {
                        result.push(noEmptySpace());
                        result.push(fragment);
                    } else result.push(fragment);
                }
            }
            return parenthesize(result, Precedence.Unary, precedence);
        },
        YieldExpression: function(expr, precedence, flags) {
            var result;
            if (expr.delegate) result = 'yield*';
            else result = 'yield';
            if (expr.argument) result = join(result, this.generateExpression(expr.argument, Precedence.Yield, E_TTT));
            return parenthesize(result, Precedence.Yield, precedence);
        },
        AwaitExpression: function(expr, precedence, flags) {
            var result = join(expr.all ? 'await*' : 'await', this.generateExpression(expr.argument, Precedence.Await, E_TTT));
            return parenthesize(result, Precedence.Await, precedence);
        },
        UpdateExpression: function(expr, precedence, flags) {
            if (expr.prefix) return parenthesize([
                expr.operator,
                this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
            ], Precedence.Unary, precedence);
            return parenthesize([
                this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                expr.operator
            ], Precedence.Postfix, precedence);
        },
        FunctionExpression: function(expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                'function'
            ];
            if (expr.id) {
                result.push(generateStarSuffix(expr) || noEmptySpace());
                result.push(generateIdentifier(expr.id));
            } else result.push(generateStarSuffix(expr) || space);
            result.push(this.generateFunctionBody(expr));
            return result;
        },
        ArrayPattern: function(expr, precedence, flags) {
            return this.ArrayExpression(expr, precedence, flags, true);
        },
        ArrayExpression: function(expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr.elements.length) return '[]';
            multiline = isPattern ? false : expr.elements.length > 1;
            result = [
                '[',
                multiline ? newline : ''
            ];
            withIndent(function(indent) {
                var i, iz;
                for(i = 0, iz = expr.elements.length; i < iz; ++i){
                    if (!expr.elements[i]) {
                        if (multiline) result.push(indent);
                        if (i + 1 === iz) result.push(',');
                    } else {
                        result.push(multiline ? indent : '');
                        result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                    }
                    if (i + 1 < iz) result.push(',' + (multiline ? newline : space));
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
            result.push(multiline ? base : '');
            result.push(']');
            return result;
        },
        RestElement: function(expr, precedence, flags) {
            return '...' + this.generatePattern(expr.argument);
        },
        ClassExpression: function(expr, precedence, flags) {
            var result, fragment;
            result = [
                'class'
            ];
            if (expr.id) result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
            if (expr.superClass) {
                fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Unary, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(expr.body, S_TFFT));
            return result;
        },
        MethodDefinition: function(expr, precedence, flags) {
            var result, fragment;
            if (expr['static']) result = [
                'static' + space
            ];
            else result = [];
            if (expr.kind === 'get' || expr.kind === 'set') fragment = [
                join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                this.generateFunctionBody(expr.value)
            ];
            else fragment = [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
            return join(result, fragment);
        },
        Property: function(expr, precedence, flags) {
            if (expr.kind === 'get' || expr.kind === 'set') return [
                expr.kind,
                noEmptySpace(),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
            if (expr.shorthand) {
                if (expr.value.type === "AssignmentPattern") return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
                return this.generatePropertyKey(expr.key, expr.computed);
            }
            if (expr.method) return [
                generateMethodPrefix(expr),
                this.generatePropertyKey(expr.key, expr.computed),
                this.generateFunctionBody(expr.value)
            ];
            return [
                this.generatePropertyKey(expr.key, expr.computed),
                ':' + space,
                this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
            ];
        },
        ObjectExpression: function(expr, precedence, flags) {
            var multiline, result, fragment, that = this;
            if (!expr.properties.length) return '{}';
            multiline = expr.properties.length > 1;
            withIndent(function() {
                fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
            });
            if (!multiline) {
                // issues 4
                // Do not transform from
                //   dejavu.Class.declare({
                //       method2: function () {}
                //   });
                // to
                //   dejavu.Class.declare({method2: function () {
                //       }});
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) return [
                    '{',
                    space,
                    fragment,
                    space,
                    '}'
                ];
            }
            withIndent(function(indent) {
                var i, iz;
                result = [
                    '{',
                    newline,
                    indent,
                    fragment
                ];
                if (multiline) {
                    result.push(',' + newline);
                    for(i = 1, iz = expr.properties.length; i < iz; ++i){
                        result.push(indent);
                        result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) result.push(',' + newline);
                    }
                }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
            result.push(base);
            result.push('}');
            return result;
        },
        AssignmentPattern: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
        },
        ObjectPattern: function(expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr.properties.length) return '{}';
            multiline = false;
            if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.type === Syntax.Property && property.value.type !== Syntax.Identifier) multiline = true;
            } else for(i = 0, iz = expr.properties.length; i < iz; ++i){
                property = expr.properties[i];
                if (property.type === Syntax.Property && !property.shorthand) {
                    multiline = true;
                    break;
                }
            }
            result = [
                '{',
                multiline ? newline : ''
            ];
            withIndent(function(indent) {
                var i, iz;
                for(i = 0, iz = expr.properties.length; i < iz; ++i){
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) result.push(',' + (multiline ? newline : space));
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) result.push(newline);
            result.push(multiline ? base : '');
            result.push('}');
            return result;
        },
        ThisExpression: function(expr, precedence, flags) {
            return 'this';
        },
        Super: function(expr, precedence, flags) {
            return 'super';
        },
        Identifier: function(expr, precedence, flags) {
            return generateIdentifier(expr);
        },
        ImportDefaultSpecifier: function(expr, precedence, flags) {
            return generateIdentifier(expr.id || expr.local);
        },
        ImportNamespaceSpecifier: function(expr, precedence, flags) {
            var result = [
                '*'
            ];
            var id = expr.id || expr.local;
            if (id) result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
            return result;
        },
        ImportSpecifier: function(expr, precedence, flags) {
            var imported = expr.imported;
            var result = [
                imported.name
            ];
            var local = expr.local;
            if (local && local.name !== imported.name) result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
            return result;
        },
        ExportSpecifier: function(expr, precedence, flags) {
            var local = expr.local;
            var result = [
                local.name
            ];
            var exported = expr.exported;
            if (exported && exported.name !== local.name) result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
            return result;
        },
        Literal: function(expr, precedence, flags) {
            var raw;
            if (expr.hasOwnProperty('raw') && parse && extra.raw) try {
                raw = parse(expr.raw).body[0].expression;
                if (raw.type === Syntax.Literal) {
                    if (raw.value === expr.value) return expr.raw;
                }
            } catch (e) {
            // not use raw property
            }
            if (expr.regex) return '/' + expr.regex.pattern + '/' + expr.regex.flags;
            if (typeof expr.value === 'bigint') return expr.value.toString() + 'n';
            // `expr.value` can be null if `expr.bigint` exists. We need to check
            // `expr.bigint` first.
            if (expr.bigint) return expr.bigint + 'n';
            if (expr.value === null) return 'null';
            if (typeof expr.value === 'string') return escapeString(expr.value);
            if (typeof expr.value === 'number') return generateNumber(expr.value);
            if (typeof expr.value === 'boolean') return expr.value ? 'true' : 'false';
            return generateRegExp(expr.value);
        },
        GeneratorExpression: function(expr, precedence, flags) {
            return this.ComprehensionExpression(expr, precedence, flags);
        },
        ComprehensionExpression: function(expr, precedence, flags) {
            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6
            var result, i, iz, fragment, that = this;
            result = expr.type === Syntax.GeneratorExpression ? [
                '('
            ] : [
                '['
            ];
            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
                result.push(fragment);
            }
            if (expr.blocks) withIndent(function() {
                for(i = 0, iz = expr.blocks.length; i < iz; ++i){
                    fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                    if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) result = join(result, fragment);
                    else result.push(fragment);
                }
            });
            if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
                result = join(result, [
                    '(',
                    fragment,
                    ')'
                ]);
            }
            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
                result = join(result, fragment);
            }
            result.push(expr.type === Syntax.GeneratorExpression ? ')' : ']');
            return result;
        },
        ComprehensionBlock: function(expr, precedence, flags) {
            var fragment;
            if (expr.left.type === Syntax.VariableDeclaration) fragment = [
                expr.left.kind,
                noEmptySpace(),
                this.generateStatement(expr.left.declarations[0], S_FFFF)
            ];
            else fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
            fragment = join(fragment, expr.of ? 'of' : 'in');
            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));
            return [
                'for' + space + '(',
                fragment,
                ')'
            ];
        },
        SpreadElement: function(expr, precedence, flags) {
            return [
                '...',
                this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
            ];
        },
        TaggedTemplateExpression: function(expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) itemFlags = E_TFF;
            var result = [
                this.generateExpression(expr.tag, Precedence.Call, itemFlags),
                this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
            ];
            return parenthesize(result, Precedence.TaggedTemplate, precedence);
        },
        TemplateElement: function(expr, precedence, flags) {
            // Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            return expr.value.raw;
        },
        TemplateLiteral: function(expr, precedence, flags) {
            var result, i, iz;
            result = [
                '`'
            ];
            for(i = 0, iz = expr.quasis.length; i < iz; ++i){
                result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
                if (i + 1 < iz) {
                    result.push('${' + space);
                    result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                    result.push(space + '}');
                }
            }
            result.push('`');
            return result;
        },
        ModuleSpecifier: function(expr, precedence, flags) {
            return this.Literal(expr, precedence, flags);
        },
        ImportExpression: function(expr, precedence, flag) {
            return parenthesize([
                'import(',
                this.generateExpression(expr.source, Precedence.Assignment, E_TTT),
                ')'
            ], Precedence.Call, precedence);
        }
    };
    merge(CodeGenerator.prototype, CodeGenerator.Expression);
    CodeGenerator.prototype.generateExpression = function(expr, precedence, flags) {
        var result, type;
        type = expr.type || Syntax.Property;
        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) return generateVerbatim(expr, precedence);
        result = this[type](expr, precedence, flags);
        if (extra.comment) result = addComments(expr, result);
        return toSourceNodeWhenNeeded(result, expr);
    };
    CodeGenerator.prototype.generateStatement = function(stmt, flags) {
        var result, fragment;
        result = this[stmt.type](stmt, flags);
        // Attach comments
        if (extra.comment) result = addComments(stmt, result);
        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' && fragment.charAt(fragment.length - 1) === '\n') result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        return toSourceNodeWhenNeeded(result, stmt);
    };
    function generateInternal(node) {
        var codegen;
        codegen = new CodeGenerator();
        if (isStatement(node)) return codegen.generateStatement(node, S_TFFF);
        if (isExpression(node)) return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
        throw new Error('Unknown node type: ' + node.type);
    }
    function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;
        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') defaultOptions.format.indent.style = options.indent;
            if (typeof options.base === 'number') defaultOptions.format.indent.base = options.base;
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') base = options.base;
            else base = stringRepeat(indent, options.format.indent.base);
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) newline = space = indent = base = '';
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        sourceCode = options.sourceCode;
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
        extra = options;
        if (sourceMap) {
            if (!exports.browser) // We assume environment is node.js
            // And prevent from including source-map by browserify
            SourceNode = require("c5f9fc72858fa13").SourceNode;
            else SourceNode = global.sourceMap.SourceNode;
        }
        result = generateInternal(node);
        if (!sourceMap) {
            pair = {
                code: result.toString(),
                map: null
            };
            return options.sourceMapWithCode ? pair : pair.code;
        }
        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });
        if (options.sourceContent) pair.map.setSourceContent(options.sourceMap, options.sourceContent);
        if (options.sourceMapWithCode) return pair;
        return pair.map.toString();
    }
    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };
    FORMAT_DEFAULTS = getDefaultOptions().format;
    exports.version = require("5a6225acf72ec9cb").version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
})(); /* vim: set sw=4 ts=4 et tw=80 : */ 

},{"799f69c44c76494b":"dppLK","860044db75801fad":"DdcQT","c5f9fc72858fa13":"6klNI","5a6225acf72ec9cb":"gam5H"}],"dppLK":[function(require,module,exports,__globalThis) {
/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ /*jslint vars:false, bitwise:true*/ /*jshint indent:4*/ /*global exports:true*/ (function clone(exports1) {
    'use strict';
    var Syntax, VisitorOption, VisitorKeys, BREAK, SKIP, REMOVE;
    function deepCopy(obj) {
        var ret = {}, key, val;
        for(key in obj)if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object' && val !== null) ret[key] = deepCopy(val);
            else ret[key] = val;
        }
        return ret;
    }
    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License
    function upperBound(array, func) {
        var diff, len, i, current;
        len = array.length;
        i = 0;
        while(len){
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) len = diff;
            else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }
    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ChainExpression: 'ChainExpression',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportExpression: 'ImportExpression',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MetaProperty: 'MetaProperty',
        MethodDefinition: 'MethodDefinition',
        ModuleSpecifier: 'ModuleSpecifier',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        PrivateIdentifier: 'PrivateIdentifier',
        Program: 'Program',
        Property: 'Property',
        PropertyDefinition: 'PropertyDefinition',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };
    VisitorKeys = {
        AssignmentExpression: [
            'left',
            'right'
        ],
        AssignmentPattern: [
            'left',
            'right'
        ],
        ArrayExpression: [
            'elements'
        ],
        ArrayPattern: [
            'elements'
        ],
        ArrowFunctionExpression: [
            'params',
            'body'
        ],
        AwaitExpression: [
            'argument'
        ],
        BlockStatement: [
            'body'
        ],
        BinaryExpression: [
            'left',
            'right'
        ],
        BreakStatement: [
            'label'
        ],
        CallExpression: [
            'callee',
            'arguments'
        ],
        CatchClause: [
            'param',
            'body'
        ],
        ChainExpression: [
            'expression'
        ],
        ClassBody: [
            'body'
        ],
        ClassDeclaration: [
            'id',
            'superClass',
            'body'
        ],
        ClassExpression: [
            'id',
            'superClass',
            'body'
        ],
        ComprehensionBlock: [
            'left',
            'right'
        ],
        ComprehensionExpression: [
            'blocks',
            'filter',
            'body'
        ],
        ConditionalExpression: [
            'test',
            'consequent',
            'alternate'
        ],
        ContinueStatement: [
            'label'
        ],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: [
            'body',
            'test'
        ],
        EmptyStatement: [],
        ExportAllDeclaration: [
            'source'
        ],
        ExportDefaultDeclaration: [
            'declaration'
        ],
        ExportNamedDeclaration: [
            'declaration',
            'specifiers',
            'source'
        ],
        ExportSpecifier: [
            'exported',
            'local'
        ],
        ExpressionStatement: [
            'expression'
        ],
        ForStatement: [
            'init',
            'test',
            'update',
            'body'
        ],
        ForInStatement: [
            'left',
            'right',
            'body'
        ],
        ForOfStatement: [
            'left',
            'right',
            'body'
        ],
        FunctionDeclaration: [
            'id',
            'params',
            'body'
        ],
        FunctionExpression: [
            'id',
            'params',
            'body'
        ],
        GeneratorExpression: [
            'blocks',
            'filter',
            'body'
        ],
        Identifier: [],
        IfStatement: [
            'test',
            'consequent',
            'alternate'
        ],
        ImportExpression: [
            'source'
        ],
        ImportDeclaration: [
            'specifiers',
            'source'
        ],
        ImportDefaultSpecifier: [
            'local'
        ],
        ImportNamespaceSpecifier: [
            'local'
        ],
        ImportSpecifier: [
            'imported',
            'local'
        ],
        Literal: [],
        LabeledStatement: [
            'label',
            'body'
        ],
        LogicalExpression: [
            'left',
            'right'
        ],
        MemberExpression: [
            'object',
            'property'
        ],
        MetaProperty: [
            'meta',
            'property'
        ],
        MethodDefinition: [
            'key',
            'value'
        ],
        ModuleSpecifier: [],
        NewExpression: [
            'callee',
            'arguments'
        ],
        ObjectExpression: [
            'properties'
        ],
        ObjectPattern: [
            'properties'
        ],
        PrivateIdentifier: [],
        Program: [
            'body'
        ],
        Property: [
            'key',
            'value'
        ],
        PropertyDefinition: [
            'key',
            'value'
        ],
        RestElement: [
            'argument'
        ],
        ReturnStatement: [
            'argument'
        ],
        SequenceExpression: [
            'expressions'
        ],
        SpreadElement: [
            'argument'
        ],
        Super: [],
        SwitchStatement: [
            'discriminant',
            'cases'
        ],
        SwitchCase: [
            'test',
            'consequent'
        ],
        TaggedTemplateExpression: [
            'tag',
            'quasi'
        ],
        TemplateElement: [],
        TemplateLiteral: [
            'quasis',
            'expressions'
        ],
        ThisExpression: [],
        ThrowStatement: [
            'argument'
        ],
        TryStatement: [
            'block',
            'handler',
            'finalizer'
        ],
        UnaryExpression: [
            'argument'
        ],
        UpdateExpression: [
            'argument'
        ],
        VariableDeclaration: [
            'declarations'
        ],
        VariableDeclarator: [
            'id',
            'init'
        ],
        WhileStatement: [
            'test',
            'body'
        ],
        WithStatement: [
            'object',
            'body'
        ],
        YieldExpression: [
            'argument'
        ]
    };
    // unique id
    BREAK = {};
    SKIP = {};
    REMOVE = {};
    VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE
    };
    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }
    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };
    Reference.prototype.remove = function remove() {
        if (Array.isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
        } else {
            this.replace(null);
            return false;
        }
    };
    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }
    function Controller() {}
    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;
        function addToPath(result, path) {
            if (Array.isArray(path)) for(j = 0, jz = path.length; j < jz; ++j)result.push(path[j]);
            else result.push(path);
        }
        // root node
        if (!this.__current.path) return null;
        // first node is sentinel, second node is root element
        result = [];
        for(i = 2, iz = this.__leavelist.length; i < iz; ++i){
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };
    // API:
    // return type of current node
    Controller.prototype.type = function() {
        var node = this.current();
        return node.type || this.__current.wrap;
    };
    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;
        // first node is sentinel
        result = [];
        for(i = 1, iz = this.__leavelist.length; i < iz; ++i)result.push(this.__leavelist[i].node);
        return result;
    };
    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };
    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;
        result = undefined;
        previous = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        this.__current = previous;
        return result;
    };
    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };
    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function() {
        this.notify(SKIP);
    };
    // API:
    // break traversals
    Controller.prototype['break'] = function() {
        this.notify(BREAK);
    };
    // API:
    // remove node
    Controller.prototype.remove = function() {
        this.notify(REMOVE);
    };
    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
        this.__fallback = null;
        if (visitor.fallback === 'iteration') this.__fallback = Object.keys;
        else if (typeof visitor.fallback === 'function') this.__fallback = visitor.fallback;
        this.__keys = VisitorKeys;
        if (visitor.keys) this.__keys = Object.assign(Object.create(this.__keys), visitor.keys);
    };
    function isNode(node) {
        if (node == null) return false;
        return typeof node === 'object' && typeof node.type === 'string';
    }
    function isProperty(nodeType, key) {
        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }
    function candidateExistsInLeaveList(leavelist, candidate) {
        for(var i = leavelist.length - 1; i >= 0; --i){
            if (leavelist[i].node === candidate) return true;
        }
        return false;
    }
    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
        this.__initialize(root, visitor);
        sentinel = {};
        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;
        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));
        while(worklist.length){
            element = worklist.pop();
            if (element === sentinel) {
                element = leavelist.pop();
                ret = this.__execute(visitor.leave, element);
                if (this.__state === BREAK || ret === BREAK) return;
                continue;
            }
            if (element.node) {
                ret = this.__execute(visitor.enter, element);
                if (this.__state === BREAK || ret === BREAK) return;
                worklist.push(sentinel);
                leavelist.push(element);
                if (this.__state === SKIP || ret === SKIP) continue;
                node = element.node;
                nodeType = node.type || element.wrap;
                candidates = this.__keys[nodeType];
                if (!candidates) {
                    if (this.__fallback) candidates = this.__fallback(node);
                    else throw new Error('Unknown node type ' + nodeType + '.');
                }
                current = candidates.length;
                while((current -= 1) >= 0){
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) continue;
                    if (Array.isArray(candidate)) {
                        current2 = candidate.length;
                        while((current2 -= 1) >= 0){
                            if (!candidate[current2]) continue;
                            if (candidateExistsInLeaveList(leavelist, candidate[current2])) continue;
                            if (isProperty(nodeType, candidates[current])) element = new Element(candidate[current2], [
                                key,
                                current2
                            ], 'Property', null);
                            else if (isNode(candidate[current2])) element = new Element(candidate[current2], [
                                key,
                                current2
                            ], null, null);
                            else continue;
                            worklist.push(element);
                        }
                    } else if (isNode(candidate)) {
                        if (candidateExistsInLeaveList(leavelist, candidate)) continue;
                        worklist.push(new Element(candidate, key, null, null));
                    }
                }
            }
        }
    };
    Controller.prototype.replace = function replace(root, visitor) {
        var worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
        function removeElem(element) {
            var i, key, nextElem, parent;
            if (element.ref.remove()) {
                // When the reference is an element of an array.
                key = element.ref.key;
                parent = element.ref.parent;
                // If removed from array, then decrease following items' keys.
                i = worklist.length;
                while(i--){
                    nextElem = worklist[i];
                    if (nextElem.ref && nextElem.ref.parent === parent) {
                        if (nextElem.ref.key < key) break;
                        --nextElem.ref.key;
                    }
                }
            }
        }
        this.__initialize(root, visitor);
        sentinel = {};
        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;
        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);
        while(worklist.length){
            element = worklist.pop();
            if (element === sentinel) {
                element = leavelist.pop();
                target = this.__execute(visitor.leave, element);
                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) // replace
                element.ref.replace(target);
                if (this.__state === REMOVE || target === REMOVE) removeElem(element);
                if (this.__state === BREAK || target === BREAK) return outer.root;
                continue;
            }
            target = this.__execute(visitor.enter, element);
            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }
            if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
                element.node = null;
            }
            if (this.__state === BREAK || target === BREAK) return outer.root;
            // node may be null
            node = element.node;
            if (!node) continue;
            worklist.push(sentinel);
            leavelist.push(element);
            if (this.__state === SKIP || target === SKIP) continue;
            nodeType = node.type || element.wrap;
            candidates = this.__keys[nodeType];
            if (!candidates) {
                if (this.__fallback) candidates = this.__fallback(node);
                else throw new Error('Unknown node type ' + nodeType + '.');
            }
            current = candidates.length;
            while((current -= 1) >= 0){
                key = candidates[current];
                candidate = node[key];
                if (!candidate) continue;
                if (Array.isArray(candidate)) {
                    current2 = candidate.length;
                    while((current2 -= 1) >= 0){
                        if (!candidate[current2]) continue;
                        if (isProperty(nodeType, candidates[current])) element = new Element(candidate[current2], [
                            key,
                            current2
                        ], 'Property', new Reference(candidate, current2));
                        else if (isNode(candidate[current2])) element = new Element(candidate[current2], [
                            key,
                            current2
                        ], null, new Reference(candidate, current2));
                        else continue;
                        worklist.push(element);
                    }
                } else if (isNode(candidate)) worklist.push(new Element(candidate, key, null, new Reference(node, key)));
            }
        }
        return outer.root;
    };
    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }
    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }
    function extendCommentRange(comment, tokens) {
        var target;
        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });
        comment.extendedRange = [
            comment.range[0],
            comment.range[1]
        ];
        if (target !== tokens.length) comment.extendedRange[1] = tokens[target].range[0];
        target -= 1;
        if (target >= 0) comment.extendedRange[0] = tokens[target].range[1];
        return comment;
    }
    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;
        if (!tree.range) throw new Error('attachComments needs range information');
        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for(i = 0, len = providedComments.length; i < len; i += 1){
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [
                        0,
                        tree.range[0]
                    ];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }
        for(i = 0, len = providedComments.length; i < len; i += 1)comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function(node) {
                var comment;
                while(cursor < comments.length){
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) break;
                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) node.leadingComments = [];
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else cursor += 1;
                }
                // already out of owned node
                if (cursor === comments.length) return VisitorOption.Break;
                if (comments[cursor].extendedRange[0] > node.range[1]) return VisitorOption.Skip;
            }
        });
        cursor = 0;
        traverse(tree, {
            leave: function(node) {
                var comment;
                while(cursor < comments.length){
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) break;
                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) node.trailingComments = [];
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else cursor += 1;
                }
                // already out of owned node
                if (cursor === comments.length) return VisitorOption.Break;
                if (comments[cursor].extendedRange[0] > node.range[1]) return VisitorOption.Skip;
            }
        });
        return tree;
    }
    exports1.Syntax = Syntax;
    exports1.traverse = traverse;
    exports1.replace = replace;
    exports1.attachComments = attachComments;
    exports1.VisitorKeys = VisitorKeys;
    exports1.VisitorOption = VisitorOption;
    exports1.Controller = Controller;
    exports1.cloneEnvironment = function() {
        return clone({});
    };
    return exports1;
})(exports); /* vim: set sw=4 ts=4 et tw=80 : */ 

},{}],"DdcQT":[function(require,module,exports,__globalThis) {
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ (function() {
    'use strict';
    exports.ast = require("635e464a0faa52f6");
    exports.code = require("ab412758b0cb3565");
    exports.keyword = require("c0f7d4d834ba5d0c");
})(); /* vim: set sw=4 ts=4 et tw=80 : */ 

},{"635e464a0faa52f6":"1MYoz","ab412758b0cb3565":"2TyAN","c0f7d4d834ba5d0c":"8iGfa"}],"1MYoz":[function(require,module,exports,__globalThis) {
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ (function() {
    'use strict';
    function isExpression(node) {
        if (node == null) return false;
        switch(node.type){
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }
    function isIterationStatement(node) {
        if (node == null) return false;
        switch(node.type){
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }
    function isStatement(node) {
        if (node == null) return false;
        switch(node.type){
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }
    function isSourceElement(node) {
        return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }
    function trailingStatement(node) {
        switch(node.type){
            case 'IfStatement':
                if (node.alternate != null) return node.alternate;
                return node.consequent;
            case 'LabeledStatement':
            case 'ForStatement':
            case 'ForInStatement':
            case 'WhileStatement':
            case 'WithStatement':
                return node.body;
        }
        return null;
    }
    function isProblematicIfStatement(node) {
        var current;
        if (node.type !== 'IfStatement') return false;
        if (node.alternate == null) return false;
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null) return true;
            }
            current = trailingStatement(current);
        }while (current);
        return false;
    }
    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,
        trailingStatement: trailingStatement
    };
})(); /* vim: set sw=4 ts=4 et tw=80 : */ 

},{}],"2TyAN":[function(require,module,exports,__globalThis) {
/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ (function() {
    'use strict';
    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };
    ES6Regex = {
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };
    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39; // 0..9
    }
    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 || // 0..9
        0x61 <= ch && ch <= 0x66 || // a..f
        0x41 <= ch && ch <= 0x46; // A..F
    }
    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37; // 0..7
    }
    // 7.2 White Space
    NON_ASCII_WHITESPACES = [
        0x1680,
        0x2000,
        0x2001,
        0x2002,
        0x2003,
        0x2004,
        0x2005,
        0x2006,
        0x2007,
        0x2008,
        0x2009,
        0x200A,
        0x202F,
        0x205F,
        0x3000,
        0xFEFF
    ];
    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }
    // 7.3 Line Terminators
    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }
    // 7.6 Identifier Names and Identifiers
    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) return String.fromCharCode(cp);
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode((cp - 0x10000) % 0x400 + 0xDC00);
        return cu1 + cu2;
    }
    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch)IDENTIFIER_START[ch] = ch >= 0x61 && ch <= 0x7A || // a..z
    ch >= 0x41 && ch <= 0x5A || // A..Z
    ch === 0x24 || ch === 0x5F; // $ (dollar) and _ (underscore)
    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch)IDENTIFIER_PART[ch] = ch >= 0x61 && ch <= 0x7A || // a..z
    ch >= 0x41 && ch <= 0x5A || // A..Z
    ch >= 0x30 && ch <= 0x39 || // 0..9
    ch === 0x24 || ch === 0x5F; // $ (dollar) and _ (underscore)
    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }
    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }
    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }
    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }
    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
})(); /* vim: set sw=4 ts=4 et tw=80 : */ 

},{}],"8iGfa":[function(require,module,exports,__globalThis) {
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/ (function() {
    'use strict';
    var code = require("b9157deceabd4e7");
    function isStrictModeReservedWordES6(id) {
        switch(id){
            case 'implements':
            case 'interface':
            case 'package':
            case 'private':
            case 'protected':
            case 'public':
            case 'static':
            case 'let':
                return true;
            default:
                return false;
        }
    }
    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') return false;
        return isKeywordES6(id, strict);
    }
    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) return true;
        switch(id.length){
            case 2:
                return id === 'if' || id === 'in' || id === 'do';
            case 3:
                return id === 'var' || id === 'for' || id === 'new' || id === 'try';
            case 4:
                return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
            case 5:
                return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
            case 6:
                return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
            case 7:
                return id === 'default' || id === 'finally' || id === 'extends';
            case 8:
                return id === 'function' || id === 'continue' || id === 'debugger';
            case 10:
                return id === 'instanceof';
            default:
                return false;
        }
    }
    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }
    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }
    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }
    function isIdentifierNameES5(id) {
        var i, iz, ch;
        if (id.length === 0) return false;
        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) return false;
        for(i = 1, iz = id.length; i < iz; ++i){
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPartES5(ch)) return false;
        }
        return true;
    }
    function decodeUtf16(lead, trail) {
        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    }
    function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;
        if (id.length === 0) return false;
        check = code.isIdentifierStartES6;
        for(i = 0, iz = id.length; i < iz; ++i){
            ch = id.charCodeAt(i);
            if (0xD800 <= ch && ch <= 0xDBFF) {
                ++i;
                if (i >= iz) return false;
                lowCh = id.charCodeAt(i);
                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) return false;
                ch = decodeUtf16(ch, lowCh);
            }
            if (!check(ch)) return false;
            check = code.isIdentifierPartES6;
        }
        return true;
    }
    function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }
    function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }
    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
})(); /* vim: set sw=4 ts=4 et tw=80 : */ 

},{"b9157deceabd4e7":"2TyAN"}],"6klNI":[function(require,module,exports,__globalThis) {
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ exports.SourceMapGenerator = require("4f3489f7a4aa86a").SourceMapGenerator;
exports.SourceMapConsumer = require("74f5da57ddba8e").SourceMapConsumer;
exports.SourceNode = require("24e5bc41542c0363").SourceNode;

},{"4f3489f7a4aa86a":"eAEEU","74f5da57ddba8e":"29bOB","24e5bc41542c0363":"RKG6B"}],"eAEEU":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var base64VLQ = require("c40e1500640cbc22");
var util = require("c65fbfec2259bb0f");
var ArraySet = require("fce2ada3f2269665").ArraySet;
var MappingList = require("2ae94379d5b0c785").MappingList;
/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */ function SourceMapGenerator(aArgs) {
    if (!aArgs) aArgs = {};
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = new MappingList();
    this._sourcesContents = null;
}
SourceMapGenerator.prototype._version = 3;
/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */ SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
            generated: {
                line: mapping.generatedLine,
                column: mapping.generatedColumn
            }
        };
        if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
            newMapping.original = {
                line: mapping.originalLine,
                column: mapping.originalColumn
            };
            if (mapping.name != null) newMapping.name = mapping.name;
        }
        generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
        if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) generator.setSourceContent(sourceFile, content);
    });
    return generator;
};
/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */ SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);
    if (!this._skipValidation) this._validateMapping(generated, original, source, name);
    if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) this._sources.add(source);
    }
    if (name != null) {
        name = String(name);
        if (!this._names.has(name)) this._names.add(name);
    }
    this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
    });
};
/**
 * Set the source content for a source file.
 */ SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
    if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) this._sourcesContents = Object.create(null);
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
    }
};
/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */ SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
        sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();
    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
            // Check if it can be mapped by the source map, then update the mapping.
            var original = aSourceMapConsumer.originalPositionFor({
                line: mapping.originalLine,
                column: mapping.originalColumn
            });
            if (original.source != null) {
                // Copy mapping
                mapping.source = original.source;
                if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
                if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
                mapping.originalLine = original.line;
                mapping.originalColumn = original.column;
                if (original.name != null) mapping.name = original.name;
            }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) newSources.add(source);
        var name = mapping.name;
        if (name != null && !newNames.has(name)) newNames.add(name);
    }, this);
    this._sources = newSources;
    this._names = newNames;
    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
            if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
            if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
            this.setSourceContent(sourceFile, content);
        }
    }, this);
};
/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */ SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) // Case 1.
    return;
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) // Cases 2 and 3.
    return;
    else throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
    }));
};
/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */ SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;
    var mappings = this._mappings.toArray();
    for(var i = 0, len = mappings.length; i < len; i++){
        mapping = mappings[i];
        next = '';
        if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            while(mapping.generatedLine !== previousGeneratedLine){
                next += ';';
                previousGeneratedLine++;
            }
        } else if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
            next += ',';
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += base64VLQ.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;
            // lines are stored 0-based in SourceMap spec version 3
            next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;
            next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;
            if (mapping.name != null) {
                nameIdx = this._names.indexOf(mapping.name);
                next += base64VLQ.encode(nameIdx - previousName);
                previousName = nameIdx;
            }
        }
        result += next;
    }
    return result;
};
SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function(source) {
        if (!this._sourcesContents) return null;
        if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }, this);
};
/**
 * Externalize the source map.
 */ SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
    var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
    };
    if (this._file != null) map.file = this._file;
    if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
    if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    return map;
};
/**
 * Render the source map being generated to a string.
 */ SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
};
exports.SourceMapGenerator = SourceMapGenerator;

},{"c40e1500640cbc22":"8tI6q","c65fbfec2259bb0f":"tCCrk","fce2ada3f2269665":"5GPwW","2ae94379d5b0c785":"6uR3M"}],"8tI6q":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ var base64 = require("9fcf0c64c293678d");
// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011
var VLQ_BASE_SHIFT = 5;
// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;
// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;
/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */ function toVLQSigned(aValue) {
    return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
}
/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */ function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative ? -shifted : shifted;
}
/**
 * Returns the base 64 VLQ encoded value.
 */ exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;
    var vlq = toVLQSigned(aValue);
    do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
        encoded += base64.encode(digit);
    }while (vlq > 0);
    return encoded;
};
/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */ exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;
    do {
        if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
    }while (continuation);
    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
};

},{"9fcf0c64c293678d":"1nPpB"}],"1nPpB":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */ exports.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
    throw new TypeError("Must be between 0 and 63: " + number);
};
/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */ exports.decode = function(charCode) {
    var bigA = 65; // 'A'
    var bigZ = 90; // 'Z'
    var littleA = 97; // 'a'
    var littleZ = 122; // 'z'
    var zero = 48; // '0'
    var nine = 57; // '9'
    var plus = 43; // '+'
    var slash = 47; // '/'
    var littleOffset = 26;
    var numberOffset = 52;
    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
    // 26 - 51: abcdefghijklmnopqrstuvwxyz
    if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
    // 52 - 61: 0123456789
    if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
    // 62: +
    if (charCode == plus) return 62;
    // 63: /
    if (charCode == slash) return 63;
    // Invalid base64 digit.
    return -1;
};

},{}],"tCCrk":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ /**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */ function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) return aArgs[aName];
    else if (arguments.length === 3) return aDefaultValue;
    else throw new Error('"' + aName + '" is a required argument.');
}
exports.getArg = getArg;
var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;
function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) return null;
    return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
    };
}
exports.urlParse = urlParse;
function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) url += aParsedUrl.scheme + ':';
    url += '//';
    if (aParsedUrl.auth) url += aParsedUrl.auth + '@';
    if (aParsedUrl.host) url += aParsedUrl.host;
    if (aParsedUrl.port) url += ":" + aParsedUrl.port;
    if (aParsedUrl.path) url += aParsedUrl.path;
    return url;
}
exports.urlGenerate = urlGenerate;
/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */ function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
        if (!url.path) return aPath;
        path = url.path;
    }
    var isAbsolute = exports.isAbsolute(path);
    var parts = path.split(/\/+/);
    for(var part, up = 0, i = parts.length - 1; i >= 0; i--){
        part = parts[i];
        if (part === '.') parts.splice(i, 1);
        else if (part === '..') up++;
        else if (up > 0) {
            if (part === '') {
                // The first part is blank if the path is absolute. Trying to go
                // above the root is a no-op. Therefore we can remove all '..' parts
                // directly after the root.
                parts.splice(i + 1, up);
                up = 0;
            } else {
                parts.splice(i, 2);
                up--;
            }
        }
    }
    path = parts.join('/');
    if (path === '') path = isAbsolute ? '/' : '.';
    if (url) {
        url.path = path;
        return urlGenerate(url);
    }
    return path;
}
exports.normalize = normalize;
/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */ function join(aRoot, aPath) {
    if (aRoot === "") aRoot = ".";
    if (aPath === "") aPath = ".";
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) aRoot = aRootUrl.path || '/';
    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
        return urlGenerate(aPathUrl);
    }
    if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
    }
    var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
    if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
    }
    return joined;
}
exports.join = join;
exports.isAbsolute = function(aPath) {
    return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};
/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */ function relative(aRoot, aPath) {
    if (aRoot === "") aRoot = ".";
    aRoot = aRoot.replace(/\/$/, '');
    // It is possible for the path to be above the root. In this case, simply
    // checking whether the root is a prefix of the path won't work. Instead, we
    // need to remove components from the root one by one, until either we find
    // a prefix that fits, or we run out of components to remove.
    var level = 0;
    while(aPath.indexOf(aRoot + '/') !== 0){
        var index = aRoot.lastIndexOf("/");
        if (index < 0) return aPath;
        // If the only part of the root that is left is the scheme (i.e. http://,
        // file:///, etc.), one or more slashes (/), or simply nothing at all, we
        // have exhausted all components, so the path is not relative to the root.
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
        ++level;
    }
    // Make sure we add a "../" for each component we removed from the root.
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;
var supportsNullProto = function() {
    var obj = Object.create(null);
    return !('__proto__' in obj);
}();
function identity(s) {
    return s;
}
/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */ function toSetString(aStr) {
    if (isProtoString(aStr)) return '$' + aStr;
    return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;
function fromSetString(aStr) {
    if (isProtoString(aStr)) return aStr.slice(1);
    return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;
function isProtoString(s) {
    if (!s) return false;
    var length = s.length;
    if (length < 9 /* "__proto__".length */ ) return false;
    if (s.charCodeAt(length - 1) !== 95 /* '_' */  || s.charCodeAt(length - 2) !== 95 /* '_' */  || s.charCodeAt(length - 3) !== 111 /* 'o' */  || s.charCodeAt(length - 4) !== 116 /* 't' */  || s.charCodeAt(length - 5) !== 111 /* 'o' */  || s.charCodeAt(length - 6) !== 114 /* 'r' */  || s.charCodeAt(length - 7) !== 112 /* 'p' */  || s.charCodeAt(length - 8) !== 95 /* '_' */  || s.charCodeAt(length - 9) !== 95 /* '_' */ ) return false;
    for(var i = length - 10; i >= 0; i--){
        if (s.charCodeAt(i) !== 36 /* '$' */ ) return false;
    }
    return true;
}
/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */ function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) return cmp;
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) return cmp;
    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) return cmp;
    return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;
/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */ function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) return cmp;
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) return cmp;
    return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) return 0;
    if (aStr1 === null) return 1; // aStr2 !== null
    if (aStr2 === null) return -1; // aStr1 !== null
    if (aStr1 > aStr2) return 1;
    return -1;
}
/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */ function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) return cmp;
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) return cmp;
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) return cmp;
    return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */ function parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;
/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */ function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    sourceURL = sourceURL || '';
    if (sourceRoot) {
        // This follows what Chrome does.
        if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') sourceRoot += '/';
        // The spec says:
        //   Line 4: An optional source root, useful for relocating source
        //   files on a server or removing repeated values in the
        //   “sources” entry.  This value is prepended to the individual
        //   entries in the “source” field.
        sourceURL = sourceRoot + sourceURL;
    }
    // Historically, SourceMapConsumer did not take the sourceMapURL as
    // a parameter.  This mode is still somewhat supported, which is why
    // this code block is conditional.  However, it's preferable to pass
    // the source map URL to SourceMapConsumer, so that this function
    // can implement the source URL resolution algorithm as outlined in
    // the spec.  This block is basically the equivalent of:
    //    new URL(sourceURL, sourceMapURL).toString()
    // ... except it avoids using URL, which wasn't available in the
    // older releases of node still supported by this library.
    //
    // The spec says:
    //   If the sources are not absolute URLs after prepending of the
    //   “sourceRoot”, the sources are resolved relative to the
    //   SourceMap (like resolving script src in a html document).
    if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) throw new Error("sourceMapURL could not be parsed");
        if (parsed.path) {
            // Strip the last path component, but keep the "/".
            var index = parsed.path.lastIndexOf('/');
            if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
    }
    return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;

},{}],"5GPwW":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var util = require("f4001388f67ef757");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";
/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */ function ArraySet() {
    this._array = [];
    this._set = hasNativeMap ? new Map() : Object.create(null);
}
/**
 * Static method for creating ArraySet instances from an existing array.
 */ ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for(var i = 0, len = aArray.length; i < len; i++)set.add(aArray[i], aAllowDuplicates);
    return set;
};
/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */ ArraySet.prototype.size = function ArraySet_size() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};
/**
 * Add the given string to this set.
 *
 * @param String aStr
 */ ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
    var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
    if (!isDuplicate) {
        if (hasNativeMap) this._set.set(aStr, idx);
        else this._set[sStr] = idx;
    }
};
/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */ ArraySet.prototype.has = function ArraySet_has(aStr) {
    if (hasNativeMap) return this._set.has(aStr);
    else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
    }
};
/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */ ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) return idx;
    } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) return this._set[sStr];
    }
    throw new Error('"' + aStr + '" is not in the set.');
};
/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */ ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
    throw new Error('No element indexed by ' + aIdx);
};
/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */ ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
};
exports.ArraySet = ArraySet;

},{"f4001388f67ef757":"tCCrk"}],"6uR3M":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var util = require("a70191b97ba376d4");
/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */ function generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}
/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */ function MappingList() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {
        generatedLine: -1,
        generatedColumn: 0
    };
}
/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */ MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
};
/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */ MappingList.prototype.add = function MappingList_add(aMapping) {
    if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
    } else {
        this._sorted = false;
        this._array.push(aMapping);
    }
};
/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */ MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
    }
    return this._array;
};
exports.MappingList = MappingList;

},{"a70191b97ba376d4":"tCCrk"}],"29bOB":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var util = require("b22324b13f72201b");
var binarySearch = require("129ba2b16e81db9e");
var ArraySet = require("832bf56bf6a231e4").ArraySet;
var base64VLQ = require("95d11d359ee56491");
var quickSort = require("7076e0beb1aa0cfd").quickSort;
function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') sourceMap = util.parseSourceMapInput(aSourceMap);
    return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}
SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};
/**
 * The version of the source mapping spec that we are consuming.
 */ SourceMapConsumer.prototype._version = 3;
// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.
SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    configurable: true,
    enumerable: true,
    get: function() {
        if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
        return this.__generatedMappings;
    }
});
SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    configurable: true,
    enumerable: true,
    get: function() {
        if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
        return this.__originalMappings;
    }
});
SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
};
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */ SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
};
SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;
SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;
/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */ SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
    var mappings;
    switch(order){
        case SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
        case SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
        default:
            throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
            source: source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
        };
    }, this).forEach(aCallback, context);
};
/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */ SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');
    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: line,
        originalColumn: util.getArg(aArgs, 'column', 0)
    };
    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) return [];
    var mappings = [];
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === undefined) {
            var originalLine = mapping.originalLine;
            // Iterate until either we run out of mappings, or we run into
            // a mapping for a different line than the one we found. Since
            // mappings are sorted, this is guaranteed to find all mappings for
            // the line we found.
            while(mapping && mapping.originalLine === originalLine){
                mappings.push({
                    line: util.getArg(mapping, 'generatedLine', null),
                    column: util.getArg(mapping, 'generatedColumn', null),
                    lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
                });
                mapping = this._originalMappings[++index];
            }
        } else {
            var originalColumn = mapping.originalColumn;
            // Iterate until either we run out of mappings, or we run into
            // a mapping for a different line than the one we were searching for.
            // Since mappings are sorted, this is guaranteed to find all mappings for
            // the line we are searching for.
            while(mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn){
                mappings.push({
                    line: util.getArg(mapping, 'generatedLine', null),
                    column: util.getArg(mapping, 'generatedColumn', null),
                    lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
                });
                mapping = this._originalMappings[++index];
            }
        }
    }
    return mappings;
};
exports.SourceMapConsumer = SourceMapConsumer;
/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */ function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') sourceMap = util.parseSourceMapInput(aSourceMap);
    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);
    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) throw new Error('Unsupported version: ' + version);
    if (sourceRoot) sourceRoot = util.normalize(sourceRoot);
    sources = sources.map(String)// Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)// Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
    });
    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names.map(String), true);
    this._sources = ArraySet.fromArray(sources, true);
    this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
    });
    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this._sourceMapURL = aSourceMapURL;
    this.file = file;
}
BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */ BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
    if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
    // Maybe aSource is an absolute URL as returned by |sources|.  In
    // this case we can't simply undo the transform.
    var i;
    for(i = 0; i < this._absoluteSources.length; ++i){
        if (this._absoluteSources[i] == aSource) return i;
    }
    return -1;
};
/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */ BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);
    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });
    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.
    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];
    for(var i = 0, length = generatedMappings.length; i < length; i++){
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
            destMapping.source = sources.indexOf(srcMapping.source);
            destMapping.originalLine = srcMapping.originalLine;
            destMapping.originalColumn = srcMapping.originalColumn;
            if (srcMapping.name) destMapping.name = names.indexOf(srcMapping.name);
            destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
    }
    quickSort(smc.__originalMappings, util.compareByOriginalPositions);
    return smc;
};
/**
 * The version of the source mapping spec that we are consuming.
 */ BasicSourceMapConsumer.prototype._version = 3;
/**
 * The list of original sources.
 */ Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    get: function() {
        return this._absoluteSources.slice();
    }
});
/**
 * Provide the JIT with a nice shape / hidden class.
 */ function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
}
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */ BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;
    while(index < length){
        if (aStr.charAt(index) === ';') {
            generatedLine++;
            index++;
            previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ',') index++;
        else {
            mapping = new Mapping();
            mapping.generatedLine = generatedLine;
            // Because each offset is encoded relative to the previous one,
            // many segments often have the same encoding. We can exploit this
            // fact by caching the parsed variable length fields of each segment,
            // allowing us to avoid a second parse if we encounter the same
            // segment again.
            for(end = index; end < length; end++){
                if (this._charIsMappingSeparator(aStr, end)) break;
            }
            str = aStr.slice(index, end);
            segment = cachedSegments[str];
            if (segment) index += str.length;
            else {
                segment = [];
                while(index < end){
                    base64VLQ.decode(aStr, index, temp);
                    value = temp.value;
                    index = temp.rest;
                    segment.push(value);
                }
                if (segment.length === 2) throw new Error('Found a source, but no line and column');
                if (segment.length === 3) throw new Error('Found a source and line, but no column');
                cachedSegments[str] = segment;
            }
            // Generated column.
            mapping.generatedColumn = previousGeneratedColumn + segment[0];
            previousGeneratedColumn = mapping.generatedColumn;
            if (segment.length > 1) {
                // Original source.
                mapping.source = previousSource + segment[1];
                previousSource += segment[1];
                // Original line.
                mapping.originalLine = previousOriginalLine + segment[2];
                previousOriginalLine = mapping.originalLine;
                // Lines are stored 0-based
                mapping.originalLine += 1;
                // Original column.
                mapping.originalColumn = previousOriginalColumn + segment[3];
                previousOriginalColumn = mapping.originalColumn;
                if (segment.length > 4) {
                    // Original name.
                    mapping.name = previousName + segment[4];
                    previousName += segment[4];
                }
            }
            generatedMappings.push(mapping);
            if (typeof mapping.originalLine === 'number') originalMappings.push(mapping);
        }
    }
    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;
    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
};
/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */ BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.
    if (aNeedle[aLineName] <= 0) throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
    if (aNeedle[aColumnName] < 0) throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
};
/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */ BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
    for(var index = 0; index < this._generatedMappings.length; ++index){
        var mapping = this._generatedMappings[index];
        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
            var nextMapping = this._generatedMappings[index + 1];
            if (mapping.generatedLine === nextMapping.generatedLine) {
                mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
                continue;
            }
        }
        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
    }
};
/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */ BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
    };
    var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
            var source = util.getArg(mapping, 'source', null);
            if (source !== null) {
                source = this._sources.at(source);
                source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
            }
            var name = util.getArg(mapping, 'name', null);
            if (name !== null) name = this._names.at(name);
            return {
                source: source,
                line: util.getArg(mapping, 'originalLine', null),
                column: util.getArg(mapping, 'originalColumn', null),
                name: name
            };
        }
    }
    return {
        source: null,
        line: null,
        column: null,
        name: null
    };
};
/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */ BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) return false;
    return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
    });
};
/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */ BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) return null;
    var index = this._findSourceIndex(aSource);
    if (index >= 0) return this.sourcesContent[index];
    var relativeSource = aSource;
    if (this.sourceRoot != null) relativeSource = util.relative(this.sourceRoot, relativeSource);
    var url;
    if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    }
    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) return null;
    else throw new Error('"' + relativeSource + '" is not in the SourceMap.');
};
/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */ BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) return {
        line: null,
        column: null,
        lastColumn: null
    };
    var needle = {
        source: source,
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
    };
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) return {
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
    }
    return {
        line: null,
        column: null,
        lastColumn: null
    };
};
exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */ function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') sourceMap = util.parseSourceMapInput(aSourceMap);
    var version = util.getArg(sourceMap, 'version');
    var sections = util.getArg(sourceMap, 'sections');
    if (version != this._version) throw new Error('Unsupported version: ' + version);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    var lastOffset = {
        line: -1,
        column: 0
    };
    this._sections = sections.map(function(s) {
        if (s.url) // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error('Support for url field in sections not implemented.');
        var offset = util.getArg(s, 'offset');
        var offsetLine = util.getArg(offset, 'line');
        var offsetColumn = util.getArg(offset, 'column');
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error('Section offsets must be ordered and non-overlapping.');
        lastOffset = offset;
        return {
            generatedOffset: {
                // The offset fields are 0-based, but we use 1-based indices when
                // encoding/decoding from VLQ.
                generatedLine: offsetLine + 1,
                generatedColumn: offsetColumn + 1
            },
            consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
        };
    });
}
IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
/**
 * The version of the source mapping spec that we are consuming.
 */ IndexedSourceMapConsumer.prototype._version = 3;
/**
 * The list of original sources.
 */ Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    get: function() {
        var sources = [];
        for(var i = 0; i < this._sections.length; i++)for(var j = 0; j < this._sections[i].consumer.sources.length; j++)sources.push(this._sections[i].consumer.sources[j]);
        return sources;
    }
});
/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */ IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
    };
    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections, function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) return cmp;
        return needle.generatedColumn - section.generatedOffset.generatedColumn;
    });
    var section = this._sections[sectionIndex];
    if (!section) return {
        source: null,
        line: null,
        column: null,
        name: null
    };
    return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
    });
};
/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */ IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
    });
};
/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */ IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for(var i = 0; i < this._sections.length; i++){
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) return content;
    }
    if (nullOnMissing) return null;
    else throw new Error('"' + aSource + '" is not in the SourceMap.');
};
/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */ IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for(var i = 0; i < this._sections.length; i++){
        var section = this._sections[i];
        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) continue;
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
            var ret = {
                line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
                column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
            };
            return ret;
        }
    }
    return {
        line: null,
        column: null
    };
};
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */ IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for(var i = 0; i < this._sections.length; i++){
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for(var j = 0; j < sectionMappings.length; j++){
            var mapping = sectionMappings[j];
            var source = section.consumer._sources.at(mapping.source);
            source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
            this._sources.add(source);
            source = this._sources.indexOf(source);
            var name = null;
            if (mapping.name) {
                name = section.consumer._names.at(mapping.name);
                this._names.add(name);
                name = this._names.indexOf(name);
            }
            // The mappings coming from the consumer for the section have
            // generated positions relative to the start of the section, so we
            // need to offset them to be relative to the start of the concatenated
            // generated file.
            var adjustedMapping = {
                source: source,
                generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
                generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
                originalLine: mapping.originalLine,
                originalColumn: mapping.originalColumn,
                name: name
            };
            this.__generatedMappings.push(adjustedMapping);
            if (typeof adjustedMapping.originalLine === 'number') this.__originalMappings.push(adjustedMapping);
        }
    }
    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
};
exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

},{"b22324b13f72201b":"tCCrk","129ba2b16e81db9e":"eBCh2","832bf56bf6a231e4":"5GPwW","95d11d359ee56491":"8tI6q","7076e0beb1aa0cfd":"ffK7z"}],"eBCh2":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;
/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */ function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the index of
    //      the next-closest element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element than the one we are searching for, so we return -1.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) // Found the element we are looking for.
    return mid;
    else if (cmp > 0) {
        // Our needle is greater than aHaystack[mid].
        if (aHigh - mid > 1) // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        // The exact needle element was not found in this haystack. Determine if
        // we are in termination case (3) or (2) and return the appropriate thing.
        if (aBias == exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
        else return mid;
    } else {
        // Our needle is less than aHaystack[mid].
        if (mid - aLow > 1) // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        // we are in termination case (3) or (2) and return the appropriate thing.
        if (aBias == exports.LEAST_UPPER_BOUND) return mid;
        else return aLow < 0 ? -1 : aLow;
    }
}
/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */ exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) return -1;
    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) return -1;
    // We have found either the exact element, or the next-closest element than
    // the one we are searching for. However, there may be more than one such
    // element. Make sure we always return the smallest of these.
    while(index - 1 >= 0){
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
        --index;
    }
    return index;
};

},{}],"ffK7z":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ // It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.
/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */ function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
}
/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */ function randomIntInRange(low, high) {
    return Math.round(low + Math.random() * (high - low));
}
/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */ function doQuickSort(ary, comparator, p, r) {
    // If our lower bound is less than our upper bound, we (1) partition the
    // array into two pieces and (2) recurse on each half. If it is not, this is
    // the empty array and our base case.
    if (p < r) {
        // (1) Partitioning.
        //
        // The partitioning chooses a pivot between `p` and `r` and moves all
        // elements that are less than or equal to the pivot to the before it, and
        // all the elements that are greater than it after it. The effect is that
        // once partition is done, the pivot is in the exact place it will be when
        // the array is put in sorted order, and it will not need to be moved
        // again. This runs in O(n) time.
        // Always choose a random pivot so that an input array which is reverse
        // sorted does not cause O(n^2) running time.
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        // Immediately after `j` is incremented in this loop, the following hold
        // true:
        //
        //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
        //
        //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
        for(var j = p; j < r; j++)if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j);
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        // (2) Recurse on each half.
        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r);
    }
}
/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */ exports.quickSort = function(ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
};

},{}],"RKG6B":[function(require,module,exports,__globalThis) {
/* -*- Mode: js; js-indent-level: 2; -*- */ /*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */ var SourceMapGenerator = require("a07d2c2c4b11c39f").SourceMapGenerator;
var util = require("18d5ff036a08fa06");
// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;
// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;
// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";
/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */ function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
}
/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */ SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();
    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
        var lineContents = getNextLine();
        // The last line of a file might not have a newline.
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
            return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : undefined;
        }
    };
    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;
    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;
    aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
            // We add the code from "lastMapping" to "mapping":
            // First check if there is a new line in between.
            if (lastGeneratedLine < mapping.generatedLine) {
                // Associate first line with "lastMapping"
                addMappingWithCode(lastMapping, shiftNextLine());
                lastGeneratedLine++;
                lastGeneratedColumn = 0;
            // The remaining code is added without mapping
            } else {
                // There is no new line in between.
                // Associate the code between "lastGeneratedColumn" and
                // "mapping.generatedColumn" with "lastMapping"
                var nextLine = remainingLines[remainingLinesIndex] || '';
                var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
                remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
                lastGeneratedColumn = mapping.generatedColumn;
                addMappingWithCode(lastMapping, code);
                // No more remaining code, continue
                lastMapping = mapping;
                return;
            }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while(lastGeneratedLine < mapping.generatedLine){
            node.add(shiftNextLine());
            lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[remainingLinesIndex] || '';
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
        // and add the remaining lines without any mapping
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }
    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
            if (aRelativePath != null) sourceFile = util.join(aRelativePath, sourceFile);
            node.setSourceContent(sourceFile, content);
        }
    });
    return node;
    function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) node.add(code);
        else {
            var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
            node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
        }
    }
};
/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */ SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
        this.add(chunk);
    }, this);
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) this.children.push(aChunk);
    } else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    return this;
};
/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */ SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) for(var i = aChunk.length - 1; i >= 0; i--)this.prepend(aChunk[i]);
    else if (aChunk[isSourceNode] || typeof aChunk === "string") this.children.unshift(aChunk);
    else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    return this;
};
/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */ SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for(var i = 0, len = this.children.length; i < len; i++){
        chunk = this.children[i];
        if (chunk[isSourceNode]) chunk.walk(aFn);
        else if (chunk !== '') aFn(chunk, {
            source: this.source,
            line: this.line,
            column: this.column,
            name: this.name
        });
    }
};
/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */ SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
        newChildren = [];
        for(i = 0; i < len - 1; i++){
            newChildren.push(this.children[i]);
            newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
    }
    return this;
};
/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */ SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) lastChild.replaceRight(aPattern, aReplacement);
    else if (typeof lastChild === 'string') this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    else this.children.push(''.replace(aPattern, aReplacement));
    return this;
};
/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */ SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
};
/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */ SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
    for(var i = 0, len = this.children.length; i < len; i++)if (this.children[i][isSourceNode]) this.children[i].walkSourceContents(aFn);
    var sources = Object.keys(this.sourceContents);
    for(var i = 0, len = sources.length; i < len; i++)aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
};
/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */ SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function(chunk) {
        str += chunk;
    });
    return str;
};
/**
 * Returns the string representation of this source node along with a source
 * map.
 */ SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
        code: "",
        line: 1,
        column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
            if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map.addMapping({
                source: original.source,
                original: {
                    line: original.line,
                    column: original.column
                },
                generated: {
                    line: generated.line,
                    column: generated.column
                },
                name: original.name
            });
            lastOriginalSource = original.source;
            lastOriginalLine = original.line;
            lastOriginalColumn = original.column;
            lastOriginalName = original.name;
            sourceMappingActive = true;
        } else if (sourceMappingActive) {
            map.addMapping({
                generated: {
                    line: generated.line,
                    column: generated.column
                }
            });
            lastOriginalSource = null;
            sourceMappingActive = false;
        }
        for(var idx = 0, length = chunk.length; idx < length; idx++)if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            // Mappings end at eol
            if (idx + 1 === length) {
                lastOriginalSource = null;
                sourceMappingActive = false;
            } else if (sourceMappingActive) map.addMapping({
                source: original.source,
                original: {
                    line: original.line,
                    column: original.column
                },
                generated: {
                    line: generated.line,
                    column: generated.column
                },
                name: original.name
            });
        } else generated.column++;
    });
    this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
    });
    return {
        code: generated.code,
        map: map
    };
};
exports.SourceNode = SourceNode;

},{"a07d2c2c4b11c39f":"eAEEU","18d5ff036a08fa06":"tCCrk"}],"gam5H":[function(require,module,exports,__globalThis) {
module.exports = JSON.parse("{\"name\":\"escodegen\",\"description\":\"ECMAScript code generator\",\"homepage\":\"http://github.com/estools/escodegen\",\"main\":\"escodegen.js\",\"bin\":{\"esgenerate\":\"./bin/esgenerate.js\",\"escodegen\":\"./bin/escodegen.js\"},\"files\":[\"LICENSE.BSD\",\"README.md\",\"bin\",\"escodegen.js\",\"package.json\"],\"version\":\"2.1.0\",\"engines\":{\"node\":\">=6.0\"},\"maintainers\":[{\"name\":\"Yusuke Suzuki\",\"email\":\"utatane.tea@gmail.com\",\"web\":\"http://github.com/Constellation\"}],\"repository\":{\"type\":\"git\",\"url\":\"http://github.com/estools/escodegen.git\"},\"dependencies\":{\"estraverse\":\"^5.2.0\",\"esutils\":\"^2.0.2\",\"esprima\":\"^4.0.1\"},\"optionalDependencies\":{\"source-map\":\"~0.6.1\"},\"devDependencies\":{\"acorn\":\"^8.0.4\",\"bluebird\":\"^3.4.7\",\"bower-registry-client\":\"^1.0.0\",\"chai\":\"^4.2.0\",\"chai-exclude\":\"^2.0.2\",\"commonjs-everywhere\":\"^0.9.7\",\"gulp\":\"^4.0.2\",\"gulp-eslint\":\"^6.0.0\",\"gulp-mocha\":\"^7.0.2\",\"minimist\":\"^1.2.5\",\"optionator\":\"^0.9.1\",\"semver\":\"^7.3.4\"},\"license\":\"BSD-2-Clause\",\"scripts\":{\"test\":\"gulp travis\",\"unit-test\":\"gulp test\",\"lint\":\"gulp lint\",\"release\":\"node tools/release.js\",\"build-min\":\"./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js\",\"build\":\"./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js\"}}");

},{}],"8OjJS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ArrayExpression", ()=>ArrayExpression);
parcelHelpers.export(exports, "ArrayPattern", ()=>ArrayPattern);
parcelHelpers.export(exports, "ArrowFunctionExpression", ()=>ArrowFunctionExpression);
parcelHelpers.export(exports, "AssignmentExpression", ()=>AssignmentExpression);
parcelHelpers.export(exports, "AssignmentPattern", ()=>AssignmentPattern);
parcelHelpers.export(exports, "AsyncFunctionDeclaration", ()=>AsyncFunctionDeclaration);
parcelHelpers.export(exports, "AwaitExpression", ()=>AwaitExpression);
parcelHelpers.export(exports, "BigIntLiteral", ()=>BigIntLiteral);
parcelHelpers.export(exports, "BinaryExpression", ()=>BinaryExpression);
parcelHelpers.export(exports, "BlockStatement", ()=>BlockStatement);
parcelHelpers.export(exports, "BreakStatement", ()=>BreakStatement);
parcelHelpers.export(exports, "CallExpression", ()=>CallExpression);
parcelHelpers.export(exports, "CatchClause", ()=>CatchClause);
parcelHelpers.export(exports, "ChainExpression", ()=>ChainExpression);
parcelHelpers.export(exports, "ClassBody", ()=>ClassBody);
parcelHelpers.export(exports, "ClassDeclaration", ()=>ClassDeclaration);
parcelHelpers.export(exports, "ClassExpression", ()=>ClassExpression);
parcelHelpers.export(exports, "ConditionalExpression", ()=>ConditionalExpression);
parcelHelpers.export(exports, "ContinueStatement", ()=>ContinueStatement);
parcelHelpers.export(exports, "DebuggerStatement", ()=>DebuggerStatement);
parcelHelpers.export(exports, "Decorator", ()=>Decorator);
parcelHelpers.export(exports, "Directive", ()=>Directive);
parcelHelpers.export(exports, "DoWhileStatement", ()=>DoWhileStatement);
parcelHelpers.export(exports, "EmptyStatement", ()=>EmptyStatement);
parcelHelpers.export(exports, "ExportAllDeclaration", ()=>ExportAllDeclaration);
parcelHelpers.export(exports, "ExportDefaultDeclaration", ()=>ExportDefaultDeclaration);
parcelHelpers.export(exports, "ExportNamedDeclaration", ()=>ExportNamedDeclaration);
parcelHelpers.export(exports, "ExportSpecifier", ()=>ExportSpecifier);
parcelHelpers.export(exports, "ExpressionStatement", ()=>ExpressionStatement);
parcelHelpers.export(exports, "ForInStatement", ()=>ForInStatement);
parcelHelpers.export(exports, "ForOfStatement", ()=>ForOfStatement);
parcelHelpers.export(exports, "ForStatement", ()=>ForStatement);
parcelHelpers.export(exports, "FunctionDeclaration", ()=>FunctionDeclaration);
parcelHelpers.export(exports, "FunctionExpression", ()=>FunctionExpression);
parcelHelpers.export(exports, "Identifier", ()=>Identifier);
parcelHelpers.export(exports, "IfStatement", ()=>IfStatement);
parcelHelpers.export(exports, "ImportAttribute", ()=>ImportAttribute);
parcelHelpers.export(exports, "ImportDeclaration", ()=>ImportDeclaration);
parcelHelpers.export(exports, "ImportDefaultSpecifier", ()=>ImportDefaultSpecifier);
parcelHelpers.export(exports, "ImportExpression", ()=>ImportExpression);
parcelHelpers.export(exports, "ImportNamespaceSpecifier", ()=>ImportNamespaceSpecifier);
parcelHelpers.export(exports, "ImportSpecifier", ()=>ImportSpecifier);
parcelHelpers.export(exports, "LabeledStatement", ()=>LabeledStatement);
parcelHelpers.export(exports, "Literal", ()=>Literal);
parcelHelpers.export(exports, "LogicalExpression", ()=>LogicalExpression);
parcelHelpers.export(exports, "MemberExpression", ()=>MemberExpression);
parcelHelpers.export(exports, "MetaProperty", ()=>MetaProperty);
parcelHelpers.export(exports, "MethodDefinition", ()=>MethodDefinition);
parcelHelpers.export(exports, "Module", ()=>Module);
parcelHelpers.export(exports, "NewExpression", ()=>NewExpression);
parcelHelpers.export(exports, "Nodes", ()=>nodes_exports);
parcelHelpers.export(exports, "ObjectExpression", ()=>ObjectExpression);
parcelHelpers.export(exports, "ObjectPattern", ()=>ObjectPattern);
parcelHelpers.export(exports, "PrivateIdentifier", ()=>PrivateIdentifier);
parcelHelpers.export(exports, "Program", ()=>Program);
parcelHelpers.export(exports, "Property", ()=>Property);
parcelHelpers.export(exports, "PropertyDefinition", ()=>PropertyDefinition);
parcelHelpers.export(exports, "RegexLiteral", ()=>RegexLiteral);
parcelHelpers.export(exports, "RestElement", ()=>RestElement);
parcelHelpers.export(exports, "ReturnStatement", ()=>ReturnStatement);
parcelHelpers.export(exports, "Script", ()=>Script);
parcelHelpers.export(exports, "SequenceExpression", ()=>SequenceExpression);
parcelHelpers.export(exports, "SpreadElement", ()=>SpreadElement);
parcelHelpers.export(exports, "StaticBlock", ()=>StaticBlock);
parcelHelpers.export(exports, "Super", ()=>Super);
parcelHelpers.export(exports, "SwitchCase", ()=>SwitchCase);
parcelHelpers.export(exports, "SwitchStatement", ()=>SwitchStatement);
parcelHelpers.export(exports, "Syntax", ()=>Syntax);
parcelHelpers.export(exports, "TaggedTemplateExpression", ()=>TaggedTemplateExpression);
parcelHelpers.export(exports, "TemplateElement", ()=>TemplateElement);
parcelHelpers.export(exports, "TemplateLiteral", ()=>TemplateLiteral);
parcelHelpers.export(exports, "ThisExpression", ()=>ThisExpression);
parcelHelpers.export(exports, "ThrowStatement", ()=>ThrowStatement);
parcelHelpers.export(exports, "TryStatement", ()=>TryStatement);
parcelHelpers.export(exports, "UnaryExpression", ()=>UnaryExpression);
parcelHelpers.export(exports, "UpdateExpression", ()=>UpdateExpression);
parcelHelpers.export(exports, "VariableDeclaration", ()=>VariableDeclaration);
parcelHelpers.export(exports, "VariableDeclarator", ()=>VariableDeclarator);
parcelHelpers.export(exports, "Visitor", ()=>Visitor);
parcelHelpers.export(exports, "WhileStatement", ()=>WhileStatement);
parcelHelpers.export(exports, "WithStatement", ()=>WithStatement);
parcelHelpers.export(exports, "YieldExpression", ()=>YieldExpression);
parcelHelpers.export(exports, "default", ()=>esprima_default);
parcelHelpers.export(exports, "parse", ()=>parse);
parcelHelpers.export(exports, "parseModule", ()=>parseModule);
parcelHelpers.export(exports, "parseScript", ()=>parseScript);
parcelHelpers.export(exports, "tokenize", ()=>tokenize);
parcelHelpers.export(exports, "version", ()=>version);
var __defProp = Object.defineProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// src/syntax.ts
var Syntax = /* @__PURE__ */ ((Syntax2)=>{
    Syntax2["AssignmentExpression"] = "AssignmentExpression";
    Syntax2["AssignmentPattern"] = "AssignmentPattern";
    Syntax2["ArrayExpression"] = "ArrayExpression";
    Syntax2["ArrayPattern"] = "ArrayPattern";
    Syntax2["ArrowFunctionExpression"] = "ArrowFunctionExpression";
    Syntax2["AwaitExpression"] = "AwaitExpression";
    Syntax2["BlockStatement"] = "BlockStatement";
    Syntax2["BinaryExpression"] = "BinaryExpression";
    Syntax2["BreakStatement"] = "BreakStatement";
    Syntax2["CallExpression"] = "CallExpression";
    Syntax2["CatchClause"] = "CatchClause";
    Syntax2["ChainExpression"] = "ChainExpression";
    Syntax2["ClassBody"] = "ClassBody";
    Syntax2["ClassDeclaration"] = "ClassDeclaration";
    Syntax2["ClassExpression"] = "ClassExpression";
    Syntax2["ConditionalExpression"] = "ConditionalExpression";
    Syntax2["ContinueStatement"] = "ContinueStatement";
    Syntax2["Decorator"] = "Decorator";
    Syntax2["DoWhileStatement"] = "DoWhileStatement";
    Syntax2["DebuggerStatement"] = "DebuggerStatement";
    Syntax2["EmptyStatement"] = "EmptyStatement";
    Syntax2["ExportAllDeclaration"] = "ExportAllDeclaration";
    Syntax2["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
    Syntax2["ExportNamedDeclaration"] = "ExportNamedDeclaration";
    Syntax2["ExportSpecifier"] = "ExportSpecifier";
    Syntax2["ExpressionStatement"] = "ExpressionStatement";
    Syntax2["ForStatement"] = "ForStatement";
    Syntax2["ForOfStatement"] = "ForOfStatement";
    Syntax2["ForInStatement"] = "ForInStatement";
    Syntax2["FunctionDeclaration"] = "FunctionDeclaration";
    Syntax2["FunctionExpression"] = "FunctionExpression";
    Syntax2["Identifier"] = "Identifier";
    Syntax2["IfStatement"] = "IfStatement";
    Syntax2["ImportAttribute"] = "ImportAttribute";
    Syntax2["ImportExpression"] = "ImportExpression";
    Syntax2["ImportDeclaration"] = "ImportDeclaration";
    Syntax2["ImportDefaultSpecifier"] = "ImportDefaultSpecifier";
    Syntax2["ImportNamespaceSpecifier"] = "ImportNamespaceSpecifier";
    Syntax2["ImportSpecifier"] = "ImportSpecifier";
    Syntax2["Literal"] = "Literal";
    Syntax2["LabeledStatement"] = "LabeledStatement";
    Syntax2["LogicalExpression"] = "LogicalExpression";
    Syntax2["MemberExpression"] = "MemberExpression";
    Syntax2["MetaProperty"] = "MetaProperty";
    Syntax2["MethodDefinition"] = "MethodDefinition";
    Syntax2["NewExpression"] = "NewExpression";
    Syntax2["ObjectExpression"] = "ObjectExpression";
    Syntax2["ObjectPattern"] = "ObjectPattern";
    Syntax2["Program"] = "Program";
    Syntax2["Property"] = "Property";
    Syntax2["PrivateIdentifier"] = "PrivateIdentifier";
    Syntax2["RestElement"] = "RestElement";
    Syntax2["ReturnStatement"] = "ReturnStatement";
    Syntax2["SequenceExpression"] = "SequenceExpression";
    Syntax2["SpreadElement"] = "SpreadElement";
    Syntax2["StaticBlock"] = "StaticBlock";
    Syntax2["Super"] = "Super";
    Syntax2["SwitchCase"] = "SwitchCase";
    Syntax2["SwitchStatement"] = "SwitchStatement";
    Syntax2["TaggedTemplateExpression"] = "TaggedTemplateExpression";
    Syntax2["TemplateElement"] = "TemplateElement";
    Syntax2["TemplateLiteral"] = "TemplateLiteral";
    Syntax2["ThisExpression"] = "ThisExpression";
    Syntax2["ThrowStatement"] = "ThrowStatement";
    Syntax2["TryStatement"] = "TryStatement";
    Syntax2["UnaryExpression"] = "UnaryExpression";
    Syntax2["UpdateExpression"] = "UpdateExpression";
    Syntax2["VariableDeclaration"] = "VariableDeclaration";
    Syntax2["VariableDeclarator"] = "VariableDeclarator";
    Syntax2["WhileStatement"] = "WhileStatement";
    Syntax2["WithStatement"] = "WithStatement";
    Syntax2["YieldExpression"] = "YieldExpression";
    return Syntax2;
})(Syntax || {});
// src/comment-handler.ts
var CommentHandler = class {
    attach;
    comments;
    stack;
    leading;
    trailing;
    constructor(){
        this.attach = false;
        this.comments = [];
        this.stack = [];
        this.leading = [];
        this.trailing = [];
    }
    insertInnerComments(node, metadata) {
        if (node.type === "BlockStatement" /* BlockStatement */  && node.body.length === 0) {
            const innerComments = [];
            for(let i = this.leading.length - 1; i >= 0; --i){
                const entry = this.leading[i];
                if (metadata.end.offset >= entry.start) {
                    innerComments.unshift(entry.comment);
                    this.leading.splice(i, 1);
                    this.trailing.splice(i, 1);
                }
            }
            if (innerComments.length) node.innerComments = innerComments;
        }
    }
    findTrailingComments(metadata) {
        let trailingComments = [];
        if (this.trailing.length > 0) {
            for(let i = this.trailing.length - 1; i >= 0; --i){
                const entry = this.trailing[i];
                if (entry.start >= metadata.end.offset) trailingComments.unshift(entry.comment);
            }
            this.trailing.length = 0;
            return trailingComments;
        }
        const last = this.stack[this.stack.length - 1];
        if (last && last.node.trailingComments) {
            const firstComment = last.node.trailingComments[0];
            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
                trailingComments = last.node.trailingComments;
                delete last.node.trailingComments;
            }
        }
        return trailingComments;
    }
    findLeadingComments(metadata) {
        const leadingComments = [];
        let target;
        while(this.stack.length > 0){
            const entry = this.stack[this.stack.length - 1];
            if (entry && entry.start >= metadata.start.offset) {
                target = entry.node;
                this.stack.pop();
            } else break;
        }
        if (target) {
            const count = target.leadingComments ? target.leadingComments.length : 0;
            for(let i = count - 1; i >= 0; --i){
                const comment = target.leadingComments[i];
                if (comment.range[1] <= metadata.start.offset) {
                    leadingComments.unshift(comment);
                    target.leadingComments.splice(i, 1);
                }
            }
            if (target.leadingComments && target.leadingComments.length === 0) delete target.leadingComments;
            return leadingComments;
        }
        for(let i = this.leading.length - 1; i >= 0; --i){
            const entry = this.leading[i];
            if (entry.start <= metadata.start.offset) {
                leadingComments.unshift(entry.comment);
                this.leading.splice(i, 1);
            }
        }
        return leadingComments;
    }
    visitNode(node, metadata) {
        if (node.type === "Program" /* Program */  && node.body.length > 0) return;
        this.insertInnerComments(node, metadata);
        const trailingComments = this.findTrailingComments(metadata);
        const leadingComments = this.findLeadingComments(metadata);
        if (leadingComments.length > 0) node.leadingComments = leadingComments;
        if (trailingComments.length > 0) node.trailingComments = trailingComments;
        this.stack.push({
            node,
            start: metadata.start.offset
        });
    }
    visitComment(node, metadata) {
        const type = node.type[0] === "L" ? "Line" : "Block";
        const comment = {
            type,
            value: node.value
        };
        if (node.range) comment.range = node.range;
        if (node.loc) comment.loc = node.loc;
        this.comments.push(comment);
        if (this.attach) {
            const entry = {
                comment: {
                    type,
                    value: node.value,
                    range: [
                        metadata.start.offset,
                        metadata.end.offset
                    ]
                },
                start: metadata.start.offset
            };
            if (node.loc) entry.comment.loc = node.loc;
            node.type = type;
            this.leading.push(entry);
            this.trailing.push(entry);
        }
    }
    visit(node, metadata) {
        if (node.type === "LineComment") this.visitComment(node, metadata);
        else if (node.type === "BlockComment") this.visitComment(node, metadata);
        else if (this.attach) this.visitNode(node, metadata);
    }
};
// src/character.ts
var Regex = {
    // Unicode v12.1.0 NonAsciiIdentifierStart:
    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
    // Unicode v12.1.0 NonAsciiIdentifierPart:
    // eslint-disable-next-line no-misleading-character-class
    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDF00-\uDF1C\uDF27\uDF30-\uDF50\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD46\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E\uDC5F\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
};
var Character = {
    fromCodePoint (cp) {
        return cp < 65536 ? String.fromCharCode(cp) : String.fromCharCode(55296 + (cp - 65536 >> 10)) + String.fromCharCode(56320 + (cp - 65536 & 1023));
    },
    isStringWellFormedUnicode (text) {
        for(let i = 0; i < text.length; i++){
            let c = text.charCodeAt(i);
            if (c >= 55296 && c <= 56319) {
                if (i === text.length - 1) return false;
                i++;
                c = text.charCodeAt(i);
                if (c < 56320 && c > 57343) return false;
            } else if (c >= 56320 && c <= 57343) return false;
        }
        return true;
    },
    // https://tc39.github.io/ecma262/#sec-white-space
    isWhiteSpace (cp) {
        return cp === 32 || cp === 9 || cp === 11 || cp === 12 || cp === 160 || cp >= 5760 && [
            5760,
            8192,
            8193,
            8194,
            8195,
            8196,
            8197,
            8198,
            8199,
            8200,
            8201,
            8202,
            8239,
            8287,
            12288,
            65279
        ].indexOf(cp) >= 0;
    },
    // https://tc39.github.io/ecma262/#sec-line-terminators
    isLineTerminator (cp) {
        return cp === 10 || cp === 13 || cp === 8232 || cp === 8233;
    },
    // https://tc39.github.io/ecma262/#sec-names-and-keywords
    isIdentifierStart (cp) {
        return cp === 36 || cp === 95 || // $ (dollar) and _ (underscore)
        cp >= 65 && cp <= 90 || // A..Z
        cp >= 97 && cp <= 122 || // a..z
        cp === 92 || // \ (backslash)
        cp >= 128 && Regex.NonAsciiIdentifierStart.test(Character.fromCodePoint(cp));
    },
    isIdentifierPart (cp) {
        return cp === 36 || cp === 95 || // $ (dollar) and _ (underscore)
        cp >= 65 && cp <= 90 || // A..Z
        cp >= 97 && cp <= 122 || // a..z
        cp >= 48 && cp <= 57 || // 0..9
        cp === 92 || // \ (backslash)
        cp >= 128 && Regex.NonAsciiIdentifierPart.test(Character.fromCodePoint(cp));
    },
    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
    isDecimalDigit (cp) {
        return cp >= 48 && cp <= 57;
    },
    isDecimalDigitChar (ch) {
        return ch.length === 1 && Character.isDecimalDigit(ch.charCodeAt(0));
    },
    isHexDigit (cp) {
        return cp >= 48 && cp <= 57 || // 0..9
        cp >= 65 && cp <= 70 || // A..F
        cp >= 97 && cp <= 102;
    },
    isHexDigitChar (ch) {
        return ch.length === 1 && Character.isHexDigit(ch.charCodeAt(0));
    },
    isOctalDigit (cp) {
        return cp >= 48 && cp <= 55;
    },
    isOctalDigitChar (ch) {
        return ch.length === 1 && Character.isOctalDigit(ch.charCodeAt(0));
    }
};
// src/jsx-nodes.ts
var JSXClosingElement = class {
    type;
    name;
    constructor(name){
        this.type = "JSXClosingElement" /* JSXClosingElement */ ;
        this.name = name;
    }
};
var JSXClosingFragment = class {
    type;
    constructor(){
        this.type = "JSXClosingFragment" /* JSXClosingFragment */ ;
    }
};
var JSXElement = class {
    type;
    openingElement;
    children;
    closingElement;
    constructor(openingElement, children, closingElement){
        this.type = "JSXElement" /* JSXElement */ ;
        this.openingElement = openingElement;
        this.children = children;
        this.closingElement = closingElement;
    }
};
var JSXEmptyExpression = class {
    type;
    constructor(){
        this.type = "JSXEmptyExpression" /* JSXEmptyExpression */ ;
    }
};
var JSXExpressionContainer = class {
    type;
    expression;
    constructor(expression){
        this.type = "JSXExpressionContainer" /* JSXExpressionContainer */ ;
        this.expression = expression;
    }
};
var JSXIdentifier = class {
    type;
    name;
    constructor(name){
        this.type = "JSXIdentifier" /* JSXIdentifier */ ;
        this.name = name;
    }
};
var JSXMemberExpression = class {
    type;
    object;
    property;
    constructor(object, property){
        this.type = "JSXMemberExpression" /* JSXMemberExpression */ ;
        this.object = object;
        this.property = property;
    }
};
var JSXAttribute = class {
    type;
    name;
    value;
    constructor(name, value){
        this.type = "JSXAttribute" /* JSXAttribute */ ;
        this.name = name;
        this.value = value;
    }
};
var JSXNamespacedName = class {
    type;
    namespace;
    name;
    constructor(namespace, name){
        this.type = "JSXNamespacedName" /* JSXNamespacedName */ ;
        this.namespace = namespace;
        this.name = name;
    }
};
var JSXOpeningElement = class {
    type;
    name;
    selfClosing;
    attributes;
    constructor(name, selfClosing, attributes){
        this.type = "JSXOpeningElement" /* JSXOpeningElement */ ;
        this.name = name;
        this.selfClosing = selfClosing;
        this.attributes = attributes;
    }
};
var JSXOpeningFragment = class {
    type;
    selfClosing;
    constructor(selfClosing){
        this.type = "JSXOpeningFragment" /* JSXOpeningFragment */ ;
        this.selfClosing = selfClosing;
    }
};
var JSXSpreadAttribute = class {
    type;
    argument;
    constructor(argument){
        this.type = "JSXSpreadAttribute" /* JSXSpreadAttribute */ ;
        this.argument = argument;
    }
};
var JSXText = class {
    type;
    value;
    raw;
    constructor(value, raw){
        this.type = "JSXText" /* JSXText */ ;
        this.value = value;
        this.raw = raw;
    }
};
// src/nodes.ts
var nodes_exports = {};
__export(nodes_exports, {
    ArrayExpression: ()=>ArrayExpression,
    ArrayPattern: ()=>ArrayPattern,
    ArrowFunctionExpression: ()=>ArrowFunctionExpression,
    AssignmentExpression: ()=>AssignmentExpression,
    AssignmentPattern: ()=>AssignmentPattern,
    AsyncFunctionDeclaration: ()=>AsyncFunctionDeclaration,
    AwaitExpression: ()=>AwaitExpression,
    BigIntLiteral: ()=>BigIntLiteral,
    BinaryExpression: ()=>BinaryExpression,
    BlockStatement: ()=>BlockStatement,
    BreakStatement: ()=>BreakStatement,
    CallExpression: ()=>CallExpression,
    CatchClause: ()=>CatchClause,
    ChainExpression: ()=>ChainExpression,
    ClassBody: ()=>ClassBody,
    ClassDeclaration: ()=>ClassDeclaration,
    ClassExpression: ()=>ClassExpression,
    ConditionalExpression: ()=>ConditionalExpression,
    ContinueStatement: ()=>ContinueStatement,
    DebuggerStatement: ()=>DebuggerStatement,
    Decorator: ()=>Decorator,
    Directive: ()=>Directive,
    DoWhileStatement: ()=>DoWhileStatement,
    EmptyStatement: ()=>EmptyStatement,
    ExportAllDeclaration: ()=>ExportAllDeclaration,
    ExportDefaultDeclaration: ()=>ExportDefaultDeclaration,
    ExportNamedDeclaration: ()=>ExportNamedDeclaration,
    ExportSpecifier: ()=>ExportSpecifier,
    ExpressionStatement: ()=>ExpressionStatement,
    ForInStatement: ()=>ForInStatement,
    ForOfStatement: ()=>ForOfStatement,
    ForStatement: ()=>ForStatement,
    FunctionDeclaration: ()=>FunctionDeclaration,
    FunctionExpression: ()=>FunctionExpression,
    Identifier: ()=>Identifier,
    IfStatement: ()=>IfStatement,
    ImportAttribute: ()=>ImportAttribute,
    ImportDeclaration: ()=>ImportDeclaration,
    ImportDefaultSpecifier: ()=>ImportDefaultSpecifier,
    ImportExpression: ()=>ImportExpression,
    ImportNamespaceSpecifier: ()=>ImportNamespaceSpecifier,
    ImportSpecifier: ()=>ImportSpecifier,
    LabeledStatement: ()=>LabeledStatement,
    Literal: ()=>Literal,
    LogicalExpression: ()=>LogicalExpression,
    MemberExpression: ()=>MemberExpression,
    MetaProperty: ()=>MetaProperty,
    MethodDefinition: ()=>MethodDefinition,
    Module: ()=>Module,
    NewExpression: ()=>NewExpression,
    ObjectExpression: ()=>ObjectExpression,
    ObjectPattern: ()=>ObjectPattern,
    PrivateIdentifier: ()=>PrivateIdentifier,
    Program: ()=>Program,
    Property: ()=>Property,
    PropertyDefinition: ()=>PropertyDefinition,
    RegexLiteral: ()=>RegexLiteral,
    RestElement: ()=>RestElement,
    ReturnStatement: ()=>ReturnStatement,
    Script: ()=>Script,
    SequenceExpression: ()=>SequenceExpression,
    SpreadElement: ()=>SpreadElement,
    StaticBlock: ()=>StaticBlock,
    Super: ()=>Super,
    SwitchCase: ()=>SwitchCase,
    SwitchStatement: ()=>SwitchStatement,
    TaggedTemplateExpression: ()=>TaggedTemplateExpression,
    TemplateElement: ()=>TemplateElement,
    TemplateLiteral: ()=>TemplateLiteral,
    ThisExpression: ()=>ThisExpression,
    ThrowStatement: ()=>ThrowStatement,
    TryStatement: ()=>TryStatement,
    UnaryExpression: ()=>UnaryExpression,
    UpdateExpression: ()=>UpdateExpression,
    VariableDeclaration: ()=>VariableDeclaration,
    VariableDeclarator: ()=>VariableDeclarator,
    WhileStatement: ()=>WhileStatement,
    WithStatement: ()=>WithStatement,
    YieldExpression: ()=>YieldExpression
});
var ArrayExpression = class {
    type;
    elements;
    constructor(elements){
        this.type = "ArrayExpression" /* ArrayExpression */ ;
        this.elements = elements;
    }
};
var ArrayPattern = class {
    type;
    elements;
    constructor(elements){
        this.type = "ArrayPattern" /* ArrayPattern */ ;
        this.elements = elements;
    }
};
var ArrowFunctionExpression = class {
    type;
    id;
    params;
    body;
    generator;
    expression;
    async;
    constructor(params, body, expression, isAsync){
        this.type = "ArrowFunctionExpression" /* ArrowFunctionExpression */ ;
        this.id = null;
        this.params = params;
        this.body = body;
        this.generator = false;
        this.expression = expression;
        this.async = isAsync;
    }
};
var AssignmentExpression = class {
    type;
    operator;
    left;
    right;
    constructor(operator, left, right){
        this.type = "AssignmentExpression" /* AssignmentExpression */ ;
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
};
var AssignmentPattern = class {
    type;
    left;
    right;
    constructor(left, right){
        this.type = "AssignmentPattern" /* AssignmentPattern */ ;
        this.left = left;
        this.right = right;
    }
};
var AsyncFunctionDeclaration = class {
    type;
    id;
    params;
    body;
    generator;
    expression;
    async;
    constructor(id, params, body, generator){
        this.type = "FunctionDeclaration" /* FunctionDeclaration */ ;
        this.id = id;
        this.params = params;
        this.body = body;
        this.generator = generator;
        this.expression = false;
        this.async = true;
    }
};
var AwaitExpression = class {
    type;
    argument;
    constructor(argument){
        this.type = "AwaitExpression" /* AwaitExpression */ ;
        this.argument = argument;
    }
};
var BigIntLiteral = class {
    type;
    value;
    raw;
    bigint;
    constructor(value, raw, bigint){
        this.type = "Literal" /* Literal */ ;
        this.value = value;
        this.raw = raw;
        this.bigint = bigint;
    }
};
var BinaryExpression = class {
    type;
    operator;
    left;
    right;
    constructor(operator, left, right){
        this.type = "BinaryExpression" /* BinaryExpression */ ;
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
};
var BlockStatement = class {
    type;
    body;
    constructor(body){
        this.type = "BlockStatement" /* BlockStatement */ ;
        this.body = body;
    }
};
var BreakStatement = class {
    type;
    label;
    constructor(label){
        this.type = "BreakStatement" /* BreakStatement */ ;
        this.label = label;
    }
};
var CallExpression = class {
    type;
    callee;
    arguments;
    optional;
    constructor(callee, args, optional){
        this.type = "CallExpression" /* CallExpression */ ;
        this.callee = callee;
        this.arguments = args;
        this.optional = optional;
    }
};
var CatchClause = class {
    type;
    param;
    body;
    constructor(param, body){
        this.type = "CatchClause" /* CatchClause */ ;
        this.param = param;
        this.body = body;
    }
};
var ChainExpression = class {
    type;
    expression;
    constructor(expression){
        this.type = "ChainExpression" /* ChainExpression */ ;
        this.expression = expression;
    }
};
var ClassBody = class {
    type;
    body;
    constructor(body){
        this.type = "ClassBody" /* ClassBody */ ;
        this.body = body;
    }
};
var ClassDeclaration = class {
    type;
    id;
    superClass;
    body;
    decorators;
    constructor(id, superClass, body, decorators){
        this.type = "ClassDeclaration" /* ClassDeclaration */ ;
        this.id = id;
        this.superClass = superClass;
        this.body = body;
        this.decorators = decorators;
    }
};
var ClassExpression = class {
    type;
    id;
    superClass;
    body;
    decorators;
    constructor(id, superClass, body, decorators){
        this.type = "ClassExpression" /* ClassExpression */ ;
        this.id = id;
        this.superClass = superClass;
        this.body = body;
        this.decorators = decorators;
    }
};
var ConditionalExpression = class {
    type;
    test;
    consequent;
    alternate;
    constructor(test, consequent, alternate){
        this.type = "ConditionalExpression" /* ConditionalExpression */ ;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
};
var ContinueStatement = class {
    type;
    label;
    constructor(label){
        this.type = "ContinueStatement" /* ContinueStatement */ ;
        this.label = label;
    }
};
var DebuggerStatement = class {
    type;
    constructor(){
        this.type = "DebuggerStatement" /* DebuggerStatement */ ;
    }
};
var Decorator = class {
    type;
    expression;
    constructor(expression){
        this.type = "Decorator" /* Decorator */ ;
        this.expression = expression;
    }
};
var Directive = class {
    type;
    expression;
    directive;
    constructor(expression, directive){
        this.type = "ExpressionStatement" /* ExpressionStatement */ ;
        this.expression = expression;
        this.directive = directive;
    }
};
var DoWhileStatement = class {
    type;
    body;
    test;
    constructor(body, test){
        this.type = "DoWhileStatement" /* DoWhileStatement */ ;
        this.body = body;
        this.test = test;
    }
};
var EmptyStatement = class {
    type;
    constructor(){
        this.type = "EmptyStatement" /* EmptyStatement */ ;
    }
};
var ExportAllDeclaration = class {
    type;
    source;
    exported;
    assertions;
    constructor(source, exported, assertions){
        this.type = "ExportAllDeclaration" /* ExportAllDeclaration */ ;
        this.source = source;
        this.exported = exported;
        this.assertions = assertions;
    }
};
var ExportDefaultDeclaration = class {
    type;
    declaration;
    constructor(declaration){
        this.type = "ExportDefaultDeclaration" /* ExportDefaultDeclaration */ ;
        this.declaration = declaration;
    }
};
var ExportNamedDeclaration = class {
    type;
    declaration;
    specifiers;
    source;
    assertions;
    constructor(declaration, specifiers, source, assertions){
        this.type = "ExportNamedDeclaration" /* ExportNamedDeclaration */ ;
        this.declaration = declaration;
        this.specifiers = specifiers;
        this.source = source;
        this.assertions = assertions;
    }
};
var ExportSpecifier = class {
    type;
    exported;
    local;
    constructor(local, exported){
        this.type = "ExportSpecifier" /* ExportSpecifier */ ;
        this.exported = exported;
        this.local = local;
    }
};
var ExpressionStatement = class {
    type;
    expression;
    constructor(expression){
        this.type = "ExpressionStatement" /* ExpressionStatement */ ;
        this.expression = expression;
    }
};
var ForInStatement = class {
    type;
    left;
    right;
    body;
    each;
    constructor(left, right, body){
        this.type = "ForInStatement" /* ForInStatement */ ;
        this.left = left;
        this.right = right;
        this.body = body;
        this.each = false;
    }
};
var ForOfStatement = class {
    type;
    await;
    left;
    right;
    body;
    constructor(left, right, body, _await){
        this.type = "ForOfStatement" /* ForOfStatement */ ;
        this.await = _await;
        this.left = left;
        this.right = right;
        this.body = body;
    }
};
var ForStatement = class {
    type;
    init;
    test;
    update;
    body;
    constructor(init, test, update, body){
        this.type = "ForStatement" /* ForStatement */ ;
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
    }
};
var FunctionDeclaration = class {
    type;
    id;
    params;
    body;
    generator;
    expression;
    async;
    constructor(id, params, body, generator){
        this.type = "FunctionDeclaration" /* FunctionDeclaration */ ;
        this.id = id;
        this.params = params;
        this.body = body;
        this.generator = generator;
        this.expression = false;
        this.async = false;
    }
};
var FunctionExpression = class {
    type;
    id;
    params;
    body;
    generator;
    expression;
    async;
    constructor(id, params, body, generator, isAsync){
        this.type = "FunctionExpression" /* FunctionExpression */ ;
        this.id = id;
        this.params = params;
        this.body = body;
        this.generator = generator;
        this.expression = false;
        this.async = isAsync;
    }
};
var Identifier = class {
    type;
    name;
    constructor(name){
        this.type = "Identifier" /* Identifier */ ;
        this.name = name;
    }
};
var IfStatement = class {
    type;
    test;
    consequent;
    alternate;
    constructor(test, consequent, alternate){
        this.type = "IfStatement" /* IfStatement */ ;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
};
var ImportAttribute = class {
    type;
    key;
    value;
    constructor(key, value){
        this.type = "ImportAttribute" /* ImportAttribute */ ;
        this.key = key;
        this.value = value;
    }
};
var ImportExpression = class {
    type;
    source;
    attributes;
    constructor(source, attributes){
        this.type = "ImportExpression" /* ImportExpression */ ;
        this.source = source;
        this.attributes = attributes;
    }
};
var ImportDeclaration = class {
    type;
    specifiers;
    source;
    assertions;
    constructor(specifiers, source, assertions){
        this.type = "ImportDeclaration" /* ImportDeclaration */ ;
        this.specifiers = specifiers;
        this.source = source;
        this.assertions = assertions;
    }
};
var ImportDefaultSpecifier = class {
    type;
    local;
    constructor(local){
        this.type = "ImportDefaultSpecifier" /* ImportDefaultSpecifier */ ;
        this.local = local;
    }
};
var ImportNamespaceSpecifier = class {
    type;
    local;
    constructor(local){
        this.type = "ImportNamespaceSpecifier" /* ImportNamespaceSpecifier */ ;
        this.local = local;
    }
};
var ImportSpecifier = class {
    type;
    local;
    imported;
    constructor(local, imported){
        this.type = "ImportSpecifier" /* ImportSpecifier */ ;
        this.local = local;
        this.imported = imported;
    }
};
var LabeledStatement = class {
    type;
    label;
    body;
    constructor(label, body){
        this.type = "LabeledStatement" /* LabeledStatement */ ;
        this.label = label;
        this.body = body;
    }
};
var Literal = class {
    type;
    value;
    raw;
    constructor(value, raw){
        this.type = "Literal" /* Literal */ ;
        this.value = value;
        this.raw = raw;
    }
};
var LogicalExpression = class {
    type;
    operator;
    left;
    right;
    constructor(operator, left, right){
        this.type = "LogicalExpression" /* LogicalExpression */ ;
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
};
var MemberExpression = class {
    type;
    computed;
    object;
    property;
    optional;
    constructor(computed, object, property, optional){
        this.type = "MemberExpression" /* MemberExpression */ ;
        this.computed = computed;
        this.object = object;
        this.property = property;
        this.optional = optional;
    }
};
var MetaProperty = class {
    type;
    meta;
    property;
    constructor(meta, property){
        this.type = "MetaProperty" /* MetaProperty */ ;
        this.meta = meta;
        this.property = property;
    }
};
var MethodDefinition = class {
    type;
    key;
    computed;
    value;
    kind;
    static;
    decorators;
    constructor(key, computed, value, kind, isStatic, decorators){
        this.type = "MethodDefinition" /* MethodDefinition */ ;
        this.key = key;
        this.computed = computed;
        this.value = value;
        this.kind = kind;
        this.static = isStatic;
        this.decorators = decorators;
    }
};
var Module = class {
    type;
    body;
    sourceType;
    constructor(body){
        this.type = "Program" /* Program */ ;
        this.body = body;
        this.sourceType = "module";
    }
};
var NewExpression = class {
    type;
    callee;
    arguments;
    constructor(callee, args){
        this.type = "NewExpression" /* NewExpression */ ;
        this.callee = callee;
        this.arguments = args;
    }
};
var ObjectExpression = class {
    type;
    properties;
    constructor(properties){
        this.type = "ObjectExpression" /* ObjectExpression */ ;
        this.properties = properties;
    }
};
var ObjectPattern = class {
    type;
    properties;
    constructor(properties){
        this.type = "ObjectPattern" /* ObjectPattern */ ;
        this.properties = properties;
    }
};
var PrivateIdentifier = class {
    type;
    name;
    constructor(name){
        this.type = "PrivateIdentifier" /* PrivateIdentifier */ ;
        this.name = name;
    }
};
var Program = class {
    type;
    body;
    sourceType;
    constructor(sourceType, body){
        this.type = "Program" /* Program */ ;
        this.sourceType = sourceType;
        this.body = body;
    }
};
var Property = class {
    type;
    key;
    computed;
    value;
    kind;
    method;
    shorthand;
    constructor(kind, key, computed, value, method, shorthand){
        this.type = "Property" /* Property */ ;
        this.key = key;
        this.computed = computed;
        this.value = value;
        this.kind = kind;
        this.method = method;
        this.shorthand = shorthand;
    }
};
var PropertyDefinition = class {
    type;
    key;
    computed;
    value;
    static;
    decorators;
    constructor(key, computed, value, isStatic, decorators){
        this.type = "Property" /* Property */ ;
        this.key = key;
        this.computed = computed;
        this.value = value;
        this.static = isStatic;
        this.decorators = decorators;
    }
};
var RegexLiteral = class {
    type;
    value;
    raw;
    regex;
    constructor(value, raw, pattern, flags){
        this.type = "Literal" /* Literal */ ;
        this.value = value;
        this.raw = raw;
        this.regex = {
            pattern,
            flags
        };
    }
};
var RestElement = class {
    type;
    argument;
    constructor(argument){
        this.type = "RestElement" /* RestElement */ ;
        this.argument = argument;
    }
};
var ReturnStatement = class {
    type;
    argument;
    constructor(argument){
        this.type = "ReturnStatement" /* ReturnStatement */ ;
        this.argument = argument;
    }
};
var Script = class {
    type;
    body;
    sourceType;
    constructor(body){
        this.type = "Program" /* Program */ ;
        this.body = body;
        this.sourceType = "script";
    }
};
var SequenceExpression = class {
    type;
    expressions;
    constructor(expressions){
        this.type = "SequenceExpression" /* SequenceExpression */ ;
        this.expressions = expressions;
    }
};
var SpreadElement = class {
    type;
    argument;
    constructor(argument){
        this.type = "SpreadElement" /* SpreadElement */ ;
        this.argument = argument;
    }
};
var StaticBlock = class {
    type;
    body;
    constructor(body){
        this.type = "StaticBlock" /* StaticBlock */ ;
        this.body = body;
    }
};
var Super = class {
    type;
    constructor(){
        this.type = "Super" /* Super */ ;
    }
};
var SwitchCase = class {
    type;
    test;
    consequent;
    constructor(test, consequent){
        this.type = "SwitchCase" /* SwitchCase */ ;
        this.test = test;
        this.consequent = consequent;
    }
};
var SwitchStatement = class {
    type;
    discriminant;
    cases;
    constructor(discriminant, cases){
        this.type = "SwitchStatement" /* SwitchStatement */ ;
        this.discriminant = discriminant;
        this.cases = cases;
    }
};
var TaggedTemplateExpression = class {
    type;
    tag;
    quasi;
    constructor(tag, quasi){
        this.type = "TaggedTemplateExpression" /* TaggedTemplateExpression */ ;
        this.tag = tag;
        this.quasi = quasi;
    }
};
var TemplateElement = class {
    type;
    value;
    tail;
    constructor(value, tail){
        this.type = "TemplateElement" /* TemplateElement */ ;
        this.value = value;
        this.tail = tail;
    }
};
var TemplateLiteral = class {
    type;
    quasis;
    expressions;
    constructor(quasis, expressions){
        this.type = "TemplateLiteral" /* TemplateLiteral */ ;
        this.quasis = quasis;
        this.expressions = expressions;
    }
};
var ThisExpression = class {
    type;
    constructor(){
        this.type = "ThisExpression" /* ThisExpression */ ;
    }
};
var ThrowStatement = class {
    type;
    argument;
    constructor(argument){
        this.type = "ThrowStatement" /* ThrowStatement */ ;
        this.argument = argument;
    }
};
var TryStatement = class {
    type;
    block;
    handler;
    finalizer;
    constructor(block, handler, finalizer){
        this.type = "TryStatement" /* TryStatement */ ;
        this.block = block;
        this.handler = handler;
        this.finalizer = finalizer;
    }
};
var UnaryExpression = class {
    type;
    operator;
    argument;
    prefix;
    constructor(operator, argument){
        this.type = "UnaryExpression" /* UnaryExpression */ ;
        this.operator = operator;
        this.argument = argument;
        this.prefix = true;
    }
};
var UpdateExpression = class {
    type;
    operator;
    argument;
    prefix;
    constructor(operator, argument, prefix){
        this.type = "UpdateExpression" /* UpdateExpression */ ;
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
    }
};
var VariableDeclaration = class {
    type;
    declarations;
    kind;
    constructor(declarations, kind){
        this.type = "VariableDeclaration" /* VariableDeclaration */ ;
        this.declarations = declarations;
        this.kind = kind;
    }
};
var VariableDeclarator = class {
    type;
    id;
    init;
    constructor(id, init){
        this.type = "VariableDeclarator" /* VariableDeclarator */ ;
        this.id = id;
        this.init = init;
    }
};
var WhileStatement = class {
    type;
    test;
    body;
    constructor(test, body){
        this.type = "WhileStatement" /* WhileStatement */ ;
        this.test = test;
        this.body = body;
    }
};
var WithStatement = class {
    type;
    object;
    body;
    constructor(object, body){
        this.type = "WithStatement" /* WithStatement */ ;
        this.object = object;
        this.body = body;
    }
};
var YieldExpression = class {
    type;
    argument;
    delegate;
    constructor(argument, delegate){
        this.type = "YieldExpression" /* YieldExpression */ ;
        this.argument = argument;
        this.delegate = delegate;
    }
};
// src/assert.ts
function assert(condition, message) {
    if (!condition) throw new Error("ASSERT: " + message);
}
// src/error-handler.ts
var ErrorHandler = class {
    errors;
    tolerant;
    constructor(){
        this.errors = [];
        this.tolerant = false;
    }
    recordError(error) {
        this.errors.push(error);
    }
    tolerate(error) {
        if (this.tolerant) this.recordError(error);
        else throw error;
    }
    constructError(msg, column) {
        let error = new Error(msg);
        try {
            throw error;
        } catch (base) {
            if (Object.create && Object.defineProperty) {
                error = Object.create(base);
                Object.defineProperty(error, "column", {
                    value: column
                });
            }
        }
        return error;
    }
    createError(index, line, col, description) {
        const msg = "Line " + line + ": " + description;
        const _error = this.constructError(msg, col);
        _error.index = index;
        _error.lineNumber = line;
        _error.description = description;
        const error = _error;
        return error;
    }
    throwError(index, line, col, description) {
        throw this.createError(index, line, col, description);
    }
    tolerateError(index, line, col, description) {
        const error = this.createError(index, line, col, description);
        if (this.tolerant) this.recordError(error);
        else throw error;
    }
};
// src/messages.ts
var Messages = {
    AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block.",
    BadImportCallArity: "Unexpected token",
    BadGetterArity: "Getter must not have any formal parameters",
    BadSetterArity: "Setter must have exactly one formal parameter",
    BadSetterRestParameter: "Setter function argument must not be a rest parameter",
    CannotUseImportMetaOutsideAModule: "Cannot use 'import.meta' outside a module",
    ConstructorIsAsync: "Class constructor may not be an async method",
    ConstructorIsPrivate: "Class constructor may not be a private method",
    ConstructorSpecialMethod: "Class constructor may not be an accessor",
    DeclarationMissingInitializer: "Missing initializer in %0 declaration",
    DefaultRestParameter: "Unexpected token =",
    DefaultRestProperty: "Unexpected token =",
    DuplicateBinding: "Duplicate binding %0",
    DuplicateConstructor: "A class may only have one constructor",
    DuplicateParameter: "Duplicate parameter name not allowed in this context",
    DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
    ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
    GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
    IllegalBreak: "Illegal break statement",
    IllegalContinue: "Illegal continue statement",
    IllegalExportDeclaration: "Unexpected token",
    IllegalImportDeclaration: "Unexpected token",
    IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
    IllegalReturn: "Illegal return statement",
    InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
    InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
    InvalidLHSInAssignment: "Invalid left-hand side in assignment",
    InvalidLHSInForIn: "Invalid left-hand side in for-in",
    InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
    InvalidModuleSpecifier: "Unexpected token",
    InvalidRegExp: "Invalid regular expression",
    InvalidTaggedTemplateOnOptionalChain: "Invalid tagged template on optional chain",
    InvalidUnicodeEscapeSequence: "Invalid Unicode escape sequence",
    LetInLexicalBinding: "let is disallowed as a lexically bound name",
    MissingFromClause: "Unexpected token",
    MultipleDefaultsInSwitch: "More than one default clause in switch statement",
    NewlineAfterThrow: "Illegal newline after throw",
    NoAsAfterImportNamespace: "Unexpected token",
    NoAsAndFromEscapeSequences: "The `as` and `from` contextual keywords must not contain Unicode escape sequences.",
    NoCatchOrFinally: "Missing catch or finally after try",
    NoSemicolonAfterDecorator: "Decorators must not be followed by a semicolon.",
    NumericSeperatorOneUnderscore: "Numeric separator must be exactly one underscore",
    NumericSeperatorNotAllowedHere: "Numeric separator is not allowed here",
    ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
    PropertyAfterRestProperty: "Unexpected token",
    Redeclaration: "%0 '%1' has already been declared",
    StaticPrototype: "Classes may not have static property named prototype",
    StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
    StrictDelete: "Delete of an unqualified identifier in strict mode.",
    StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
    StrictFunctionName: "Function name may not be eval or arguments in strict mode",
    StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
    StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
    StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
    StrictModeWith: "Strict mode code may not include a with statement",
    StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
    StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
    StrictReservedWord: "Use of future reserved word in strict mode",
    StrictVarName: "Variable name may not be eval or arguments in strict mode",
    TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
    TemplateEscape89: "\\8 and \\9 are not allowed in template strings.",
    UnexpectedEOS: "Unexpected end of input",
    UnexpectedIdentifier: "Unexpected identifier",
    UnexpectedNumber: "Unexpected number",
    UnexpectedReserved: "Unexpected reserved word",
    UnexpectedString: "Unexpected string",
    UnexpectedSuper: "'super' keyword unexpected here",
    UnexpectedTemplate: "Unexpected quasi %0",
    UnexpectedToken: "Unexpected token %0",
    UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
    UnknownLabel: "Undefined label '%0'",
    UnterminatedRegExp: "Invalid regular expression: missing /"
};
// src/token.ts
var TokenName = {};
TokenName[1 /* BooleanLiteral */ ] = "Boolean";
TokenName[2 /* EOF */ ] = "<end>";
TokenName[3 /* Identifier */ ] = "Identifier";
TokenName[4 /* Keyword */ ] = "Keyword";
TokenName[5 /* NullLiteral */ ] = "Null";
TokenName[6 /* NumericLiteral */ ] = "Numeric";
TokenName[7 /* Punctuator */ ] = "Punctuator";
TokenName[8 /* StringLiteral */ ] = "String";
TokenName[9 /* RegularExpression */ ] = "RegularExpression";
TokenName[10 /* Template */ ] = "Template";
// src/scanner.ts
function hexValue(ch) {
    return "0123456789abcdef".indexOf(ch.toLowerCase());
}
function octalValue(ch) {
    return "01234567".indexOf(ch);
}
var Scanner = class {
    source;
    errorHandler;
    trackComment;
    isModule;
    index;
    lineNumber;
    lineStart;
    curlyStack;
    length;
    constructor(code, handler){
        this.source = code;
        this.errorHandler = handler;
        this.trackComment = false;
        this.isModule = false;
        this.length = code.length;
        this.index = 0;
        this.lineNumber = code.length > 0 ? 1 : 0;
        this.lineStart = 0;
        this.curlyStack = [];
    }
    saveState() {
        return {
            index: this.index,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            curlyStack: this.curlyStack.slice()
        };
    }
    restoreState(state) {
        this.index = state.index;
        this.lineNumber = state.lineNumber;
        this.lineStart = state.lineStart;
        this.curlyStack = state.curlyStack;
    }
    eof() {
        return this.index >= this.length;
    }
    throwUnexpectedToken(message = Messages.UnexpectedTokenIllegal) {
        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
    }
    tolerateUnexpectedToken(message = Messages.UnexpectedTokenIllegal) {
        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
    }
    // https://tc39.github.io/ecma262/#sec-comments
    skipSingleLineComment(offset) {
        let comments = [];
        let start, loc;
        if (this.trackComment) {
            comments = [];
            start = this.index - offset;
            loc = {
                start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - offset
                },
                end: {}
            };
        }
        while(!this.eof()){
            const ch = this.source.charCodeAt(this.index);
            ++this.index;
            if (Character.isLineTerminator(ch)) {
                if (this.trackComment) {
                    loc.end = {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - 1
                    };
                    const entry = {
                        multiLine: false,
                        slice: [
                            start + offset,
                            this.index - 1
                        ],
                        range: [
                            start,
                            this.index - 1
                        ],
                        loc
                    };
                    comments.push(entry);
                }
                if (ch === 13 && this.source.charCodeAt(this.index) === 10) ++this.index;
                ++this.lineNumber;
                this.lineStart = this.index;
                return comments;
            }
        }
        if (this.trackComment) {
            loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
            };
            const entry = {
                multiLine: false,
                slice: [
                    start + offset,
                    this.index
                ],
                range: [
                    start,
                    this.index
                ],
                loc
            };
            comments.push(entry);
        }
        return comments;
    }
    skipMultiLineComment() {
        let comments = [];
        let start, loc;
        if (this.trackComment) {
            comments = [];
            start = this.index - 2;
            loc = {
                start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - 2
                },
                end: {}
            };
        }
        while(!this.eof()){
            const ch = this.source.charCodeAt(this.index);
            if (Character.isLineTerminator(ch)) {
                if (ch === 13 && this.source.charCodeAt(this.index + 1) === 10) ++this.index;
                ++this.lineNumber;
                ++this.index;
                this.lineStart = this.index;
            } else if (ch === 42) {
                if (this.source.charCodeAt(this.index + 1) === 47) {
                    this.index += 2;
                    if (this.trackComment) {
                        loc.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        };
                        const entry = {
                            multiLine: true,
                            slice: [
                                start + 2,
                                this.index - 2
                            ],
                            range: [
                                start,
                                this.index
                            ],
                            loc
                        };
                        comments.push(entry);
                    }
                    return comments;
                }
                ++this.index;
            } else ++this.index;
        }
        if (this.trackComment) {
            loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
            };
            const entry = {
                multiLine: true,
                slice: [
                    start + 2,
                    this.index
                ],
                range: [
                    start,
                    this.index
                ],
                loc
            };
            comments.push(entry);
        }
        this.tolerateUnexpectedToken();
        return comments;
    }
    scanComments() {
        let comments;
        if (this.trackComment) comments = [];
        let start = this.index === 0;
        while(!this.eof()){
            let ch = this.source.charCodeAt(this.index);
            if (Character.isWhiteSpace(ch)) ++this.index;
            else if (Character.isLineTerminator(ch)) {
                ++this.index;
                if (ch === 13 && this.source.charCodeAt(this.index) === 10) ++this.index;
                ++this.lineNumber;
                this.lineStart = this.index;
                start = true;
            } else if (ch === 47) {
                ch = this.source.charCodeAt(this.index + 1);
                if (ch === 47) {
                    this.index += 2;
                    const comment = this.skipSingleLineComment(2);
                    if (this.trackComment) comments = comments.concat(comment);
                    start = true;
                } else if (ch === 42) {
                    this.index += 2;
                    const comment = this.skipMultiLineComment();
                    if (this.trackComment) comments = comments.concat(comment);
                } else break;
            } else if (start && ch === 45) {
                if (this.source.charCodeAt(this.index + 1) === 45 && this.source.charCodeAt(this.index + 2) === 62) {
                    this.index += 3;
                    const comment = this.skipSingleLineComment(3);
                    if (this.trackComment) comments = comments.concat(comment);
                } else break;
            } else if (ch === 60 && !this.isModule) {
                if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
                    this.index += 4;
                    const comment = this.skipSingleLineComment(4);
                    if (this.trackComment) comments = comments.concat(comment);
                } else break;
            } else break;
        }
        return comments;
    }
    // https://tc39.github.io/ecma262/#sec-future-reserved-words
    isFutureReservedWord(id) {
        switch(id){
            case "enum":
            case "export":
            case "import":
            case "super":
                return true;
            default:
                return false;
        }
    }
    isStrictModeReservedWord(id) {
        switch(id){
            case "implements":
            case "interface":
            case "package":
            case "private":
            case "protected":
            case "public":
            case "static":
            case "yield":
            case "let":
                return true;
            default:
                return false;
        }
    }
    isRestrictedWord(id) {
        return id === "eval" || id === "arguments";
    }
    // https://tc39.github.io/ecma262/#sec-keywords
    isKeyword(id) {
        switch(id.length){
            case 2:
                return id === "if" || id === "in" || id === "do";
            case 3:
                return id === "var" || id === "for" || id === "new" || id === "try" || id === "let";
            case 4:
                return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
            case 5:
                return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
            case 6:
                return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
            case 7:
                return id === "default" || id === "finally" || id === "extends";
            case 8:
                return id === "function" || id === "continue" || id === "debugger";
            case 10:
                return id === "instanceof";
            default:
                return false;
        }
    }
    codePointAt(i) {
        let cp = this.source.charCodeAt(i);
        if (cp >= 55296 && cp <= 56319) {
            const second = this.source.charCodeAt(i + 1);
            if (second >= 56320 && second <= 57343) {
                const first = cp;
                cp = (first - 55296) * 1024 + second - 56320 + 65536;
            }
        }
        return cp;
    }
    scanHexEscape(prefix) {
        const len = prefix === "u" ? 4 : 2;
        let code = 0;
        for(let i = 0; i < len; ++i){
            if (!this.eof() && Character.isHexDigit(this.source.charCodeAt(this.index))) code = code * 16 + hexValue(this.source[this.index++]);
            else return null;
        }
        return String.fromCharCode(code);
    }
    tryToScanUnicodeCodePointEscape() {
        let ch = this.source[this.index];
        let code = 0;
        if (ch === "}") return null;
        while(!this.eof()){
            ch = this.source[this.index++];
            if (!Character.isHexDigit(ch.charCodeAt(0))) break;
            code = code * 16 + hexValue(ch);
        }
        if (code > 1114111 || ch !== "}") return null;
        return Character.fromCodePoint(code);
    }
    scanUnicodeCodePointEscape() {
        const result = this.tryToScanUnicodeCodePointEscape();
        if (result === null) return this.throwUnexpectedToken();
        return result;
    }
    getIdentifier() {
        const start = this.index++;
        while(!this.eof()){
            const ch = this.source.charCodeAt(this.index);
            if (ch === 92) {
                this.index = start;
                return this.getComplexIdentifier();
            } else if (ch >= 55296 && ch < 57343) {
                this.index = start;
                return this.getComplexIdentifier();
            }
            if (Character.isIdentifierPart(ch)) ++this.index;
            else break;
        }
        return this.source.slice(start, this.index);
    }
    getComplexIdentifier() {
        let cp = this.codePointAt(this.index);
        let id = Character.fromCodePoint(cp);
        this.index += id.length;
        let ch;
        if (cp === 92) {
            if (this.source.charCodeAt(this.index) !== 117) this.throwUnexpectedToken();
            ++this.index;
            if (this.source[this.index] === "{") {
                ++this.index;
                ch = this.scanUnicodeCodePointEscape();
            } else {
                ch = this.scanHexEscape("u");
                if (ch === null || ch === "\\" || !Character.isIdentifierStart(ch.charCodeAt(0))) this.throwUnexpectedToken();
            }
            id = ch;
        }
        while(!this.eof()){
            cp = this.codePointAt(this.index);
            if (!Character.isIdentifierPart(cp)) break;
            ch = Character.fromCodePoint(cp);
            id += ch;
            this.index += ch.length;
            if (cp === 92) {
                id = id.substr(0, id.length - 1);
                if (this.source.charCodeAt(this.index) !== 117) this.throwUnexpectedToken();
                ++this.index;
                if (this.source[this.index] === "{") {
                    ++this.index;
                    ch = this.scanUnicodeCodePointEscape();
                } else {
                    ch = this.scanHexEscape("u");
                    if (ch === null || ch === "\\" || !Character.isIdentifierPart(ch.charCodeAt(0))) this.throwUnexpectedToken();
                }
                id += ch;
            }
        }
        return id;
    }
    octalToDecimal(ch) {
        let octal = ch !== "0";
        let code = octalValue(ch);
        if (!this.eof() && Character.isOctalDigit(this.source.charCodeAt(this.index))) {
            octal = true;
            code = code * 8 + octalValue(this.source[this.index++]);
            if ("0123".indexOf(ch) >= 0 && !this.eof() && Character.isOctalDigit(this.source.charCodeAt(this.index))) code = code * 8 + octalValue(this.source[this.index++]);
        }
        return {
            code,
            octal
        };
    }
    // https://tc39.github.io/ecma262/#sec-names-and-keywords
    scanIdentifier() {
        let type;
        const start = this.index;
        const escaped = this.source.charCodeAt(start) === 92;
        const id = escaped ? this.getComplexIdentifier() : this.getIdentifier();
        if (id.length === 1) type = 3 /* Identifier */ ;
        else if (this.isKeyword(id)) type = 4 /* Keyword */ ;
        else if (id === "null") type = 5 /* NullLiteral */ ;
        else if (id === "true" || id === "false") type = 1 /* BooleanLiteral */ ;
        else type = 3 /* Identifier */ ;
        if (type !== 3 /* Identifier */  && start + id.length !== this.index) {
            const restore = this.index;
            this.index = start;
            this.tolerateUnexpectedToken(Messages.InvalidEscapedReservedWord);
            this.index = restore;
        }
        return {
            type,
            value: id,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index,
            escaped
        };
    }
    // https://tc39.github.io/ecma262/#sec-punctuators
    scanPunctuator() {
        const start = this.index;
        let str = this.source[this.index];
        switch(str){
            case "(":
            case "{":
                if (str === "{") this.curlyStack.push("{");
                ++this.index;
                break;
            case ".":
                ++this.index;
                if (this.source[this.index] === "." && this.source[this.index + 1] === ".") {
                    this.index += 2;
                    str = "...";
                }
                break;
            case "}":
                ++this.index;
                this.curlyStack.pop();
                break;
            case "?":
                ++this.index;
                if (this.source[this.index] === "?") {
                    ++this.index;
                    if (this.source[this.index] === "=") {
                        ++this.index;
                        str = "??=";
                    } else str = "??";
                }
                if (this.source[this.index] === "." && !/^\d$/.test(this.source[this.index + 1])) {
                    ++this.index;
                    str = "?.";
                }
                break;
            case "#":
            case ")":
            case ";":
            case ",":
            case "[":
            case "]":
            case ":":
            case "~":
            case "@":
                ++this.index;
                break;
            default:
                str = this.source.substr(this.index, 4);
                if (str === ">>>=") this.index += 4;
                else {
                    str = str.substr(0, 3);
                    if (str === "===" || str === "!==" || str === ">>>" || str === "<<=" || str === ">>=" || str === "**=" || str === "&&=" || str === "||=") this.index += 3;
                    else {
                        str = str.substr(0, 2);
                        if (str === "&&" || str === "||" || str === "==" || str === "!=" || str === "+=" || str === "-=" || str === "*=" || str === "/=" || str === "++" || str === "--" || str === "<<" || str === ">>" || str === "&=" || str === "|=" || str === "^=" || str === "%=" || str === "<=" || str === ">=" || str === "=>" || str === "**") this.index += 2;
                        else {
                            str = this.source[this.index];
                            if ("<>=!+-*%&|^/".indexOf(str) >= 0) ++this.index;
                        }
                    }
                }
        }
        if (this.index === start) this.throwUnexpectedToken();
        return {
            type: 7 /* Punctuator */ ,
            value: str,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
    scanHexLiteral(start) {
        let num = this.scanLiteralPart(Character.isHexDigitChar);
        if (num.length === 0) this.throwUnexpectedToken();
        if (this.source[this.index] === "n") {
            this.index++;
            return {
                type: 6 /* NumericLiteral */ ,
                value: BigInt("0x" + num),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start,
                end: this.index
            };
        }
        if (Character.isIdentifierStart(this.source.charCodeAt(this.index))) this.throwUnexpectedToken();
        return {
            type: 6 /* NumericLiteral */ ,
            value: parseInt("0x" + num, 16),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    scanBinaryLiteral(start) {
        let ch;
        let num = this.scanLiteralPart((c)=>c === "0" || c === "1");
        if (num.length === 0) this.throwUnexpectedToken();
        if (this.source[this.index] === "n") {
            this.index++;
            return {
                type: 6 /* NumericLiteral */ ,
                value: BigInt("0b" + num),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start,
                end: this.index
            };
        }
        if (!this.eof()) {
            ch = this.source.charCodeAt(this.index);
            if (Character.isIdentifierStart(ch) || Character.isDecimalDigit(ch)) this.throwUnexpectedToken();
        }
        return {
            type: 6 /* NumericLiteral */ ,
            value: parseInt(num, 2),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    scanOctalLiteral(prefix, start) {
        let num = "";
        let octal = false;
        if (Character.isOctalDigit(prefix.charCodeAt(0))) {
            octal = true;
            num = "0" + this.source[this.index++];
        } else ++this.index;
        num += this.scanLiteralPart(Character.isOctalDigitChar);
        if (!octal && num.length === 0) this.throwUnexpectedToken();
        if (this.source[this.index] === "n") {
            this.index++;
            return {
                type: 6 /* NumericLiteral */ ,
                value: BigInt("0o" + num),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start,
                end: this.index
            };
        }
        if (Character.isIdentifierStart(this.source.charCodeAt(this.index)) || Character.isDecimalDigit(this.source.charCodeAt(this.index))) this.throwUnexpectedToken();
        return {
            type: 6 /* NumericLiteral */ ,
            value: parseInt(num, 8),
            octal,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    isImplicitOctalLiteral() {
        for(let i = this.index + 1; i < this.length; ++i){
            const ch = this.source[i];
            if (ch === "8" || ch === "9" || ch === "n") return false;
            if (!Character.isOctalDigit(ch.charCodeAt(0))) return true;
        }
        return true;
    }
    scanLiteralPart(check) {
        let num = "";
        if (this.source[this.index] === "_") this.throwUnexpectedToken(Messages.NumericSeperatorNotAllowedHere);
        while(this.source[this.index] && (check(this.source[this.index]) || this.source[this.index] === "_")){
            if (this.source[this.index] !== "_") num += this.source[this.index];
            this.index++;
            if (this.source[this.index - 1] === "_" && this.source[this.index] === "_") this.throwUnexpectedToken(Messages.NumericSeperatorOneUnderscore);
        }
        if (this.source[this.index - 1] === "_") this.throwUnexpectedToken(Messages.NumericSeperatorNotAllowedHere);
        return num;
    }
    scanNumericLiteral() {
        const start = this.index;
        let ch = this.source[start];
        assert(Character.isDecimalDigit(ch.charCodeAt(0)) || ch === ".", "Numeric literal must start with a decimal digit or a decimal point");
        let num = "";
        if (ch !== ".") {
            num = this.source[this.index++];
            ch = this.source[this.index];
            if (num === "0") {
                if (ch === "x" || ch === "X") {
                    ++this.index;
                    return this.scanHexLiteral(start);
                }
                if (ch === "b" || ch === "B") {
                    ++this.index;
                    return this.scanBinaryLiteral(start);
                }
                if (ch === "o" || ch === "O") return this.scanOctalLiteral(ch, start);
                if (ch && Character.isOctalDigit(ch.charCodeAt(0))) {
                    if (this.isImplicitOctalLiteral()) return this.scanOctalLiteral(ch, start);
                }
            }
            this.index--;
            num = this.scanLiteralPart(Character.isDecimalDigitChar);
            ch = this.source[this.index];
        }
        if (ch === ".") {
            num += this.source[this.index++];
            num += this.scanLiteralPart(Character.isDecimalDigitChar);
            ch = this.source[this.index];
        }
        if (ch === "e" || ch === "E") {
            num += this.source[this.index++];
            ch = this.source[this.index];
            if (ch === "+" || ch === "-") num += this.source[this.index++];
            if (Character.isDecimalDigit(this.source.charCodeAt(this.index))) num += this.scanLiteralPart(Character.isDecimalDigitChar);
            else this.throwUnexpectedToken();
        } else if (ch === "n") {
            if (num.length > 1 && num[0] === "0") this.throwUnexpectedToken();
            this.index++;
            return {
                type: 6 /* NumericLiteral */ ,
                value: BigInt(num),
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start,
                end: this.index
            };
        }
        if (Character.isIdentifierStart(this.source.charCodeAt(this.index))) this.throwUnexpectedToken();
        return {
            type: 6 /* NumericLiteral */ ,
            value: parseFloat(num),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    // https://tc39.github.io/ecma262/#sec-literals-string-literals
    scanStringLiteral() {
        const start = this.index;
        let quote = this.source[start];
        assert(quote === "'" || quote === '"', "String literal must starts with a quote");
        ++this.index;
        let octal = false;
        let str = "";
        while(!this.eof()){
            let ch = this.source[this.index++];
            if (ch === quote) {
                quote = "";
                break;
            } else if (ch === "\\") {
                ch = this.source[this.index++];
                if (!ch || !Character.isLineTerminator(ch.charCodeAt(0))) switch(ch){
                    case "u":
                        if (this.source[this.index] === "{") {
                            ++this.index;
                            str += this.scanUnicodeCodePointEscape();
                        } else {
                            const unescapedChar = this.scanHexEscape(ch);
                            if (unescapedChar === null) this.throwUnexpectedToken();
                            str += unescapedChar;
                        }
                        break;
                    case "x":
                        const unescaped = this.scanHexEscape(ch);
                        if (unescaped === null) this.throwUnexpectedToken(Messages.InvalidHexEscapeSequence);
                        str += unescaped;
                        break;
                    case "n":
                        str += "\n";
                        break;
                    case "r":
                        str += "\r";
                        break;
                    case "t":
                        str += "	";
                        break;
                    case "b":
                        str += "\b";
                        break;
                    case "f":
                        str += "\f";
                        break;
                    case "v":
                        str += "\v";
                        break;
                    case "8":
                    case "9":
                        str += ch;
                        this.tolerateUnexpectedToken();
                        break;
                    default:
                        if (ch && Character.isOctalDigit(ch.charCodeAt(0))) {
                            const octToDec = this.octalToDecimal(ch);
                            octal = octToDec.octal || octal;
                            str += String.fromCharCode(octToDec.code);
                        } else str += ch;
                        break;
                }
                else {
                    ++this.lineNumber;
                    if (ch === "\r" && this.source[this.index] === "\n") ++this.index;
                    this.lineStart = this.index;
                }
            } else if (Character.isLineTerminator(ch.charCodeAt(0))) break;
            else str += ch;
        }
        if (quote !== "") {
            this.index = start;
            this.throwUnexpectedToken();
        }
        return {
            type: 8 /* StringLiteral */ ,
            value: str,
            octal,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
    scanTemplate() {
        let cooked = "";
        let terminated = false;
        const start = this.index;
        const head = this.source[start] === "`";
        let tail = false;
        let notEscapeSequenceHead = null;
        let rawOffset = 2;
        ++this.index;
        while(!this.eof()){
            let ch = this.source[this.index++];
            if (ch === "`") {
                rawOffset = 1;
                tail = true;
                terminated = true;
                break;
            } else if (ch === "$") {
                if (this.source[this.index] === "{") {
                    this.curlyStack.push("${");
                    ++this.index;
                    terminated = true;
                    break;
                }
                cooked += ch;
            } else if (notEscapeSequenceHead !== null) continue;
            else if (ch === "\\") {
                ch = this.source[this.index++];
                if (!Character.isLineTerminator(ch.charCodeAt(0))) switch(ch){
                    case "n":
                        cooked += "\n";
                        break;
                    case "r":
                        cooked += "\r";
                        break;
                    case "t":
                        cooked += "	";
                        break;
                    case "u":
                        if (this.source[this.index] === "{") {
                            ++this.index;
                            const unicodeCodePointEscape = this.tryToScanUnicodeCodePointEscape();
                            if (unicodeCodePointEscape === null) notEscapeSequenceHead = "u";
                            else cooked += unicodeCodePointEscape;
                        } else {
                            const unescapedChar = this.scanHexEscape(ch);
                            if (unescapedChar === null) notEscapeSequenceHead = "u";
                            else cooked += unescapedChar;
                        }
                        break;
                    case "x":
                        const unescaped = this.scanHexEscape(ch);
                        if (unescaped === null) notEscapeSequenceHead = "x";
                        else cooked += unescaped;
                        break;
                    case "b":
                        cooked += "\b";
                        break;
                    case "f":
                        cooked += "\f";
                        break;
                    case "v":
                        cooked += "\v";
                        break;
                    default:
                        if (ch === "0") {
                            if (Character.isDecimalDigit(this.source.charCodeAt(this.index))) notEscapeSequenceHead = "0";
                            else cooked += "\0";
                        } else if (Character.isDecimalDigitChar(ch)) notEscapeSequenceHead = ch;
                        else cooked += ch;
                        break;
                }
                else {
                    ++this.lineNumber;
                    if (ch === "\r" && this.source[this.index] === "\n") ++this.index;
                    this.lineStart = this.index;
                }
            } else if (Character.isLineTerminator(ch.charCodeAt(0))) {
                ++this.lineNumber;
                if (ch === "\r" && this.source[this.index] === "\n") ++this.index;
                this.lineStart = this.index;
                cooked += "\n";
            } else cooked += ch;
        }
        if (!terminated) this.throwUnexpectedToken();
        if (!head) this.curlyStack.pop();
        return {
            type: 10 /* Template */ ,
            value: this.source.slice(start + 1, this.index - rawOffset),
            cooked: notEscapeSequenceHead === null ? cooked : null,
            head,
            tail,
            notEscapeSequenceHead,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
    testRegExp(pattern, flags) {
        const astralSubstitute = "\uFFFF";
        let tmp = pattern;
        if (flags.indexOf("u") >= 0) tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, ($0, $1, $2)=>{
            const codePoint = parseInt($1 || $2, 16);
            if (codePoint > 1114111) this.throwUnexpectedToken(Messages.InvalidRegExp);
            if (codePoint <= 65535) return String.fromCharCode(codePoint);
            return astralSubstitute;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
        try {
            RegExp(tmp);
        } catch (e) {
            this.throwUnexpectedToken(Messages.InvalidRegExp);
        }
        try {
            return new RegExp(pattern, flags);
        } catch (exception) {
            return null;
        }
    }
    scanRegExpBody() {
        let ch = this.source[this.index];
        assert(ch === "/", "Regular expression literal must start with a slash");
        let str = this.source[this.index++];
        let classMarker = false;
        let terminated = false;
        while(!this.eof()){
            ch = this.source[this.index++];
            str += ch;
            if (ch === "\\") {
                ch = this.source[this.index++];
                if (Character.isLineTerminator(ch.charCodeAt(0))) this.throwUnexpectedToken(Messages.UnterminatedRegExp);
                str += ch;
            } else if (Character.isLineTerminator(ch.charCodeAt(0))) this.throwUnexpectedToken(Messages.UnterminatedRegExp);
            else if (classMarker) {
                if (ch === "]") classMarker = false;
            } else {
                if (ch === "/") {
                    terminated = true;
                    break;
                } else if (ch === "[") classMarker = true;
            }
        }
        if (!terminated) this.throwUnexpectedToken(Messages.UnterminatedRegExp);
        return str.substr(1, str.length - 2);
    }
    scanRegExpFlags() {
        let str = "";
        let flags = "";
        while(!this.eof()){
            let ch = this.source[this.index];
            if (!Character.isIdentifierPart(ch.charCodeAt(0))) break;
            ++this.index;
            if (ch === "\\" && !this.eof()) {
                ch = this.source[this.index];
                if (ch === "u") {
                    ++this.index;
                    let restore = this.index;
                    const char = this.scanHexEscape("u");
                    if (char !== null) {
                        flags += char;
                        for(str += "\\u"; restore < this.index; ++restore)str += this.source[restore];
                    } else {
                        this.index = restore;
                        flags += "u";
                        str += "\\u";
                    }
                    this.tolerateUnexpectedToken();
                } else {
                    str += "\\";
                    this.tolerateUnexpectedToken();
                }
            } else {
                flags += ch;
                str += ch;
            }
        }
        return flags;
    }
    scanRegExp() {
        const start = this.index;
        const pattern = this.scanRegExpBody();
        const flags = this.scanRegExpFlags();
        const value = this.testRegExp(pattern, flags);
        return {
            type: 9 /* RegularExpression */ ,
            value: "",
            pattern,
            flags,
            regex: value,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start,
            end: this.index
        };
    }
    lex() {
        if (this.eof()) return {
            type: 2 /* EOF */ ,
            value: "",
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: this.index,
            end: this.index
        };
        const cp = this.source.charCodeAt(this.index);
        if (Character.isIdentifierStart(cp)) return this.scanIdentifier();
        if (cp === 40 || cp === 41 || cp === 59) return this.scanPunctuator();
        if (cp === 39 || cp === 34) return this.scanStringLiteral();
        if (cp === 46) {
            if (Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) return this.scanNumericLiteral();
            return this.scanPunctuator();
        }
        if (Character.isDecimalDigit(cp)) return this.scanNumericLiteral();
        if (cp === 96 || cp === 125 && this.curlyStack[this.curlyStack.length - 1] === "${") return this.scanTemplate();
        if (cp >= 55296 && cp < 57343) {
            if (Character.isIdentifierStart(this.codePointAt(this.index))) return this.scanIdentifier();
        }
        return this.scanPunctuator();
    }
};
// src/parser.ts
var ArrowParameterPlaceHolder = "ArrowParameterPlaceHolder";
var Parser = class {
    config;
    delegate;
    errorHandler;
    scanner;
    operatorPrecedence;
    lookahead;
    hasLineTerminator;
    context;
    tokens;
    startMarker;
    lastMarker;
    constructor(code, options = {}, delegate){
        this.config = {
            range: typeof options.range === "boolean" && options.range,
            loc: typeof options.loc === "boolean" && options.loc,
            source: null,
            tokens: typeof options.tokens === "boolean" && options.tokens,
            comment: typeof options.comment === "boolean" && options.comment,
            tolerant: typeof options.tolerant === "boolean" && options.tolerant
        };
        if (this.config.loc && options.source && options.source !== null) this.config.source = String(options.source);
        this.delegate = delegate;
        this.errorHandler = new ErrorHandler();
        this.errorHandler.tolerant = this.config.tolerant == true;
        this.scanner = new Scanner(code, this.errorHandler);
        this.scanner.trackComment = this.config.comment == true;
        this.operatorPrecedence = {
            ")": 0,
            ";": 0,
            ",": 0,
            "=": 0,
            "]": 0,
            "??": 5,
            "||": 6,
            "&&": 7,
            "|": 8,
            "^": 9,
            "&": 10,
            "==": 11,
            "!=": 11,
            "===": 11,
            "!==": 11,
            "<": 12,
            ">": 12,
            "<=": 12,
            ">=": 12,
            "<<": 13,
            ">>": 13,
            ">>>": 13,
            "+": 14,
            "-": 14,
            "*": 15,
            "/": 15,
            "%": 15
        };
        this.lookahead = {
            type: 2 /* EOF */ ,
            value: "",
            lineNumber: this.scanner.lineNumber,
            lineStart: 0,
            start: 0,
            end: 0
        };
        this.hasLineTerminator = false;
        this.context = {
            isModule: false,
            isAsync: false,
            allowIn: true,
            allowStrictDirective: true,
            allowSuper: false,
            allowYield: true,
            firstCoverInitializedNameError: null,
            isAssignmentTarget: false,
            isBindingElement: false,
            inConstructor: false,
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            inClassConstructor: false,
            labelSet: {},
            strict: false,
            decorators: null
        };
        this.tokens = [];
        this.startMarker = {
            index: 0,
            line: this.scanner.lineNumber,
            column: 0
        };
        this.lastMarker = {
            index: 0,
            line: this.scanner.lineNumber,
            column: 0
        };
        this.nextToken();
        this.lastMarker = {
            index: this.scanner.index,
            line: this.scanner.lineNumber,
            column: this.scanner.index - this.scanner.lineStart
        };
    }
    throwError(messageFormat, ...values) {
        const args = values.slice();
        const msg = messageFormat.replace(/%(\d)/g, (whole, idx)=>{
            assert(idx < args.length, "Message reference must be in range");
            return args[idx];
        });
        const index = this.lastMarker.index;
        const line = this.lastMarker.line;
        const column = this.lastMarker.column + 1;
        throw this.errorHandler.createError(index, line, column, msg);
    }
    tolerateError(messageFormat, ...values) {
        const args = values.slice();
        const msg = messageFormat.replace(/%(\d)/g, (whole, idx)=>{
            assert(idx < args.length, "Message reference must be in range");
            return args[idx];
        });
        const index = this.lastMarker.index;
        const line = this.scanner.lineNumber;
        const column = this.lastMarker.column + 1;
        this.errorHandler.tolerateError(index, line, column, msg);
    }
    // Throw an exception because of the token.
    unexpectedTokenError(token, message) {
        let msg = message || Messages.UnexpectedToken;
        let value;
        if (token) {
            if (!message) {
                msg = token.type === 2 /* EOF */  ? Messages.UnexpectedEOS : token.type === 3 /* Identifier */  ? Messages.UnexpectedIdentifier : token.type === 6 /* NumericLiteral */  ? Messages.UnexpectedNumber : token.type === 8 /* StringLiteral */  ? Messages.UnexpectedString : token.type === 10 /* Template */  ? Messages.UnexpectedTemplate : Messages.UnexpectedToken;
                if (token.type === 4 /* Keyword */ ) {
                    if (this.scanner.isFutureReservedWord(token.value)) msg = Messages.UnexpectedReserved;
                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) msg = Messages.StrictReservedWord;
                }
            }
            value = token.value;
        } else value = "ILLEGAL";
        msg = msg.replace("%0", value);
        if (token && typeof token.lineNumber === "number") {
            const index = token.start;
            const line = token.lineNumber;
            const lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
            const column = token.start - lastMarkerLineStart + 1;
            return this.errorHandler.createError(index, line, column, msg);
        } else {
            const index = this.lastMarker.index;
            const line = this.lastMarker.line;
            const column = this.lastMarker.column + 1;
            return this.errorHandler.createError(index, line, column, msg);
        }
    }
    throwUnexpectedToken(token, message) {
        throw this.unexpectedTokenError(token, message);
    }
    tolerateUnexpectedToken(token, message) {
        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
    }
    tolerateInvalidLoopStatement() {
        if (this.matchKeyword("class") || this.matchKeyword("function")) this.tolerateError(Messages.UnexpectedToken, this.lookahead);
    }
    collectComments() {
        if (!this.config.comment) this.scanner.scanComments();
        else {
            const comments = this.scanner.scanComments();
            if (comments.length > 0 && this.delegate) for(let i = 0; i < comments.length; ++i){
                const e = comments[i];
                const node = {
                    type: e.multiLine ? "BlockComment" : "LineComment",
                    value: this.scanner.source.slice(e.slice[0], e.slice[1])
                };
                if (this.config.range) node.range = e.range;
                if (this.config.loc) node.loc = e.loc;
                const metadata = {
                    start: {
                        line: e.loc.start.line,
                        column: e.loc.start.column,
                        offset: e.range[0]
                    },
                    end: {
                        line: e.loc.end.line,
                        column: e.loc.end.column,
                        offset: e.range[1]
                    }
                };
                this.delegate(node, metadata);
            }
        }
    }
    // From internal representation to an external structure
    getTokenRaw(token) {
        return this.scanner.source.slice(token.start, token.end);
    }
    convertToken(token) {
        const t = {
            type: TokenName[token.type],
            value: this.getTokenRaw(token)
        };
        if (this.config.range) t.range = [
            token.start,
            token.end
        ];
        if (this.config.loc) t.loc = {
            start: {
                line: this.startMarker.line,
                column: this.startMarker.column
            },
            end: {
                line: this.scanner.lineNumber,
                column: this.scanner.index - this.scanner.lineStart
            }
        };
        if (token.type === 9 /* RegularExpression */ ) {
            const pattern = token.pattern;
            const flags = token.flags;
            t.regex = {
                pattern,
                flags
            };
        }
        return t;
    }
    nextToken() {
        const token = this.lookahead;
        this.lastMarker.index = this.scanner.index;
        this.lastMarker.line = this.scanner.lineNumber;
        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
        this.collectComments();
        if (this.scanner.index !== this.startMarker.index) {
            this.startMarker.index = this.scanner.index;
            this.startMarker.line = this.scanner.lineNumber;
            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
        }
        const next = this.scanner.lex();
        this.hasLineTerminator = token.lineNumber !== next.lineNumber;
        if (next && this.context.strict && next.type === 3 /* Identifier */ ) {
            if (this.scanner.isStrictModeReservedWord(next.value)) next.type = 4 /* Keyword */ ;
        }
        this.lookahead = next;
        if (this.config.tokens && next.type !== 2 /* EOF */ ) this.tokens.push(this.convertToken(next));
        return token;
    }
    nextRegexToken() {
        this.collectComments();
        const token = this.scanner.scanRegExp();
        if (this.config.tokens) {
            this.tokens.pop();
            this.tokens.push(this.convertToken(token));
        }
        this.lookahead = token;
        this.nextToken();
        return token;
    }
    createNode() {
        return {
            index: this.startMarker.index,
            line: this.startMarker.line,
            column: this.startMarker.column
        };
    }
    startNode(token, lastLineStart = 0) {
        let column = token.start - token.lineStart;
        let line = token.lineNumber;
        if (column < 0) {
            column += lastLineStart;
            line--;
        }
        return {
            index: token.start,
            line,
            column
        };
    }
    finalize(marker, node) {
        if (this.config.range) node.range = [
            marker.index,
            this.lastMarker.index
        ];
        if (this.config.loc) {
            node.loc = {
                start: {
                    line: marker.line,
                    column: marker.column
                },
                end: {
                    line: this.lastMarker.line,
                    column: this.lastMarker.column
                }
            };
            if (this.config.source) node.loc.source = this.config.source;
        }
        if (this.delegate) {
            const metadata = {
                start: {
                    line: marker.line,
                    column: marker.column,
                    offset: marker.index
                },
                end: {
                    line: this.lastMarker.line,
                    column: this.lastMarker.column,
                    offset: this.lastMarker.index
                }
            };
            this.delegate(node, metadata);
        }
        return node;
    }
    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.
    expect(value) {
        const token = this.nextToken();
        if (token.type !== 7 /* Punctuator */  || token.value !== value) this.throwUnexpectedToken(token);
    }
    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
    expectCommaSeparator() {
        if (this.config.tolerant) {
            const token = this.lookahead;
            if (token.type === 7 /* Punctuator */  && token.value === ",") this.nextToken();
            else if (token.type === 7 /* Punctuator */  && token.value === ";") {
                this.nextToken();
                this.tolerateUnexpectedToken(token);
            } else this.tolerateUnexpectedToken(token, Messages.UnexpectedToken);
        } else this.expect(",");
    }
    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.
    expectKeyword(keyword) {
        const token = this.nextToken();
        if (token.type !== 4 /* Keyword */  || token.value !== keyword) this.throwUnexpectedToken(token);
    }
    // Return true if the next token matches the specified punctuator.
    match(value) {
        return this.lookahead.type === 7 /* Punctuator */  && this.lookahead.value === value;
    }
    // Return true if the next token matches the specified keyword
    matchKeyword(keyword) {
        return this.lookahead.type === 4 /* Keyword */  && this.lookahead.value === keyword;
    }
    // Return true if the next token matches the specified contextual keyword
    // (where an identifier is sometimes a keyword depending on the context)
    matchContextualKeyword(keyword) {
        return this.lookahead.type === 3 /* Identifier */  && this.lookahead.value === keyword;
    }
    // Return true if the next token is an assignment operator
    matchAssign() {
        if (this.lookahead.type !== 7 /* Punctuator */ ) return false;
        const op = this.lookahead.value;
        return op === "=" || op === "*=" || op === "**=" || op === "/=" || op === "%=" || op === "+=" || op === "-=" || op === "<<=" || op === ">>=" || op === ">>>=" || op === "&=" || op === "^=" || op === "|=" || op === "&&=" || op === "||=" || op === "??=";
    }
    // Cover grammar support.
    //
    // When an assignment expression position starts with an left parenthesis, the determination of the type
    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
    //
    // There are three productions that can be parsed in a parentheses pair that needs to be determined
    // after the outermost pair is closed. They are:
    //
    //   1. AssignmentExpression
    //   2. BindingElements
    //   3. AssignmentTargets
    //
    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
    // binding element or assignment target.
    //
    // The three productions have the relationship:
    //
    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
    //
    // with a single exception that CoverInitializedName when used directly in an Expression, generates
    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
    //
    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
    // the CoverInitializedName check is conducted.
    //
    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
    // pattern. The CoverInitializedName check is deferred.
    isolateCoverGrammar(parseFunction) {
        const previousIsBindingElement = this.context.isBindingElement;
        const previousIsAssignmentTarget = this.context.isAssignmentTarget;
        const previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
        this.context.isBindingElement = true;
        this.context.isAssignmentTarget = true;
        this.context.firstCoverInitializedNameError = null;
        const result = parseFunction.call(this);
        if (this.context.firstCoverInitializedNameError !== null) this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
        this.context.isBindingElement = previousIsBindingElement;
        this.context.isAssignmentTarget = previousIsAssignmentTarget;
        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
        return result;
    }
    inheritCoverGrammar(parseFunction) {
        const previousIsBindingElement = this.context.isBindingElement;
        const previousIsAssignmentTarget = this.context.isAssignmentTarget;
        const previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
        this.context.isBindingElement = true;
        this.context.isAssignmentTarget = true;
        this.context.firstCoverInitializedNameError = null;
        const result = parseFunction.call(this);
        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
        return result;
    }
    consumeSemicolon() {
        if (this.match(";")) this.nextToken();
        else if (!this.hasLineTerminator) {
            if (this.lookahead.type !== 2 /* EOF */  && !this.match("}")) this.throwUnexpectedToken(this.lookahead);
            this.lastMarker.index = this.startMarker.index;
            this.lastMarker.line = this.startMarker.line;
            this.lastMarker.column = this.startMarker.column;
        }
    }
    // https://tc39.github.io/ecma262/#sec-primary-expression
    parsePrimaryExpression() {
        const node = this.createNode();
        let expr;
        let token, raw;
        switch(this.lookahead.type){
            case 3 /* Identifier */ :
                if ((this.context.isModule || this.context.isAsync) && this.lookahead.value === "await") this.tolerateUnexpectedToken(this.lookahead);
                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Identifier(this.nextToken().value));
                break;
            case 6 /* NumericLiteral */ :
            case 8 /* StringLiteral */ :
                if (this.context.strict && this.lookahead.octal) this.tolerateUnexpectedToken(this.lookahead, Messages.StrictOctalLiteral);
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                token = this.nextToken();
                raw = this.getTokenRaw(token);
                if (typeof token.value === "bigint") expr = this.finalize(node, new BigIntLiteral(token.value, raw, token.value.toString()));
                else expr = this.finalize(node, new Literal(token.value, raw));
                break;
            case 1 /* BooleanLiteral */ :
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                token = this.nextToken();
                raw = this.getTokenRaw(token);
                expr = this.finalize(node, new Literal(token.value === "true", raw));
                break;
            case 5 /* NullLiteral */ :
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                token = this.nextToken();
                raw = this.getTokenRaw(token);
                expr = this.finalize(node, new Literal(null, raw));
                break;
            case 10 /* Template */ :
                expr = this.parseTemplateLiteral({
                    isTagged: false
                });
                break;
            case 7 /* Punctuator */ :
                switch(this.lookahead.value){
                    case "(":
                        this.context.isBindingElement = false;
                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
                        break;
                    case "[":
                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
                        break;
                    case "{":
                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
                        break;
                    case "/":
                    case "/=":
                        this.context.isAssignmentTarget = false;
                        this.context.isBindingElement = false;
                        this.scanner.index = this.startMarker.index;
                        token = this.nextRegexToken();
                        raw = this.getTokenRaw(token);
                        expr = this.finalize(node, new RegexLiteral(token.regex, raw, token.pattern, token.flags));
                        break;
                    case "#":
                        this.nextToken();
                        expr = this.finalize(node, new PrivateIdentifier(this.nextToken().value));
                        break;
                    case "@":
                        let decorators = this.parseDecorators();
                        this.context.decorators = decorators;
                        let expression = this.parsePrimaryExpression();
                        this.context.decorators = null;
                        expr = this.finalize(node, new PrivateIdentifier(this.nextToken().value));
                        break;
                    default:
                        expr = this.throwUnexpectedToken(this.nextToken());
                }
                break;
            case 4 /* Keyword */ :
                if (!this.context.strict && this.context.allowYield && this.matchKeyword("yield")) expr = this.parseIdentifierName();
                else if (!this.context.strict && this.matchKeyword("let")) expr = this.finalize(node, new Identifier(this.nextToken().value));
                else {
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    if (this.matchKeyword("function")) expr = this.parseFunctionExpression();
                    else if (this.matchKeyword("this")) {
                        this.nextToken();
                        expr = this.finalize(node, new ThisExpression());
                    } else if (this.matchKeyword("class")) expr = this.parseClassExpression();
                    else if (this.matchKeyword("new")) expr = this.parseNewExpression();
                    else if (this.matchImportCall()) expr = this.parseImportCall();
                    else if (this.matchImportMeta()) {
                        if (!this.context.isModule) this.tolerateUnexpectedToken(this.lookahead, Messages.CannotUseImportMetaOutsideAModule);
                        expr = this.parseImportMeta();
                    } else expr = this.throwUnexpectedToken(this.nextToken());
                }
                break;
            default:
                expr = this.throwUnexpectedToken(this.nextToken());
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-array-initializer
    parseSpreadElement() {
        const node = this.createNode();
        this.expect("...");
        const arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
        return this.finalize(node, new SpreadElement(arg));
    }
    parseArrayInitializer() {
        const node = this.createNode();
        const elements = [];
        this.expect("[");
        while(!this.match("]")){
            if (this.match(",")) {
                this.nextToken();
                elements.push(null);
            } else if (this.match("...")) {
                const element = this.parseSpreadElement();
                if (!this.match("]")) {
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    this.expect(",");
                }
                elements.push(element);
            } else {
                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                if (!this.match("]")) this.expect(",");
            }
        }
        this.expect("]");
        return this.finalize(node, new ArrayExpression(elements));
    }
    // https://tc39.github.io/ecma262/#sec-object-initializer
    parsePropertyMethod(params) {
        this.context.isAssignmentTarget = false;
        this.context.isBindingElement = false;
        const previousStrict = this.context.strict;
        const previousAllowStrictDirective = this.context.allowStrictDirective;
        this.context.allowStrictDirective = params.simple;
        const body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
        if (this.context.strict && params.firstRestricted) this.tolerateUnexpectedToken(params.firstRestricted, params.message);
        if (this.context.strict && params.stricted) this.tolerateUnexpectedToken(params.stricted, params.message);
        this.context.strict = previousStrict;
        this.context.allowStrictDirective = previousAllowStrictDirective;
        return body;
    }
    parsePropertyMethodFunction(isGenerator) {
        const node = this.createNode();
        const previousAllowYield = this.context.allowYield;
        this.context.allowYield = true;
        const params = this.parseFormalParameters();
        const method = this.parsePropertyMethod(params);
        this.context.allowYield = previousAllowYield;
        return this.finalize(node, new FunctionExpression(null, params.params, method, isGenerator, false));
    }
    parsePropertyMethodAsyncFunction(isGenerator) {
        const node = this.createNode();
        const previousAllowYield = this.context.allowYield;
        const previousIsAsync = this.context.isAsync;
        this.context.allowYield = false;
        this.context.isAsync = true;
        const params = this.parseFormalParameters();
        const method = this.parsePropertyMethod(params);
        this.context.allowYield = previousAllowYield;
        this.context.isAsync = previousIsAsync;
        return this.finalize(node, new FunctionExpression(null, params.params, method, isGenerator, true));
    }
    parseObjectPropertyKey(isPrivate = false) {
        const node = this.createNode();
        const token = this.nextToken();
        let key;
        switch(token.type){
            case 8 /* StringLiteral */ :
            case 6 /* NumericLiteral */ :
                if (this.context.strict && token.octal) this.tolerateUnexpectedToken(token, Messages.StrictOctalLiteral);
                const raw = this.getTokenRaw(token);
                if (typeof token.value === "bigint") key = this.finalize(node, new BigIntLiteral(token.value, raw, token.value.toString()));
                else key = this.finalize(node, new Literal(token.value, raw));
                break;
            case 3 /* Identifier */ :
            case 1 /* BooleanLiteral */ :
            case 5 /* NullLiteral */ :
            case 4 /* Keyword */ :
                key = this.finalize(node, isPrivate ? new PrivateIdentifier(token.value) : new Identifier(token.value));
                break;
            case 7 /* Punctuator */ :
                if (token.value === "[") {
                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    this.expect("]");
                } else key = this.throwUnexpectedToken(token);
                break;
            default:
                key = this.throwUnexpectedToken(token);
        }
        return key;
    }
    isPropertyKey(key, value) {
        return key.type === "Identifier" /* Identifier */  && key.name === value || key.type === "Literal" /* Literal */  && key.value === value;
    }
    parseObjectProperty(hasProto) {
        const node = this.createNode();
        const token = this.lookahead;
        let kind;
        let key = null;
        let value = null;
        let computed = false;
        let method = false;
        let shorthand = false;
        let isAsync = false;
        let isGenerator = false;
        if (token.type === 3 /* Identifier */ ) {
            const id = token.value;
            this.nextToken();
            computed = this.match("[");
            isAsync = !this.hasLineTerminator && id === "async" && !this.match(":") && !this.match("(") && !this.match(",");
            isGenerator = this.match("*");
            if (isGenerator) this.nextToken();
            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Identifier(id));
        } else if (this.match("*")) this.nextToken();
        else {
            computed = this.match("[");
            key = this.parseObjectPropertyKey();
        }
        const lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
        if (token.type === 3 /* Identifier */  && !isAsync && token.value === "get" && lookaheadPropertyKey) {
            kind = "get";
            computed = this.match("[");
            key = this.parseObjectPropertyKey();
            this.context.allowYield = false;
            value = this.parseGetterMethod();
        } else if (token.type === 3 /* Identifier */  && !isAsync && token.value === "set" && lookaheadPropertyKey) {
            kind = "set";
            computed = this.match("[");
            key = this.parseObjectPropertyKey();
            value = this.parseSetterMethod();
        } else if (token.type === 7 /* Punctuator */  && token.value === "*" && lookaheadPropertyKey) {
            kind = "init";
            computed = this.match("[");
            key = this.parseObjectPropertyKey();
            value = this.parseGeneratorMethod(false);
            method = true;
        } else {
            if (!key) this.throwUnexpectedToken(this.lookahead);
            kind = "init";
            if (this.match(":") && !isAsync) {
                if (!computed && this.isPropertyKey(key, "__proto__")) {
                    if (hasProto.value) this.tolerateError(Messages.DuplicateProtoProperty);
                    hasProto.value = true;
                }
                this.nextToken();
                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
            } else if (this.match("(")) {
                value = isAsync ? this.parsePropertyMethodAsyncFunction(isGenerator) : this.parsePropertyMethodFunction(isGenerator);
                method = true;
            } else if (token.type === 3 /* Identifier */ ) {
                const id = this.finalize(node, new Identifier(token.value));
                if (this.match("=")) {
                    this.context.firstCoverInitializedNameError = this.lookahead;
                    this.nextToken();
                    shorthand = true;
                    const init = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    value = this.finalize(node, new AssignmentPattern(id, init));
                } else {
                    shorthand = true;
                    value = id;
                }
            } else this.throwUnexpectedToken(this.nextToken());
        }
        return this.finalize(node, new Property(kind, key, computed, value, method, shorthand));
    }
    parseObjectInitializer() {
        const node = this.createNode();
        this.expect("{");
        const properties = [];
        const hasProto = {
            value: false
        };
        while(!this.match("}")){
            const property = this.match("...") ? this.parseSpreadElement() : this.parseObjectProperty(hasProto);
            properties.push(property);
            if (!this.match("}") && (!property.method || this.match(","))) this.expectCommaSeparator();
        }
        this.expect("}");
        return this.finalize(node, new ObjectExpression(properties));
    }
    // https://tc39.es/proposal-template-literal-revision/#sec-static-semantics-template-early-errors
    throwTemplateLiteralEarlyErrors(token) {
        switch(token.notEscapeSequenceHead){
            case "u":
                return this.throwUnexpectedToken(token, Messages.InvalidUnicodeEscapeSequence);
            case "x":
                return this.throwUnexpectedToken(token, Messages.InvalidHexEscapeSequence);
            case "8":
            case "9":
                return this.throwUnexpectedToken(token, Messages.TemplateEscape89);
            default:
                return this.throwUnexpectedToken(token, Messages.TemplateOctalLiteral);
        }
    }
    // https://tc39.github.io/ecma262/#sec-template-literals
    parseTemplateHead(options) {
        assert(this.lookahead.head, "Template literal must start with a template head");
        const node = this.createNode();
        const token = this.nextToken();
        if (!options.isTagged && token.notEscapeSequenceHead !== null) this.throwTemplateLiteralEarlyErrors(token);
        const raw = token.value;
        const cooked = token.cooked;
        return this.finalize(node, new TemplateElement({
            raw,
            cooked
        }, token.tail));
    }
    parseTemplateElement(options) {
        if (this.lookahead.type !== 10 /* Template */ ) this.throwUnexpectedToken();
        const node = this.createNode();
        const token = this.nextToken();
        if (!options.isTagged && token.notEscapeSequenceHead !== null) this.throwTemplateLiteralEarlyErrors(token);
        const raw = token.value;
        const cooked = token.cooked;
        return this.finalize(node, new TemplateElement({
            raw,
            cooked
        }, token.tail));
    }
    parseTemplateLiteral(options) {
        const node = this.createNode();
        const expressions = [];
        const quasis = [];
        let quasi = this.parseTemplateHead(options);
        quasis.push(quasi);
        while(!quasi.tail){
            expressions.push(this.parseExpression());
            quasi = this.parseTemplateElement(options);
            quasis.push(quasi);
        }
        return this.finalize(node, new TemplateLiteral(quasis, expressions));
    }
    // https://tc39.github.io/ecma262/#sec-grouping-operator
    reinterpretExpressionAsPattern(expr) {
        switch(expr.type){
            case "Identifier" /* Identifier */ :
            case "MemberExpression" /* MemberExpression */ :
            case "RestElement" /* RestElement */ :
            case "AssignmentPattern" /* AssignmentPattern */ :
                break;
            case "SpreadElement" /* SpreadElement */ :
                expr.type = "RestElement" /* RestElement */ ;
                this.reinterpretExpressionAsPattern(expr.argument);
                break;
            case "ArrayExpression" /* ArrayExpression */ :
                expr.type = "ArrayPattern" /* ArrayPattern */ ;
                for(let i = 0; i < expr.elements.length; i++)if (expr.elements[i] !== null) this.reinterpretExpressionAsPattern(expr.elements[i]);
                break;
            case "ObjectExpression" /* ObjectExpression */ :
                expr.type = "ObjectPattern" /* ObjectPattern */ ;
                for(let i = 0; i < expr.properties.length; i++){
                    const property = expr.properties[i];
                    this.reinterpretExpressionAsPattern(property.type === "SpreadElement" /* SpreadElement */  ? property : property.value);
                }
                break;
            case "AssignmentExpression" /* AssignmentExpression */ :
                expr.type = "AssignmentPattern" /* AssignmentPattern */ ;
                delete expr.operator;
                this.reinterpretExpressionAsPattern(expr.left);
                break;
            default:
                break;
        }
    }
    parseGroupExpression() {
        let expr;
        this.expect("(");
        if (this.match(")")) {
            this.nextToken();
            if (!this.match("=>")) this.expect("=>");
            expr = {
                type: ArrowParameterPlaceHolder,
                params: [],
                async: false
            };
        } else {
            const startToken = this.lookahead;
            const params = [];
            if (this.match("...")) {
                expr = this.parseRestElement(params);
                this.expect(")");
                if (!this.match("=>")) this.expect("=>");
                expr = {
                    type: ArrowParameterPlaceHolder,
                    params: [
                        expr
                    ],
                    async: false
                };
            } else {
                let arrow = false;
                this.context.isBindingElement = true;
                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
                if (this.match(",")) {
                    const expressions = [];
                    this.context.isAssignmentTarget = false;
                    expressions.push(expr);
                    while(this.lookahead.type !== 2 /* EOF */ ){
                        if (!this.match(",")) break;
                        this.nextToken();
                        if (this.match(")")) {
                            this.nextToken();
                            for(let i = 0; i < expressions.length; i++)this.reinterpretExpressionAsPattern(expressions[i]);
                            arrow = true;
                            expr = {
                                type: ArrowParameterPlaceHolder,
                                params: expressions,
                                async: false
                            };
                        } else if (this.match("...")) {
                            if (!this.context.isBindingElement) this.throwUnexpectedToken(this.lookahead);
                            expressions.push(this.parseRestElement(params));
                            this.expect(")");
                            if (!this.match("=>")) this.expect("=>");
                            this.context.isBindingElement = false;
                            for(let i = 0; i < expressions.length; i++)this.reinterpretExpressionAsPattern(expressions[i]);
                            arrow = true;
                            expr = {
                                type: ArrowParameterPlaceHolder,
                                params: expressions,
                                async: false
                            };
                        } else expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                        if (arrow) break;
                    }
                    if (!arrow) expr = this.finalize(this.startNode(startToken), new SequenceExpression(expressions));
                }
                if (!arrow) {
                    this.expect(")");
                    if (this.match("=>")) {
                        if (expr.type === "Identifier" /* Identifier */  && expr.name === "yield") {
                            arrow = true;
                            expr = {
                                type: ArrowParameterPlaceHolder,
                                params: [
                                    expr
                                ],
                                async: false
                            };
                        }
                        if (!arrow) {
                            if (!this.context.isBindingElement) this.throwUnexpectedToken(this.lookahead);
                            if (expr.type === "SequenceExpression" /* SequenceExpression */ ) for(let i = 0; i < expr.expressions.length; i++)this.reinterpretExpressionAsPattern(expr.expressions[i]);
                            else this.reinterpretExpressionAsPattern(expr);
                            const parameters = expr.type === "SequenceExpression" /* SequenceExpression */  ? expr.expressions : [
                                expr
                            ];
                            expr = {
                                type: ArrowParameterPlaceHolder,
                                params: parameters,
                                async: false
                            };
                        }
                    }
                    this.context.isBindingElement = false;
                }
            }
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
    parseArguments() {
        this.expect("(");
        const args = [];
        if (!this.match(")")) while(true){
            const expr = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
            args.push(expr);
            if (this.match(")")) break;
            this.expectCommaSeparator();
            if (this.match(")")) break;
        }
        this.expect(")");
        return args;
    }
    isIdentifierName(token) {
        return token.type === 3 /* Identifier */  || token.type === 4 /* Keyword */  || token.type === 1 /* BooleanLiteral */  || token.type === 5 /* NullLiteral */ ;
    }
    parseIdentifierName(allowPrivateField = false) {
        let isPrivateField = false;
        let node = this.createNode();
        let token = this.nextToken();
        if (token.value === "#" && allowPrivateField) {
            token = this.nextToken();
            isPrivateField = true;
        }
        if (!this.isIdentifierName(token)) this.throwUnexpectedToken(token);
        return this.finalize(node, isPrivateField ? new PrivateIdentifier(token.value) : new Identifier(token.value));
    }
    parseNewExpression() {
        const node = this.createNode();
        const id = this.parseIdentifierName();
        assert(id.name === "new", "New expression must start with `new`");
        let expr;
        if (this.match(".")) {
            this.nextToken();
            if (this.lookahead.type === 3 /* Identifier */  && this.context.inFunctionBody && this.lookahead.value === "target") {
                const property = this.parseIdentifierName();
                expr = new MetaProperty(id, property);
            } else this.throwUnexpectedToken(this.lookahead);
        } else if (this.matchKeyword("import")) this.throwUnexpectedToken(this.lookahead);
        else {
            const callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
            const args = this.match("(") ? this.parseArguments() : [];
            expr = new NewExpression(callee, args);
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
        }
        return this.finalize(node, expr);
    }
    parseAsyncArgument() {
        const arg = this.parseAssignmentExpression();
        this.context.firstCoverInitializedNameError = null;
        return arg;
    }
    parseAsyncArguments() {
        this.expect("(");
        const args = [];
        if (!this.match(")")) while(true){
            const expr = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
            args.push(expr);
            if (this.match(")")) break;
            this.expectCommaSeparator();
            if (this.match(")")) break;
        }
        this.expect(")");
        return args;
    }
    matchImportCall() {
        let match = this.matchKeyword("import");
        if (match) {
            const state = this.scanner.saveState();
            this.scanner.scanComments();
            const next = this.scanner.lex();
            this.scanner.restoreState(state);
            match = next.type === 7 /* Punctuator */  && next.value === "(";
        }
        return match;
    }
    parseImportCall() {
        const node = this.createNode();
        this.expectKeyword("import");
        this.expect("(");
        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
        this.context.isAssignmentTarget = true;
        const source = this.parseAssignmentExpression();
        let attributes = null;
        if (this.match(",")) {
            this.nextToken();
            if (!this.match(")")) attributes = this.parseAssignmentExpression();
        }
        this.context.isAssignmentTarget = previousIsAssignmentTarget;
        if (!this.match(")")) {
            if (this.match(",")) this.nextToken();
            this.expect(")");
        } else this.nextToken();
        return this.finalize(node, new ImportExpression(source, attributes));
    }
    matchImportMeta() {
        let match = this.matchKeyword("import");
        if (match) {
            const state = this.scanner.saveState();
            this.scanner.scanComments();
            const dot = this.scanner.lex();
            if (dot.type === 7 /* Punctuator */  && dot.value === ".") {
                this.scanner.scanComments();
                const meta = this.scanner.lex();
                match = meta.type === 3 /* Identifier */  && meta.value === "meta";
                if (match) {
                    if (meta.end - meta.start !== 4) this.tolerateUnexpectedToken(meta, Messages.InvalidEscapedReservedWord);
                }
            } else match = false;
            this.scanner.restoreState(state);
        }
        return match;
    }
    parseImportMeta() {
        const node = this.createNode();
        const id = this.parseIdentifierName();
        this.expect(".");
        const property = this.parseIdentifierName();
        this.context.isAssignmentTarget = false;
        return this.finalize(node, new MetaProperty(id, property));
    }
    parseLeftHandSideExpressionAllowCall() {
        const startToken = this.lookahead;
        const maybeAsync = this.matchContextualKeyword("async");
        const previousAllowIn = this.context.allowIn;
        this.context.allowIn = true;
        let expr;
        const isSuper = this.matchKeyword("super");
        if (isSuper && this.context.inFunctionBody) {
            expr = this.createNode();
            this.nextToken();
            expr = this.finalize(expr, new Super());
            if (!this.match("(") && !this.match(".") && !this.match("[")) this.throwUnexpectedToken(this.lookahead);
        } else expr = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression);
        if (isSuper && this.match("(") && (!this.context.inClassConstructor || !this.context.allowSuper)) this.tolerateError(Messages.UnexpectedSuper);
        let hasOptional = false;
        while(true){
            let optional = false;
            if (this.match("?.")) {
                optional = true;
                hasOptional = true;
                this.expect("?.");
            }
            if (this.match("(")) {
                const asyncArrow = maybeAsync && startToken.lineNumber === this.lookahead.lineNumber;
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = false;
                const args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
                if (expr.type === "ImportExpression" /* ImportExpression */  && args.length !== 1) this.tolerateError(Messages.BadImportCallArity);
                expr = this.finalize(this.startNode(startToken), new CallExpression(expr, args, optional));
                if (asyncArrow && this.match("=>")) {
                    for(let i = 0; i < args.length; ++i)this.reinterpretExpressionAsPattern(args[i]);
                    expr = {
                        type: ArrowParameterPlaceHolder,
                        params: args,
                        async: true
                    };
                }
            } else if (this.match("[")) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = !optional;
                this.expect("[");
                const property = this.isolateCoverGrammar(this.parseExpression);
                this.expect("]");
                expr = this.finalize(this.startNode(startToken), new MemberExpression(true, expr, property, optional));
            } else if (this.lookahead.type === 10 /* Template */  && this.lookahead.head) {
                if (optional) this.throwUnexpectedToken(this.lookahead);
                if (hasOptional) this.throwError(Messages.InvalidTaggedTemplateOnOptionalChain);
                const quasi = this.parseTemplateLiteral({
                    isTagged: true
                });
                expr = this.finalize(this.startNode(startToken), new TaggedTemplateExpression(expr, quasi));
            } else if (this.match(".") || optional) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = !optional;
                if (!optional) this.expect(".");
                const property = this.parseIdentifierName(true);
                expr = this.finalize(this.startNode(startToken), new MemberExpression(false, expr, property, optional));
            } else break;
        }
        this.context.allowIn = previousAllowIn;
        if (hasOptional) expr = this.finalize(this.startNode(startToken), new ChainExpression(expr));
        return expr;
    }
    parseSuper() {
        const node = this.createNode();
        this.expectKeyword("super");
        if (!this.match("[") && !this.match(".")) this.throwUnexpectedToken(this.lookahead);
        return this.finalize(node, new Super());
    }
    parseLeftHandSideExpression() {
        assert(this.context.allowIn, "callee of new expression always allow in keyword.");
        const node = this.startNode(this.lookahead);
        let expr = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression);
        let hasOptional = false;
        while(true){
            let optional = false;
            if (this.match("?.")) {
                optional = true;
                hasOptional = true;
                this.expect("?.");
            }
            if (this.match("[")) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = !optional;
                this.expect("[");
                const property = this.isolateCoverGrammar(this.parseExpression);
                this.expect("]");
                expr = this.finalize(node, new MemberExpression(true, expr, property, optional));
            } else if (this.lookahead.type === 10 /* Template */  && this.lookahead.head) {
                if (optional) this.throwUnexpectedToken(this.lookahead);
                if (hasOptional) this.throwError(Messages.InvalidTaggedTemplateOnOptionalChain);
                const quasi = this.parseTemplateLiteral({
                    isTagged: true
                });
                expr = this.finalize(node, new TaggedTemplateExpression(expr, quasi));
            } else if (this.match(".") || optional) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = !optional;
                if (!optional) this.expect(".");
                const property = this.parseIdentifierName();
                expr = this.finalize(node, new MemberExpression(false, expr, property, optional));
            } else break;
        }
        if (hasOptional) expr = this.finalize(node, new ChainExpression(expr));
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-update-expressions
    parseUpdateExpression() {
        let expr;
        const startToken = this.lookahead;
        if (this.match("++") || this.match("--")) {
            const node = this.startNode(startToken);
            const token = this.nextToken();
            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
            if (this.context.strict && expr.type === "Identifier" /* Identifier */  && this.scanner.isRestrictedWord(expr.name)) this.tolerateError(Messages.StrictLHSPrefix);
            if (!this.context.isAssignmentTarget) this.tolerateError(Messages.InvalidLHSInAssignment);
            const prefix = true;
            expr = this.finalize(node, new UpdateExpression(token.value, expr, prefix));
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
        } else {
            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */ ) {
                if (this.match("++") || this.match("--")) {
                    if (this.context.strict && expr.type === "Identifier" /* Identifier */  && this.scanner.isRestrictedWord(expr.name)) this.tolerateError(Messages.StrictLHSPostfix);
                    if (!this.context.isAssignmentTarget) this.tolerateError(Messages.InvalidLHSInAssignment);
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    const operator = this.nextToken().value;
                    const prefix = false;
                    expr = this.finalize(this.startNode(startToken), new UpdateExpression(operator, expr, prefix));
                }
            }
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-unary-operators
    parseAwaitExpression() {
        const node = this.createNode();
        this.nextToken();
        const argument = this.parseUnaryExpression();
        return this.finalize(node, new AwaitExpression(argument));
    }
    parseUnaryExpression() {
        let expr;
        if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
            const node = this.startNode(this.lookahead);
            const token = this.nextToken();
            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
            expr = this.finalize(node, new UnaryExpression(token.value, expr));
            if (this.context.strict && expr.operator === "delete" && expr.argument.type === "Identifier" /* Identifier */ ) this.tolerateError(Messages.StrictDelete);
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
        } else if ((this.context.isModule && !this.context.inFunctionBody || this.context.isAsync) && this.matchContextualKeyword("await")) expr = this.parseAwaitExpression();
        else expr = this.parseUpdateExpression();
        return expr;
    }
    parseExponentiationExpression() {
        const startToken = this.lookahead;
        const isLeftParenthesized = this.match("(");
        let expr = this.inheritCoverGrammar(this.parseUnaryExpression);
        const exponentAllowed = expr.type !== "UnaryExpression" /* UnaryExpression */  || isLeftParenthesized;
        if (exponentAllowed && this.match("**")) {
            this.nextToken();
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
            const left = expr;
            const right = this.isolateCoverGrammar(this.parseExponentiationExpression);
            expr = this.finalize(this.startNode(startToken), new BinaryExpression("**", left, right));
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-exp-operator
    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
    // https://tc39.github.io/ecma262/#sec-additive-operators
    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
    // https://tc39.github.io/ecma262/#sec-relational-operators
    // https://tc39.github.io/ecma262/#sec-equality-operators
    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
    binaryPrecedence(token) {
        const op = token.value;
        let precedence;
        if (token.type === 7 /* Punctuator */ ) precedence = this.operatorPrecedence[op] || 0;
        else if (token.type === 4 /* Keyword */ ) precedence = op === "instanceof" || this.context.allowIn && op === "in" ? 12 : 0;
        else precedence = 0;
        return precedence;
    }
    parseBinaryExpression() {
        const startToken = this.lookahead;
        let expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
        let allowAndOr = true;
        let allowNullishCoalescing = true;
        const updateNullishCoalescingRestrictions = (token2)=>{
            if (token2.value === "&&" || token2.value === "||") allowNullishCoalescing = false;
            if (token2.value === "??") allowAndOr = false;
        };
        const token = this.lookahead;
        let prec = this.binaryPrecedence(token);
        if (prec > 0) {
            updateNullishCoalescingRestrictions(token);
            this.nextToken();
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
            const markers = [
                startToken,
                this.lookahead
            ];
            let left = expr;
            let right = this.isolateCoverGrammar(this.parseExponentiationExpression);
            const stack = [
                left,
                token.value,
                right
            ];
            const precedences = [
                prec
            ];
            while(true){
                prec = this.binaryPrecedence(this.lookahead);
                if (prec <= 0) break;
                if (!allowAndOr && (this.lookahead.value === "&&" || this.lookahead.value === "||") || !allowNullishCoalescing && this.lookahead.value === "??") this.throwUnexpectedToken(this.lookahead);
                updateNullishCoalescingRestrictions(this.lookahead);
                while(stack.length > 2 && prec <= precedences[precedences.length - 1]){
                    right = stack.pop();
                    const operator = stack.pop();
                    precedences.pop();
                    left = stack.pop();
                    markers.pop();
                    const marker = markers[markers.length - 1];
                    const node = this.startNode(marker, marker.lineStart);
                    const logical = operator === "||" || operator === "&&" || operator === "??";
                    stack.push(this.finalize(node, logical ? new LogicalExpression(operator, left, right) : new BinaryExpression(operator, left, right)));
                }
                stack.push(this.nextToken().value);
                precedences.push(prec);
                markers.push(this.lookahead);
                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
            }
            let i = stack.length - 1;
            expr = stack[i];
            let lastMarker = markers.pop();
            while(i > 1){
                const marker = markers.pop();
                const lastLineStart = lastMarker && lastMarker.lineStart;
                const node = this.startNode(marker, lastLineStart);
                const operator = stack[i - 1];
                const logical = operator === "||" || operator === "&&" || operator === "??";
                expr = this.finalize(node, logical ? new LogicalExpression(operator, stack[i - 2], expr) : new BinaryExpression(operator, stack[i - 2], expr));
                i -= 2;
                lastMarker = marker;
            }
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-conditional-operator
    parseConditionalExpression() {
        const startToken = this.lookahead;
        let expr = this.inheritCoverGrammar(this.parseBinaryExpression);
        if (this.match("?")) {
            this.nextToken();
            const previousAllowIn = this.context.allowIn;
            this.context.allowIn = true;
            const consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
            this.context.allowIn = previousAllowIn;
            this.expect(":");
            const alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
            expr = this.finalize(this.startNode(startToken), new ConditionalExpression(expr, consequent, alternate));
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-assignment-operators
    checkPatternParam(options, param) {
        switch(param.type){
            case "Identifier" /* Identifier */ :
                this.validateParam(options, param, param.name);
                break;
            case "RestElement" /* RestElement */ :
                this.checkPatternParam(options, param.argument);
                break;
            case "AssignmentPattern" /* AssignmentPattern */ :
                this.checkPatternParam(options, param.left);
                break;
            case "ArrayPattern" /* ArrayPattern */ :
                for(let i = 0; i < param.elements.length; i++)if (param.elements[i] !== null) this.checkPatternParam(options, param.elements[i]);
                break;
            case "ObjectPattern" /* ObjectPattern */ :
                for(let i = 0; i < param.properties.length; i++){
                    const property = param.properties[i];
                    this.checkPatternParam(options, property.type === "RestElement" /* RestElement */  ? property : property.value);
                }
                break;
            default:
                break;
        }
        options.simple = options.simple && param instanceof Identifier;
    }
    reinterpretAsCoverFormalsList(expr) {
        let params = [
            expr
        ];
        const options = {
            simple: true,
            paramSet: {}
        };
        let asyncArrow = false;
        switch(expr.type){
            case "Identifier" /* Identifier */ :
                break;
            case ArrowParameterPlaceHolder:
                params = expr.params;
                asyncArrow = expr.async;
                break;
            default:
                return null;
        }
        for(let i = 0; i < params.length; ++i){
            const param = params[i];
            if (param.type === "AssignmentPattern" /* AssignmentPattern */ ) {
                if (param.right.type === "YieldExpression" /* YieldExpression */ ) {
                    if (param.right.argument) this.throwUnexpectedToken(this.lookahead);
                    param.right.type = "Identifier" /* Identifier */ ;
                    param.right.name = "yield";
                    delete param.right.argument;
                    delete param.right.delegate;
                }
            } else if (asyncArrow && param.type === "Identifier" /* Identifier */  && param.name === "await") this.throwUnexpectedToken(this.lookahead);
            this.checkPatternParam(options, param);
            params[i] = param;
        }
        if (this.context.strict || !this.context.allowYield) for(let i = 0; i < params.length; ++i){
            const param = params[i];
            if (param.type === "YieldExpression" /* YieldExpression */ ) this.throwUnexpectedToken(this.lookahead);
        }
        if (options.hasDuplicateParameterNames) {
            const token = this.context.strict ? options.stricted : options.firstRestricted;
            this.throwUnexpectedToken(token, Messages.DuplicateParameter);
        }
        return {
            simple: options.simple,
            params,
            stricted: options.stricted,
            firstRestricted: options.firstRestricted,
            message: options.message
        };
    }
    parseAssignmentExpression() {
        let expr;
        if (!this.context.allowYield && this.matchKeyword("yield")) expr = this.parseYieldExpression();
        else {
            const startToken = this.lookahead;
            let token = startToken;
            expr = this.parseConditionalExpression();
            if (token.type === 3 /* Identifier */  && token.lineNumber === this.lookahead.lineNumber && token.value === "async") {
                if (this.lookahead.type === 3 /* Identifier */  || this.matchKeyword("yield")) {
                    const arg = this.parsePrimaryExpression();
                    this.reinterpretExpressionAsPattern(arg);
                    expr = {
                        type: ArrowParameterPlaceHolder,
                        params: [
                            arg
                        ],
                        async: true
                    };
                }
            }
            if (expr.type === ArrowParameterPlaceHolder || this.match("=>")) {
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                const isAsync = expr.async;
                const list = this.reinterpretAsCoverFormalsList(expr);
                if (list) {
                    if (this.hasLineTerminator) this.tolerateUnexpectedToken(this.lookahead);
                    this.context.firstCoverInitializedNameError = null;
                    const previousStrict = this.context.strict;
                    const previousAllowStrictDirective = this.context.allowStrictDirective;
                    this.context.allowStrictDirective = list.simple;
                    const previousAllowYield = this.context.allowYield;
                    const previousIsAsync = this.context.isAsync;
                    this.context.allowYield = true;
                    this.context.isAsync = isAsync;
                    const node = this.startNode(startToken);
                    this.expect("=>");
                    let body;
                    if (this.match("{")) {
                        const previousAllowIn = this.context.allowIn;
                        this.context.allowIn = true;
                        body = this.parseFunctionSourceElements();
                        this.context.allowIn = previousAllowIn;
                    } else body = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    const expression = body.type !== "BlockStatement" /* BlockStatement */ ;
                    if (this.context.strict && list.firstRestricted) this.throwUnexpectedToken(list.firstRestricted, list.message);
                    if (this.context.strict && list.stricted) this.tolerateUnexpectedToken(list.stricted, list.message);
                    expr = this.finalize(node, new ArrowFunctionExpression(list.params, body, expression, isAsync));
                    this.context.strict = previousStrict;
                    this.context.allowStrictDirective = previousAllowStrictDirective;
                    this.context.allowYield = previousAllowYield;
                    this.context.isAsync = previousIsAsync;
                }
            } else if (this.matchAssign()) {
                if (!this.context.isAssignmentTarget) this.tolerateError(Messages.InvalidLHSInAssignment);
                if (this.context.strict && expr.type === "Identifier" /* Identifier */ ) {
                    const id = expr;
                    if (this.scanner.isRestrictedWord(id.name)) this.tolerateUnexpectedToken(token, Messages.StrictLHSAssignment);
                    if (this.scanner.isStrictModeReservedWord(id.name)) this.tolerateUnexpectedToken(token, Messages.StrictReservedWord);
                }
                if (!this.match("=")) {
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                } else this.reinterpretExpressionAsPattern(expr);
                token = this.nextToken();
                const operator = token.value;
                const right = this.isolateCoverGrammar(this.parseAssignmentExpression);
                expr = this.finalize(this.startNode(startToken), new AssignmentExpression(operator, expr, right));
                this.context.firstCoverInitializedNameError = null;
            }
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-comma-operator
    parseExpression() {
        const startToken = this.lookahead;
        let expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
        if (this.match(",")) {
            const expressions = [];
            expressions.push(expr);
            while(this.lookahead.type !== 2 /* EOF */ ){
                if (!this.match(",")) break;
                this.nextToken();
                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
            }
            expr = this.finalize(this.startNode(startToken), new SequenceExpression(expressions));
        }
        return expr;
    }
    // https://tc39.github.io/ecma262/#sec-block
    parseStatementListItem() {
        let statement;
        this.context.isAssignmentTarget = true;
        this.context.isBindingElement = true;
        if (this.lookahead.type === 4 /* Keyword */ ) switch(this.lookahead.value){
            case "export":
                if (!this.context.isModule) this.tolerateUnexpectedToken(this.lookahead, Messages.IllegalExportDeclaration);
                statement = this.parseExportDeclaration();
                break;
            case "import":
                if (this.matchImportCall()) statement = this.parseExpressionStatement();
                else if (this.matchImportMeta()) statement = this.parseStatement();
                else {
                    if (!this.context.isModule) this.tolerateUnexpectedToken(this.lookahead, Messages.IllegalImportDeclaration);
                    statement = this.parseImportDeclaration();
                }
                break;
            case "const":
                statement = this.parseLexicalDeclaration({
                    inFor: false
                });
                break;
            case "function":
                statement = this.parseFunctionDeclaration();
                break;
            case "class":
                statement = this.parseClassDeclaration();
                break;
            case "let":
                statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({
                    inFor: false
                }) : this.parseStatement();
                break;
            default:
                statement = this.parseStatement();
                break;
        }
        else statement = this.parseStatement();
        return statement;
    }
    parseBlock() {
        const node = this.createNode();
        this.expect("{");
        const block = [];
        while(true){
            if (this.match("}")) break;
            block.push(this.parseStatementListItem());
        }
        this.expect("}");
        return this.finalize(node, new BlockStatement(block));
    }
    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
    parseLexicalBinding(kind, options) {
        const node = this.createNode();
        const params = [];
        const id = this.parsePattern(params, kind);
        if (this.context.strict && id.type === "Identifier" /* Identifier */ ) {
            if (this.scanner.isRestrictedWord(id.name)) this.tolerateError(Messages.StrictVarName);
        }
        let init = null;
        if (kind === "const") {
            if (!this.matchKeyword("in") && !this.matchContextualKeyword("of")) {
                if (this.match("=")) {
                    this.nextToken();
                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
                } else this.throwError(Messages.DeclarationMissingInitializer, "const");
            }
        } else if (!options.inFor && id.type !== "Identifier" /* Identifier */  || this.match("=")) {
            this.expect("=");
            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
        }
        return this.finalize(node, new VariableDeclarator(id, init));
    }
    parseBindingList(kind, options) {
        const list = [
            this.parseLexicalBinding(kind, options)
        ];
        while(this.match(",")){
            this.nextToken();
            list.push(this.parseLexicalBinding(kind, options));
        }
        return list;
    }
    isLexicalDeclaration() {
        const state = this.scanner.saveState();
        this.scanner.scanComments();
        const next = this.scanner.lex();
        this.scanner.restoreState(state);
        return next.type === 3 /* Identifier */  || next.type === 7 /* Punctuator */  && next.value === "[" || next.type === 7 /* Punctuator */  && next.value === "{" || next.type === 4 /* Keyword */  && next.value === "let" || next.type === 4 /* Keyword */  && next.value === "yield";
    }
    parseLexicalDeclaration(options) {
        const node = this.createNode();
        const kind = this.nextToken().value;
        assert(kind === "let" || kind === "const", "Lexical declaration must be either let or const");
        const declarations = this.parseBindingList(kind, options);
        this.consumeSemicolon();
        return this.finalize(node, new VariableDeclaration(declarations, kind));
    }
    /**
   * This function checks to see if a property is initialized in a Class
   * e.g.
   * publicProp = 123;
   * @returns {Boolean}
   */ isInitializedProperty() {
        let state = this.scanner.saveState();
        this.scanner.scanComments();
        let next = this.scanner.lex();
        this.scanner.restoreState(state);
        return this.lookahead.type === 3 && next.value === "=";
    }
    /**
   * This function checks to see if a property is declared in a Class
   * e.g.
   * publicProp;
   * @returns {Boolean}
   */ isDeclaredProperty() {
        let state = this.scanner.saveState();
        this.scanner.scanComments();
        let next = this.scanner.lex();
        this.scanner.restoreState(state);
        return this.lookahead.type === 3 && next.value === ";" || this.lookahead.type === 3 && next.lineNumber !== this.startMarker.line;
    }
    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
    parseBindingRestElement(params, kind) {
        const node = this.createNode();
        this.expect("...");
        const arg = this.parsePattern(params, kind);
        return this.finalize(node, new RestElement(arg));
    }
    parseArrayPattern(params, kind) {
        const node = this.createNode();
        this.expect("[");
        const elements = [];
        while(!this.match("]"))if (this.match(",")) {
            this.nextToken();
            elements.push(null);
        } else {
            if (this.match("...")) {
                elements.push(this.parseBindingRestElement(params, kind));
                break;
            } else elements.push(this.parsePatternWithDefault(params, kind));
            if (!this.match("]")) this.expect(",");
        }
        this.expect("]");
        return this.finalize(node, new ArrayPattern(elements));
    }
    parsePropertyPattern(params, kind) {
        const node = this.createNode();
        let computed = false;
        let shorthand = false;
        const method = false;
        let key;
        let value;
        if (this.lookahead.type === 3 /* Identifier */ ) {
            const keyToken = this.lookahead;
            key = this.parseVariableIdentifier();
            const init = this.finalize(node, new Identifier(keyToken.value));
            if (this.match("=")) {
                params.push(keyToken);
                shorthand = true;
                this.nextToken();
                const expr = this.parseAssignmentExpression();
                value = this.finalize(this.startNode(keyToken), new AssignmentPattern(init, expr));
            } else if (!this.match(":")) {
                params.push(keyToken);
                shorthand = true;
                value = init;
            } else {
                this.expect(":");
                value = this.parsePatternWithDefault(params, kind);
            }
        } else {
            computed = this.match("[");
            key = this.parseObjectPropertyKey();
            this.expect(":");
            value = this.parsePatternWithDefault(params, kind);
        }
        return this.finalize(node, new Property("init", key, computed, value, method, shorthand));
    }
    parseRestProperty(params) {
        const node = this.createNode();
        this.expect("...");
        const arg = this.parsePattern(params);
        if (this.match("=")) this.throwError(Messages.DefaultRestProperty);
        if (!this.match("}")) this.throwError(Messages.PropertyAfterRestProperty);
        return this.finalize(node, new RestElement(arg));
    }
    parseObjectPattern(params, kind) {
        const node = this.createNode();
        const properties = [];
        this.expect("{");
        while(!this.match("}")){
            properties.push(this.match("...") ? this.parseRestProperty(params) : this.parsePropertyPattern(params, kind));
            if (!this.match("}")) this.expect(",");
        }
        this.expect("}");
        return this.finalize(node, new ObjectPattern(properties));
    }
    parsePattern(params, kind) {
        let pattern;
        if (this.match("[")) pattern = this.parseArrayPattern(params, kind);
        else if (this.match("{")) pattern = this.parseObjectPattern(params, kind);
        else {
            if (this.matchKeyword("let") && (kind === "const" || kind === "let")) this.tolerateUnexpectedToken(this.lookahead, Messages.LetInLexicalBinding);
            params.push(this.lookahead);
            pattern = this.parseVariableIdentifier(kind);
        }
        return pattern;
    }
    parsePatternWithDefault(params, kind) {
        const startToken = this.lookahead;
        let pattern = this.parsePattern(params, kind);
        if (this.match("=")) {
            this.nextToken();
            const previousAllowYield = this.context.allowYield;
            this.context.allowYield = true;
            const right = this.isolateCoverGrammar(this.parseAssignmentExpression);
            this.context.allowYield = previousAllowYield;
            pattern = this.finalize(this.startNode(startToken), new AssignmentPattern(pattern, right));
        }
        return pattern;
    }
    // https://tc39.github.io/ecma262/#sec-variable-statement
    parseVariableIdentifier(kind) {
        const node = this.createNode();
        const token = this.nextToken();
        if (token.type === 4 /* Keyword */  && token.value === "yield") {
            if (this.context.strict) this.tolerateUnexpectedToken(token, Messages.StrictReservedWord);
            else if (!this.context.allowYield) this.throwUnexpectedToken(token);
        } else if (token.type !== 3 /* Identifier */ ) {
            if (this.context.strict && token.type === 4 /* Keyword */  && this.scanner.isStrictModeReservedWord(token.value)) this.tolerateUnexpectedToken(token, Messages.StrictReservedWord);
            else if (this.context.strict || token.value !== "let" || kind !== "var") this.throwUnexpectedToken(token);
        } else if ((this.context.isModule || this.context.isAsync) && token.type === 3 /* Identifier */  && token.value === "await") this.tolerateUnexpectedToken(token);
        return this.finalize(node, new Identifier(token.value));
    }
    parseVariableDeclaration(options) {
        const node = this.createNode();
        const params = [];
        const id = this.parsePattern(params, "var");
        if (this.context.strict && id.type === "Identifier" /* Identifier */ ) {
            if (this.scanner.isRestrictedWord(id.name)) this.tolerateError(Messages.StrictVarName);
        }
        let init = null;
        if (this.match("=")) {
            this.nextToken();
            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
        } else if (id.type !== "Identifier" /* Identifier */  && !options.inFor) this.expect("=");
        return this.finalize(node, new VariableDeclarator(id, init));
    }
    parseVariableDeclarationList(options) {
        const opt = {
            inFor: options.inFor
        };
        const list = [];
        list.push(this.parseVariableDeclaration(opt));
        while(this.match(",")){
            this.nextToken();
            list.push(this.parseVariableDeclaration(opt));
        }
        return list;
    }
    parseVariableStatement() {
        const node = this.createNode();
        this.expectKeyword("var");
        const declarations = this.parseVariableDeclarationList({
            inFor: false
        });
        this.consumeSemicolon();
        return this.finalize(node, new VariableDeclaration(declarations, "var"));
    }
    // https://tc39.github.io/ecma262/#sec-empty-statement
    parseEmptyStatement() {
        const node = this.createNode();
        this.expect(";");
        return this.finalize(node, new EmptyStatement());
    }
    // https://tc39.github.io/ecma262/#sec-expression-statement
    parseExpressionStatement() {
        const node = this.createNode();
        const expr = this.parseExpression();
        this.consumeSemicolon();
        return this.finalize(node, new ExpressionStatement(expr));
    }
    // https://tc39.github.io/ecma262/#sec-if-statement
    parseIfClause() {
        if (this.context.strict && this.matchKeyword("function")) this.tolerateError(Messages.StrictFunction);
        return this.parseStatement();
    }
    parseIfStatement() {
        const node = this.createNode();
        let consequent;
        let alternate = null;
        this.expectKeyword("if");
        this.expect("(");
        const test = this.parseExpression();
        if (!this.match(")") && this.config.tolerant) {
            this.tolerateUnexpectedToken(this.nextToken());
            consequent = this.finalize(this.createNode(), new EmptyStatement());
        } else {
            this.expect(")");
            consequent = this.parseIfClause();
            if (this.matchKeyword("else")) {
                this.nextToken();
                alternate = this.parseIfClause();
            }
        }
        return this.finalize(node, new IfStatement(test, consequent, alternate));
    }
    // https://tc39.github.io/ecma262/#sec-do-while-statement
    parseDoWhileStatement() {
        const node = this.createNode();
        this.expectKeyword("do");
        this.tolerateInvalidLoopStatement();
        const previousInIteration = this.context.inIteration;
        this.context.inIteration = true;
        const body = this.parseStatement();
        this.context.inIteration = previousInIteration;
        this.expectKeyword("while");
        this.expect("(");
        const test = this.parseExpression();
        if (!this.match(")") && this.config.tolerant) this.tolerateUnexpectedToken(this.nextToken());
        else {
            this.expect(")");
            if (this.match(";")) this.nextToken();
        }
        return this.finalize(node, new DoWhileStatement(body, test));
    }
    // https://tc39.github.io/ecma262/#sec-while-statement
    parseWhileStatement() {
        const node = this.createNode();
        let body;
        this.expectKeyword("while");
        this.expect("(");
        const test = this.parseExpression();
        if (!this.match(")") && this.config.tolerant) {
            this.tolerateUnexpectedToken(this.nextToken());
            body = this.finalize(this.createNode(), new EmptyStatement());
        } else {
            this.expect(")");
            const previousInIteration = this.context.inIteration;
            this.context.inIteration = true;
            body = this.parseStatement();
            this.context.inIteration = previousInIteration;
        }
        return this.finalize(node, new WhileStatement(test, body));
    }
    // https://tc39.github.io/ecma262/#sec-for-statement
    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
    parseForStatement() {
        let init = null;
        let test = null;
        let update = null;
        let forIn = true;
        let left, right;
        let _await = false;
        const node = this.createNode();
        this.expectKeyword("for");
        if (this.matchContextualKeyword("await")) {
            if (!this.context.isAsync) this.tolerateUnexpectedToken(this.lookahead);
            _await = true;
            this.nextToken();
        }
        this.expect("(");
        if (this.match(";")) this.nextToken();
        else {
            if (this.matchKeyword("var")) {
                init = this.createNode();
                this.nextToken();
                const previousAllowIn = this.context.allowIn;
                this.context.allowIn = false;
                const declarations = this.parseVariableDeclarationList({
                    inFor: true
                });
                this.context.allowIn = previousAllowIn;
                if (!_await && declarations.length === 1 && this.matchKeyword("in")) {
                    const decl = declarations[0];
                    if (decl.init && (decl.id.type === "ArrayPattern" /* ArrayPattern */  || decl.id.type === "ObjectPattern" /* ObjectPattern */  || this.context.strict)) this.tolerateError(Messages.ForInOfLoopInitializer, "for-in");
                    init = this.finalize(init, new VariableDeclaration(declarations, "var"));
                    this.nextToken();
                    left = init;
                    right = this.parseExpression();
                    init = null;
                } else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword("of")) {
                    init = this.finalize(init, new VariableDeclaration(declarations, "var"));
                    this.nextToken();
                    left = init;
                    right = this.parseAssignmentExpression();
                    init = null;
                    forIn = false;
                } else {
                    init = this.finalize(init, new VariableDeclaration(declarations, "var"));
                    this.expect(";");
                }
            } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                init = this.createNode();
                const kind = this.nextToken().value;
                if (!this.context.strict && this.lookahead.value === "in") {
                    init = this.finalize(init, new Identifier(kind));
                    this.nextToken();
                    left = init;
                    right = this.parseExpression();
                    init = null;
                } else {
                    const previousAllowIn = this.context.allowIn;
                    this.context.allowIn = false;
                    const declarations = this.parseBindingList(kind, {
                        inFor: true
                    });
                    this.context.allowIn = previousAllowIn;
                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword("in")) {
                        init = this.finalize(init, new VariableDeclaration(declarations, kind));
                        this.nextToken();
                        left = init;
                        right = this.parseExpression();
                        init = null;
                    } else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword("of")) {
                        init = this.finalize(init, new VariableDeclaration(declarations, kind));
                        this.nextToken();
                        left = init;
                        right = this.parseAssignmentExpression();
                        init = null;
                        forIn = false;
                    } else {
                        this.consumeSemicolon();
                        init = this.finalize(init, new VariableDeclaration(declarations, kind));
                    }
                }
            } else {
                const initStartToken = this.lookahead;
                const previousIsBindingElement = this.context.isBindingElement;
                const previousIsAssignmentTarget = this.context.isAssignmentTarget;
                const previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
                const previousAllowIn = this.context.allowIn;
                this.context.allowIn = false;
                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
                this.context.allowIn = previousAllowIn;
                if (this.matchKeyword("in")) {
                    if (!this.context.isAssignmentTarget || init.type === "AssignmentExpression" /* AssignmentExpression */ ) this.tolerateError(Messages.InvalidLHSInForIn);
                    this.nextToken();
                    this.reinterpretExpressionAsPattern(init);
                    left = init;
                    right = this.parseExpression();
                    init = null;
                } else if (this.matchContextualKeyword("of")) {
                    if (!this.context.isAssignmentTarget || init.type === "AssignmentExpression" /* AssignmentExpression */ ) this.tolerateError(Messages.InvalidLHSInForLoop);
                    this.nextToken();
                    this.reinterpretExpressionAsPattern(init);
                    left = init;
                    right = this.parseAssignmentExpression();
                    init = null;
                    forIn = false;
                } else {
                    this.context.isBindingElement = previousIsBindingElement;
                    this.context.isAssignmentTarget = previousIsAssignmentTarget;
                    this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
                    if (this.match(",")) {
                        const initSeq = [
                            init
                        ];
                        while(this.match(",")){
                            this.nextToken();
                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                        }
                        init = this.finalize(this.startNode(initStartToken), new SequenceExpression(initSeq));
                    }
                    this.expect(";");
                }
            }
        }
        if (typeof left === "undefined") {
            if (!this.match(";")) test = this.isolateCoverGrammar(this.parseExpression);
            this.expect(";");
            if (!this.match(")")) update = this.isolateCoverGrammar(this.parseExpression);
        }
        let body;
        if (!this.match(")") && this.config.tolerant) {
            this.tolerateUnexpectedToken(this.nextToken());
            body = this.finalize(this.createNode(), new EmptyStatement());
        } else {
            this.expect(")");
            this.tolerateInvalidLoopStatement();
            const previousInIteration = this.context.inIteration;
            this.context.inIteration = true;
            body = this.isolateCoverGrammar(this.parseStatement);
            this.context.inIteration = previousInIteration;
        }
        return typeof left === "undefined" ? this.finalize(node, new ForStatement(init, test, update, body)) : forIn ? this.finalize(node, new ForInStatement(left, right, body)) : this.finalize(node, new ForOfStatement(left, right, body, _await));
    }
    // https://tc39.github.io/ecma262/#sec-continue-statement
    parseContinueStatement() {
        const node = this.createNode();
        this.expectKeyword("continue");
        let label = null;
        if (this.lookahead.type === 3 /* Identifier */  && !this.hasLineTerminator) {
            const id = this.parseVariableIdentifier();
            label = id;
            const key = "$" + id.name;
            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) this.throwError(Messages.UnknownLabel, id.name);
        }
        this.consumeSemicolon();
        if (label === null && !this.context.inIteration) this.throwError(Messages.IllegalContinue);
        return this.finalize(node, new ContinueStatement(label));
    }
    // https://tc39.github.io/ecma262/#sec-break-statement
    parseBreakStatement() {
        const node = this.createNode();
        this.expectKeyword("break");
        let label = null;
        if (this.lookahead.type === 3 /* Identifier */  && !this.hasLineTerminator) {
            const id = this.parseVariableIdentifier();
            const key = "$" + id.name;
            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) this.throwError(Messages.UnknownLabel, id.name);
            label = id;
        }
        this.consumeSemicolon();
        if (label === null && !this.context.inIteration && !this.context.inSwitch) this.throwError(Messages.IllegalBreak);
        return this.finalize(node, new BreakStatement(label));
    }
    // https://tc39.github.io/ecma262/#sec-return-statement
    parseReturnStatement() {
        if (!this.context.inFunctionBody) this.tolerateError(Messages.IllegalReturn);
        const node = this.createNode();
        this.expectKeyword("return");
        const hasArgument = !this.match(";") && !this.match("}") && !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */  || this.lookahead.type === 8 /* StringLiteral */  || this.lookahead.type === 10 /* Template */ ;
        const argument = hasArgument ? this.parseExpression() : null;
        this.consumeSemicolon();
        return this.finalize(node, new ReturnStatement(argument));
    }
    // https://tc39.github.io/ecma262/#sec-with-statement
    parseWithStatement() {
        if (this.context.strict) this.tolerateError(Messages.StrictModeWith);
        const node = this.createNode();
        let body;
        this.expectKeyword("with");
        this.expect("(");
        const object = this.parseExpression();
        if (!this.match(")") && this.config.tolerant) {
            this.tolerateUnexpectedToken(this.nextToken());
            body = this.finalize(this.createNode(), new EmptyStatement());
        } else {
            this.expect(")");
            body = this.parseStatement();
        }
        return this.finalize(node, new WithStatement(object, body));
    }
    // https://tc39.github.io/ecma262/#sec-switch-statement
    parseSwitchCase() {
        const node = this.createNode();
        let test;
        if (this.matchKeyword("default")) {
            this.nextToken();
            test = null;
        } else {
            this.expectKeyword("case");
            test = this.parseExpression();
        }
        this.expect(":");
        const consequent = [];
        while(true){
            if (this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")) break;
            consequent.push(this.parseStatementListItem());
        }
        return this.finalize(node, new SwitchCase(test, consequent));
    }
    parseSwitchStatement() {
        const node = this.createNode();
        this.expectKeyword("switch");
        this.expect("(");
        const discriminant = this.parseExpression();
        this.expect(")");
        const previousInSwitch = this.context.inSwitch;
        this.context.inSwitch = true;
        const cases = [];
        let defaultFound = false;
        this.expect("{");
        while(true){
            if (this.match("}")) break;
            const clause = this.parseSwitchCase();
            if (clause.test === null) {
                if (defaultFound) this.throwError(Messages.MultipleDefaultsInSwitch);
                defaultFound = true;
            }
            cases.push(clause);
        }
        this.expect("}");
        this.context.inSwitch = previousInSwitch;
        return this.finalize(node, new SwitchStatement(discriminant, cases));
    }
    // https://tc39.github.io/ecma262/#sec-labelled-statements
    parseLabelledStatement() {
        const node = this.createNode();
        const expr = this.parseExpression();
        let statement;
        if (expr.type === "Identifier" /* Identifier */  && this.match(":")) {
            this.nextToken();
            const id = expr;
            const key = "$" + id.name;
            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) this.throwError(Messages.Redeclaration, "Label", id.name);
            this.context.labelSet[key] = true;
            let body;
            if (this.matchKeyword("class")) {
                this.tolerateUnexpectedToken(this.lookahead);
                body = this.parseClassDeclaration();
            } else if (this.matchKeyword("function")) {
                const token = this.lookahead;
                const declaration = this.parseFunctionDeclaration();
                if (this.context.strict) this.tolerateUnexpectedToken(token, Messages.StrictFunction);
                else if (declaration.generator) this.tolerateUnexpectedToken(token, Messages.GeneratorInLegacyContext);
                body = declaration;
            } else body = this.parseStatement();
            delete this.context.labelSet[key];
            statement = new LabeledStatement(id, body);
        } else {
            this.consumeSemicolon();
            statement = new ExpressionStatement(expr);
        }
        return this.finalize(node, statement);
    }
    // https://tc39.github.io/ecma262/#sec-throw-statement
    parseThrowStatement() {
        const node = this.createNode();
        this.expectKeyword("throw");
        if (this.hasLineTerminator) this.throwError(Messages.NewlineAfterThrow);
        const argument = this.parseExpression();
        this.consumeSemicolon();
        return this.finalize(node, new ThrowStatement(argument));
    }
    // https://tc39.github.io/ecma262/#sec-try-statement
    parseCatchClause() {
        const node = this.createNode();
        this.expectKeyword("catch");
        let param = null;
        if (this.match("(")) {
            this.expect("(");
            if (this.match(")")) this.throwUnexpectedToken(this.lookahead);
            const params = [];
            param = this.parsePattern(params);
            const paramMap = {};
            for(let i = 0; i < params.length; i++){
                const key = "$" + params[i].value;
                if (Object.prototype.hasOwnProperty.call(paramMap, key)) this.tolerateError(Messages.DuplicateBinding, params[i].value);
                paramMap[key] = true;
            }
            if (this.context.strict && param.type === "Identifier" /* Identifier */ ) {
                if (this.scanner.isRestrictedWord(param.name)) this.tolerateError(Messages.StrictCatchVariable);
            }
            this.expect(")");
        }
        const body = this.parseBlock();
        return this.finalize(node, new CatchClause(param, body));
    }
    parseFinallyClause() {
        this.expectKeyword("finally");
        return this.parseBlock();
    }
    parseTryStatement() {
        const node = this.createNode();
        this.expectKeyword("try");
        const block = this.parseBlock();
        const handler = this.matchKeyword("catch") ? this.parseCatchClause() : null;
        const finalizer = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
        if (!handler && !finalizer) this.throwError(Messages.NoCatchOrFinally);
        return this.finalize(node, new TryStatement(block, handler, finalizer));
    }
    // https://tc39.github.io/ecma262/#sec-debugger-statement
    parseDebuggerStatement() {
        const node = this.createNode();
        this.expectKeyword("debugger");
        this.consumeSemicolon();
        return this.finalize(node, new DebuggerStatement());
    }
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
    parseStatement() {
        let statement;
        switch(this.lookahead.type){
            case 1 /* BooleanLiteral */ :
            case 5 /* NullLiteral */ :
            case 6 /* NumericLiteral */ :
            case 8 /* StringLiteral */ :
            case 10 /* Template */ :
            case 9 /* RegularExpression */ :
                statement = this.parseExpressionStatement();
                break;
            case 7 /* Punctuator */ :
                const value = this.lookahead.value;
                if (value === "{") statement = this.parseBlock();
                else if (value === "(") statement = this.parseExpressionStatement();
                else if (value === ";") statement = this.parseEmptyStatement();
                else statement = this.parseExpressionStatement();
                break;
            case 3 /* Identifier */ :
                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                break;
            case 4 /* Keyword */ :
                switch(this.lookahead.value){
                    case "break":
                        statement = this.parseBreakStatement();
                        break;
                    case "continue":
                        statement = this.parseContinueStatement();
                        break;
                    case "debugger":
                        statement = this.parseDebuggerStatement();
                        break;
                    case "do":
                        statement = this.parseDoWhileStatement();
                        break;
                    case "for":
                        statement = this.parseForStatement();
                        break;
                    case "function":
                        statement = this.parseFunctionDeclaration();
                        break;
                    case "if":
                        statement = this.parseIfStatement();
                        break;
                    case "return":
                        statement = this.parseReturnStatement();
                        break;
                    case "switch":
                        statement = this.parseSwitchStatement();
                        break;
                    case "throw":
                        statement = this.parseThrowStatement();
                        break;
                    case "try":
                        statement = this.parseTryStatement();
                        break;
                    case "var":
                        statement = this.parseVariableStatement();
                        break;
                    case "while":
                        statement = this.parseWhileStatement();
                        break;
                    case "with":
                        statement = this.parseWithStatement();
                        break;
                    default:
                        statement = this.parseExpressionStatement();
                        break;
                }
                break;
            default:
                statement = this.throwUnexpectedToken(this.lookahead);
        }
        return statement;
    }
    // https://tc39.github.io/ecma262/#sec-function-definitions
    parseFunctionSourceElements() {
        const node = this.createNode();
        this.expect("{");
        const body = this.parseDirectivePrologues();
        const previousLabelSet = this.context.labelSet;
        const previousInIteration = this.context.inIteration;
        const previousInSwitch = this.context.inSwitch;
        const previousInFunctionBody = this.context.inFunctionBody;
        this.context.labelSet = {};
        this.context.inIteration = false;
        this.context.inSwitch = false;
        this.context.inFunctionBody = true;
        while(this.lookahead.type !== 2 /* EOF */ ){
            if (this.match("}")) break;
            body.push(this.parseStatementListItem());
        }
        this.expect("}");
        this.context.labelSet = previousLabelSet;
        this.context.inIteration = previousInIteration;
        this.context.inSwitch = previousInSwitch;
        this.context.inFunctionBody = previousInFunctionBody;
        return this.finalize(node, new BlockStatement(body));
    }
    validateParam(options, param, name) {
        const key = "$" + name;
        if (this.context.strict) {
            if (this.scanner.isRestrictedWord(name)) {
                options.stricted = param;
                options.message = Messages.StrictParamName;
            }
            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                options.stricted = param;
                options.hasDuplicateParameterNames = true;
            }
        } else if (!options.firstRestricted) {
            if (this.scanner.isRestrictedWord(name)) {
                options.firstRestricted = param;
                options.message = Messages.StrictParamName;
            } else if (this.scanner.isStrictModeReservedWord(name)) {
                options.firstRestricted = param;
                options.message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                options.stricted = param;
                options.hasDuplicateParameterNames = true;
            }
        }
        if (typeof Object.defineProperty === "function") Object.defineProperty(options.paramSet, key, {
            value: true,
            enumerable: true,
            writable: true,
            configurable: true
        });
        else options.paramSet[key] = true;
    }
    parseRestElement(params) {
        const node = this.createNode();
        this.expect("...");
        const arg = this.parsePattern(params);
        if (this.match("=")) this.throwError(Messages.DefaultRestParameter);
        if (!this.match(")")) this.throwError(Messages.ParameterAfterRestParameter);
        return this.finalize(node, new RestElement(arg));
    }
    parseFormalParameter(options) {
        const params = [];
        const param = this.match("...") ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
        for(let i = 0; i < params.length; i++)this.validateParam(options, params[i], params[i].value);
        options.simple = options.simple && param instanceof Identifier;
        options.params.push(param);
    }
    parseFormalParameters(firstRestricted) {
        const options = {
            simple: true,
            hasDuplicateParameterNames: false,
            params: [],
            firstRestricted
        };
        this.expect("(");
        if (!this.match(")")) {
            options.paramSet = {};
            while(this.lookahead.type !== 2 /* EOF */ ){
                this.parseFormalParameter(options);
                if (this.match(")")) break;
                this.expect(",");
                if (this.match(")")) break;
            }
        }
        this.expect(")");
        if (options.hasDuplicateParameterNames) {
            if (this.context.strict || this.context.isAsync || !options.simple) this.throwError(Messages.DuplicateParameter);
        }
        return {
            simple: options.simple,
            params: options.params,
            stricted: options.stricted,
            firstRestricted: options.firstRestricted,
            message: options.message
        };
    }
    matchAsyncFunction() {
        let match = this.matchContextualKeyword("async");
        if (match) {
            const state = this.scanner.saveState();
            this.scanner.scanComments();
            const next = this.scanner.lex();
            this.scanner.restoreState(state);
            match = state.lineNumber === next.lineNumber && next.type === 4 /* Keyword */  && next.value === "function";
        }
        return match;
    }
    parseFunctionDeclaration(identifierIsOptional) {
        const node = this.createNode();
        const isAsync = this.matchContextualKeyword("async");
        if (isAsync) {
            if (this.context.inIteration) this.tolerateError(Messages.AsyncFunctionInSingleStatementContext);
            this.nextToken();
        }
        this.expectKeyword("function");
        const isGenerator = this.match("*");
        if (isGenerator) this.nextToken();
        let message;
        let id = null;
        let firstRestricted = null;
        if (!identifierIsOptional || !this.match("(")) {
            const token = this.lookahead;
            id = this.parseVariableIdentifier();
            if (this.context.strict) {
                if (this.scanner.isRestrictedWord(token.value)) this.tolerateUnexpectedToken(token, Messages.StrictFunctionName);
            } else {
                if (this.scanner.isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (this.scanner.isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }
        const previousIsAsync = this.context.isAsync;
        const previousAllowYield = this.context.allowYield;
        this.context.isAsync = isAsync;
        this.context.allowYield = !isGenerator;
        const formalParameters = this.parseFormalParameters(firstRestricted);
        const params = formalParameters.params;
        const stricted = formalParameters.stricted;
        firstRestricted = formalParameters.firstRestricted;
        if (formalParameters.message) message = formalParameters.message;
        const previousStrict = this.context.strict;
        const previousAllowStrictDirective = this.context.allowStrictDirective;
        this.context.allowStrictDirective = formalParameters.simple;
        const body = this.parseFunctionSourceElements();
        if (this.context.strict && firstRestricted) this.throwUnexpectedToken(firstRestricted, message);
        if (this.context.strict && stricted) this.tolerateUnexpectedToken(stricted, message);
        this.context.strict = previousStrict;
        this.context.allowStrictDirective = previousAllowStrictDirective;
        this.context.isAsync = previousIsAsync;
        this.context.allowYield = previousAllowYield;
        return isAsync ? this.finalize(node, new AsyncFunctionDeclaration(id, params, body, isGenerator)) : this.finalize(node, new FunctionDeclaration(id, params, body, isGenerator));
    }
    parseFunctionExpression() {
        const node = this.createNode();
        const isAsync = this.matchContextualKeyword("async");
        if (isAsync) this.nextToken();
        this.expectKeyword("function");
        const isGenerator = this.match("*");
        if (isGenerator) this.nextToken();
        let message;
        let id = null;
        let firstRestricted;
        const previousIsAsync = this.context.isAsync;
        const previousAllowYield = this.context.allowYield;
        this.context.isAsync = isAsync;
        this.context.allowYield = !isGenerator;
        if (!this.match("(")) {
            const token = this.lookahead;
            id = !this.context.strict && !isGenerator && this.matchKeyword("yield") ? this.parseIdentifierName() : this.parseVariableIdentifier();
            if (this.context.strict) {
                if (this.scanner.isRestrictedWord(token.value)) this.tolerateUnexpectedToken(token, Messages.StrictFunctionName);
            } else {
                if (this.scanner.isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (this.scanner.isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }
        const formalParameters = this.parseFormalParameters(firstRestricted);
        const params = formalParameters.params;
        const stricted = formalParameters.stricted;
        firstRestricted = formalParameters.firstRestricted;
        if (formalParameters.message) message = formalParameters.message;
        const previousStrict = this.context.strict;
        const previousAllowStrictDirective = this.context.allowStrictDirective;
        this.context.allowStrictDirective = formalParameters.simple;
        const body = this.parseFunctionSourceElements();
        if (this.context.strict && firstRestricted) this.throwUnexpectedToken(firstRestricted, message);
        if (this.context.strict && stricted) this.tolerateUnexpectedToken(stricted, message);
        this.context.strict = previousStrict;
        this.context.allowStrictDirective = previousAllowStrictDirective;
        this.context.isAsync = previousIsAsync;
        this.context.allowYield = previousAllowYield;
        return this.finalize(node, new FunctionExpression(id, params, body, isGenerator, isAsync));
    }
    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
    parseDirective() {
        const token = this.lookahead;
        const node = this.createNode();
        const expr = this.parseExpression();
        const directive = expr.type === "Literal" /* Literal */  ? this.getTokenRaw(token).slice(1, -1) : null;
        this.consumeSemicolon();
        return this.finalize(node, directive ? new Directive(expr, directive) : new ExpressionStatement(expr));
    }
    parseDirectivePrologues() {
        let firstRestricted = null;
        const body = [];
        while(true){
            const token = this.lookahead;
            if (token.type !== 8 /* StringLiteral */ ) break;
            const statement = this.parseDirective();
            body.push(statement);
            const directive = statement.directive;
            if (typeof directive !== "string") break;
            if (directive === "use strict") {
                this.context.strict = true;
                if (firstRestricted) this.tolerateUnexpectedToken(firstRestricted, Messages.StrictOctalLiteral);
                if (!this.context.allowStrictDirective) this.tolerateUnexpectedToken(token, Messages.IllegalLanguageModeDirective);
            } else if (!firstRestricted && token.octal) firstRestricted = token;
        }
        return body;
    }
    // https://tc39.github.io/ecma262/#sec-method-definitions
    qualifiedPropertyName(token) {
        switch(token.type){
            case 3 /* Identifier */ :
            case 8 /* StringLiteral */ :
            case 1 /* BooleanLiteral */ :
            case 5 /* NullLiteral */ :
            case 6 /* NumericLiteral */ :
            case 4 /* Keyword */ :
                return true;
            case 7 /* Punctuator */ :
                return token.value === "[" || token.value === "#";
            default:
                break;
        }
        return false;
    }
    parseGetterMethod() {
        const node = this.createNode();
        const isGenerator = false;
        const previousAllowYield = this.context.allowYield;
        this.context.allowYield = !isGenerator;
        const formalParameters = this.parseFormalParameters();
        if (formalParameters.params.length > 0) this.tolerateError(Messages.BadGetterArity);
        const method = this.parsePropertyMethod(formalParameters);
        this.context.allowYield = previousAllowYield;
        return this.finalize(node, new FunctionExpression(null, formalParameters.params, method, isGenerator, false));
    }
    parseSetterMethod() {
        const node = this.createNode();
        const isGenerator = false;
        const previousAllowYield = this.context.allowYield;
        this.context.allowYield = !isGenerator;
        const formalParameters = this.parseFormalParameters();
        if (formalParameters.params.length !== 1) this.tolerateError(Messages.BadSetterArity);
        else if (formalParameters.params[0] instanceof RestElement) this.tolerateError(Messages.BadSetterRestParameter);
        const method = this.parsePropertyMethod(formalParameters);
        this.context.allowYield = previousAllowYield;
        return this.finalize(node, new FunctionExpression(null, formalParameters.params, method, isGenerator, false));
    }
    parseGeneratorMethod(isAsync) {
        const node = this.createNode();
        const isGenerator = true;
        const previousAllowYield = this.context.allowYield;
        this.context.allowYield = true;
        const params = this.parseFormalParameters();
        this.context.allowYield = false;
        const method = this.parsePropertyMethod(params);
        this.context.allowYield = previousAllowYield;
        return this.finalize(node, new FunctionExpression(null, params.params, method, isGenerator, isAsync));
    }
    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
    isStartOfExpression() {
        let start = true;
        const value = this.lookahead.value;
        switch(this.lookahead.type){
            case 7 /* Punctuator */ :
                start = value === "[" || value === "(" || value === "{" || value === "+" || value === "-" || value === "!" || value === "~" || value === "++" || value === "--" || value === "/" || value === "/=";
                break;
            case 4 /* Keyword */ :
                start = value === "class" || value === "delete" || value === "function" || value === "let" || value === "new" || value === "super" || value === "this" || value === "typeof" || value === "void" || value === "yield";
                break;
            default:
                break;
        }
        return start;
    }
    parseYieldExpression() {
        const node = this.createNode();
        this.expectKeyword("yield");
        let argument = null;
        let delegate = false;
        if (!this.hasLineTerminator) {
            const previousAllowYield = this.context.allowYield;
            this.context.allowYield = false;
            delegate = this.match("*");
            if (delegate) {
                this.nextToken();
                argument = this.parseAssignmentExpression();
            } else if (this.isStartOfExpression()) argument = this.parseAssignmentExpression();
            this.context.allowYield = previousAllowYield;
        }
        return this.finalize(node, new YieldExpression(argument, delegate));
    }
    // https://tc39.github.io/ecma262/#sec-class-definitions
    parseStaticBlock() {
        const node = this.createNode();
        this.expect("{");
        const block = [];
        while(true){
            if (this.match("}")) break;
            block.push(this.parseStatementListItem());
        }
        this.expect("}");
        return this.finalize(node, new StaticBlock(block));
    }
    parseDecorator() {
        const node = this.createNode();
        this.expect("@");
        const previousStrict = this.context.strict;
        const previousAllowYield = this.context.allowYield;
        const previousIsAsync = this.context.isAsync;
        this.context.strict = false;
        this.context.allowYield = true;
        this.context.isAsync = false;
        const expression = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
        this.context.strict = previousStrict;
        this.context.allowYield = previousAllowYield;
        this.context.isAsync = previousIsAsync;
        if (this.match(";")) this.throwError(Messages.NoSemicolonAfterDecorator);
        return this.finalize(node, new Decorator(expression));
    }
    parseDecorators() {
        let decorators = null;
        while(this.match("@")){
            if (decorators == null) decorators = [];
            decorators.push(this.parseDecorator());
        }
        return decorators;
    }
    parseClassElement(hasConstructor) {
        let token = this.lookahead;
        const node = this.createNode();
        const previousInConstructor = this.context.inConstructor;
        let kind = "";
        let key = null;
        let value = null;
        let computed = false;
        let method = false;
        let isStatic = false;
        let isAsync = false;
        let isGenerator = false;
        let isPrivate = false;
        const decorators = this.parseDecorators();
        if (decorators) token = this.lookahead;
        if (this.match("*")) this.nextToken();
        else {
            computed = this.match("[");
            if (this.match("#")) {
                isPrivate = true;
                this.nextToken();
                token = this.lookahead;
            }
            key = this.parseObjectPropertyKey(isPrivate);
            const id = key;
            this.context.inConstructor = token.type === 3 /* Identifier */  && token.value === "constructor";
            if (id.name === "static" && (this.qualifiedPropertyName(this.lookahead) || this.match("*"))) {
                token = this.lookahead;
                isStatic = true;
                computed = this.match("[");
                if (this.match("*")) {
                    this.nextToken();
                    if (this.match("#")) {
                        isPrivate = true;
                        this.nextToken();
                        token = this.lookahead;
                    }
                } else {
                    if (this.match("#")) {
                        isPrivate = true;
                        this.nextToken();
                        token = this.lookahead;
                    }
                    key = this.parseObjectPropertyKey(isPrivate);
                }
            }
            if (id.name === "static" && this.match("{")) return this.parseStaticBlock();
            if (token.type === 3 /* Identifier */  && !this.hasLineTerminator && token.value === "async") {
                const punctuator = this.lookahead.value;
                if (punctuator !== ":" && punctuator !== "(") {
                    isAsync = true;
                    isGenerator = this.match("*");
                    if (isGenerator) this.nextToken();
                    token = this.lookahead;
                    computed = this.match("[");
                    if (this.match("*")) {
                        this.nextToken();
                        if (this.match("#")) {
                            isPrivate = true;
                            this.nextToken();
                        }
                    } else {
                        if (this.match("#")) {
                            isPrivate = true;
                            this.nextToken();
                            token = this.lookahead;
                        }
                        key = this.parseObjectPropertyKey(isPrivate);
                    }
                    if (token.type === 3 /* Identifier */  && token.value === "constructor" && !isStatic) this.tolerateUnexpectedToken(token, Messages.ConstructorIsAsync);
                }
            }
        }
        if (token.type === 3 /* Identifier */  && token.value === "constructor" && isPrivate) this.tolerateUnexpectedToken(token, Messages.ConstructorIsPrivate);
        const lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
        if (token.type === 3 /* Identifier */  || token.type === 8 /* StringLiteral */ ) {
            if (token.value === "get" && lookaheadPropertyKey) {
                kind = "get";
                if (this.match("#")) {
                    isPrivate = true;
                    this.nextToken();
                    token = this.lookahead;
                }
                computed = this.match("[");
                key = this.parseObjectPropertyKey(isPrivate);
                this.context.allowYield = false;
                value = this.parseGetterMethod();
            } else if (token.value === "set" && lookaheadPropertyKey) {
                kind = "set";
                if (this.match("#")) {
                    isPrivate = true;
                    this.nextToken();
                    token = this.lookahead;
                }
                computed = this.match("[");
                key = this.parseObjectPropertyKey(isPrivate);
                value = this.parseSetterMethod();
            } else if (!this.match("(")) {
                kind = "property";
                computed = false;
                if (this.match("=")) {
                    this.nextToken();
                    value = this.isolateCoverGrammar(this.parseAssignmentExpression);
                }
            }
        } else if (token.type === 7 /* Punctuator */  && token.value === "*" && lookaheadPropertyKey) {
            kind = "init";
            computed = this.match("[");
            key = this.parseObjectPropertyKey(isPrivate);
            value = this.parseGeneratorMethod(isAsync);
            method = true;
        } else if (token.type === 7 /* Punctuator */  && token.value === "[" && !this.match("(")) {
            kind = "property";
            computed = true;
            if (this.match("=")) {
                this.nextToken();
                value = this.isolateCoverGrammar(this.parseAssignmentExpression);
            }
        }
        if (!kind && key && this.match("(")) {
            const previousInClassConstructor = this.context.inClassConstructor;
            this.context.inClassConstructor = token.value === "constructor";
            kind = "init";
            value = isAsync ? this.parsePropertyMethodAsyncFunction(isGenerator) : this.parsePropertyMethodFunction(isGenerator);
            this.context.inClassConstructor = previousInClassConstructor;
            method = true;
        }
        if (!kind) this.throwUnexpectedToken(this.lookahead);
        if (kind === "init") kind = "method";
        if (!computed) {
            if (isStatic && this.isPropertyKey(key, "prototype")) this.throwUnexpectedToken(token, Messages.StaticPrototype);
            if (!isStatic && this.isPropertyKey(key, "constructor")) {
                if (kind !== "method" || !method || value && value.generator) this.throwUnexpectedToken(token, Messages.ConstructorSpecialMethod);
                if (hasConstructor.value) this.throwUnexpectedToken(token, Messages.DuplicateConstructor);
                else hasConstructor.value = true;
                kind = "constructor";
            }
        }
        this.context.inConstructor = previousInConstructor;
        if (kind === "property") {
            this.consumeSemicolon();
            return this.finalize(node, new PropertyDefinition(key, computed, value, isStatic, decorators));
        } else return this.finalize(node, new MethodDefinition(key, computed, value, kind, isStatic, decorators));
    }
    parseClassElementList() {
        const body = [];
        const hasConstructor = {
            value: false
        };
        this.expect("{");
        while(!this.match("}"))if (this.match(";")) this.nextToken();
        else body.push(this.parseClassElement(hasConstructor));
        this.expect("}");
        return body;
    }
    parseClassBody() {
        const node = this.createNode();
        const elementList = this.parseClassElementList();
        return this.finalize(node, new ClassBody(elementList));
    }
    parseClassDeclaration(identifierIsOptional) {
        const node = this.createNode();
        const previousStrict = this.context.strict;
        const previousAllowSuper = this.context.allowSuper;
        this.context.strict = true;
        this.expectKeyword("class");
        const id = identifierIsOptional && this.lookahead.type !== 3 /* Identifier */  ? null : this.parseVariableIdentifier();
        let superClass = null;
        if (this.matchKeyword("extends")) {
            this.nextToken();
            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            this.context.allowSuper = true;
        }
        const classBody = this.parseClassBody();
        this.context.allowSuper = previousAllowSuper;
        this.context.strict = previousStrict;
        return this.finalize(node, new ClassDeclaration(id, superClass, classBody, this.context.decorators));
    }
    parseClassExpression() {
        const node = this.createNode();
        const previousStrict = this.context.strict;
        this.context.strict = true;
        this.expectKeyword("class");
        const id = this.lookahead.type === 3 /* Identifier */  ? this.parseVariableIdentifier() : null;
        let superClass = null;
        if (this.matchKeyword("extends")) {
            this.nextToken();
            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            this.context.allowSuper = true;
        }
        const classBody = this.parseClassBody();
        this.context.strict = previousStrict;
        return this.finalize(node, new ClassExpression(id, superClass, classBody, this.context.decorators));
    }
    // https://tc39.github.io/ecma262/#sec-scripts
    // https://tc39.github.io/ecma262/#sec-modules
    parseModule() {
        this.context.strict = true;
        this.context.isModule = true;
        this.scanner.isModule = true;
        const node = this.createNode();
        const body = this.parseDirectivePrologues();
        while(this.lookahead.type !== 2 /* EOF */ )body.push(this.parseStatementListItem());
        return this.finalize(node, new Module(body));
    }
    parseScript() {
        const node = this.createNode();
        const body = this.parseDirectivePrologues();
        while(this.lookahead.type !== 2 /* EOF */ )body.push(this.parseStatementListItem());
        return this.finalize(node, new Script(body));
    }
    // https://tc39.github.io/ecma262/#sec-imports
    parseImportAttributes() {
        if (this.lookahead.value === "assert") {
            this.nextToken();
            this.expect("{");
            const attributes = [];
            while(!this.match("}")){
                attributes.push(this.parseImportAttribute());
                if (!this.match("}")) this.expectCommaSeparator();
            }
            this.expect("}");
            return attributes;
        }
        return null;
    }
    parseImportAttribute() {
        const node = this.createNode();
        if (this.lookahead.type !== 3 /* Identifier */ ) this.throwUnexpectedToken(this.nextToken());
        const key = this.parseIdentifierName();
        if (!this.match(":")) this.throwUnexpectedToken(this.nextToken());
        this.nextToken();
        const literalToken = this.nextToken();
        const raw = this.getTokenRaw(literalToken);
        const value = this.finalize(node, new Literal(literalToken.value, raw));
        return this.finalize(node, new ImportAttribute(key, value));
    }
    parseModuleSpecifier() {
        const node = this.createNode();
        if (this.lookahead.type !== 8 /* StringLiteral */ ) this.throwError(Messages.InvalidModuleSpecifier);
        const token = this.nextToken();
        const raw = this.getTokenRaw(token);
        if (!Character.isStringWellFormedUnicode(token.value)) this.throwError(Messages.InvalidModuleSpecifier);
        return this.finalize(node, new Literal(token.value, raw));
    }
    // import {<foo as bar>} ...;
    parseImportSpecifier() {
        const node = this.createNode();
        let imported;
        let local;
        if (this.lookahead.type === 3 /* Identifier */ ) {
            imported = this.parseVariableIdentifier();
            local = imported;
            if (this.matchContextualKeyword("as")) {
                this.nextToken();
                local = this.parseVariableIdentifier();
            }
        } else {
            imported = this.lookahead.type == 8 /* StringLiteral */  ? this.parseModuleSpecifier() : this.parseIdentifierName();
            local = imported;
            if (this.matchContextualKeyword("as")) {
                this.nextToken();
                local = this.parseVariableIdentifier();
            } else this.throwUnexpectedToken(this.nextToken());
        }
        return this.finalize(node, new ImportSpecifier(local, imported));
    }
    // {foo, bar as bas}
    parseNamedImports() {
        this.expect("{");
        const specifiers = [];
        while(!this.match("}")){
            specifiers.push(this.parseImportSpecifier());
            if (!this.match("}")) this.expect(",");
        }
        this.expect("}");
        return specifiers;
    }
    // import <foo> ...;
    parseImportDefaultSpecifier() {
        const node = this.createNode();
        const local = this.parseIdentifierName();
        return this.finalize(node, new ImportDefaultSpecifier(local));
    }
    // import <* as foo> ...;
    parseImportNamespaceSpecifier() {
        const node = this.createNode();
        this.expect("*");
        if (!this.matchContextualKeyword("as")) this.throwError(Messages.NoAsAfterImportNamespace);
        if (this.lookahead.escaped) this.throwError(Messages.NoAsAndFromEscapeSequences);
        this.nextToken();
        const local = this.parseIdentifierName();
        return this.finalize(node, new ImportNamespaceSpecifier(local));
    }
    parseImportDeclaration() {
        if (this.context.inFunctionBody) this.throwError(Messages.IllegalImportDeclaration);
        const node = this.createNode();
        this.expectKeyword("import");
        let src;
        let specifiers = [];
        if (this.lookahead.type === 8 /* StringLiteral */ ) src = this.parseModuleSpecifier();
        else {
            if (this.match("{")) specifiers = specifiers.concat(this.parseNamedImports());
            else if (this.match("*")) specifiers.push(this.parseImportNamespaceSpecifier());
            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword("default")) {
                specifiers.push(this.parseImportDefaultSpecifier());
                if (this.match(",")) {
                    this.nextToken();
                    if (this.match("*")) specifiers.push(this.parseImportNamespaceSpecifier());
                    else if (this.match("{")) specifiers = specifiers.concat(this.parseNamedImports());
                    else this.throwUnexpectedToken(this.lookahead);
                }
            } else this.throwUnexpectedToken(this.nextToken());
            if (!this.matchContextualKeyword("from")) {
                const message = this.lookahead.value ? Messages.UnexpectedToken : Messages.MissingFromClause;
                this.throwError(message, this.lookahead.value);
            }
            this.nextToken();
            src = this.parseModuleSpecifier();
        }
        const attributes = this.parseImportAttributes();
        this.consumeSemicolon();
        return this.finalize(node, new ImportDeclaration(specifiers, src, attributes));
    }
    // https://tc39.github.io/ecma262/#sec-exports
    parseExportSpecifier() {
        const node = this.createNode();
        const local = this.lookahead.type == 8 /* StringLiteral */  ? this.parseModuleSpecifier() : this.parseIdentifierName();
        let exported = local;
        if (this.matchContextualKeyword("as")) {
            if (this.lookahead.escaped) this.throwError(Messages.NoAsAndFromEscapeSequences);
            this.nextToken();
            exported = this.lookahead.type == 8 /* StringLiteral */  ? this.parseModuleSpecifier() : this.parseIdentifierName();
        }
        return this.finalize(node, new ExportSpecifier(local, exported));
    }
    parseExportDeclaration() {
        if (this.context.inFunctionBody) this.throwError(Messages.IllegalExportDeclaration);
        const node = this.createNode();
        this.expectKeyword("export");
        let exportDeclaration;
        if (this.matchKeyword("default")) {
            this.nextToken();
            if (this.matchKeyword("function")) {
                const declaration = this.parseFunctionDeclaration(true);
                exportDeclaration = this.finalize(node, new ExportDefaultDeclaration(declaration));
            } else if (this.matchKeyword("class")) {
                const declaration = this.parseClassDeclaration(true);
                exportDeclaration = this.finalize(node, new ExportDefaultDeclaration(declaration));
            } else if (this.matchContextualKeyword("async")) {
                const declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
                exportDeclaration = this.finalize(node, new ExportDefaultDeclaration(declaration));
            } else {
                if (this.matchContextualKeyword("from")) this.throwError(Messages.UnexpectedToken, this.lookahead.value);
                const declaration = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression();
                this.consumeSemicolon();
                exportDeclaration = this.finalize(node, new ExportDefaultDeclaration(declaration));
            }
        } else if (this.match("*")) {
            this.nextToken();
            let exported = null;
            if (this.matchContextualKeyword("as")) {
                if (this.lookahead.escaped) this.throwError(Messages.NoAsAndFromEscapeSequences);
                this.nextToken();
                exported = this.lookahead.type == 8 /* StringLiteral */  ? this.parseModuleSpecifier() : this.parseIdentifierName();
            }
            if (!this.matchContextualKeyword("from")) {
                const message = this.lookahead.value ? Messages.UnexpectedToken : Messages.MissingFromClause;
                this.throwError(message, this.lookahead.value);
            }
            if (this.lookahead.escaped) this.throwError(Messages.NoAsAndFromEscapeSequences);
            this.nextToken();
            const src = this.parseModuleSpecifier();
            const attributes = this.parseImportAttributes();
            this.consumeSemicolon();
            exportDeclaration = this.finalize(node, new ExportAllDeclaration(src, exported, attributes));
        } else if (this.lookahead.type === 4 /* Keyword */ ) {
            let declaration;
            switch(this.lookahead.value){
                case "let":
                case "const":
                    declaration = this.parseLexicalDeclaration({
                        inFor: false
                    });
                    break;
                case "var":
                case "class":
                case "function":
                    declaration = this.parseStatementListItem();
                    break;
                default:
                    this.throwUnexpectedToken(this.lookahead);
            }
            exportDeclaration = this.finalize(node, new ExportNamedDeclaration(declaration, [], null, null));
        } else if (this.matchAsyncFunction()) {
            const declaration = this.parseFunctionDeclaration();
            exportDeclaration = this.finalize(node, new ExportNamedDeclaration(declaration, [], null, null));
        } else {
            const specifiers = [];
            let source = null;
            let isExportFromIdentifier = false;
            let attributes = null;
            this.expect("{");
            while(!this.match("}")){
                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword("default");
                specifiers.push(this.parseExportSpecifier());
                if (!this.match("}")) this.expect(",");
            }
            this.expect("}");
            if (this.matchContextualKeyword("from")) {
                if (this.lookahead.escaped) this.throwError(Messages.NoAsAndFromEscapeSequences);
                this.nextToken();
                source = this.parseModuleSpecifier();
                attributes = this.parseImportAttributes();
                this.consumeSemicolon();
            } else if (isExportFromIdentifier) {
                const message = this.lookahead.value ? Messages.UnexpectedToken : Messages.MissingFromClause;
                this.throwError(message, this.lookahead.value);
            } else {
                attributes = this.parseImportAttributes();
                this.consumeSemicolon();
            }
            exportDeclaration = this.finalize(node, new ExportNamedDeclaration(null, specifiers, source, attributes));
        }
        return exportDeclaration;
    }
};
// src/xhtml-entities.ts
var XHTMLEntities = {
    quot: '"',
    amp: "&",
    apos: "'",
    gt: ">",
    nbsp: "\xA0",
    iexcl: "\xA1",
    cent: "\xA2",
    pound: "\xA3",
    curren: "\xA4",
    yen: "\xA5",
    brvbar: "\xA6",
    sect: "\xA7",
    uml: "\xA8",
    copy: "\xA9",
    ordf: "\xAA",
    laquo: "\xAB",
    not: "\xAC",
    shy: "\xAD",
    reg: "\xAE",
    macr: "\xAF",
    deg: "\xB0",
    plusmn: "\xB1",
    sup2: "\xB2",
    sup3: "\xB3",
    acute: "\xB4",
    micro: "\xB5",
    para: "\xB6",
    middot: "\xB7",
    cedil: "\xB8",
    sup1: "\xB9",
    ordm: "\xBA",
    raquo: "\xBB",
    frac14: "\xBC",
    frac12: "\xBD",
    frac34: "\xBE",
    iquest: "\xBF",
    Agrave: "\xC0",
    Aacute: "\xC1",
    Acirc: "\xC2",
    Atilde: "\xC3",
    Auml: "\xC4",
    Aring: "\xC5",
    AElig: "\xC6",
    Ccedil: "\xC7",
    Egrave: "\xC8",
    Eacute: "\xC9",
    Ecirc: "\xCA",
    Euml: "\xCB",
    Igrave: "\xCC",
    Iacute: "\xCD",
    Icirc: "\xCE",
    Iuml: "\xCF",
    ETH: "\xD0",
    Ntilde: "\xD1",
    Ograve: "\xD2",
    Oacute: "\xD3",
    Ocirc: "\xD4",
    Otilde: "\xD5",
    Ouml: "\xD6",
    times: "\xD7",
    Oslash: "\xD8",
    Ugrave: "\xD9",
    Uacute: "\xDA",
    Ucirc: "\xDB",
    Uuml: "\xDC",
    Yacute: "\xDD",
    THORN: "\xDE",
    szlig: "\xDF",
    agrave: "\xE0",
    aacute: "\xE1",
    acirc: "\xE2",
    atilde: "\xE3",
    auml: "\xE4",
    aring: "\xE5",
    aelig: "\xE6",
    ccedil: "\xE7",
    egrave: "\xE8",
    eacute: "\xE9",
    ecirc: "\xEA",
    euml: "\xEB",
    igrave: "\xEC",
    iacute: "\xED",
    icirc: "\xEE",
    iuml: "\xEF",
    eth: "\xF0",
    ntilde: "\xF1",
    ograve: "\xF2",
    oacute: "\xF3",
    ocirc: "\xF4",
    otilde: "\xF5",
    ouml: "\xF6",
    divide: "\xF7",
    oslash: "\xF8",
    ugrave: "\xF9",
    uacute: "\xFA",
    ucirc: "\xFB",
    uuml: "\xFC",
    yacute: "\xFD",
    thorn: "\xFE",
    yuml: "\xFF",
    OElig: "\u0152",
    oelig: "\u0153",
    Scaron: "\u0160",
    scaron: "\u0161",
    Yuml: "\u0178",
    fnof: "\u0192",
    circ: "\u02C6",
    tilde: "\u02DC",
    Alpha: "\u0391",
    Beta: "\u0392",
    Gamma: "\u0393",
    Delta: "\u0394",
    Epsilon: "\u0395",
    Zeta: "\u0396",
    Eta: "\u0397",
    Theta: "\u0398",
    Iota: "\u0399",
    Kappa: "\u039A",
    Lambda: "\u039B",
    Mu: "\u039C",
    Nu: "\u039D",
    Xi: "\u039E",
    Omicron: "\u039F",
    Pi: "\u03A0",
    Rho: "\u03A1",
    Sigma: "\u03A3",
    Tau: "\u03A4",
    Upsilon: "\u03A5",
    Phi: "\u03A6",
    Chi: "\u03A7",
    Psi: "\u03A8",
    Omega: "\u03A9",
    alpha: "\u03B1",
    beta: "\u03B2",
    gamma: "\u03B3",
    delta: "\u03B4",
    epsilon: "\u03B5",
    zeta: "\u03B6",
    eta: "\u03B7",
    theta: "\u03B8",
    iota: "\u03B9",
    kappa: "\u03BA",
    lambda: "\u03BB",
    mu: "\u03BC",
    nu: "\u03BD",
    xi: "\u03BE",
    omicron: "\u03BF",
    pi: "\u03C0",
    rho: "\u03C1",
    sigmaf: "\u03C2",
    sigma: "\u03C3",
    tau: "\u03C4",
    upsilon: "\u03C5",
    phi: "\u03C6",
    chi: "\u03C7",
    psi: "\u03C8",
    omega: "\u03C9",
    thetasym: "\u03D1",
    upsih: "\u03D2",
    piv: "\u03D6",
    ensp: "\u2002",
    emsp: "\u2003",
    thinsp: "\u2009",
    zwnj: "\u200C",
    zwj: "\u200D",
    lrm: "\u200E",
    rlm: "\u200F",
    ndash: "\u2013",
    mdash: "\u2014",
    lsquo: "\u2018",
    rsquo: "\u2019",
    sbquo: "\u201A",
    ldquo: "\u201C",
    rdquo: "\u201D",
    bdquo: "\u201E",
    dagger: "\u2020",
    Dagger: "\u2021",
    bull: "\u2022",
    hellip: "\u2026",
    permil: "\u2030",
    prime: "\u2032",
    Prime: "\u2033",
    lsaquo: "\u2039",
    rsaquo: "\u203A",
    oline: "\u203E",
    frasl: "\u2044",
    euro: "\u20AC",
    image: "\u2111",
    weierp: "\u2118",
    real: "\u211C",
    trade: "\u2122",
    alefsym: "\u2135",
    larr: "\u2190",
    uarr: "\u2191",
    rarr: "\u2192",
    darr: "\u2193",
    harr: "\u2194",
    crarr: "\u21B5",
    lArr: "\u21D0",
    uArr: "\u21D1",
    rArr: "\u21D2",
    dArr: "\u21D3",
    hArr: "\u21D4",
    forall: "\u2200",
    part: "\u2202",
    exist: "\u2203",
    empty: "\u2205",
    nabla: "\u2207",
    isin: "\u2208",
    notin: "\u2209",
    ni: "\u220B",
    prod: "\u220F",
    sum: "\u2211",
    minus: "\u2212",
    lowast: "\u2217",
    radic: "\u221A",
    prop: "\u221D",
    infin: "\u221E",
    ang: "\u2220",
    and: "\u2227",
    or: "\u2228",
    cap: "\u2229",
    cup: "\u222A",
    int: "\u222B",
    there4: "\u2234",
    sim: "\u223C",
    cong: "\u2245",
    asymp: "\u2248",
    ne: "\u2260",
    equiv: "\u2261",
    le: "\u2264",
    ge: "\u2265",
    sub: "\u2282",
    sup: "\u2283",
    nsub: "\u2284",
    sube: "\u2286",
    supe: "\u2287",
    oplus: "\u2295",
    otimes: "\u2297",
    perp: "\u22A5",
    sdot: "\u22C5",
    lceil: "\u2308",
    rceil: "\u2309",
    lfloor: "\u230A",
    rfloor: "\u230B",
    loz: "\u25CA",
    spades: "\u2660",
    clubs: "\u2663",
    hearts: "\u2665",
    diams: "\u2666",
    lang: "\u27E8",
    rang: "\u27E9"
};
// src/jsx-parser.ts
TokenName[100 /* Identifier */ ] = "JSXIdentifier";
TokenName[101 /* Text */ ] = "JSXText";
function getQualifiedElementName(elementName) {
    let qualifiedName;
    switch(elementName.type){
        case "JSXIdentifier" /* JSXIdentifier */ :
            const id = elementName;
            qualifiedName = id.name;
            break;
        case "JSXNamespacedName" /* JSXNamespacedName */ :
            const ns = elementName;
            qualifiedName = getQualifiedElementName(ns.namespace) + ":" + getQualifiedElementName(ns.name);
            break;
        case "JSXMemberExpression" /* JSXMemberExpression */ :
            const expr = elementName;
            qualifiedName = getQualifiedElementName(expr.object) + "." + getQualifiedElementName(expr.property);
            break;
        default:
            break;
    }
    return qualifiedName;
}
var JSXParser = class extends Parser {
    constructor(code, options, delegate){
        super(code, options, delegate);
    }
    //@ts-ignore
    parsePrimaryExpression() {
        return this.match("<") ? this.parseJSXRoot() : super.parsePrimaryExpression();
    }
    startJSX() {
        this.scanner.index = this.startMarker.index;
        this.scanner.lineNumber = this.startMarker.line;
        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
    }
    finishJSX() {
        this.nextToken();
    }
    reenterJSX() {
        this.startJSX();
        this.expectJSX("}");
        if (this.config.tokens) this.tokens.pop();
    }
    createJSXNode() {
        this.collectComments();
        return {
            index: this.scanner.index,
            line: this.scanner.lineNumber,
            column: this.scanner.index - this.scanner.lineStart
        };
    }
    createJSXChildNode() {
        return {
            index: this.scanner.index,
            line: this.scanner.lineNumber,
            column: this.scanner.index - this.scanner.lineStart
        };
    }
    scanXHTMLEntity(quote) {
        let result = "&";
        let valid = true;
        let terminated = false;
        let numeric = false;
        let hex = false;
        while(!this.scanner.eof() && valid && !terminated){
            const ch = this.scanner.source[this.scanner.index];
            if (ch === quote) break;
            terminated = ch === ";";
            result += ch;
            ++this.scanner.index;
            if (!terminated) switch(result.length){
                case 2:
                    numeric = ch === "#";
                    break;
                case 3:
                    if (numeric) {
                        hex = ch === "x";
                        valid = hex || Character.isDecimalDigit(ch.charCodeAt(0));
                        numeric = numeric && !hex;
                    }
                    break;
                default:
                    valid = valid && !(numeric && !Character.isDecimalDigit(ch.charCodeAt(0)));
                    valid = valid && !(hex && !Character.isHexDigit(ch.charCodeAt(0)));
                    break;
            }
        }
        if (valid && terminated && result.length > 2) {
            const str = result.substr(1, result.length - 2);
            if (numeric && str.length > 1) result = String.fromCharCode(parseInt(str.substr(1), 10));
            else if (hex && str.length > 2) result = String.fromCharCode(parseInt("0" + str.substr(1), 16));
            else if (!numeric && !hex && XHTMLEntities[str]) result = XHTMLEntities[str];
        }
        return result;
    }
    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
    lexJSX() {
        const cp = this.scanner.source.charCodeAt(this.scanner.index);
        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
            const value = this.scanner.source[this.scanner.index++];
            return {
                type: 7 /* Punctuator */ ,
                value,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start: this.scanner.index - 1,
                end: this.scanner.index
            };
        }
        if (cp === 34 || cp === 39) {
            const start = this.scanner.index;
            const quote = this.scanner.source[this.scanner.index++];
            let str = "";
            while(!this.scanner.eof()){
                const ch = this.scanner.source[this.scanner.index++];
                if (ch === quote) break;
                else if (ch === "&") str += this.scanXHTMLEntity(quote);
                else str += ch;
            }
            return {
                type: 8 /* StringLiteral */ ,
                value: str,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start,
                end: this.scanner.index
            };
        }
        if (cp === 46) {
            const n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
            const n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
            const value = n1 === 46 && n2 === 46 ? "..." : ".";
            const start = this.scanner.index;
            this.scanner.index += value.length;
            return {
                type: 7 /* Punctuator */ ,
                value,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start,
                end: this.scanner.index
            };
        }
        if (cp === 96) return {
            type: 10 /* Template */ ,
            value: "",
            lineNumber: this.scanner.lineNumber,
            lineStart: this.scanner.lineStart,
            start: this.scanner.index,
            end: this.scanner.index
        };
        if (Character.isIdentifierStart(cp) && cp !== 92) {
            const start = this.scanner.index;
            ++this.scanner.index;
            while(!this.scanner.eof()){
                const ch = this.scanner.source.charCodeAt(this.scanner.index);
                if (Character.isIdentifierPart(ch) && ch !== 92) ++this.scanner.index;
                else if (ch === 45) ++this.scanner.index;
                else break;
            }
            const id = this.scanner.source.slice(start, this.scanner.index);
            return {
                type: 100 /* Identifier */ ,
                value: id,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start,
                end: this.scanner.index
            };
        }
        return this.scanner.lex();
    }
    nextJSXToken() {
        this.collectComments();
        this.startMarker.index = this.scanner.index;
        this.startMarker.line = this.scanner.lineNumber;
        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
        const token = this.lexJSX();
        this.lastMarker.index = this.scanner.index;
        this.lastMarker.line = this.scanner.lineNumber;
        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
        if (this.config.tokens) this.tokens.push(this.convertToken(token));
        return token;
    }
    nextJSXText() {
        this.startMarker.index = this.scanner.index;
        this.startMarker.line = this.scanner.lineNumber;
        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
        const start = this.scanner.index;
        let text = "";
        while(!this.scanner.eof()){
            const ch = this.scanner.source[this.scanner.index];
            if (ch === "{" || ch === "<") break;
            ++this.scanner.index;
            text += ch;
            if (Character.isLineTerminator(ch.charCodeAt(0))) {
                ++this.scanner.lineNumber;
                if (ch === "\r" && this.scanner.source[this.scanner.index] === "\n") ++this.scanner.index;
                this.scanner.lineStart = this.scanner.index;
            }
        }
        this.lastMarker.index = this.scanner.index;
        this.lastMarker.line = this.scanner.lineNumber;
        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
        const token = {
            type: 101 /* Text */ ,
            value: text,
            lineNumber: this.scanner.lineNumber,
            lineStart: this.scanner.lineStart,
            start,
            end: this.scanner.index
        };
        if (text.length > 0 && this.config.tokens) this.tokens.push(this.convertToken(token));
        return token;
    }
    peekJSXToken() {
        const state = this.scanner.saveState();
        this.scanner.scanComments();
        const next = this.lexJSX();
        this.scanner.restoreState(state);
        return next;
    }
    // Expect the next JSX token to match the specified punctuator.
    // If not, an exception will be thrown.
    expectJSX(value) {
        const token = this.nextJSXToken();
        if (token.type !== 7 /* Punctuator */  || token.value !== value) this.throwUnexpectedToken(token);
    }
    // Return true if the next JSX token matches the specified punctuator.
    matchJSX(value) {
        const next = this.peekJSXToken();
        return next.type === 7 /* Punctuator */  && next.value === value;
    }
    parseJSXIdentifier() {
        const node = this.createJSXNode();
        const token = this.nextJSXToken();
        if (token.type !== 100 /* Identifier */ ) this.throwUnexpectedToken(token);
        return this.finalize(node, new JSXIdentifier(token.value));
    }
    parseJSXElementName() {
        const node = this.createJSXNode();
        let elementName = this.parseJSXIdentifier();
        if (this.matchJSX(":")) {
            const namespace = elementName;
            this.expectJSX(":");
            const name = this.parseJSXIdentifier();
            elementName = this.finalize(node, new JSXNamespacedName(namespace, name));
        } else if (this.matchJSX(".")) while(this.matchJSX(".")){
            const object = elementName;
            this.expectJSX(".");
            const property = this.parseJSXIdentifier();
            elementName = this.finalize(node, new JSXMemberExpression(object, property));
        }
        return elementName;
    }
    parseJSXAttributeName() {
        const node = this.createJSXNode();
        let attributeName;
        const identifier = this.parseJSXIdentifier();
        if (this.matchJSX(":")) {
            const namespace = identifier;
            this.expectJSX(":");
            const name = this.parseJSXIdentifier();
            attributeName = this.finalize(node, new JSXNamespacedName(namespace, name));
        } else attributeName = identifier;
        return attributeName;
    }
    parseJSXStringLiteralAttribute() {
        const node = this.createJSXNode();
        const token = this.nextJSXToken();
        if (token.type !== 8 /* StringLiteral */ ) this.throwUnexpectedToken(token);
        const raw = this.getTokenRaw(token);
        return this.finalize(node, new Literal(token.value, raw));
    }
    parseJSXExpressionAttribute() {
        const node = this.createJSXNode();
        this.expectJSX("{");
        this.finishJSX();
        if (this.match("}")) this.tolerateError("JSX attributes must only be assigned a non-empty expression");
        const expression = this.parseAssignmentExpression();
        this.reenterJSX();
        return this.finalize(node, new JSXExpressionContainer(expression));
    }
    parseJSXAttributeValue() {
        return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
    }
    parseJSXNameValueAttribute() {
        const node = this.createJSXNode();
        const name = this.parseJSXAttributeName();
        let value = null;
        if (this.matchJSX("=")) {
            this.expectJSX("=");
            value = this.parseJSXAttributeValue();
        }
        return this.finalize(node, new JSXAttribute(name, value));
    }
    parseJSXSpreadAttribute() {
        const node = this.createJSXNode();
        this.expectJSX("{");
        this.expectJSX("...");
        this.finishJSX();
        const argument = this.parseAssignmentExpression();
        this.reenterJSX();
        return this.finalize(node, new JSXSpreadAttribute(argument));
    }
    parseJSXAttributes() {
        const attributes = [];
        while(!this.matchJSX("/") && !this.matchJSX(">")){
            const attribute = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
            attributes.push(attribute);
        }
        return attributes;
    }
    parseJSXOpeningElement() {
        const node = this.createJSXNode();
        this.expectJSX("<");
        if (this.matchJSX(">")) {
            this.expectJSX(">");
            return this.finalize(node, new JSXOpeningFragment(false));
        }
        const name = this.parseJSXElementName();
        const attributes = this.parseJSXAttributes();
        const selfClosing = this.matchJSX("/");
        if (selfClosing) this.expectJSX("/");
        this.expectJSX(">");
        return this.finalize(node, new JSXOpeningElement(name, selfClosing, attributes));
    }
    parseJSXBoundaryElement() {
        const node = this.createJSXNode();
        this.expectJSX("<");
        if (this.matchJSX("/")) {
            this.expectJSX("/");
            if (this.matchJSX(">")) {
                this.expectJSX(">");
                return this.finalize(node, new JSXClosingFragment());
            }
            const elementName = this.parseJSXElementName();
            this.expectJSX(">");
            return this.finalize(node, new JSXClosingElement(elementName));
        }
        const name = this.parseJSXElementName();
        const attributes = this.parseJSXAttributes();
        const selfClosing = this.matchJSX("/");
        if (selfClosing) this.expectJSX("/");
        this.expectJSX(">");
        return this.finalize(node, new JSXOpeningElement(name, selfClosing, attributes));
    }
    parseJSXEmptyExpression() {
        const node = this.createJSXChildNode();
        this.collectComments();
        this.lastMarker.index = this.scanner.index;
        this.lastMarker.line = this.scanner.lineNumber;
        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
        return this.finalize(node, new JSXEmptyExpression());
    }
    parseJSXExpressionContainer() {
        const node = this.createJSXNode();
        this.expectJSX("{");
        let expression;
        if (this.matchJSX("}")) {
            expression = this.parseJSXEmptyExpression();
            this.expectJSX("}");
        } else {
            this.finishJSX();
            expression = this.parseAssignmentExpression();
            this.reenterJSX();
        }
        return this.finalize(node, new JSXExpressionContainer(expression));
    }
    parseJSXChildren() {
        const children = [];
        while(!this.scanner.eof()){
            const node = this.createJSXChildNode();
            const token = this.nextJSXText();
            if (token.start < token.end) {
                const raw = this.getTokenRaw(token);
                const child = this.finalize(node, new JSXText(token.value, raw));
                children.push(child);
            }
            if (this.scanner.source[this.scanner.index] === "{") {
                const container = this.parseJSXExpressionContainer();
                children.push(container);
            } else break;
        }
        return children;
    }
    parseComplexJSXElement(el) {
        const stack = [];
        while(!this.scanner.eof()){
            el.children = el.children.concat(this.parseJSXChildren());
            const node = this.createJSXChildNode();
            const element = this.parseJSXBoundaryElement();
            if (element.type === "JSXOpeningElement" /* JSXOpeningElement */ ) {
                const opening = element;
                if (opening.selfClosing) {
                    const child = this.finalize(node, new JSXElement(opening, [], null));
                    el.children.push(child);
                } else {
                    stack.push(el);
                    el = {
                        node,
                        opening,
                        closing: null,
                        children: []
                    };
                }
            }
            if (element.type === "JSXClosingElement" /* JSXClosingElement */ ) {
                el.closing = element;
                const open = getQualifiedElementName(el.opening.name);
                const close = getQualifiedElementName(el.closing.name);
                if (open !== close) this.tolerateError("Expected corresponding JSX closing tag for %0", open);
                if (stack.length > 0) {
                    const child = this.finalize(el.node, new JSXElement(el.opening, el.children, el.closing));
                    el = stack[stack.length - 1];
                    el.children.push(child);
                    stack.pop();
                } else break;
            }
            if (element.type === "JSXClosingFragment" /* JSXClosingFragment */ ) {
                el.closing = element;
                if (el.opening.type !== "JSXOpeningFragment" /* JSXOpeningFragment */ ) this.tolerateError("Expected corresponding JSX closing tag for jsx fragment");
                else break;
            }
        }
        return el;
    }
    parseJSXElement() {
        const node = this.createJSXNode();
        const opening = this.parseJSXOpeningElement();
        let children = [];
        let closing = null;
        if (!opening.selfClosing) {
            const el = this.parseComplexJSXElement({
                node,
                opening,
                closing,
                children
            });
            children = el.children;
            closing = el.closing;
        }
        return this.finalize(node, new JSXElement(opening, children, closing));
    }
    parseJSXRoot() {
        if (this.config.tokens) this.tokens.pop();
        this.startJSX();
        const element = this.parseJSXElement();
        this.finishJSX();
        return element;
    }
    isStartOfExpression() {
        return super.isStartOfExpression() || this.match("<");
    }
};
// src/tokenizer.ts
var beforeFunctionExpressionTokens = [
    "(",
    "{",
    "[",
    "in",
    "typeof",
    "instanceof",
    "new",
    "return",
    "case",
    "delete",
    "throw",
    "void",
    // assignment operators
    "=",
    "+=",
    "-=",
    "*=",
    "**=",
    "/=",
    "%=",
    "<<=",
    ">>=",
    ">>>=",
    "&=",
    "|=",
    "^=",
    ",",
    // binary/unary operators
    "+",
    "-",
    "*",
    "**",
    "/",
    "%",
    "++",
    "--",
    "<<",
    ">>",
    ">>>",
    "&",
    "|",
    "^",
    "!",
    "~",
    "&&",
    "||",
    "??",
    "?",
    ":",
    "===",
    "==",
    ">=",
    "<=",
    "<",
    ">",
    "!=",
    "!=="
];
var Reader = class {
    values;
    curly;
    paren;
    constructor(){
        this.values = [];
        this.curly = this.paren = -1;
    }
    // A function following one of those tokens is an expression.
    beforeFunctionExpression(t) {
        return beforeFunctionExpressionTokens.includes(t);
    }
    // Determine if forward slash (/) is an operator or part of a regular expression
    // https://github.com/mozilla/sweet.js/wiki/design
    isRegexStart() {
        const previous = this.values[this.values.length - 1];
        let regex = previous !== null;
        switch(previous){
            case "this":
            case "]":
                regex = false;
                break;
            case ")":
                const keyword = this.values[this.paren - 1];
                regex = keyword === "if" || keyword === "while" || keyword === "for" || keyword === "with";
                break;
            case "}":
                regex = true;
                if (this.values[this.curly - 3] === "function") {
                    const check = this.values[this.curly - 4];
                    regex = check ? !this.beforeFunctionExpression(check) : false;
                } else if (this.values[this.curly - 4] === "function") {
                    const check = this.values[this.curly - 5];
                    regex = check ? !this.beforeFunctionExpression(check) : true;
                }
                break;
            default:
                break;
        }
        return regex;
    }
    push(token) {
        if (token.type === 7 /* Punctuator */  || token.type === 4 /* Keyword */ ) {
            if (token.value === "{") this.curly = this.values.length;
            else if (token.value === "(") this.paren = this.values.length;
            this.values.push(token.value);
        } else this.values.push(null);
    }
};
var Tokenizer = class {
    errorHandler;
    scanner;
    trackRange;
    trackLoc;
    buffer;
    reader;
    constructor(code, config){
        this.errorHandler = new ErrorHandler();
        this.errorHandler.tolerant = config ? typeof config.tolerant === "boolean" && config.tolerant : false;
        this.scanner = new Scanner(code, this.errorHandler);
        this.scanner.trackComment = config ? typeof config.comment === "boolean" && config.comment : false;
        this.trackRange = config ? typeof config.range === "boolean" && config.range : false;
        this.trackLoc = config ? typeof config.loc === "boolean" && config.loc : false;
        this.buffer = [];
        this.reader = new Reader();
    }
    errors() {
        return this.errorHandler.errors;
    }
    getNextToken() {
        if (this.buffer.length === 0) {
            const comments = this.scanner.scanComments();
            if (this.scanner.trackComment) for(let i = 0; i < comments.length; ++i){
                const e = comments[i];
                const value = this.scanner.source.slice(e.slice[0], e.slice[1]);
                const comment = {
                    type: e.multiLine ? "BlockComment" : "LineComment",
                    value
                };
                if (this.trackRange) comment.range = e.range;
                if (this.trackLoc) comment.loc = e.loc;
                this.buffer.push(comment);
            }
            if (!this.scanner.eof()) {
                let loc;
                if (this.trackLoc) loc = {
                    start: {
                        line: this.scanner.lineNumber,
                        column: this.scanner.index - this.scanner.lineStart
                    },
                    end: {}
                };
                const maybeRegex = this.scanner.source[this.scanner.index] === "/" && this.reader.isRegexStart();
                let token;
                if (maybeRegex) {
                    const state = this.scanner.saveState();
                    try {
                        token = this.scanner.scanRegExp();
                    } catch (e) {
                        this.scanner.restoreState(state);
                        token = this.scanner.lex();
                    }
                } else token = this.scanner.lex();
                this.reader.push(token);
                const entry = {
                    type: TokenName[token.type],
                    value: this.scanner.source.slice(token.start, token.end)
                };
                if (this.trackRange) entry.range = [
                    token.start,
                    token.end
                ];
                if (this.trackLoc) {
                    loc.end = {
                        line: this.scanner.lineNumber,
                        column: this.scanner.index - this.scanner.lineStart
                    };
                    entry.loc = loc;
                }
                if (token.type === 9 /* RegularExpression */ ) {
                    const pattern = token.pattern;
                    const flags = token.flags;
                    entry.regex = {
                        pattern,
                        flags
                    };
                }
                this.buffer.push(entry);
            }
        }
        return this.buffer.shift();
    }
};
// src/visitor.ts
var Visitor = class {
    visit(node) {
        if (node == null) return node;
        switch(node.type){
            case "AssignmentExpression" /* AssignmentExpression */ :
                return this.visitAssignmentExpression(node);
            case "AssignmentPattern" /* AssignmentPattern */ :
                return this.visitAssignmentPattern(node);
            case "ArrayExpression" /* ArrayExpression */ :
                return this.visitArrayExpression(node);
            case "ArrayPattern" /* ArrayPattern */ :
                return this.visitArrayPattern(node);
            case "ArrowFunctionExpression" /* ArrowFunctionExpression */ :
                return this.visitArrowFunctionExpression(node);
            case "AwaitExpression" /* AwaitExpression */ :
                return this.visitAwaitExpression(node);
            case "BlockStatement" /* BlockStatement */ :
                return this.visitBlockStatement(node);
            case "BinaryExpression" /* BinaryExpression */ :
                return this.visitBinaryExpression(node);
            case "BreakStatement" /* BreakStatement */ :
                return this.visitBreakStatement(node);
            case "CallExpression" /* CallExpression */ :
                return this.visitCallExpression(node);
            case "CatchClause" /* CatchClause */ :
                return this.visitCatchClause(node);
            case "ChainExpression" /* ChainExpression */ :
                return this.visitChainExpression(node);
            case "ClassBody" /* ClassBody */ :
                return this.visitClassBody(node);
            case "ClassDeclaration" /* ClassDeclaration */ :
                return this.visitClassDeclaration(node);
            case "ClassExpression" /* ClassExpression */ :
                return this.visitClassExpression(node);
            case "ConditionalExpression" /* ConditionalExpression */ :
                return this.visitConditionalExpression(node);
            case "ContinueStatement" /* ContinueStatement */ :
                return this.visitContinueStatement(node);
            case "Decorator" /* Decorator */ :
                return this.visitDecorator(node);
            case "DoWhileStatement" /* DoWhileStatement */ :
                return this.visitDoWhileStatement(node);
            case "DebuggerStatement" /* DebuggerStatement */ :
                return this.visitDebuggerStatement(node);
            case "EmptyStatement" /* EmptyStatement */ :
                return this.visitEmptyStatement(node);
            case "ExportAllDeclaration" /* ExportAllDeclaration */ :
                return this.visitExportAllDeclaration(node);
            case "ExportDefaultDeclaration" /* ExportDefaultDeclaration */ :
                return this.visitExportDefaultDeclaration(node);
            case "ExportNamedDeclaration" /* ExportNamedDeclaration */ :
                return this.visitExportNamedDeclaration(node);
            case "ExportSpecifier" /* ExportSpecifier */ :
                return this.visitExportSpecifier(node);
            case "ExpressionStatement" /* ExpressionStatement */ :
                return this.visitExpressionStatement(node);
            case "ForStatement" /* ForStatement */ :
                return this.visitForStatement(node);
            case "ForOfStatement" /* ForOfStatement */ :
                return this.visitForOfStatement(node);
            case "ForInStatement" /* ForInStatement */ :
                return this.visitForInStatement(node);
            case "FunctionDeclaration" /* FunctionDeclaration */ :
                return this.visitFunctionDeclaration(node);
            case "FunctionExpression" /* FunctionExpression */ :
                return this.visitFunctionExpression(node);
            case "Identifier" /* Identifier */ :
                return this.visitIdentifier(node);
            case "IfStatement" /* IfStatement */ :
                return this.visitIfStatement(node);
            case "ImportAttribute" /* ImportAttribute */ :
                return this.visitImportAttribute(node);
            case "ImportExpression" /* ImportExpression */ :
                return this.visitImportExpression(node);
            case "ImportDeclaration" /* ImportDeclaration */ :
                return this.visitImportDeclaration(node);
            case "ImportDefaultSpecifier" /* ImportDefaultSpecifier */ :
                return this.visitImportDefaultSpecifier(node);
            case "ImportNamespaceSpecifier" /* ImportNamespaceSpecifier */ :
                return this.visitImportNamespaceSpecifier(node);
            case "ImportSpecifier" /* ImportSpecifier */ :
                return this.visitImportSpecifier(node);
            case "Literal" /* Literal */ :
                return this.visitLiteral(node);
            case "LabeledStatement" /* LabeledStatement */ :
                return this.visitLabeledStatement(node);
            case "LogicalExpression" /* LogicalExpression */ :
                return this.visitLogicalExpression(node);
            case "MemberExpression" /* MemberExpression */ :
                return this.visitMemberExpression(node);
            case "MetaProperty" /* MetaProperty */ :
                return this.visitMetaProperty(node);
            case "MethodDefinition" /* MethodDefinition */ :
                return this.visitMethodDefinition(node);
            case "NewExpression" /* NewExpression */ :
                return this.visitNewExpression(node);
            case "ObjectExpression" /* ObjectExpression */ :
                return this.visitObjectExpression(node);
            case "ObjectPattern" /* ObjectPattern */ :
                return this.visitObjectPattern(node);
            case "Program" /* Program */ :
                return this.visitProgram(node);
            case "Property" /* Property */ :
                return this.visitProperty(node);
            case "PrivateIdentifier" /* PrivateIdentifier */ :
                return this.visitPrivateIdentifier(node);
            case "RestElement" /* RestElement */ :
                return this.visitRestElement(node);
            case "ReturnStatement" /* ReturnStatement */ :
                return this.visitReturnStatement(node);
            case "SequenceExpression" /* SequenceExpression */ :
                return this.visitSequenceExpression(node);
            case "SpreadElement" /* SpreadElement */ :
                return this.visitSpreadElement(node);
            case "StaticBlock" /* StaticBlock */ :
                return this.visitStaticBlock(node);
            case "Super" /* Super */ :
                return this.visitSuper(node);
            case "SwitchCase" /* SwitchCase */ :
                return this.visitSwitchCase(node);
            case "SwitchStatement" /* SwitchStatement */ :
                return this.visitSwitchStatement(node);
            case "TaggedTemplateExpression" /* TaggedTemplateExpression */ :
                return this.visitTaggedTemplateExpression(node);
            case "TemplateElement" /* TemplateElement */ :
                return this.visitTemplateElement(node);
            case "TemplateLiteral" /* TemplateLiteral */ :
                return this.visitTemplateLiteral(node);
            case "ThisExpression" /* ThisExpression */ :
                return this.visitThisExpression(node);
            case "ThrowStatement" /* ThrowStatement */ :
                return this.visitThrowStatement(node);
            case "TryStatement" /* TryStatement */ :
                return this.visitTryStatement(node);
            case "UnaryExpression" /* UnaryExpression */ :
                return this.visitUnaryExpression(node);
            case "UpdateExpression" /* UpdateExpression */ :
                return this.visitUpdateExpression(node);
            case "VariableDeclaration" /* VariableDeclaration */ :
                return this.visitVariableDeclaration(node);
            case "VariableDeclarator" /* VariableDeclarator */ :
                return this.visitVariableDeclarator(node);
            case "WhileStatement" /* WhileStatement */ :
                return this.visitWhileStatement(node);
            case "WithStatement" /* WithStatement */ :
                return this.visitWithStatement(node);
            case "YieldExpression" /* YieldExpression */ :
                return this.visitYieldExpression(node);
        }
    }
    visitNodeList(original) {
        if (original == null) return original;
        let list = null;
        for(let i = 0, n = original.length; i < n; i++){
            let p = this.visit(original[i]);
            if (list != null) list.push(p);
            else if (p != original[i]) {
                list = [];
                for(let j = 0; j < i; j++)list.push(original[j]);
                list.push(p);
            }
        }
        if (list != null) return list;
        return original;
    }
    visitAssignmentExpression(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        if (left !== node.left || right !== node.right) return new AssignmentExpression(node.operator, left, right);
        return node;
    }
    visitAssignmentPattern(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        if (left !== node.left || right !== node.right) return new AssignmentPattern(left, right);
        return node;
    }
    visitArrayExpression(node) {
        const elements = this.visitNodeList(node.elements);
        if (elements !== node.elements) return new ArrayExpression(elements);
        return node;
    }
    visitArrayPattern(node) {
        const elements = this.visitNodeList(node.elements);
        if (elements !== node.elements) return new ArrayPattern(elements);
        return node;
    }
    visitArrowFunctionExpression(node) {
        const id = this.visit(node.id);
        const params = this.visitNodeList(node.params);
        const body = this.visit(node.body);
        if (id !== node.id || params !== node.params || body !== node.body) {
            const ret = new ArrowFunctionExpression(params, body, node.expression, node.async);
            ret.id = id;
            return ret;
        }
        return node;
    }
    visitAwaitExpression(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new AwaitExpression(argument);
        return node;
    }
    visitBlockStatement(node) {
        const body = this.visitNodeList(node.body);
        if (body !== node.body) return new BlockStatement(body);
        return node;
    }
    visitBinaryExpression(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        if (left !== node.left || right !== node.right) return new BinaryExpression(node.operator, left, right);
        return node;
    }
    visitBreakStatement(node) {
        const label = this.visit(node.label);
        if (label !== node.label) return new BreakStatement(label);
        return node;
    }
    visitCallExpression(node) {
        const callee = this.visit(node.callee);
        const args = this.visitNodeList(node.arguments);
        if (callee !== node.callee || args !== node.arguments) return new CallExpression(callee, args, node.optional);
        return node;
    }
    visitCatchClause(node) {
        const param = this.visit(node.param);
        const body = this.visit(node.body);
        if (param !== node.param || body !== node.body) return new CatchClause(param, body);
        return node;
    }
    visitChainExpression(node) {
        const expression = this.visit(node.expression);
        if (expression !== node.expression) return new ChainExpression(expression);
        return node;
    }
    visitClassBody(node) {
        const body = this.visitNodeList(node.body);
        if (body !== node.body) return new ClassBody(body);
        return node;
    }
    visitClassDeclaration(node) {
        const id = this.visit(node.id);
        const superClass = this.visit(node.superClass);
        const body = this.visit(node.body);
        const decorators = this.visitNodeList(node.decorators);
        if (id !== node.id || superClass !== node.superClass || body !== node.body || decorators !== node.decorators) return new ClassDeclaration(id, superClass, body, decorators);
        return node;
    }
    visitClassExpression(node) {
        const id = this.visit(node.id);
        const superClass = this.visit(node.superClass);
        const body = this.visit(node.body);
        const decorators = this.visitNodeList(node.decorators);
        if (id !== node.id || superClass !== node.superClass || body !== node.body || decorators !== node.decorators) return new ClassExpression(id, superClass, body, decorators);
        return node;
    }
    visitConditionalExpression(node) {
        const test = this.visit(node.test);
        const consequent = this.visit(node.consequent);
        const alternate = this.visit(node.alternate);
        if (test !== node.test || consequent !== node.consequent || alternate !== node.alternate) return new ConditionalExpression(test, consequent, alternate);
        return node;
    }
    visitContinueStatement(node) {
        const label = this.visit(node.label);
        if (label !== node.label) return new ContinueStatement(label);
        return node;
    }
    visitDecorator(node) {
        const expression = this.visit(node.expression);
        if (expression !== node.expression) return new Decorator(expression);
        return node;
    }
    visitDoWhileStatement(node) {
        const body = this.visit(node.body);
        const test = this.visit(node.test);
        if (body !== node.body || test !== node.test) return new DoWhileStatement(body, test);
        return node;
    }
    visitDebuggerStatement(node) {
        return node;
    }
    visitEmptyStatement(node) {
        return node;
    }
    visitExportAllDeclaration(node) {
        const source = this.visit(node.source);
        const exported = this.visit(node.exported);
        const assertions = this.visitNodeList(node.assertions);
        if (source !== node.source || exported !== node.exported || assertions !== node.assertions) return new ExportAllDeclaration(source, exported, assertions);
        return node;
    }
    visitExportDefaultDeclaration(node) {
        const declaration = this.visit(node.declaration);
        if (declaration !== node.declaration) return new ExportDefaultDeclaration(declaration);
        return node;
    }
    visitExportNamedDeclaration(node) {
        const declaration = this.visit(node.declaration);
        const specifiers = this.visitNodeList(node.specifiers);
        const source = this.visit(node.source);
        const assertions = this.visitNodeList(node.assertions);
        if (declaration !== node.declaration || specifiers !== node.specifiers || source !== node.source || assertions !== node.assertions) return new ExportNamedDeclaration(declaration, specifiers, source, assertions);
        return node;
    }
    visitExportSpecifier(node) {
        const exported = this.visit(node.exported);
        const local = this.visit(node.local);
        if (exported !== node.exported || local !== node.local) return new ExportSpecifier(exported, local);
        return node;
    }
    visitExpressionStatement(node) {
        const expression = this.visit(node.expression);
        if (expression !== node.expression) return new ExpressionStatement(expression);
        return node;
    }
    visitForStatement(node) {
        const init = this.visit(node.init);
        const test = this.visit(node.test);
        const update = this.visit(node.update);
        const body = this.visit(node.body);
        if (init !== node.init || test !== node.test || update !== node.update || body !== node.body) return new ForStatement(init, test, update, body);
        return node;
    }
    visitForOfStatement(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        const body = this.visit(node.body);
        if (left !== node.left || right !== node.right || body !== node.body) return new ForOfStatement(left, right, body, node.await);
        return node;
    }
    visitForInStatement(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        const body = this.visit(node.body);
        if (left !== node.left || right !== node.right || body !== node.body) return new ForInStatement(left, right, body);
        return node;
    }
    visitFunctionDeclaration(node) {
        const id = this.visit(node.id);
        const params = this.visitNodeList(node.params);
        const body = this.visit(node.body);
        if (id !== node.id || params !== node.params || body !== node.body) return new FunctionDeclaration(id, params, body, node.generator);
        return node;
    }
    visitFunctionExpression(node) {
        const id = this.visit(node.id);
        const params = this.visitNodeList(node.params);
        const body = this.visit(node.body);
        if (id !== node.id || params !== node.params || body !== node.body) return new FunctionExpression(id, params, body, node.generator, node.async);
        return node;
    }
    visitIdentifier(node) {
        return node;
    }
    visitIfStatement(node) {
        const test = this.visit(node.test);
        const consequent = this.visit(node.consequent);
        const alternate = this.visit(node.alternate);
        if (test !== node.test || consequent !== node.consequent || alternate !== node.alternate) return new IfStatement(test, consequent, alternate);
        return node;
    }
    visitImportAttribute(node) {
        const key = this.visit(node.key);
        const value = this.visit(node.value);
        if (key !== node.key || value !== node.value) return new ImportAttribute(key, value);
        return node;
    }
    visitImportExpression(node) {
        const source = this.visit(node.source);
        const attributes = this.visit(node.attributes);
        if (source !== node.source || attributes !== node.attributes) return new ImportExpression(source, attributes);
        return node;
    }
    visitImportDeclaration(node) {
        const specifiers = this.visitNodeList(node.specifiers);
        const source = this.visit(node.source);
        const assertions = this.visitNodeList(node.assertions);
        if (specifiers !== node.specifiers || source !== node.source || assertions !== node.assertions) return new ImportDeclaration(specifiers, source, assertions);
        return node;
    }
    visitImportDefaultSpecifier(node) {
        const local = this.visit(node.local);
        if (local !== node.local) return new ImportDefaultSpecifier(local);
        return node;
    }
    visitImportNamespaceSpecifier(node) {
        const local = this.visit(node.local);
        if (local !== node.local) return new ImportNamespaceSpecifier(local);
        return node;
    }
    visitImportSpecifier(node) {
        const local = this.visit(node.local);
        const imported = this.visit(node.imported);
        if (local !== node.local || imported !== node.imported) return new ImportSpecifier(local, imported);
        return node;
    }
    visitLiteral(node) {
        return node;
    }
    visitLabeledStatement(node) {
        const label = this.visit(node.label);
        const body = this.visit(node.body);
        if (label !== node.label || body !== node.body) return new LabeledStatement(label, body);
        return node;
    }
    visitLogicalExpression(node) {
        const left = this.visit(node.left);
        const right = this.visit(node.right);
        if (left !== node.left || right !== node.right) return new LogicalExpression(node.operator, left, right);
        return node;
    }
    visitMemberExpression(node) {
        const _object = this.visit(node.object);
        const property = this.visit(node.property);
        if (_object !== node.object || property !== node.property) return new MemberExpression(node.computed, _object, property, node.optional);
        return node;
    }
    visitMetaProperty(node) {
        const meta = this.visit(node.meta);
        const property = this.visit(node.property);
        if (meta !== node.meta || property !== node.property) return new MetaProperty(meta, property);
        return node;
    }
    visitMethodDefinition(node) {
        const key = this.visit(node.key);
        const value = this.visit(node.value);
        const decorators = this.visitNodeList(node.decorators);
        if (key !== node.key || value !== node.value || decorators !== node.decorators) return new MethodDefinition(key, node.computed, value, node.kind, node.static, decorators);
        return node;
    }
    visitNewExpression(node) {
        const callee = this.visit(node.callee);
        const args = this.visitNodeList(node.arguments);
        if (callee !== node.callee || args !== node.arguments) return new NewExpression(callee, args);
        return node;
    }
    visitObjectExpression(node) {
        const properties = this.visitNodeList(node.properties);
        if (properties !== node.properties) return new ObjectExpression(properties);
        return node;
    }
    visitObjectPattern(node) {
        const properties = this.visitNodeList(node.properties);
        if (properties !== node.properties) return new ObjectPattern(properties);
        return node;
    }
    visitProgram(node) {
        const body = this.visitNodeList(node.body);
        if (body !== node.body) return new Program(node.sourceType, body);
        return node;
    }
    visitProperty(node) {
        const key = this.visit(node.key);
        const value = this.visit(node.value);
        const decorators = this.visitNodeList(node.decorators);
        if (key !== node.key || value !== node.value || decorators !== decorators) {
            if ("kind" in node) return new Property(node.kind, key, node.computed, value, node.method, node.shorthand);
            else return new PropertyDefinition(key, node.computed, value, node.static, decorators);
        }
        return node;
    }
    visitPrivateIdentifier(node) {
        return node;
    }
    visitRestElement(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new RestElement(argument);
        return node;
    }
    visitReturnStatement(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new ReturnStatement(argument);
        return node;
    }
    visitSequenceExpression(node) {
        const expressions = this.visitNodeList(node.expressions);
        if (expressions !== node.expressions) return new SequenceExpression(expressions);
        return node;
    }
    visitSpreadElement(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new SpreadElement(argument);
        return node;
    }
    visitStaticBlock(node) {
        const body = this.visitNodeList(node.body);
        if (body !== node.body) return new StaticBlock(body);
        return node;
    }
    visitSuper(node) {
        return node;
    }
    visitSwitchCase(node) {
        const test = this.visit(node.test);
        const consequent = this.visitNodeList(node.consequent);
        if (test !== node.test || consequent !== node.consequent) return new SwitchCase(test, consequent);
        return node;
    }
    visitSwitchStatement(node) {
        const discriminant = this.visit(node.discriminant);
        const cases = this.visitNodeList(node.cases);
        if (discriminant !== node.discriminant || cases !== node.cases) return new SwitchStatement(discriminant, cases);
        return node;
    }
    visitTaggedTemplateExpression(node) {
        const tag = this.visit(node.tag);
        const quasi = this.visit(node.quasi);
        if (tag !== node.tag || quasi !== node.quasi) return new TaggedTemplateExpression(tag, quasi);
        return node;
    }
    visitTemplateElement(node) {
        return node;
    }
    visitTemplateLiteral(node) {
        const quasis = this.visitNodeList(node.quasis);
        const expressions = this.visitNodeList(node.expressions);
        if (quasis !== node.quasis || expressions !== node.expressions) return new TemplateLiteral(quasis, expressions);
        return node;
    }
    visitThisExpression(node) {
        return node;
    }
    visitThrowStatement(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new ThrowStatement(argument);
        return node;
    }
    visitTryStatement(node) {
        const block = this.visit(node.block);
        const handler = this.visit(node.handler);
        const finalizer = this.visit(node.finalizer);
        if (block !== node.block || handler !== node.handler || finalizer !== node.finalizer) return new TryStatement(block, handler, finalizer);
        return node;
    }
    visitUnaryExpression(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new UnaryExpression(node.operator, argument);
        return node;
    }
    visitUpdateExpression(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new UpdateExpression(node.operator, argument, node.prefix);
        return node;
    }
    visitVariableDeclaration(node) {
        const declarations = this.visitNodeList(node.declarations);
        if (declarations !== node.declarations) return new VariableDeclaration(declarations, node.kind);
        return node;
    }
    visitVariableDeclarator(node) {
        const id = this.visit(node.id);
        const init = this.visit(node.init);
        if (id !== node.id || init !== node.init) return new VariableDeclarator(id, init);
        return node;
    }
    visitWhileStatement(node) {
        const test = this.visit(node.test);
        const body = this.visit(node.body);
        if (test !== node.test || body !== node.body) return new WhileStatement(test, body);
        return node;
    }
    visitWithStatement(node) {
        const _object = this.visit(node.object);
        const body = this.visit(node.body);
        if (_object !== node.object || body !== node.body) return new WithStatement(_object, body);
        return node;
    }
    visitYieldExpression(node) {
        const argument = this.visit(node.argument);
        if (argument !== node.argument) return new YieldExpression(argument, node.delegate);
        return node;
    }
};
// src/esprima.ts
function parse(code, options, delegate) {
    let commentHandler = null;
    const proxyDelegate = (node, metadata)=>{
        if (delegate) delegate(node, metadata);
        if (commentHandler) commentHandler.visit(node, metadata);
    };
    let parserDelegate = typeof delegate === "function" ? proxyDelegate : null;
    let collectComment = false;
    if (options) {
        collectComment = typeof options.comment === "boolean" && options.comment;
        const attachComment = typeof options.attachComment === "boolean" && options.attachComment;
        if (collectComment || attachComment) {
            commentHandler = new CommentHandler();
            commentHandler.attach = attachComment;
            options.comment = true;
            parserDelegate = proxyDelegate;
        }
    }
    let isModule = false;
    if (options && typeof options.sourceType === "string") isModule = options.sourceType === "module";
    let parser;
    if (options && typeof options.jsx === "boolean" && options.jsx) parser = new JSXParser(code, options, parserDelegate);
    else parser = new Parser(code, options, parserDelegate);
    const program = isModule ? parser.parseModule() : parser.parseScript();
    const ast = program;
    if (collectComment && commentHandler) ast.comments = commentHandler.comments;
    if (parser.config.tokens) ast.tokens = parser.tokens;
    if (parser.config.tolerant) ast.errors = parser.errorHandler.errors;
    return ast;
}
function parseModule(code, options, delegate) {
    const parsingOptions = options || {};
    parsingOptions.sourceType = "module";
    return parse(code, parsingOptions, delegate);
}
function parseScript(code, options, delegate) {
    const parsingOptions = options || {};
    parsingOptions.sourceType = "script";
    return parse(code, parsingOptions, delegate);
}
function tokenize(code, options, delegate) {
    const tokenizer = new Tokenizer(code, options);
    const tokens = [];
    try {
        while(true){
            let token = tokenizer.getNextToken();
            if (!token) break;
            if (delegate) token = delegate(token);
            tokens.push(token);
        }
    } catch (e) {
        tokenizer.errorHandler.tolerate(e);
    }
    if (tokenizer.errorHandler.tolerant) tokens.errors = tokenizer.errors();
    return tokens;
}
var version = "6.0.3";
var esprima_default = {
    parse,
    parseModule,
    parseScript,
    tokenize,
    Syntax,
    version
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["8wwSb","7Oq6l"], "7Oq6l", "parcelRequire94c2")

//# sourceMappingURL=index.0ff99339.js.map
