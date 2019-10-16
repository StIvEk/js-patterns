const pubSub = () => {
  const subscribers = {};

  const subscribe = (eventName, callback) => {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = [];
    }

    subscribers[eventName].push(callback);

    const index = subscribers[eventName].length - 1;

    return {
      unsubscribe() {
        subscribers[eventName].splice(index, 1);
        console.log("unsubscribe: ", eventName);
      }
    };
  };

  const publish = (eventName, data) => {
    if (!Array.isArray(subscribers[eventName])) {
      return;
    }

    subscribers[eventName].forEach(callback => {
      callback(data);
    });
  };

  return {
    subscribe,
    publish
  };
};

const ps = pubSub();

const subEv1 = ps.subscribe("event 1", data => console.log(data));
const subEv2 = ps.subscribe("event 2", data => console.log(data));

ps.publish("event 1", "event 1");
ps.publish("event 2", "event 2");

subEv1.unsubscribe();

ps.publish("event 1", "event 1");
ps.publish("event 2", "event 2");
