/* 判定当前数据的 类型 */
const class2type = {};
const core_toString = class2type.toString;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach((name) => {
    class2type[`[object ${name}]`] = name.toLowerCase();
});
export function type(obj) {
    if (obj == null) {
        return String(obj);
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[core_toString.call(obj)] || "object" :
        typeof obj;
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  var value = window.localStorage.getItem(name);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      // eslint-disable-next-line no-self-assign
      value = value;
    }
  }
  return value;
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}