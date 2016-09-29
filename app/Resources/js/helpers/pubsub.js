let _events = {};

export function dispatch (event, data) {
    if (!_events[event]) return; // no one is listening to this event
    for (var i = 0; i < _events[event].length; i++)
        _events[event][i](data);
};

export function subscribe (event, callback) {
  if (!_events[event]) _events[event] = []; // new event
  _events[event].push(callback);
};
