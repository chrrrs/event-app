import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { completeChallenge } from '../store/actions/eventActions';

import { Tab } from 'semantic-ui-react';
import Challenge from '../components/Challenge'


class Tabs extends Component {
  // handleCompletedChallenge = () => {

  // }

  render() {
    const { data, eventID } = this.props;

    const panes = [
      { menuItem: 'Description', render: () => <Tab.Pane attached={false}>{data.content}</Tab.Pane> },
      { menuItem: 'Challenges', render: () => <Tab.Pane attached={false}>{data.challenges && data.challenges.map(challenge => <Challenge key={challenge.id} challenge={challenge} eventID={eventID} />)}</Tab.Pane> },
    ]
    return (
      <Tab menu={{ secondary: true }} panes={panes} />
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     completeChallenge: (event, challenge) => dispatch(completeChallenge(event)),
//   }
// }

// export default connect(null, mapDispatchToProps)(Tabs)
export default Tabs