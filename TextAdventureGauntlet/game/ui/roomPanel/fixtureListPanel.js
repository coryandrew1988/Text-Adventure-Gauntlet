import {
  React,
  Component,
  Panel,
  Text,
  TextButton
} from '../basics';

import { withSystemState } from '../hoc';

class FixturePanel extends Component {
  render() {
    const { system, fixture } = this.props;

    return <TextButton
        key={fixture.id}
        style={{
          margin: 1,
          padding: 1,
          //backgroundColor: '#dd0',
          borderRadius: 2
        }}
        onPress={() => {
          system.action.setTarget({
            type: 'fixture',
            id: fixture.id
          });
        }}
      >
        {fixture.description.name}
      </TextButton>;
  }
}

FixturePanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  fixture: React.PropTypes.object.isRequired
};

class FixtureListPanel extends Component {
  render() {
    const { system, fixtures } = this.props;

    return <Panel>
      {fixtures.map(fixture => <FixturePanel
        key={fixture.id}
        system={system}
        fixture={fixture}
      />)}
    </Panel>;
  }
}

FixtureListPanel.propTypes = {
  system: React.PropTypes.object.isRequired,
  fixtures: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
};

export default withSystemState(FixtureListPanel, (system, prevState, props) => {
  return {
    system,
    fixtures: props.fixtures
  };
});
