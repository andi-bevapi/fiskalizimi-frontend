export const buildUrl = (data) => {
    if (!data) return;
    let url = '';

    for (const property in data) {
        if (!data[property]) delete data[property];
    }

    Object.keys(data).forEach((key, index) => {
        let queryParams = '';

        if (data[key].constructor === Array) {
            data[key]?.forEach((item, index) => {
                queryParams = queryParams.concat(`${index === 0 ? '' : '&'}${key}=${item}`)
            })
        } else {
            queryParams = key + "=" + data[key];
        }

        url = url.concat(`${index === 0 ? '?' : '&'}${queryParams}`);
    });

    return url;
};