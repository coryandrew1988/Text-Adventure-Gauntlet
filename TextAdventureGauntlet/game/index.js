import { React, Component } from './ui/utils';

import UI from './ui';
import { createSystem } from './system';
import { initializeSystem } from './content';

export default class Game extends Component {
  constructor() {
    super();

    this.system = createSystem();
    initializeSystem(this.system);
    // TODO initialize/load world state
  }

  render() {
    return <UI system={this.system} />
  }
}
