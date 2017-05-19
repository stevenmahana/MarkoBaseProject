$_mod.def("/marko-widgets$6.6.2/lib/registry", function(require, exports, module, __filename, __dirname) { /*
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

var registered = {};
var loaded = {};
var widgetTypes = {};
var defineWidget;
var defineRenderer;

exports.register = function(typeName, type) {
    if (arguments.length === 1) {
        var widgetType = arguments[0];
        typeName = widgetType.name;
        type = widgetType.def();
    }
    registered[typeName] = type;
    delete loaded[typeName];
    delete widgetTypes[typeName];
};

function load(typeName) {
    var target = loaded[typeName];
    if (target === undefined) {
        target = registered[typeName];
        if (!target) {
            target = require(typeName); // Assume the typeName has been fully resolved already
        }
        loaded[typeName] = target || null;
    }

    if (target == null) {
        throw new Error('Unable to load: ' + typeName);
    }
    return target;
}

function getWidgetClass(typeName) {
    var WidgetClass = widgetTypes[typeName];

    if (WidgetClass) {
        return WidgetClass;
    }

    WidgetClass = load(typeName);

    var renderer;


    if (WidgetClass.Widget) {
        WidgetClass = WidgetClass.Widget;
    }

    if (WidgetClass.renderer) {
        renderer = defineRenderer(WidgetClass);
    }

    WidgetClass = defineWidget(WidgetClass, renderer);

    // Make the widget "type" accessible on each widget instance
    WidgetClass.prototype.__type = typeName;

    widgetTypes[typeName] = WidgetClass;

    return WidgetClass;
}

exports.load = load;

exports.createWidget = function(typeName, id, document) {
    var WidgetClass = getWidgetClass(typeName);
    var widget;
    if (typeof WidgetClass === 'function') {
        // The widget is a constructor function that we can invoke to create a new instance of the widget
        widget = new WidgetClass(id, document);
    } else if (WidgetClass.initWidget) {
        widget = WidgetClass;
        widget.__document = document;
    }
    return widget;
};

defineWidget = require('/marko-widgets$6.6.2/lib/defineWidget-browser'/*'./defineWidget'*/);
defineRenderer = require('/marko-widgets$6.6.2/lib/defineRenderer'/*'./defineRenderer'*/);
});