$_mod.def("/marko-widgets$6.6.2/lib/index-browser", function(require, exports, module, __filename, __dirname) { /*
 * Copyright 2011 eBay Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var raptorPubsub = require('/raptor-pubsub$1.0.5/lib/index'/*'raptor-pubsub'*/);
var ready = require('/raptor-dom$1.1.1/raptor-dom-client'/*'raptor-dom'*/).ready;
var EMPTY_OBJ = {};
var Widget = require('/marko-widgets$6.6.2/lib/Widget'/*'./Widget'*/);
var initWidgets = require('/marko-widgets$6.6.2/lib/init-widgets-browser'/*'./init-widgets'*/);
var raptorRenderer = require('/raptor-renderer$1.4.6/lib/raptor-renderer'/*'raptor-renderer'*/);
var updateManager = require('/marko-widgets$6.6.2/lib/update-manager'/*'./update-manager'*/);

// Exports:
var WidgetsContext = exports.WidgetsContext = require('/marko-widgets$6.6.2/lib/WidgetsContext'/*'./WidgetsContext'*/);
exports.getWidgetsContext = WidgetsContext.getWidgetsContext;
exports.Widget = Widget;
exports.ready = ready;
exports.onInitWidget = function(listener) {
    raptorPubsub.on('marko-widgets/initWidget', listener);
};
exports.attrs = function() {
    return EMPTY_OBJ;
};

exports.writeDomEventsEl = function() {
    /* Intentionally empty in the browser */
};

function getWidgetForEl(id, document) {
    if (!id) {
        return undefined;
    }

    var node = typeof id === 'string' ? (document || window.document).getElementById(id) : id;
    return (node && node.__widget) || undefined;
}

exports.get = exports.getWidgetForEl = getWidgetForEl;

exports.initAllWidgets = function() {
    initWidgets.initServerRendered(true /* scan DOM */);
};

// Subscribe to DOM manipulate events to handle creating and destroying widgets
raptorPubsub
    .on('dom/beforeRemove', function(eventArgs) {
        var el = eventArgs.el;
        var widget = el.id ? getWidgetForEl(el) : null;
        if (widget) {
            widget.destroy({
                removeNode: false,
                recursive: true
            });
        }
    })
    .on('raptor-renderer/renderedToDOM', function(eventArgs) {
        var out = eventArgs.out || eventArgs.context;
        var globalWidgetsContext = out.global.widgets;
        if (globalWidgetsContext) {
            globalWidgetsContext.initWidgets(eventArgs.document);
        }
    });

exports.initWidgets = window.$markoWidgets = function(ids) {
    initWidgets.initServerRendered(ids);
};

var JQUERY = 'jquery';
var jquery = window.$;

if (!jquery) {
    try {
        jquery = require(JQUERY);
    }
    catch(e) {}
}

exports.$ = jquery;

exports.registerWidget = require('/marko-widgets$6.6.2/lib/registry'/*'./registry'*/).register;
exports.makeRenderable = exports.renderable = raptorRenderer.renderable;
exports.render = raptorRenderer.render;
exports.defineComponent = require('/marko-widgets$6.6.2/lib/defineComponent'/*'./defineComponent'*/);
exports.defineWidget = require('/marko-widgets$6.6.2/lib/defineWidget-browser'/*'./defineWidget'*/);
exports.defineRenderer = require('/marko-widgets$6.6.2/lib/defineRenderer'/*'./defineRenderer'*/);
exports.batchUpdate = updateManager.batchUpdate;
exports.onAfterUpdate = updateManager.onAfterUpdate;

window.$MARKO_WIDGETS = exports; // Helpful when debugging... WARNING: DO NOT USE IN REAL CODE!

});