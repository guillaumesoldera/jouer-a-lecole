export const intersection = (array1, array2) => array1.filter(value => array2.includes(value))

export const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
