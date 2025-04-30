/* eslint-disable */
// @ts-nocheck

/**
 * @preserve jquery-param (c) KNOWLEDGECODE | MIT
 */

/**
 * serialize any object
 * @param {Object} a - any object to serialize
 * @param {boolean} allowEmpty - allow empty
 * @returns {string} a serialized string
 */
export function param(a, allowEmpty = true): string {
    const s = [];
    const add = function (k, v) {
        v = typeof v === "function" ? v() : v;
        v = v ?? "";

        if (v === "" && !allowEmpty) {
            return;
        }

        s[s.length] = encodeURIComponent(k) + "=" + encodeURIComponent(v);
    };
    const buildParams = function (prefix: string, obj) {
        let i, len, key;

        if (prefix) {
            if (Array.isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    buildParams(`${prefix}[${typeof obj[i] === "object" && obj[i] ? i : ""}]`, obj[i]);
                }
            } else if (Object.prototype.toString.call(obj) === "[object Object]") {
                for (key in obj) {
                    buildParams(`${prefix}[${key}]`, obj[key]);
                }
            } else {
                add(prefix, obj);
            }
        } else if (Array.isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                add(obj[i].name, obj[i].value);
            }
        } else {
            for (key in obj) {
                buildParams(key, obj[key]);
            }
        }
        return s;
    };

    return buildParams("", a).join("&");
}
