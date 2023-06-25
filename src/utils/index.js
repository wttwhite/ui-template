// 通过key，从list中获取name
export function getTreeLabelById(options, val, id = 'id', value = 'value') {
  let label = ''
  if (val === null || val === '' || val === undefined) {
    return label
  }
  for (let index = 0; index < options.length; index++) {
    if (options[index][id] == val) {
      label = options[index][value]
    } else {
      if (options[index].children && options[index].children.length > 0) {
        label = getTreeLabelById(options[index].children, val)
      }
    }
  }
  return label
}

// 判断两个数是否相等
export const isEqual = function (value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}
export const arrayEquals = function (arrayA, arrayB) {
  arrayA = arrayA || []
  arrayB = arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}
export const looseEqual = function (a, b) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export function isArray(ar) {
  return Array.isArray(ar)
}
