$_mod.def("/marko-widgets$6.6.2/lib/update-manager", function(require, exports, module, __filename, __dirname) { var process=require("process"); /*
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

var AsyncValue = require('/raptor-async$1.1.3/AsyncValue'/*'raptor-async/AsyncValue'*/);

var afterUpdateAsyncValue = null;
var afterUpdateAsyncValue = null;
var updatesScheduled = false;

var batchStack = []; // A stack of batched updates
var unbatchedQueue = []; // Used for scheduled batched updates

/**
 * This function is called when we schedule the update of "unbatched"
 * updates to widgets.
 */
function updateUnbatchedWidgets() {
    if (!unbatchedQueue.length) {
        // No widgets to update
        return;
    }

    try {
        updateWidgets(unbatchedQueue);
    } finally {
        // Reset the flag now that this scheduled batch update
        // is complete so that we can later schedule another
        // batched update if needed
        updatesScheduled = false;
    }
}

function scheduleUpdates() {
    if (updatesScheduled) {
        // We have already scheduled a batched update for the
        // process.nextTick so nothing to do
        return;
    }

    updatesScheduled = true;

    process.nextTick(updateUnbatchedWidgets);
}

function onAfterUpdate(callback) {
    scheduleUpdates();

    if (!afterUpdateAsyncValue) {
        afterUpdateAsyncValue = new AsyncValue();
    }

    afterUpdateAsyncValue.done(callback);
}

function updateWidgets(queue) {
    // Loop over the widgets in the queue and update them.
    // NOTE: Is it okay if the queue grows during the iteration
    //       since we will still get to them at the end
    for (var i=0; i<queue.length; i++) {
        var widget = queue[i];
        widget.__updateQueued = false; // Reset the "__updateQueued" flag
        widget.update(); // Do the actual widget update
    }

    // Clear out the queue by setting the length to zero
    queue.length = 0;
}

function batchUpdate(func) {
    // If the batched update stack is empty then this
    // is the outer batched update. After the outer
    // batched update completes we invoke the "afterUpdate"
    // event listeners.
    var isOuter = batchStack.length === 0;

    var batch = {
        queue: null
    };

    batchStack.push(batch);

    try {
        func();
    } finally {
        try {
            // Update all of the widgets that where queued up
            // in this batch (if any)
            if (batch.queue) {
                updateWidgets(batch.queue);
            }
        } finally {
            // Now that we have completed the update of all the widgets
            // in this batch we need to remove it off the top of the stack
            batchStack.length--;

            if (isOuter) {
                // If there were any listeners for the "afterUpdate" event
                // then notify those listeners now
                if (afterUpdateAsyncValue) {
                    afterUpdateAsyncValue.resolve();
                    afterUpdateAsyncValue = null;
                }
            }
        }
    }
}

function queueWidgetUpdate(widget) {
    if (widget.__updateQueued) {
        // The widget has already been queued up for an update. Once
        // the widget has actually been updated we will reset the
        // "__updateQueued" flag so that it can be queued up again.
        // Since the widget has already been queued up there is nothing
        // that needs to be done.
        return;
    }

    widget.__updateQueued = true;

    var batchStackLen = batchStack.length;

    if (batchStackLen) {
        // When a batch update is started we push a new batch on to a stack.
        // If the stack has a non-zero length then we know that a batch has
        // been started so we can just queue the widget on the top batch. When
        // the batch is ended this widget will be updated.
        var batch = batchStack[batchStackLen-1];

        // We default the batch queue to null to avoid creating an Array instance
        // unnecessarily. If it is null then we create a new Array, otherwise
        // we push it onto the existing Array queue
        if (batch.queue) {
            batch.queue.push(widget);
        } else {
            batch.queue = [widget];
        }
    } else {
        // We are not within a batched update. We need to schedule a batch update
        // for the process.nextTick (if that hasn't been done already) and we will
        // add the widget to the unbatched queued
        scheduleUpdates();
        unbatchedQueue.push(widget);
    }
}

exports.queueWidgetUpdate = queueWidgetUpdate;
exports.batchUpdate = batchUpdate;
exports.onAfterUpdate = onAfterUpdate;
});