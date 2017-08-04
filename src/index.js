import { diffLines } from 'diff'

export default function blame(
  codes: Array<Object | string>,
  passedOptions: Object = {},
): Array {
  let result: Array = []
  const options: Object = Object.assign({}, passedOptions)

  // Last code is oldest
  codes.reverse().forEach((compareWith: Object | string, codeIndex: number) => {
    const base: ?Object | string = codes[codeIndex - 1]
    const compareWithCode: string =
      typeof compareWith === 'string'
        ? compareWith
        : options.getCode(compareWith)

    // Diff code
    let diffResults: ?Array = null
    const diffOptions: Object = {
      newlineIsToken: false,
    }
    if (base) {
      const baseCode: string =
        typeof base === 'string' ? base : options.getCode(base)
      diffResults = diffLines(baseCode, compareWithCode, diffOptions)
    } else {
      diffResults = diffLines('', compareWithCode, diffOptions)
    }

    // Walk through diff result and check which parts needs to be updated
    let lineIndex: number = 0
    diffResults.forEach((diffResult: Object) => {
      if (diffResult.added) {
        diffResult.value
          .split('\n')
          .slice(0, diffResult.count)
          .forEach((line: string) => {
            // Add line to result
            result.splice(lineIndex, 0, {
              origin:
                typeof compareWith === 'string'
                  ? codes.length - codeIndex - 1
                  : options.getOrigin(compareWith),
              value: line.trimRight(),
            })
            lineIndex += 1
          })
      } else if (diffResult.removed) {
        // Remove lines from result
        result.splice(lineIndex, diffResult.count)
      } else {
        // Nothing to do as the code is already part of the result
        lineIndex += diffResult.count
      }
    })
  })

  return result
}
