function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const pref = prefix.length ? `${prefix}_${key}` : key;

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], pref));
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((value, index) => {
                acc[`${pref}_${index}`] = value;
            });
        } else {
            acc[pref] = obj[key];
        }

        return acc;
    }, {});
}

const nestedData = {
    name: "John",
    details: {
        age: 25,
        address: {
            city: "Cityville",
            zip: "12345"
        },
        hobbies: ["Reading", "Gaming"]
    },
    scores: {
        math: 90,
        english: 85
    },
    now:{we:{have:{dfdf:"dfdfdfdfdfdfdkfjkdjfkdjfkdjfkjdfkj"}}}
};

const flattenedData = flattenObject(nestedData);
console.log(flattenedData);
