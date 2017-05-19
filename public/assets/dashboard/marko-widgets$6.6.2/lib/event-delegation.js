$_mod.def("/marko-widgets$6.6.2/lib/event-delegation", function(require, exports, module, __filename, __dirname) { var _addEventListener = require('/marko-widgets$6.6.2/lib/addEventListener'/*'./addEventListener'*/);
var updateManager = require('/marko-widgets$6.6.2/lib/update-manager'/*'./update-manager'*/);

var attachBubbleEventListeners = function() {
    var body = document.body;
    // Here's where we handle event delegation using our own mechanism
    // for delegating events. For each event that we have white-listed
    // as supporting bubble, we will attach a listener to the root
    // document.body element. When we get notified of a triggered event,
    // we again walk up the tree starting at the target associated
    // with the event to find any mappings for event. Each mapping
    // is from a DOM event type to a method of a widget.
    require('/marko-widgets$6.6.2/lib/bubble'/*'./bubble'*/).forEach(function addBubbleHandler(eventType) {
        _addEventListener(body, eventType, function(event) {
            var propagationStopped = false;

            // Monkey-patch to fix #97
            var oldStopPropagation = event.stopPropagation;

            event.stopPropagation = function() {
                oldStopPropagation.call(event);
                propagationStopped = true;
            };

            updateManager.batchUpdate(function() {
                var curNode = event.target;
                if (!curNode) {
                    return;
                }

                // Search up the tree looking DOM events mapped to target
                // widget methods
                var attrName = 'data-w-on' + eventType;
                var targetMethod;
                var targetWidget;

                // Attributes will have the following form:
                // w-on<event_type>="<target_method>|<widget_id>"

                do {
                    if ((targetMethod = curNode.getAttribute(attrName))) {
                        var separator = targetMethod.lastIndexOf('|');
                        var targetWidgetId = targetMethod.substring(separator+1);
                        var targetWidgetEl = document.getElementById(targetWidgetId);
                        if (!targetWidgetEl) {
                            // The target widget is not in the DOM anymore
                            // which can happen when the widget and its
                            // children are removed from the DOM while
                            // processing the event.
                            continue;
                        }

                        targetWidget = targetWidgetEl.__widget;

                        if (!targetWidget) {
                            throw new Error('Widget not found: ' + targetWidgetId);
                        }
                        targetMethod = targetMethod.substring(0, separator);

                        var targetFunc = targetWidget[targetMethod];
                        if (!targetFunc) {
                            throw new Error('Method not found on widget ' + targetWidget.id + ': ' + targetMethod);
                        }

                        // Invoke the widget method
                        targetWidget[targetMethod](event, curNode);
                        if (propagationStopped) {
                            break;
                        }
                    }
                } while((curNode = curNode.parentNode) && curNode.getAttribute);
            });
        });
    });
};

exports.init = function() {
    if (attachBubbleEventListeners) {
        // Only attach event listeners once...
        attachBubbleEventListeners();
        attachBubbleEventListeners = null; // This is a one time thing
    }
};
});