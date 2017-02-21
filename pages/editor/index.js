/* globals localStorage */
const html = require('choo/html')
const initialState = require('./initial-state')
const button = require('../../elements/button')
const blocklyWidget = require('../../elements/blockly')
const pageLayout = require('../../elements/page-layout')
const gameRunnerView = require('../../elements/game-runner')
const clientDialogView = require('../../elements/client-dialog')

const DEV_MODE = true // set to true to dev on the editor and not be bothered with multiplayer

const blocklyView = blocklyWidget()

function editorView (state, prev, send) {
  const { clock, editor, game, client } = state

  const commitButtonHtml = button({
    onClick: () => {
      send('client:sendCode', { code: editor.code })
    },
    icon: 'upload',
    label: 'Upload'
  })

  const blocklyHtml = blocklyView({
    toolbox: initialState.editor.toolbox,
    workspace: localStorage.getItem('workspace') || initialState.editor.workspace || editor.workspace,
    onChange: ({ code, workspace }) => {
      localStorage.setItem('workspace', workspace)
      send('editor:update', { code, workspace })
    }
  })

  const gameRunnerHtml = gameRunnerView({
    game, clock,
    onStart: () => {
      send('runtime:commitCode', { code: editor.code, groupId: 1 })
      send('clock:start')
    },
    onStop: init,
    onChangeSpeed: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

  const clientDialogHtml = clientDialogView({
    client,
    onSetUsername: (username) => send('client:setUsername', { username }),
    onJoinGroup: (groupId) => send('client:joinGroup', { groupId }),
    onDisconnect: () => send('client:disconnect'),
    onDenyRecovery: () => send('client:denyRecovery')
  })

  const pageHtml = pageLayout({
    id: 'editor-page',
    context: [state, prev, send],
    panels: [
      { view: gameRunnerHtml, size: 1 },
      { view: blocklyHtml, size: 1 }
    ],
    modals: DEV_MODE ? null : clientDialogHtml
  })

  return html`
    <div onload=${init}>
      ${pageHtml}
    </div>
  `

  function init () {
    send('clock:stop')
    send('runtime:reset')
    send('game:loadGameState', { loadState: initialState.game })
    send('game:initializeResourceSpots', { numberOfSpots: 10, value: 100, chunks: 10, color: 'BLUE' })
  }
}


module.exports = editorView
