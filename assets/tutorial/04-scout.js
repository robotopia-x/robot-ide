const entities = require('../../models/game/entities')

const timeLimit = 10

module.exports = {
  game: {
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,3,3,3,3,3,1,1],
      [1,3,3,3,3,3,3,3,2,2,3,3,1,1,1,1,1,3,3,3,3,2,3,3,1],
      [1,3,3,3,2,2,2,2,2,2,3,3,1,1,1,1,3,3,3,2,2,2,3,3,1],
      [1,3,3,2,2,2,2,3,2,3,3,3,3,1,1,1,3,3,3,2,2,3,3,3,1],
      [1,3,3,3,2,2,3,3,2,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,1],
      [1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,3,3,3,3,3,1],
      [1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,3,3,3,3,1],
      [1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,3,3,1,1],
      [1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,3,3,3,1,1],
      [1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,1,1,1],
      [1,1,1,3,3,3,3,3,3,3,3,5,5,5,3,3,3,3,3,3,3,1,1,1,1],
      [1,1,3,3,3,3,3,3,3,3,3,5,4,5,3,3,3,3,3,3,3,1,1,1,1],
      [1,3,3,3,3,3,3,3,3,3,3,5,5,5,3,3,3,3,3,3,3,3,1,1,1],
      [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1],
      [1,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1],
      [1,1,3,3,3,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1],
      [1,1,1,3,3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,1,1],
      [1,1,1,3,3,3,3,2,2,3,3,3,3,1,3,3,3,3,3,2,2,2,3,3,1],
      [1,1,1,1,3,3,3,3,2,3,3,3,1,1,3,3,3,3,3,2,2,2,3,3,1],
      [1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,3,3,3,2,2,2,2,3,3,1],
      [1,3,1,1,1,1,1,1,3,3,3,1,1,1,1,3,3,3,3,3,2,3,2,3,1],
      [1,3,3,3,3,1,1,1,3,3,3,3,3,1,1,1,3,3,3,3,3,3,3,3,1],
      [1,3,3,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,3,3,3,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    entities: [
      entities.tutorialRobot({ x: 12, y: 12, id: 'ROBOT', teamId: 1, discoverRange: 1 })
    ]
  },

  ressources: 10,

  editor: {
    workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
  <statement name="body">
    <block type="controls_repeat">
      <field name="TIMES">3</field>
      <statement name="DO">
        <block type="controls_if">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="random_number" id="/2hWV!Bsg{eIiMHNaQm6">
                  <field name="min">1</field>
                  <field name="max">5</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number" id="nL#iBs7tFzsRy}-I%z3a">
                  <field name="NUM">1</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="rotate">
              <field name="direction">LEFT</field>
            </block>
          </statement>
          <next>
            <block type="move">
              <field name="move">FORWARD</field>
            </block>
          </next>
        </block>
      </statement>
    </block>
  </statement>
</block>
</xml>`,

    toolbox: `<xml id="toolbox" style="display: none">
                <category name="RemoveCategories" colour="40">
                    <block type="move"></block>
                    <block type="rotate"></block>
                    <block type="controls_repeat"></block>
                    <block type="controls_if"></block>
                    <block type="random_number"></block>
                    <block type="logic_compare"></block>
                </category>
              </xml>`
  },

  label: 'Scout',

  goals: [
    {
      type: 'discoverEntityOfType',
      params: { type: 'resource' },
      desc: 'Make the Robot scout the map to find something interesting',
      isMandatory: true
    },
    {
      type: 'gameTimeLimit',
      params: { timeInS: timeLimit },
      desc: 'Find something within ' + timeLimit + ' seconds',
      isMandatory: false
    }
  ],

  storyModal: {
    text: '',
    hint: '',
    img: 'assets/img/tutorials/simple-move.png'
  },

  nextTutorial: ''
}
