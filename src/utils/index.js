const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
const IS_ZERO = 'n/a'
const KILO = 1024
 
export const parseBytes = b => 
  b === 0 ? IS_ZERO:
    ((f => i => 
      i === 0 ? `${b} ${sizes[i]}` :
        parseInt(b / Math.pow(KILO,
          f(i)), 10) + sizes[f(i)])(((g => x =>
            parseInt(Math
              .floor(g(x) / g(KILO)), 10)))(Math.log)))(b)

export const sequentialDispatcher = dispatch => (...actions) =>
  actions.map(action => dispatch(action))

