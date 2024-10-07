export const ifCond = (v1, v2, options) => {
    return (v1 == v2) ? options.fn(this) : options.inverse(this);
};
