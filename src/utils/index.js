/* 判定当前数据的 类型 */
const class2type = {};
const core_toString = class2type.toString;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach((name) => {
  class2type[`[object ${name}]`] = name.toLowerCase();
});
export function type (obj) {
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

/**
 * 深拷贝
 * 特别注意 new Number() 生成的 数值
 */

export function deepClone (obj) {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  // typeof obj === "object" 用这个判断类型不行，存在 new Number 这种情况
  if (obj && typeof obj.valueOf() === 'object') {
    for (let key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        if (obj[key] && typeof obj[key].valueOf() === "object") {
          objClone[key] = deepClone(obj[key]);
        } else if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = obj[key].valueOf();
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}