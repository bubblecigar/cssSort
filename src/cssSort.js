const splitStyledString = styledString => styledString.split('\n').filter(s => s)

const killIndentation = string => string[0] === ' ' ? killIndentation(string.slice(1)) : string

const killIndentations = ar => ar.map(str => killIndentation(str))

const sort = ar => [...ar].sort()

const mergeStyledStrings = ar => ar.join('\n')

const indenting = (ar, indent) => indent === 0 ? ar : indenting(ar.map(str => ' ' + str), indent - 1)

const addIndentation = (indent = 0) => ar => indenting(ar, indent)

const pipe = (fns, x) => fns.reduce(
  (result, fn) => fn(result), x
)

const sortStyledStringByAlphabet = (styledString, indent = 0) => pipe([
  splitStyledString,
  killIndentations,
  sort,
  mergeStyledStrings,
  addIndentation(indent)
], styledString)

export default sortStyledStringByAlphabet
