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
})({"3zE8I":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "f6aff517bda4fd5c";
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

},{}],"1wUoi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Conversation", ()=>Conversation);
parcelHelpers.export(exports, "ChatManager", ()=>ChatManager);
parcelHelpers.export(exports, "writeFile", ()=>writeFile);
parcelHelpers.export(exports, "readFile", ()=>readFile);
parcelHelpers.export(exports, "renderConversationUI", ()=>renderConversationUI);
parcelHelpers.export(exports, "handleCodeAction", ()=>handleCodeAction);
parcelHelpers.export(exports, "getModelsList", ()=>getModelsList);
var _marked = require("marked");
class Conversation {
    constructor(targetCodeFile, model = 'gpt-3.5'){
        this.title = 'New conversation';
        this.targetCodeFile = targetCodeFile;
        this.model = model;
        this.messages = [];
        this.lastModified = Date.now();
        this.id = this.generateUUID();
    }
    addMessage(role, content) {
        this.messages.push({
            role,
            content
        });
        this.lastModified = Date.now();
        this.save();
    }
    toJSON() {
        return {
            title: this.title,
            id: this.id,
            targetCodeFile: this.targetCodeFile,
            model: this.model,
            messages: this.messages,
            lastModified: this.lastModified
        };
    }
    async save() {
        const key = `conversation_${this.id}.json`;
        await writeFile(key, this.toJSON());
        await writeFile('lastConversation.id', this.id);
    }
    async load(id) {
        const key = `conversation_${id}.json`;
        const data = await readFile(key);
        if (!data) return null;
        const conv = new Conversation(data.targetCodeFile, data.model || 'gpt-3.5');
        conv.title = data.title;
        conv.id = data.id;
        conv.messages = data.messages;
        conv.lastModified = data.lastModified;
        return conv;
    }
    async listConversations() {
        const keys = Object.keys(localStorage).filter((k)=>k.startsWith('conversation_'));
        const conversations = await Promise.all(keys.map(async (key)=>{
            const data = await readFile(key);
            return {
                id: data.id,
                title: data.title || 'Untitled Conversation'
            };
        }));
        return conversations;
    }
    setModel(modelName) {
        this.model = modelName;
        this.lastModified = Date.now();
        this.save();
    }
    generateUUID() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c)=>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
}
class ChatManager {
    async setTargetFile(targetFile) {
        this.targetFileInput.value = targetFile;
        ctx.targetFile = targetFile;
        return this.displayStubs();
    }
    async loadConversationsList() {
        const conversations = await readFile('./conversationsList.json');
    }
    async addMessage(content) {
        const message = {
            role: 'user',
            content: content
        };
        await this.addMessageToChat(message);
    }
    async writeConversation(conversationId, conversationData) {
        await writeFile(`conversation_${conversationId}.json`, conversationData);
        //Update last conversation ID after writing the conversation
        writeFile(this.lastConversationIdKey, conversationId);
    }
    async loadConversation(conversationId) {
        const conversationToLoad = await readFile(`conversation_${conversationId}.json`);
        if (conversationToLoad) {
            this.chatMessageDiv.innerHTML = '';
            const conversationMessages = conversationToLoad.messages;
            conversationMessages.forEach((message)=>{
                this.addMessageToChat(message);
            });
            this.modelPicker.value = conversationToLoad.model || this.modelPicker.value;
            this.conversationPicker.value = conversationId;
            const titleElement = document.getElementById('conversation-title');
            if (titleElement) titleElement.textContent = conversationToLoad.title;
        } else console.error(`Failed to load conversation: ${conversationId}`);
    }
    async submitButtonHandler() {
        if (this.userInput.value !== '') {
            await this.addMessage(this.userInput.value);
            this.userInput.value = '';
        }
        await this.callLLM();
    }
    constructor(){
        this.lastConversationIdKey = 'lastConversationId';
        this.newConversationBtn = null;
        this.conversationPicker = null;
        this.userInput = null;
        this.chatMessageDiv = null;
        this.modelPicker = null;
        this.init();
    }
    init() {}
    async loadLastConversation() {
        const lastConversationId = await readFile('lastConversation.id');
        if (lastConversationId) {
            await this.loadConversation(lastConversationId);
            this.conversationPicker.value = lastConversationId;
        }
    }
    setupNewConversationButton() {
        this.newConversationBtn.addEventListener('click', async ()=>{
            const newConversation = new Conversation('Default Chat');
            await newConversation.save();
            await this.saveLastConversationId(newConversation.id);
            await this.loadConversation(newConversation.id);
        });
    }
    async setupConversationPicker() {
        this.conversationPicker.addEventListener('change', async ()=>{
            const conversationId = this.conversationPicker.value;
            await this.loadConversation(conversationId);
            if (conversationId) this.loadConversation(conversationId);
            else console.warn('No conversation selected for loading.');
        });
        await this.populateConversationPicker();
    }
    async populateConversationPicker() {
        const conversations = await this.listConversations();
        this.conversationPicker.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Select Conversation';
        this.conversationPicker.add(defaultOption);
        if (conversations.length === 0) {
            console.warn('No conversations available.');
            return;
        }
        conversations.forEach(({ id, title })=>{
            const option = document.createElement('option');
            option.value = id;
            option.text = title;
            this.conversationPicker.add(option);
        });
        if (this.conversationPicker.value === '') this.conversationPicker.value = conversations[0].id;
    }
    async saveLastConversationId(conversationId) {
        await writeFile('lastConversation.id', conversationId);
    }
    async addMessageToChat(message) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.role}`;
        const markdown = (0, _marked.marked).parse(message.content);
        const rendered = document.createElement('div');
        rendered.innerHTML = markdown;
        rendered.querySelectorAll('pre code').forEach((codeEl, codeIdx)=>{
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';
            // Create toolbar for actions related to the code snippet
            const toolbar = document.createElement('div');
            toolbar.className = 'code-toolbar';
            const useButton = document.createElement('button');
            useButton.textContent = "\uD83D\uDCA1 Use This";
            useButton.onclick = ()=>this.handleCodeAction(codeEl.textContent, {
                    msgIndex: message.index,
                    // You may need to retrieve the correct index
                    codeIndex: codeIdx
                });
            const copyButton = document.createElement('button');
            copyButton.textContent = "\uD83D\uDCCB Copy";
            copyButton.onclick = ()=>{
                navigator.clipboard.writeText(codeEl.textContent).then(()=>alert('Code copied to clipboard!')).catch((err)=>console.error('Failed to copy: ', err));
            };
            toolbar.appendChild(useButton);
            toolbar.appendChild(copyButton);
            wrapper.appendChild(toolbar);
            wrapper.appendChild(codeEl.parentElement.cloneNode(true));
            codeEl.parentElement.replaceWith(wrapper);
        });
        messageEl.appendChild(rendered);
        this.chatMessageDiv.appendChild(messageEl);
    }
    async validateElements() {
        if (!this.newConversationBtn) throw new Error('newConversationBtn is not initialized. Ensure the DOM element exists.');
        if (!this.conversationPicker) throw new Error('conversationPicker is not initialized. Ensure the DOM element exists.');
        if (!this.userInput) throw new Error('userInput is not initialized. Ensure the DOM element exists.');
        if (!this.chatMessageDiv) throw new Error('chatMessageDiv (chat-ui) is not initialized. Ensure the DOM element exists.');
    }
    init() {
        document.body.innerHTML = '';
        const controls = document.createElement('div');
        controls.className = 'conversation-controls';
        this.newConversationBtn = document.createElement('button');
        this.newConversationBtn.id = 'new-conversation-btn';
        this.newConversationBtn.textContent = 'New Conversation';
        this.conversationPicker = document.createElement('select');
        this.conversationPicker.id = 'conversation-picker';
        controls.appendChild(this.newConversationBtn);
        controls.appendChild(this.conversationPicker);
        document.body.appendChild(controls);
        const titleDiv = document.createElement('div');
        titleDiv.id = 'conversation-title';
        titleDiv.className = 'conversation-title';
        document.body.appendChild(titleDiv);
        this.chatMessageDiv = document.createElement('div');
        this.chatMessageDiv.id = 'chat-ui';
        this.chatMessageDiv.classList.add('dark-mode');
        document.body.appendChild(this.chatMessageDiv);
        const inputArea = document.createElement('div');
        inputArea.id = 'input-area';
        this.userInput = document.createElement('textarea');
        this.userInput.id = 'user-input';
        this.userInput.rows = 3;
        this.userInput.placeholder = 'Type your message...';
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        this.modelPicker = document.createElement('select');
        this.modelPicker.id = 'model-select';
        const spacer = document.createElement('div');
        spacer.className = 'flex-spacer';
        const sendBtn = document.createElement('button');
        sendBtn.id = 'send-btn';
        sendBtn.textContent = 'Send';
        inputRow.appendChild(this.modelPicker);
        inputRow.appendChild(spacer);
        inputRow.appendChild(sendBtn);
        inputArea.appendChild(this.userInput);
        inputArea.appendChild(inputRow);
        document.body.appendChild(inputArea);
        this.addEventListeners(sendBtn);
        this.validateElements();
        this.loadLastConversation();
        this.setupNewConversationButton();
        this.setupConversationPicker();
        this.populateConversationPicker();
        // Call to populate initial conversation options
        getModelsList();
    }
    addEventListeners(sendBtn) {
        sendBtn.addEventListener('click', async ()=>{
            await this.submitButtonHandler();
        });
        this.newConversationBtn.addEventListener('click', async ()=>{
            const newConversation = new Conversation('Default Chat');
            await newConversation.save();
            await this.saveLastConversationId(newConversation.id);
            await this.loadConversation(newConversation.id);
        });
        this.conversationPicker.addEventListener('change', async ()=>{
            const conversationId = this.conversationPicker.value;
            await this.loadConversation(conversationId);
        });
        this.modelPicker.addEventListener('change', ()=>{
            this.setModel(this.modelPicker.value);
        });
    }
    async listConversations() {
        const keys = Object.keys(localStorage).filter((k)=>k.startsWith('conversation_'));
        const conversations = await Promise.all(keys.map(async (key)=>{
            const data = await readFile(key);
            return {
                id: data.id,
                title: data.title || 'Untitled Conversation'
            };
        }));
        return conversations;
    }
    setModel(modelName) {
        this.model = modelName;
        this.lastModified = Date.now();
        this.save();
    }
    // Define callLLM method
    async callLLM() {
        this.writeConversation(this.conversationPicker.value, this.conversation);
        console.log('Calling LLM with current message.');
    }
    handleCodeAction(code, { msgIndex, codeIndex }) {
        console.log('Code Action Triggered:', {
            code,
            msgIndex,
            codeIndex
        });
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM fully loaded and parsed');
    new ChatManager();
});
async function writeFile(fileName, content) {
    try {
        localStorage.setItem(fileName, JSON.stringify(content));
    } catch (error) {
        console.error('Error writing to local storage:', error);
    }
}
async function readFile(fileName) {
    try {
        const value = localStorage.getItem(fileName);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error reading from local storage:', error);
        return null;
    }
}
const conversation = new Conversation('Default Chat', '/path/to/file.js');
function renderConversationUI(conversation, onCodeAction) {
    chatUI.innerHTML = '';
    conversation.messages.forEach((msg, index)=>{
        const msgEl = document.createElement('div');
        msgEl.className = `message ${msg.role}`;
        const markdown = (0, _marked.marked).parse(msg.content);
        const rendered = document.createElement('div');
        rendered.innerHTML = markdown;
        rendered.querySelectorAll('pre code').forEach((codeEl, codeIdx)=>{
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';
            const btn = document.createElement('button');
            btn.textContent = "\uD83D\uDCA1 Use This";
            btn.onclick = ()=>{
                onCodeAction(codeEl.textContent, {
                    msgIndex: index,
                    codeIndex: codeIdx
                });
            };
            wrapper.appendChild(btn);
            wrapper.appendChild(codeEl.parentElement.cloneNode(true));
            codeEl.parentElement.replaceWith(wrapper);
        });
        msgEl.appendChild(rendered);
        chatUI.appendChild(msgEl);
    });
    chatUI.scrollTop = chatUI.scrollHeight;
}
function handleCodeAction(code, { msgIndex, codeIndex }) {
    console.log('Code Action Triggered:', {
        code,
        msgIndex,
        codeIndex
    });
}
function getModelsList() {
    const availableModels = [
        {
            value: 'gpt-3.5',
            label: 'GPT-3.5'
        },
        {
            value: 'gpt-4',
            label: 'GPT-4'
        },
        {
            value: 'mixtral',
            label: 'Mixtral'
        },
        {
            value: 'llama3',
            label: 'LLaMA 3'
        }
    ];
    const modelSelect = document.getElementById('model-select');
    // Populate model dropdown
    availableModels.forEach(({ value, label })=>{
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        modelSelect.appendChild(option);
    });
}

},{"marked":"4duqf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4duqf":[function(require,module,exports,__globalThis) {
/**
 * marked v15.0.8 - a markdown parser
 * Copyright (c) 2011-2025, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */ /**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */ (function(global, factory) {
    factory(exports);
})(this, function(exports1) {
    'use strict';
    /**
     * Gets the original marked default options.
     */ function _getDefaults() {
        return {
            async: false,
            breaks: false,
            extensions: null,
            gfm: true,
            hooks: null,
            pedantic: false,
            renderer: null,
            silent: false,
            tokenizer: null,
            walkTokens: null
        };
    }
    exports1.defaults = _getDefaults();
    function changeDefaults(newDefaults) {
        exports1.defaults = newDefaults;
    }
    const noopTest = {
        exec: ()=>null
    };
    function edit(regex, opt = '') {
        let source = typeof regex === 'string' ? regex : regex.source;
        const obj = {
            replace: (name, val)=>{
                let valSource = typeof val === 'string' ? val : val.source;
                valSource = valSource.replace(other.caret, '$1');
                source = source.replace(name, valSource);
                return obj;
            },
            getRegex: ()=>{
                return new RegExp(source, opt);
            }
        };
        return obj;
    }
    const other = {
        codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
        outputLinkReplace: /\\([\[\]])/g,
        indentCodeCompensation: /^(\s+)(?:```)/,
        beginningSpace: /^\s+/,
        endingHash: /#$/,
        startingSpaceChar: /^ /,
        endingSpaceChar: / $/,
        nonSpaceChar: /[^ ]/,
        newLineCharGlobal: /\n/g,
        tabCharGlobal: /\t/g,
        multipleSpaceGlobal: /\s+/g,
        blankLine: /^[ \t]*$/,
        doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
        blockquoteStart: /^ {0,3}>/,
        blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
        listReplaceTabs: /^\t+/,
        listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
        listIsTask: /^\[[ xX]\] /,
        listReplaceTask: /^\[[ xX]\] +/,
        anyLine: /\n.*\n/,
        hrefBrackets: /^<(.*)>$/,
        tableDelimiter: /[:|]/,
        tableAlignChars: /^\||\| *$/g,
        tableRowBlankLine: /\n[ \t]*$/,
        tableAlignRight: /^ *-+: *$/,
        tableAlignCenter: /^ *:-+: *$/,
        tableAlignLeft: /^ *:-+ *$/,
        startATag: /^<a /i,
        endATag: /^<\/a>/i,
        startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
        endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
        startAngleBracket: /^</,
        endAngleBracket: />$/,
        pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
        unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
        escapeTest: /[&<>"']/,
        escapeReplace: /[&<>"']/g,
        escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
        unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
        caret: /(^|[^\[])\^/g,
        percentDecode: /%25/g,
        findPipe: /\|/g,
        splitPipe: / \|/,
        slashPipe: /\\\|/g,
        carriageReturn: /\r\n|\r/g,
        spaceLine: /^ +$/gm,
        notSpaceStart: /^\S*/,
        endingNewline: /\n$/,
        listItemRegex: (bull)=>new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`),
        nextBulletRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
        hrRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
        fencesBeginRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
        headingBeginRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
        htmlBeginRegex: (indent)=>new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, 'i')
    };
    /**
     * Block-Level Grammar
     */ const newline = /^(?:[ \t]*(?:\n|$))+/;
    const blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
    const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
    const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
    const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
    const bullet = /(?:[*+-]|\d{1,9}[.)])/;
    const lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
    const lheading = edit(lheadingCore).replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    .replace(/\|table/g, '') // table not in commonmark
    .getRegex();
    const lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    .replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/) // table can interrupt
    .getRegex();
    const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
    const blockText = /^[^\n]+/;
    const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
    const def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace('label', _blockLabel).replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
    const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
    const _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
    const _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
    const html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", 'i').replace('comment', _comment).replace('tag', _tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
    const paragraph = edit(_paragraph).replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
    .replace('|table', '').replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // pars can be interrupted by type (6) html blocks
    .getRegex();
    const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace('paragraph', paragraph).getRegex();
    /**
     * Normal Block Grammar
     */ const blockNormal = {
        blockquote,
        code: blockCode,
        def,
        fences,
        heading,
        hr,
        html,
        lheading,
        list,
        newline,
        paragraph,
        table: noopTest,
        text: blockText
    };
    /**
     * GFM Block Grammar
     */ const gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)") // Cells
    .replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('blockquote', ' {0,3}>').replace('code', '(?: {4}| {0,3}\t)[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // tables can be interrupted by type (6) html blocks
    .getRegex();
    const blockGfm = {
        ...blockNormal,
        lheading: lheadingGfm,
        table: gfmTable,
        paragraph: edit(_paragraph).replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
        .replace('table', gfmTable) // interrupt paragraphs with table
        .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // pars can be interrupted by type (6) html blocks
        .getRegex()
    };
    /**
     * Pedantic grammar (original John Gruber's loose markdown specification)
     */ const blockPedantic = {
        ...blockNormal,
        html: edit("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace('comment', _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: noopTest,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: edit(_paragraph).replace('hr', hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', lheading).replace('|table', '').replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').replace('|tag', '').getRegex()
    };
    /**
     * Inline-Level Grammar
     */ const escape$1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
    const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
    const br = /^( {2,}|\\)\n(?!\s*$)/;
    const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
    // list of unicode punctuation marks, plus any missing characters from CommonMark spec
    const _punctuation = /[\p{P}\p{S}]/u;
    const _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
    const _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
    const punctuation = edit(/^((?![*_])punctSpace)/, 'u').replace(/punctSpace/g, _punctuationOrSpace).getRegex();
    // GFM allows ~ inside strong and em for strikethrough
    const _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
    const _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
    const _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
    // sequences em should skip over [title](link), `code`, <html>
    const blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
    const emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
    const emStrongLDelim = edit(emStrongLDelimCore, 'u').replace(/punct/g, _punctuation).getRegex();
    const emStrongLDelimGfm = edit(emStrongLDelimCore, 'u').replace(/punct/g, _punctuationGfmStrongEm).getRegex();
    const emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)"; // (6) a***a can be either Left or Right Delimiter
    const emStrongRDelimAst = edit(emStrongRDelimAstCore, 'gu').replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
    const emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, 'gu').replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
    // (6) Not allowed for _
    const emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", 'gu') // (5) #___# can be either Left or Right Delimiter
    .replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
    const anyPunctuation = edit(/\\(punct)/, 'gu').replace(/punct/g, _punctuation).getRegex();
    const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace('email', /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
    const _inlineComment = edit(_comment).replace('(?:-->|$)', '-->').getRegex();
    const tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>") // CDATA section
    .replace('comment', _inlineComment).replace('attribute', /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
    const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    const link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace('label', _inlineLabel).replace('href', /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
    const reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace('label', _inlineLabel).replace('ref', _blockLabel).getRegex();
    const nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace('ref', _blockLabel).getRegex();
    const reflinkSearch = edit('reflink|nolink(?!\\()', 'g').replace('reflink', reflink).replace('nolink', nolink).getRegex();
    /**
     * Normal Inline Grammar
     */ const inlineNormal = {
        _backpedal: noopTest,
        anyPunctuation,
        autolink,
        blockSkip,
        br,
        code: inlineCode,
        del: noopTest,
        emStrongLDelim,
        emStrongRDelimAst,
        emStrongRDelimUnd,
        escape: escape$1,
        link,
        nolink,
        punctuation,
        reflink,
        reflinkSearch,
        tag,
        text: inlineText,
        url: noopTest
    };
    /**
     * Pedantic Inline Grammar
     */ const inlinePedantic = {
        ...inlineNormal,
        link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', _inlineLabel).getRegex(),
        reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', _inlineLabel).getRegex()
    };
    /**
     * GFM Inline Grammar
     */ const inlineGfm = {
        ...inlineNormal,
        emStrongRDelimAst: emStrongRDelimAstGfm,
        emStrongLDelim: emStrongLDelimGfm,
        url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i').replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    };
    /**
     * GFM + Line Breaks Inline Grammar
     */ const inlineBreaks = {
        ...inlineGfm,
        br: edit(br).replace('{2,}', '*').getRegex(),
        text: edit(inlineGfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
    };
    /**
     * exports
     */ const block = {
        normal: blockNormal,
        gfm: blockGfm,
        pedantic: blockPedantic
    };
    const inline = {
        normal: inlineNormal,
        gfm: inlineGfm,
        breaks: inlineBreaks,
        pedantic: inlinePedantic
    };
    /**
     * Helpers
     */ const escapeReplacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    const getEscapeReplacement = (ch)=>escapeReplacements[ch];
    function escape(html, encode) {
        if (encode) {
            if (other.escapeTest.test(html)) return html.replace(other.escapeReplace, getEscapeReplacement);
        } else {
            if (other.escapeTestNoEncode.test(html)) return html.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
        }
        return html;
    }
    function cleanUrl(href) {
        try {
            href = encodeURI(href).replace(other.percentDecode, '%');
        } catch  {
            return null;
        }
        return href;
    }
    function splitCells(tableRow, count) {
        // ensure that every cell-delimiting pipe has a space
        // before it to distinguish it from an escaped pipe
        const row = tableRow.replace(other.findPipe, (match, offset, str)=>{
            let escaped = false;
            let curr = offset;
            while(--curr >= 0 && str[curr] === '\\')escaped = !escaped;
            if (escaped) // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
            else // add space before unescaped |
            return ' |';
        }), cells = row.split(other.splitPipe);
        let i = 0;
        // First/last cell in a row cannot be empty if it has no leading/trailing pipe
        if (!cells[0].trim()) cells.shift();
        if (cells.length > 0 && !cells.at(-1)?.trim()) cells.pop();
        if (count) {
            if (cells.length > count) cells.splice(count);
            else while(cells.length < count)cells.push('');
        }
        for(; i < cells.length; i++)// leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(other.slashPipe, '|');
        return cells;
    }
    /**
     * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
     * /c*$/ is vulnerable to REDOS.
     *
     * @param str
     * @param c
     * @param invert Remove suffix of non-c chars instead. Default falsey.
     */ function rtrim(str, c, invert) {
        const l = str.length;
        if (l === 0) return '';
        // Length of suffix matching the invert condition.
        let suffLen = 0;
        // Step left until we fail to match the invert condition.
        while(suffLen < l){
            const currChar = str.charAt(l - suffLen - 1);
            if (currChar === c && true) suffLen++;
            else break;
        }
        return str.slice(0, l - suffLen);
    }
    function findClosingBracket(str, b) {
        if (str.indexOf(b[1]) === -1) return -1;
        let level = 0;
        for(let i = 0; i < str.length; i++){
            if (str[i] === '\\') i++;
            else if (str[i] === b[0]) level++;
            else if (str[i] === b[1]) {
                level--;
                if (level < 0) return i;
            }
        }
        return -1;
    }
    function outputLink(cap, link, raw, lexer, rules) {
        const href = link.href;
        const title = link.title || null;
        const text = cap[1].replace(rules.other.outputLinkReplace, '$1');
        if (cap[0].charAt(0) !== '!') {
            lexer.state.inLink = true;
            const token = {
                type: 'link',
                raw,
                href,
                title,
                text,
                tokens: lexer.inlineTokens(text)
            };
            lexer.state.inLink = false;
            return token;
        }
        return {
            type: 'image',
            raw,
            href,
            title,
            text
        };
    }
    function indentCodeCompensation(raw, text, rules) {
        const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
        if (matchIndentToCode === null) return text;
        const indentToCode = matchIndentToCode[1];
        return text.split('\n').map((node)=>{
            const matchIndentInNode = node.match(rules.other.beginningSpace);
            if (matchIndentInNode === null) return node;
            const [indentInNode] = matchIndentInNode;
            if (indentInNode.length >= indentToCode.length) return node.slice(indentToCode.length);
            return node;
        }).join('\n');
    }
    /**
     * Tokenizer
     */ class _Tokenizer {
        options;
        rules;
        lexer;
        constructor(options){
            this.options = options || exports1.defaults;
        }
        space(src) {
            const cap = this.rules.block.newline.exec(src);
            if (cap && cap[0].length > 0) return {
                type: 'space',
                raw: cap[0]
            };
        }
        code(src) {
            const cap = this.rules.block.code.exec(src);
            if (cap) {
                const text = cap[0].replace(this.rules.other.codeRemoveIndent, '');
                return {
                    type: 'code',
                    raw: cap[0],
                    codeBlockStyle: 'indented',
                    text: !this.options.pedantic ? rtrim(text, '\n') : text
                };
            }
        }
        fences(src) {
            const cap = this.rules.block.fences.exec(src);
            if (cap) {
                const raw = cap[0];
                const text = indentCodeCompensation(raw, cap[3] || '', this.rules);
                return {
                    type: 'code',
                    raw,
                    lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : cap[2],
                    text
                };
            }
        }
        heading(src) {
            const cap = this.rules.block.heading.exec(src);
            if (cap) {
                let text = cap[2].trim();
                // remove trailing #s
                if (this.rules.other.endingHash.test(text)) {
                    const trimmed = rtrim(text, '#');
                    if (this.options.pedantic) text = trimmed.trim();
                    else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) // CommonMark requires space before trailing #s
                    text = trimmed.trim();
                }
                return {
                    type: 'heading',
                    raw: cap[0],
                    depth: cap[1].length,
                    text,
                    tokens: this.lexer.inline(text)
                };
            }
        }
        hr(src) {
            const cap = this.rules.block.hr.exec(src);
            if (cap) return {
                type: 'hr',
                raw: rtrim(cap[0], '\n')
            };
        }
        blockquote(src) {
            const cap = this.rules.block.blockquote.exec(src);
            if (cap) {
                let lines = rtrim(cap[0], '\n').split('\n');
                let raw = '';
                let text = '';
                const tokens = [];
                while(lines.length > 0){
                    let inBlockquote = false;
                    const currentLines = [];
                    let i;
                    for(i = 0; i < lines.length; i++){
                        // get lines up to a continuation
                        if (this.rules.other.blockquoteStart.test(lines[i])) {
                            currentLines.push(lines[i]);
                            inBlockquote = true;
                        } else if (!inBlockquote) currentLines.push(lines[i]);
                        else break;
                    }
                    lines = lines.slice(i);
                    const currentRaw = currentLines.join('\n');
                    const currentText = currentRaw// precede setext continuation with 4 spaces so it isn't a setext
                    .replace(this.rules.other.blockquoteSetextReplace, '\n    $1').replace(this.rules.other.blockquoteSetextReplace2, '');
                    raw = raw ? `${raw}\n${currentRaw}` : currentRaw;
                    text = text ? `${text}\n${currentText}` : currentText;
                    // parse blockquote lines as top level tokens
                    // merge paragraphs if this is a continuation
                    const top = this.lexer.state.top;
                    this.lexer.state.top = true;
                    this.lexer.blockTokens(currentText, tokens, true);
                    this.lexer.state.top = top;
                    // if there is no continuation then we are done
                    if (lines.length === 0) break;
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'code') break;
                    else if (lastToken?.type === 'blockquote') {
                        // include continuation in nested blockquote
                        const oldToken = lastToken;
                        const newText = oldToken.raw + '\n' + lines.join('\n');
                        const newToken = this.blockquote(newText);
                        tokens[tokens.length - 1] = newToken;
                        raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
                        text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
                        break;
                    } else if (lastToken?.type === 'list') {
                        // include continuation in nested list
                        const oldToken = lastToken;
                        const newText = oldToken.raw + '\n' + lines.join('\n');
                        const newToken = this.list(newText);
                        tokens[tokens.length - 1] = newToken;
                        raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
                        text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
                        lines = newText.substring(tokens.at(-1).raw.length).split('\n');
                        continue;
                    }
                }
                return {
                    type: 'blockquote',
                    raw,
                    tokens,
                    text
                };
            }
        }
        list(src) {
            let cap = this.rules.block.list.exec(src);
            if (cap) {
                let bull = cap[1].trim();
                const isordered = bull.length > 1;
                const list = {
                    type: 'list',
                    raw: '',
                    ordered: isordered,
                    start: isordered ? +bull.slice(0, -1) : '',
                    loose: false,
                    items: []
                };
                bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
                if (this.options.pedantic) bull = isordered ? bull : '[*+-]';
                // Get next list item
                const itemRegex = this.rules.other.listItemRegex(bull);
                let endsWithBlankLine = false;
                // Check if current bullet point can start a new List Item
                while(src){
                    let endEarly = false;
                    let raw = '';
                    let itemContents = '';
                    if (!(cap = itemRegex.exec(src))) break;
                    if (this.rules.block.hr.test(src)) break;
                    raw = cap[0];
                    src = src.substring(raw.length);
                    let line = cap[2].split('\n', 1)[0].replace(this.rules.other.listReplaceTabs, (t)=>' '.repeat(3 * t.length));
                    let nextLine = src.split('\n', 1)[0];
                    let blankLine = !line.trim();
                    let indent = 0;
                    if (this.options.pedantic) {
                        indent = 2;
                        itemContents = line.trimStart();
                    } else if (blankLine) indent = cap[1].length + 1;
                    else {
                        indent = cap[2].search(this.rules.other.nonSpaceChar); // Find first non-space char
                        indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
                        itemContents = line.slice(indent);
                        indent += cap[1].length;
                    }
                    if (blankLine && this.rules.other.blankLine.test(nextLine)) {
                        raw += nextLine + '\n';
                        src = src.substring(nextLine.length + 1);
                        endEarly = true;
                    }
                    if (!endEarly) {
                        const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
                        const hrRegex = this.rules.other.hrRegex(indent);
                        const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
                        const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
                        const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
                        // Check if following lines should be included in List Item
                        while(src){
                            const rawLine = src.split('\n', 1)[0];
                            let nextLineWithoutTabs;
                            nextLine = rawLine;
                            // Re-align to follow commonmark nesting rules
                            if (this.options.pedantic) {
                                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, '  ');
                                nextLineWithoutTabs = nextLine;
                            } else nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, '    ');
                            // End list item if found code fences
                            if (fencesBeginRegex.test(nextLine)) break;
                            // End list item if found start of new heading
                            if (headingBeginRegex.test(nextLine)) break;
                            // End list item if found start of html block
                            if (htmlBeginRegex.test(nextLine)) break;
                            // End list item if found start of new bullet
                            if (nextBulletRegex.test(nextLine)) break;
                            // Horizontal rule found
                            if (hrRegex.test(nextLine)) break;
                            if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) itemContents += '\n' + nextLineWithoutTabs.slice(indent);
                            else {
                                // not enough indentation
                                if (blankLine) break;
                                // paragraph continuation unless last line was a different block level element
                                if (line.replace(this.rules.other.tabCharGlobal, '    ').search(this.rules.other.nonSpaceChar) >= 4) break;
                                if (fencesBeginRegex.test(line)) break;
                                if (headingBeginRegex.test(line)) break;
                                if (hrRegex.test(line)) break;
                                itemContents += '\n' + nextLine;
                            }
                            if (!blankLine && !nextLine.trim()) blankLine = true;
                            raw += rawLine + '\n';
                            src = src.substring(rawLine.length + 1);
                            line = nextLineWithoutTabs.slice(indent);
                        }
                    }
                    if (!list.loose) {
                        // If the previous item ended with a blank line, the list is loose
                        if (endsWithBlankLine) list.loose = true;
                        else if (this.rules.other.doubleBlankLine.test(raw)) endsWithBlankLine = true;
                    }
                    let istask = null;
                    let ischecked;
                    // Check for task list items
                    if (this.options.gfm) {
                        istask = this.rules.other.listIsTask.exec(itemContents);
                        if (istask) {
                            ischecked = istask[0] !== '[ ] ';
                            itemContents = itemContents.replace(this.rules.other.listReplaceTask, '');
                        }
                    }
                    list.items.push({
                        type: 'list_item',
                        raw,
                        task: !!istask,
                        checked: ischecked,
                        loose: false,
                        text: itemContents,
                        tokens: []
                    });
                    list.raw += raw;
                }
                // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
                const lastItem = list.items.at(-1);
                if (lastItem) {
                    lastItem.raw = lastItem.raw.trimEnd();
                    lastItem.text = lastItem.text.trimEnd();
                } else // not a list since there were no items
                return;
                list.raw = list.raw.trimEnd();
                // Item child tokens handled here at end because we needed to have the final item to trim it first
                for(let i = 0; i < list.items.length; i++){
                    this.lexer.state.top = false;
                    list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
                    if (!list.loose) {
                        // Check if list should be loose
                        const spacers = list.items[i].tokens.filter((t)=>t.type === 'space');
                        const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t)=>this.rules.other.anyLine.test(t.raw));
                        list.loose = hasMultipleLineBreaks;
                    }
                }
                // Set all items to loose if list is loose
                if (list.loose) for(let i = 0; i < list.items.length; i++)list.items[i].loose = true;
                return list;
            }
        }
        html(src) {
            const cap = this.rules.block.html.exec(src);
            if (cap) {
                const token = {
                    type: 'html',
                    block: true,
                    raw: cap[0],
                    pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
                    text: cap[0]
                };
                return token;
            }
        }
        def(src) {
            const cap = this.rules.block.def.exec(src);
            if (cap) {
                const tag = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, ' ');
                const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, '$1').replace(this.rules.inline.anyPunctuation, '$1') : '';
                const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1') : cap[3];
                return {
                    type: 'def',
                    tag,
                    raw: cap[0],
                    href,
                    title
                };
            }
        }
        table(src) {
            const cap = this.rules.block.table.exec(src);
            if (!cap) return;
            if (!this.rules.other.tableDelimiter.test(cap[2])) // delimiter row must have a pipe (|) or colon (:) otherwise it is a setext heading
            return;
            const headers = splitCells(cap[1]);
            const aligns = cap[2].replace(this.rules.other.tableAlignChars, '').split('|');
            const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, '').split('\n') : [];
            const item = {
                type: 'table',
                raw: cap[0],
                header: [],
                align: [],
                rows: []
            };
            if (headers.length !== aligns.length) // header and align columns must be equal, rows can be different.
            return;
            for (const align of aligns){
                if (this.rules.other.tableAlignRight.test(align)) item.align.push('right');
                else if (this.rules.other.tableAlignCenter.test(align)) item.align.push('center');
                else if (this.rules.other.tableAlignLeft.test(align)) item.align.push('left');
                else item.align.push(null);
            }
            for(let i = 0; i < headers.length; i++)item.header.push({
                text: headers[i],
                tokens: this.lexer.inline(headers[i]),
                header: true,
                align: item.align[i]
            });
            for (const row of rows)item.rows.push(splitCells(row, item.header.length).map((cell, i)=>{
                return {
                    text: cell,
                    tokens: this.lexer.inline(cell),
                    header: false,
                    align: item.align[i]
                };
            }));
            return item;
        }
        lheading(src) {
            const cap = this.rules.block.lheading.exec(src);
            if (cap) return {
                type: 'heading',
                raw: cap[0],
                depth: cap[2].charAt(0) === '=' ? 1 : 2,
                text: cap[1],
                tokens: this.lexer.inline(cap[1])
            };
        }
        paragraph(src) {
            const cap = this.rules.block.paragraph.exec(src);
            if (cap) {
                const text = cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1];
                return {
                    type: 'paragraph',
                    raw: cap[0],
                    text,
                    tokens: this.lexer.inline(text)
                };
            }
        }
        text(src) {
            const cap = this.rules.block.text.exec(src);
            if (cap) return {
                type: 'text',
                raw: cap[0],
                text: cap[0],
                tokens: this.lexer.inline(cap[0])
            };
        }
        escape(src) {
            const cap = this.rules.inline.escape.exec(src);
            if (cap) return {
                type: 'escape',
                raw: cap[0],
                text: cap[1]
            };
        }
        tag(src) {
            const cap = this.rules.inline.tag.exec(src);
            if (cap) {
                if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) this.lexer.state.inLink = true;
                else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) this.lexer.state.inLink = false;
                if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) this.lexer.state.inRawBlock = true;
                else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) this.lexer.state.inRawBlock = false;
                return {
                    type: 'html',
                    raw: cap[0],
                    inLink: this.lexer.state.inLink,
                    inRawBlock: this.lexer.state.inRawBlock,
                    block: false,
                    text: cap[0]
                };
            }
        }
        link(src) {
            const cap = this.rules.inline.link.exec(src);
            if (cap) {
                const trimmedUrl = cap[2].trim();
                if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
                    // commonmark requires matching angle brackets
                    if (!this.rules.other.endAngleBracket.test(trimmedUrl)) return;
                    // ending angle bracket cannot be escaped
                    const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
                    if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) return;
                } else {
                    // find closing parenthesis
                    const lastParenIndex = findClosingBracket(cap[2], '()');
                    if (lastParenIndex > -1) {
                        const start = cap[0].indexOf('!') === 0 ? 5 : 4;
                        const linkLen = start + cap[1].length + lastParenIndex;
                        cap[2] = cap[2].substring(0, lastParenIndex);
                        cap[0] = cap[0].substring(0, linkLen).trim();
                        cap[3] = '';
                    }
                }
                let href = cap[2];
                let title = '';
                if (this.options.pedantic) {
                    // split pedantic href and title
                    const link = this.rules.other.pedanticHrefTitle.exec(href);
                    if (link) {
                        href = link[1];
                        title = link[3];
                    }
                } else title = cap[3] ? cap[3].slice(1, -1) : '';
                href = href.trim();
                if (this.rules.other.startAngleBracket.test(href)) {
                    if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) // pedantic allows starting angle bracket without ending angle bracket
                    href = href.slice(1);
                    else href = href.slice(1, -1);
                }
                return outputLink(cap, {
                    href: href ? href.replace(this.rules.inline.anyPunctuation, '$1') : href,
                    title: title ? title.replace(this.rules.inline.anyPunctuation, '$1') : title
                }, cap[0], this.lexer, this.rules);
            }
        }
        reflink(src, links) {
            let cap;
            if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
                const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, ' ');
                const link = links[linkString.toLowerCase()];
                if (!link) {
                    const text = cap[0].charAt(0);
                    return {
                        type: 'text',
                        raw: text,
                        text
                    };
                }
                return outputLink(cap, link, cap[0], this.lexer, this.rules);
            }
        }
        emStrong(src, maskedSrc, prevChar = '') {
            let match = this.rules.inline.emStrongLDelim.exec(src);
            if (!match) return;
            // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
            if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
            const nextChar = match[1] || match[2] || '';
            if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
                // unicode Regex counts emoji as 1 char; spread into array for proper count (used multiple times below)
                const lLength = [
                    ...match[0]
                ].length - 1;
                let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
                const endReg = match[0][0] === '*' ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
                endReg.lastIndex = 0;
                // Clip maskedSrc to same section of string as src (move to lexer?)
                maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
                while((match = endReg.exec(maskedSrc)) != null){
                    rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
                    if (!rDelim) continue; // skip single * in __abc*abc__
                    rLength = [
                        ...rDelim
                    ].length;
                    if (match[3] || match[4]) {
                        delimTotal += rLength;
                        continue;
                    } else if (match[5] || match[6]) {
                        if (lLength % 3 && !((lLength + rLength) % 3)) {
                            midDelimTotal += rLength;
                            continue; // CommonMark Emphasis Rules 9-10
                        }
                    }
                    delimTotal -= rLength;
                    if (delimTotal > 0) continue; // Haven't found enough closing delimiters
                    // Remove extra characters. *a*** -> *a*
                    rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
                    // char length can be >1 for unicode characters;
                    const lastCharLength = [
                        ...match[0]
                    ][0].length;
                    const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
                    // Create `em` if smallest delimiter has odd char count. *a***
                    if (Math.min(lLength, rLength) % 2) {
                        const text = raw.slice(1, -1);
                        return {
                            type: 'em',
                            raw,
                            text,
                            tokens: this.lexer.inlineTokens(text)
                        };
                    }
                    // Create 'strong' if smallest delimiter has even char count. **a***
                    const text = raw.slice(2, -2);
                    return {
                        type: 'strong',
                        raw,
                        text,
                        tokens: this.lexer.inlineTokens(text)
                    };
                }
            }
        }
        codespan(src) {
            const cap = this.rules.inline.code.exec(src);
            if (cap) {
                let text = cap[2].replace(this.rules.other.newLineCharGlobal, ' ');
                const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
                const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
                if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) text = text.substring(1, text.length - 1);
                return {
                    type: 'codespan',
                    raw: cap[0],
                    text
                };
            }
        }
        br(src) {
            const cap = this.rules.inline.br.exec(src);
            if (cap) return {
                type: 'br',
                raw: cap[0]
            };
        }
        del(src) {
            const cap = this.rules.inline.del.exec(src);
            if (cap) return {
                type: 'del',
                raw: cap[0],
                text: cap[2],
                tokens: this.lexer.inlineTokens(cap[2])
            };
        }
        autolink(src) {
            const cap = this.rules.inline.autolink.exec(src);
            if (cap) {
                let text, href;
                if (cap[2] === '@') {
                    text = cap[1];
                    href = 'mailto:' + text;
                } else {
                    text = cap[1];
                    href = text;
                }
                return {
                    type: 'link',
                    raw: cap[0],
                    text,
                    href,
                    tokens: [
                        {
                            type: 'text',
                            raw: text,
                            text
                        }
                    ]
                };
            }
        }
        url(src) {
            let cap;
            if (cap = this.rules.inline.url.exec(src)) {
                let text, href;
                if (cap[2] === '@') {
                    text = cap[0];
                    href = 'mailto:' + text;
                } else {
                    // do extended autolink path validation
                    let prevCapZero;
                    do {
                        prevCapZero = cap[0];
                        cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? '';
                    }while (prevCapZero !== cap[0]);
                    text = cap[0];
                    if (cap[1] === 'www.') href = 'http://' + cap[0];
                    else href = cap[0];
                }
                return {
                    type: 'link',
                    raw: cap[0],
                    text,
                    href,
                    tokens: [
                        {
                            type: 'text',
                            raw: text,
                            text
                        }
                    ]
                };
            }
        }
        inlineText(src) {
            const cap = this.rules.inline.text.exec(src);
            if (cap) {
                const escaped = this.lexer.state.inRawBlock;
                return {
                    type: 'text',
                    raw: cap[0],
                    text: cap[0],
                    escaped
                };
            }
        }
    }
    /**
     * Block Lexer
     */ class _Lexer {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(options){
            // TokenList cannot be created in one go
            this.tokens = [];
            this.tokens.links = Object.create(null);
            this.options = options || exports1.defaults;
            this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
            this.tokenizer = this.options.tokenizer;
            this.tokenizer.options = this.options;
            this.tokenizer.lexer = this;
            this.inlineQueue = [];
            this.state = {
                inLink: false,
                inRawBlock: false,
                top: true
            };
            const rules = {
                other,
                block: block.normal,
                inline: inline.normal
            };
            if (this.options.pedantic) {
                rules.block = block.pedantic;
                rules.inline = inline.pedantic;
            } else if (this.options.gfm) {
                rules.block = block.gfm;
                if (this.options.breaks) rules.inline = inline.breaks;
                else rules.inline = inline.gfm;
            }
            this.tokenizer.rules = rules;
        }
        /**
         * Expose Rules
         */ static get rules() {
            return {
                block,
                inline
            };
        }
        /**
         * Static Lex Method
         */ static lex(src, options) {
            const lexer = new _Lexer(options);
            return lexer.lex(src);
        }
        /**
         * Static Lex Inline Method
         */ static lexInline(src, options) {
            const lexer = new _Lexer(options);
            return lexer.inlineTokens(src);
        }
        /**
         * Preprocessing
         */ lex(src) {
            src = src.replace(other.carriageReturn, '\n');
            this.blockTokens(src, this.tokens);
            for(let i = 0; i < this.inlineQueue.length; i++){
                const next = this.inlineQueue[i];
                this.inlineTokens(next.src, next.tokens);
            }
            this.inlineQueue = [];
            return this.tokens;
        }
        blockTokens(src, tokens = [], lastParagraphClipped = false) {
            if (this.options.pedantic) src = src.replace(other.tabCharGlobal, '    ').replace(other.spaceLine, '');
            while(src){
                let token;
                if (this.options.extensions?.block?.some((extTokenizer)=>{
                    if (token = extTokenizer.call({
                        lexer: this
                    }, src, tokens)) {
                        src = src.substring(token.raw.length);
                        tokens.push(token);
                        return true;
                    }
                    return false;
                })) continue;
                // newline
                if (token = this.tokenizer.space(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (token.raw.length === 1 && lastToken !== undefined) // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unnecessary paragraph tags
                    lastToken.raw += '\n';
                    else tokens.push(token);
                    continue;
                }
                // code
                if (token = this.tokenizer.code(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    // An indented code block cannot interrupt a paragraph.
                    if (lastToken?.type === 'paragraph' || lastToken?.type === 'text') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.text;
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else tokens.push(token);
                    continue;
                }
                // fences
                if (token = this.tokenizer.fences(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // heading
                if (token = this.tokenizer.heading(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // hr
                if (token = this.tokenizer.hr(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // blockquote
                if (token = this.tokenizer.blockquote(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // list
                if (token = this.tokenizer.list(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // html
                if (token = this.tokenizer.html(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // def
                if (token = this.tokenizer.def(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'paragraph' || lastToken?.type === 'text') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.raw;
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else if (!this.tokens.links[token.tag]) this.tokens.links[token.tag] = {
                        href: token.href,
                        title: token.title
                    };
                    continue;
                }
                // table (gfm)
                if (token = this.tokenizer.table(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // lheading
                if (token = this.tokenizer.lheading(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // top-level paragraph
                // prevent paragraph consuming extensions by clipping 'src' to extension start
                let cutSrc = src;
                if (this.options.extensions?.startBlock) {
                    let startIndex = Infinity;
                    const tempSrc = src.slice(1);
                    let tempStart;
                    this.options.extensions.startBlock.forEach((getStartIndex)=>{
                        tempStart = getStartIndex.call({
                            lexer: this
                        }, tempSrc);
                        if (typeof tempStart === 'number' && tempStart >= 0) startIndex = Math.min(startIndex, tempStart);
                    });
                    if (startIndex < Infinity && startIndex >= 0) cutSrc = src.substring(0, startIndex + 1);
                }
                if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
                    const lastToken = tokens.at(-1);
                    if (lastParagraphClipped && lastToken?.type === 'paragraph') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.text;
                        this.inlineQueue.pop();
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else tokens.push(token);
                    lastParagraphClipped = cutSrc.length !== src.length;
                    src = src.substring(token.raw.length);
                    continue;
                }
                // text
                if (token = this.tokenizer.text(src)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'text') {
                        lastToken.raw += '\n' + token.raw;
                        lastToken.text += '\n' + token.text;
                        this.inlineQueue.pop();
                        this.inlineQueue.at(-1).src = lastToken.text;
                    } else tokens.push(token);
                    continue;
                }
                if (src) {
                    const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(errMsg);
                        break;
                    } else throw new Error(errMsg);
                }
            }
            this.state.top = true;
            return tokens;
        }
        inline(src, tokens = []) {
            this.inlineQueue.push({
                src,
                tokens
            });
            return tokens;
        }
        /**
         * Lexing/Compiling
         */ inlineTokens(src, tokens = []) {
            // String with links masked to avoid interference with em and strong
            let maskedSrc = src;
            let match = null;
            // Mask out reflinks
            if (this.tokens.links) {
                const links = Object.keys(this.tokens.links);
                if (links.length > 0) {
                    while((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null)if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                }
            }
            // Mask out escaped characters
            while((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null)maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            // Mask out other blocks
            while((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null)maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            let keepPrevChar = false;
            let prevChar = '';
            while(src){
                if (!keepPrevChar) prevChar = '';
                keepPrevChar = false;
                let token;
                // extensions
                if (this.options.extensions?.inline?.some((extTokenizer)=>{
                    if (token = extTokenizer.call({
                        lexer: this
                    }, src, tokens)) {
                        src = src.substring(token.raw.length);
                        tokens.push(token);
                        return true;
                    }
                    return false;
                })) continue;
                // escape
                if (token = this.tokenizer.escape(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // tag
                if (token = this.tokenizer.tag(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // link
                if (token = this.tokenizer.link(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // reflink, nolink
                if (token = this.tokenizer.reflink(src, this.tokens.links)) {
                    src = src.substring(token.raw.length);
                    const lastToken = tokens.at(-1);
                    if (token.type === 'text' && lastToken?.type === 'text') {
                        lastToken.raw += token.raw;
                        lastToken.text += token.text;
                    } else tokens.push(token);
                    continue;
                }
                // em & strong
                if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // code
                if (token = this.tokenizer.codespan(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // br
                if (token = this.tokenizer.br(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // del (gfm)
                if (token = this.tokenizer.del(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // autolink
                if (token = this.tokenizer.autolink(src)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // url (gfm)
                if (!this.state.inLink && (token = this.tokenizer.url(src))) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    continue;
                }
                // text
                // prevent inlineText consuming extensions by clipping 'src' to extension start
                let cutSrc = src;
                if (this.options.extensions?.startInline) {
                    let startIndex = Infinity;
                    const tempSrc = src.slice(1);
                    let tempStart;
                    this.options.extensions.startInline.forEach((getStartIndex)=>{
                        tempStart = getStartIndex.call({
                            lexer: this
                        }, tempSrc);
                        if (typeof tempStart === 'number' && tempStart >= 0) startIndex = Math.min(startIndex, tempStart);
                    });
                    if (startIndex < Infinity && startIndex >= 0) cutSrc = src.substring(0, startIndex + 1);
                }
                if (token = this.tokenizer.inlineText(cutSrc)) {
                    src = src.substring(token.raw.length);
                    if (token.raw.slice(-1) !== '_') prevChar = token.raw.slice(-1);
                    keepPrevChar = true;
                    const lastToken = tokens.at(-1);
                    if (lastToken?.type === 'text') {
                        lastToken.raw += token.raw;
                        lastToken.text += token.text;
                    } else tokens.push(token);
                    continue;
                }
                if (src) {
                    const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(errMsg);
                        break;
                    } else throw new Error(errMsg);
                }
            }
            return tokens;
        }
    }
    /**
     * Renderer
     */ class _Renderer {
        options;
        parser;
        constructor(options){
            this.options = options || exports1.defaults;
        }
        space(token) {
            return '';
        }
        code({ text, lang, escaped }) {
            const langString = (lang || '').match(other.notSpaceStart)?.[0];
            const code = text.replace(other.endingNewline, '') + '\n';
            if (!langString) return '<pre><code>' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
            return '<pre><code class="language-' + escape(langString) + '">' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
        }
        blockquote({ tokens }) {
            const body = this.parser.parse(tokens);
            return `<blockquote>\n${body}</blockquote>\n`;
        }
        html({ text }) {
            return text;
        }
        heading({ tokens, depth }) {
            return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
        }
        hr(token) {
            return '<hr>\n';
        }
        list(token) {
            const ordered = token.ordered;
            const start = token.start;
            let body = '';
            for(let j = 0; j < token.items.length; j++){
                const item = token.items[j];
                body += this.listitem(item);
            }
            const type = ordered ? 'ol' : 'ul';
            const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : '';
            return '<' + type + startAttr + '>\n' + body + '</' + type + '>\n';
        }
        listitem(item) {
            let itemBody = '';
            if (item.task) {
                const checkbox = this.checkbox({
                    checked: !!item.checked
                });
                if (item.loose) {
                    if (item.tokens[0]?.type === 'paragraph') {
                        item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                            item.tokens[0].tokens[0].text = checkbox + ' ' + escape(item.tokens[0].tokens[0].text);
                            item.tokens[0].tokens[0].escaped = true;
                        }
                    } else item.tokens.unshift({
                        type: 'text',
                        raw: checkbox + ' ',
                        text: checkbox + ' ',
                        escaped: true
                    });
                } else itemBody += checkbox + ' ';
            }
            itemBody += this.parser.parse(item.tokens, !!item.loose);
            return `<li>${itemBody}</li>\n`;
        }
        checkbox({ checked }) {
            return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox">';
        }
        paragraph({ tokens }) {
            return `<p>${this.parser.parseInline(tokens)}</p>\n`;
        }
        table(token) {
            let header = '';
            // header
            let cell = '';
            for(let j = 0; j < token.header.length; j++)cell += this.tablecell(token.header[j]);
            header += this.tablerow({
                text: cell
            });
            let body = '';
            for(let j = 0; j < token.rows.length; j++){
                const row = token.rows[j];
                cell = '';
                for(let k = 0; k < row.length; k++)cell += this.tablecell(row[k]);
                body += this.tablerow({
                    text: cell
                });
            }
            if (body) body = `<tbody>${body}</tbody>`;
            return "<table>\n<thead>\n" + header + '</thead>\n' + body + '</table>\n';
        }
        tablerow({ text }) {
            return `<tr>\n${text}</tr>\n`;
        }
        tablecell(token) {
            const content = this.parser.parseInline(token.tokens);
            const type = token.header ? 'th' : 'td';
            const tag = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
            return tag + content + `</${type}>\n`;
        }
        /**
         * span level renderer
         */ strong({ tokens }) {
            return `<strong>${this.parser.parseInline(tokens)}</strong>`;
        }
        em({ tokens }) {
            return `<em>${this.parser.parseInline(tokens)}</em>`;
        }
        codespan({ text }) {
            return `<code>${escape(text, true)}</code>`;
        }
        br(token) {
            return '<br>';
        }
        del({ tokens }) {
            return `<del>${this.parser.parseInline(tokens)}</del>`;
        }
        link({ href, title, tokens }) {
            const text = this.parser.parseInline(tokens);
            const cleanHref = cleanUrl(href);
            if (cleanHref === null) return text;
            href = cleanHref;
            let out = '<a href="' + href + '"';
            if (title) out += ' title="' + escape(title) + '"';
            out += '>' + text + '</a>';
            return out;
        }
        image({ href, title, text }) {
            const cleanHref = cleanUrl(href);
            if (cleanHref === null) return escape(text);
            href = cleanHref;
            let out = `<img src="${href}" alt="${text}"`;
            if (title) out += ` title="${escape(title)}"`;
            out += '>';
            return out;
        }
        text(token) {
            return 'tokens' in token && token.tokens ? this.parser.parseInline(token.tokens) : 'escaped' in token && token.escaped ? token.text : escape(token.text);
        }
    }
    /**
     * TextRenderer
     * returns only the textual part of the token
     */ class _TextRenderer {
        // no need for block level renderers
        strong({ text }) {
            return text;
        }
        em({ text }) {
            return text;
        }
        codespan({ text }) {
            return text;
        }
        del({ text }) {
            return text;
        }
        html({ text }) {
            return text;
        }
        text({ text }) {
            return text;
        }
        link({ text }) {
            return '' + text;
        }
        image({ text }) {
            return '' + text;
        }
        br() {
            return '';
        }
    }
    /**
     * Parsing & Compiling
     */ class _Parser {
        options;
        renderer;
        textRenderer;
        constructor(options){
            this.options = options || exports1.defaults;
            this.options.renderer = this.options.renderer || new _Renderer();
            this.renderer = this.options.renderer;
            this.renderer.options = this.options;
            this.renderer.parser = this;
            this.textRenderer = new _TextRenderer();
        }
        /**
         * Static Parse Method
         */ static parse(tokens, options) {
            const parser = new _Parser(options);
            return parser.parse(tokens);
        }
        /**
         * Static Parse Inline Method
         */ static parseInline(tokens, options) {
            const parser = new _Parser(options);
            return parser.parseInline(tokens);
        }
        /**
         * Parse Loop
         */ parse(tokens, top = true) {
            let out = '';
            for(let i = 0; i < tokens.length; i++){
                const anyToken = tokens[i];
                // Run any renderer extensions
                if (this.options.extensions?.renderers?.[anyToken.type]) {
                    const genericToken = anyToken;
                    const ret = this.options.extensions.renderers[genericToken.type].call({
                        parser: this
                    }, genericToken);
                    if (ret !== false || ![
                        'space',
                        'hr',
                        'heading',
                        'code',
                        'table',
                        'blockquote',
                        'list',
                        'html',
                        'paragraph',
                        'text'
                    ].includes(genericToken.type)) {
                        out += ret || '';
                        continue;
                    }
                }
                const token = anyToken;
                switch(token.type){
                    case 'space':
                        out += this.renderer.space(token);
                        continue;
                    case 'hr':
                        out += this.renderer.hr(token);
                        continue;
                    case 'heading':
                        out += this.renderer.heading(token);
                        continue;
                    case 'code':
                        out += this.renderer.code(token);
                        continue;
                    case 'table':
                        out += this.renderer.table(token);
                        continue;
                    case 'blockquote':
                        out += this.renderer.blockquote(token);
                        continue;
                    case 'list':
                        out += this.renderer.list(token);
                        continue;
                    case 'html':
                        out += this.renderer.html(token);
                        continue;
                    case 'paragraph':
                        out += this.renderer.paragraph(token);
                        continue;
                    case 'text':
                        {
                            let textToken = token;
                            let body = this.renderer.text(textToken);
                            while(i + 1 < tokens.length && tokens[i + 1].type === 'text'){
                                textToken = tokens[++i];
                                body += '\n' + this.renderer.text(textToken);
                            }
                            if (top) out += this.renderer.paragraph({
                                type: 'paragraph',
                                raw: body,
                                text: body,
                                tokens: [
                                    {
                                        type: 'text',
                                        raw: body,
                                        text: body,
                                        escaped: true
                                    }
                                ]
                            });
                            else out += body;
                            continue;
                        }
                    default:
                        {
                            const errMsg = 'Token with "' + token.type + '" type was not found.';
                            if (this.options.silent) {
                                console.error(errMsg);
                                return '';
                            } else throw new Error(errMsg);
                        }
                }
            }
            return out;
        }
        /**
         * Parse Inline Tokens
         */ parseInline(tokens, renderer = this.renderer) {
            let out = '';
            for(let i = 0; i < tokens.length; i++){
                const anyToken = tokens[i];
                // Run any renderer extensions
                if (this.options.extensions?.renderers?.[anyToken.type]) {
                    const ret = this.options.extensions.renderers[anyToken.type].call({
                        parser: this
                    }, anyToken);
                    if (ret !== false || ![
                        'escape',
                        'html',
                        'link',
                        'image',
                        'strong',
                        'em',
                        'codespan',
                        'br',
                        'del',
                        'text'
                    ].includes(anyToken.type)) {
                        out += ret || '';
                        continue;
                    }
                }
                const token = anyToken;
                switch(token.type){
                    case 'escape':
                        out += renderer.text(token);
                        break;
                    case 'html':
                        out += renderer.html(token);
                        break;
                    case 'link':
                        out += renderer.link(token);
                        break;
                    case 'image':
                        out += renderer.image(token);
                        break;
                    case 'strong':
                        out += renderer.strong(token);
                        break;
                    case 'em':
                        out += renderer.em(token);
                        break;
                    case 'codespan':
                        out += renderer.codespan(token);
                        break;
                    case 'br':
                        out += renderer.br(token);
                        break;
                    case 'del':
                        out += renderer.del(token);
                        break;
                    case 'text':
                        out += renderer.text(token);
                        break;
                    default:
                        {
                            const errMsg = 'Token with "' + token.type + '" type was not found.';
                            if (this.options.silent) {
                                console.error(errMsg);
                                return '';
                            } else throw new Error(errMsg);
                        }
                }
            }
            return out;
        }
    }
    class _Hooks {
        options;
        block;
        constructor(options){
            this.options = options || exports1.defaults;
        }
        static passThroughHooks = new Set([
            'preprocess',
            'postprocess',
            'processAllTokens'
        ]);
        /**
         * Process markdown before marked
         */ preprocess(markdown) {
            return markdown;
        }
        /**
         * Process HTML after marked is finished
         */ postprocess(html) {
            return html;
        }
        /**
         * Process all tokens before walk tokens
         */ processAllTokens(tokens) {
            return tokens;
        }
        /**
         * Provide function to tokenize markdown
         */ provideLexer() {
            return this.block ? _Lexer.lex : _Lexer.lexInline;
        }
        /**
         * Provide function to parse tokens
         */ provideParser() {
            return this.block ? _Parser.parse : _Parser.parseInline;
        }
    }
    class Marked {
        defaults = _getDefaults();
        options = this.setOptions;
        parse = this.parseMarkdown(true);
        parseInline = this.parseMarkdown(false);
        Parser = _Parser;
        Renderer = _Renderer;
        TextRenderer = _TextRenderer;
        Lexer = _Lexer;
        Tokenizer = _Tokenizer;
        Hooks = _Hooks;
        constructor(...args){
            this.use(...args);
        }
        /**
         * Run callback for every token
         */ walkTokens(tokens, callback) {
            let values = [];
            for (const token of tokens){
                values = values.concat(callback.call(this, token));
                switch(token.type){
                    case 'table':
                        {
                            const tableToken = token;
                            for (const cell of tableToken.header)values = values.concat(this.walkTokens(cell.tokens, callback));
                            for (const row of tableToken.rows)for (const cell of row)values = values.concat(this.walkTokens(cell.tokens, callback));
                            break;
                        }
                    case 'list':
                        {
                            const listToken = token;
                            values = values.concat(this.walkTokens(listToken.items, callback));
                            break;
                        }
                    default:
                        {
                            const genericToken = token;
                            if (this.defaults.extensions?.childTokens?.[genericToken.type]) this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens)=>{
                                const tokens = genericToken[childTokens].flat(Infinity);
                                values = values.concat(this.walkTokens(tokens, callback));
                            });
                            else if (genericToken.tokens) values = values.concat(this.walkTokens(genericToken.tokens, callback));
                        }
                }
            }
            return values;
        }
        use(...args) {
            const extensions = this.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
            args.forEach((pack)=>{
                // copy options to new object
                const opts = {
                    ...pack
                };
                // set async to true if it was set to true before
                opts.async = this.defaults.async || opts.async || false;
                // ==-- Parse "addon" extensions --== //
                if (pack.extensions) {
                    pack.extensions.forEach((ext)=>{
                        if (!ext.name) throw new Error('extension name required');
                        if ('renderer' in ext) {
                            const prevRenderer = extensions.renderers[ext.name];
                            if (prevRenderer) // Replace extension with func to run new extension but fall back if false
                            extensions.renderers[ext.name] = function(...args) {
                                let ret = ext.renderer.apply(this, args);
                                if (ret === false) ret = prevRenderer.apply(this, args);
                                return ret;
                            };
                            else extensions.renderers[ext.name] = ext.renderer;
                        }
                        if ('tokenizer' in ext) {
                            if (!ext.level || ext.level !== 'block' && ext.level !== 'inline') throw new Error("extension level must be 'block' or 'inline'");
                            const extLevel = extensions[ext.level];
                            if (extLevel) extLevel.unshift(ext.tokenizer);
                            else extensions[ext.level] = [
                                ext.tokenizer
                            ];
                            if (ext.start) {
                                if (ext.level === 'block') {
                                    if (extensions.startBlock) extensions.startBlock.push(ext.start);
                                    else extensions.startBlock = [
                                        ext.start
                                    ];
                                } else if (ext.level === 'inline') {
                                    if (extensions.startInline) extensions.startInline.push(ext.start);
                                    else extensions.startInline = [
                                        ext.start
                                    ];
                                }
                            }
                        }
                        if ('childTokens' in ext && ext.childTokens) extensions.childTokens[ext.name] = ext.childTokens;
                    });
                    opts.extensions = extensions;
                }
                // ==-- Parse "overwrite" extensions --== //
                if (pack.renderer) {
                    const renderer = this.defaults.renderer || new _Renderer(this.defaults);
                    for(const prop in pack.renderer){
                        if (!(prop in renderer)) throw new Error(`renderer '${prop}' does not exist`);
                        if ([
                            'options',
                            'parser'
                        ].includes(prop)) continue;
                        const rendererProp = prop;
                        const rendererFunc = pack.renderer[rendererProp];
                        const prevRenderer = renderer[rendererProp];
                        // Replace renderer with func to run extension, but fall back if false
                        renderer[rendererProp] = (...args)=>{
                            let ret = rendererFunc.apply(renderer, args);
                            if (ret === false) ret = prevRenderer.apply(renderer, args);
                            return ret || '';
                        };
                    }
                    opts.renderer = renderer;
                }
                if (pack.tokenizer) {
                    const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
                    for(const prop in pack.tokenizer){
                        if (!(prop in tokenizer)) throw new Error(`tokenizer '${prop}' does not exist`);
                        if ([
                            'options',
                            'rules',
                            'lexer'
                        ].includes(prop)) continue;
                        const tokenizerProp = prop;
                        const tokenizerFunc = pack.tokenizer[tokenizerProp];
                        const prevTokenizer = tokenizer[tokenizerProp];
                        // Replace tokenizer with func to run extension, but fall back if false
                        // @ts-expect-error cannot type tokenizer function dynamically
                        tokenizer[tokenizerProp] = (...args)=>{
                            let ret = tokenizerFunc.apply(tokenizer, args);
                            if (ret === false) ret = prevTokenizer.apply(tokenizer, args);
                            return ret;
                        };
                    }
                    opts.tokenizer = tokenizer;
                }
                // ==-- Parse Hooks extensions --== //
                if (pack.hooks) {
                    const hooks = this.defaults.hooks || new _Hooks();
                    for(const prop in pack.hooks){
                        if (!(prop in hooks)) throw new Error(`hook '${prop}' does not exist`);
                        if ([
                            'options',
                            'block'
                        ].includes(prop)) continue;
                        const hooksProp = prop;
                        const hooksFunc = pack.hooks[hooksProp];
                        const prevHook = hooks[hooksProp];
                        if (_Hooks.passThroughHooks.has(prop)) // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (arg)=>{
                            if (this.defaults.async) return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret)=>{
                                return prevHook.call(hooks, ret);
                            });
                            const ret = hooksFunc.call(hooks, arg);
                            return prevHook.call(hooks, ret);
                        };
                        else // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (...args)=>{
                            let ret = hooksFunc.apply(hooks, args);
                            if (ret === false) ret = prevHook.apply(hooks, args);
                            return ret;
                        };
                    }
                    opts.hooks = hooks;
                }
                // ==-- Parse WalkTokens extensions --== //
                if (pack.walkTokens) {
                    const walkTokens = this.defaults.walkTokens;
                    const packWalktokens = pack.walkTokens;
                    opts.walkTokens = function(token) {
                        let values = [];
                        values.push(packWalktokens.call(this, token));
                        if (walkTokens) values = values.concat(walkTokens.call(this, token));
                        return values;
                    };
                }
                this.defaults = {
                    ...this.defaults,
                    ...opts
                };
            });
            return this;
        }
        setOptions(opt) {
            this.defaults = {
                ...this.defaults,
                ...opt
            };
            return this;
        }
        lexer(src, options) {
            return _Lexer.lex(src, options ?? this.defaults);
        }
        parser(tokens, options) {
            return _Parser.parse(tokens, options ?? this.defaults);
        }
        parseMarkdown(blockType) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parse = (src, options)=>{
                const origOpt = {
                    ...options
                };
                const opt = {
                    ...this.defaults,
                    ...origOpt
                };
                const throwError = this.onError(!!opt.silent, !!opt.async);
                // throw error if an extension set async to true but parse was called with async: false
                if (this.defaults.async === true && origOpt.async === false) return throwError(new Error('marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.'));
                // throw error in case of non string input
                if (typeof src === 'undefined' || src === null) return throwError(new Error('marked(): input parameter is undefined or null'));
                if (typeof src !== 'string') return throwError(new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected'));
                if (opt.hooks) {
                    opt.hooks.options = opt;
                    opt.hooks.block = blockType;
                }
                const lexer = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
                const parser = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
                if (opt.async) return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src)=>lexer(src, opt)).then((tokens)=>opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens)=>opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(()=>tokens) : tokens).then((tokens)=>parser(tokens, opt)).then((html)=>opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
                try {
                    if (opt.hooks) src = opt.hooks.preprocess(src);
                    let tokens = lexer(src, opt);
                    if (opt.hooks) tokens = opt.hooks.processAllTokens(tokens);
                    if (opt.walkTokens) this.walkTokens(tokens, opt.walkTokens);
                    let html = parser(tokens, opt);
                    if (opt.hooks) html = opt.hooks.postprocess(html);
                    return html;
                } catch (e) {
                    return throwError(e);
                }
            };
            return parse;
        }
        onError(silent, async) {
            return (e)=>{
                e.message += '\nPlease report this to https://github.com/markedjs/marked.';
                if (silent) {
                    const msg = '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
                    if (async) return Promise.resolve(msg);
                    return msg;
                }
                if (async) return Promise.reject(e);
                throw e;
            };
        }
    }
    const markedInstance = new Marked();
    function marked(src, opt) {
        return markedInstance.parse(src, opt);
    }
    /**
     * Sets the default options.
     *
     * @param options Hash of options
     */ marked.options = marked.setOptions = function(options) {
        markedInstance.setOptions(options);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
    };
    /**
     * Gets the original marked default options.
     */ marked.getDefaults = _getDefaults;
    marked.defaults = exports1.defaults;
    /**
     * Use Extension
     */ marked.use = function(...args) {
        markedInstance.use(...args);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
    };
    /**
     * Run callback for every token
     */ marked.walkTokens = function(tokens, callback) {
        return markedInstance.walkTokens(tokens, callback);
    };
    /**
     * Compiles markdown to HTML without enclosing `p` tag.
     *
     * @param src String of markdown source to be compiled
     * @param options Hash of options
     * @return String of compiled HTML
     */ marked.parseInline = markedInstance.parseInline;
    /**
     * Expose
     */ marked.Parser = _Parser;
    marked.parser = _Parser.parse;
    marked.Renderer = _Renderer;
    marked.TextRenderer = _TextRenderer;
    marked.Lexer = _Lexer;
    marked.lexer = _Lexer.lex;
    marked.Tokenizer = _Tokenizer;
    marked.Hooks = _Hooks;
    marked.parse = marked;
    const options = marked.options;
    const setOptions = marked.setOptions;
    const use = marked.use;
    const walkTokens = marked.walkTokens;
    const parseInline = marked.parseInline;
    const parse = marked;
    const parser = _Parser.parse;
    const lexer = _Lexer.lex;
    exports1.Hooks = _Hooks;
    exports1.Lexer = _Lexer;
    exports1.Marked = Marked;
    exports1.Parser = _Parser;
    exports1.Renderer = _Renderer;
    exports1.TextRenderer = _TextRenderer;
    exports1.Tokenizer = _Tokenizer;
    exports1.getDefaults = _getDefaults;
    exports1.lexer = lexer;
    exports1.marked = marked;
    exports1.options = options;
    exports1.parse = parse;
    exports1.parseInline = parseInline;
    exports1.parser = parser;
    exports1.setOptions = setOptions;
    exports1.use = use;
    exports1.walkTokens = walkTokens;
});

},{}],"gkKU3":[function(require,module,exports,__globalThis) {
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

},{}]},["3zE8I","1wUoi"], "1wUoi", "parcelRequire94c2")

//# sourceMappingURL=index.bda4fd5c.js.map
