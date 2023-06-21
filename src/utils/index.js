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
