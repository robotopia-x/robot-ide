const game = require('../utils/game')
const initialState = require('./initial-state')
const { movable } = require('./components/movable')

module.exports = game.engine({
  state: initialState,
  namespace: 'game',
  components: {
    movable
  }
})
