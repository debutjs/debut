/**
 * Reducer that merges existing state with a new object
 */
export default function mergeState<S extends object>(newState: S) {
  return <P extends object>(oldState: P) => Object.assign({ }, oldState, newState);
}
