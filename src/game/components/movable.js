const _ = require('lodash')
const { MOVE } = require('../../utils/types')

module.exports = {
  movable: {
    requires: ['position'],

    reducers: {
      move: (state, { direction }, game) => {
        const { position } = state
        const { tiles } = game
        const mapWidth = tiles[0].length
        const mapHeight = tiles.length
        let nextX = position.x
        let nextY = position.y
        let rotatedDirection = applyRotation(direction, position.rotation)

        switch (rotatedDirection) {
          case MOVE.BACKWARD:
            nextY = position.y - 1
            break
          case MOVE.FORWARD:
            nextY = position.y + 1
            break
          case MOVE.LEFT:
            nextX = position.x - 1
            break
          case MOVE.RIGHT:
            nextX = position.x + 1
            break
        }

        if (game.tiles[nextY] &&
          game.tiles[nextY][nextX] === 2) {
          return {}
        }

        return {
          position: {
            x: { $set: _.clamp(nextX, 0, mapWidth - 1) },
            y: { $set: _.clamp(nextY, 0, mapHeight - 1) }
          }
        }
      },

      rotate: (state, { direction }) => {
        const { position } = state
        const orientation = mod(position.rotation - direction, 4)

        return {
          position: {
            rotation: { $set: orientation }
          }
        }
      }
    }
  }
}

function applyRotation (direction, rotation) {
  return mod((direction + rotation), 4)
}

function mod (x, n) {
  return ((x % n) + n) % n
}
