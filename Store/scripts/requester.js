function requester(method, url, headers, data) {
    let req = {
        method,
        url,
        headers,
    };
    if (data !== null) {
        req.data = data;
    }

    return $.ajax(req);
}