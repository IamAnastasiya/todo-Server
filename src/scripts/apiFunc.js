"use strict";

export function api (url, {headers, body, ...params}) {
    const paramsToSend = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body): undefined,
        ...params,
    };
    return fetch(url, paramsToSend)
        .then(res => res.json());
}