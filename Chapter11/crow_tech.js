export const bigOak = {
    send: (target, type, message, callback) => {
        this[type](target, message, "Big Oak", callback);
    },
    readStorage: (type, callback) => {

    }
};

export const defineRequestType = (type, callback) => {
    bigOak[type] = callback;
};
