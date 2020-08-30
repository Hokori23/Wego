function isDef(v) {
  return v !== undefined && v !== null
}

function isUndef(v) {
  return v === undefined || v === null
}

export default { isDef, isUndef }
