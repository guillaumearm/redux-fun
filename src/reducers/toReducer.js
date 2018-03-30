export default (u) => (
  (state, action) => (
    u(action)(state)
  )
)
