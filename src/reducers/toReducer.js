module.exports = (u) => (
  (state, action) => (
    u(action)(state)
  )
)
