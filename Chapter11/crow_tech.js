export const bigOak = {
    storage: new Map(),
    neighbors: [],
    send: (target, type, content, callback) => {
        this[type](target, content, "Big Oak", callback);
    },
    readStorage: (type, callback) => {
        callback(this.storage.get(type));
    }
};

export const defineRequestType = (type, callback) => {
    bigOak[type] = callback;
};
