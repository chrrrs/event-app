import React, { Component } from 'react'

import { Tab } from 'semantic-ui-react';
import Challenge from '../components/Challenge'
import ContentTab from '../components/ContentTab'


class Tabs extends Component {

  render() {
    const { data, eventID, isAttending, participant } = this.props;

    const panes = [
      { menuItem: 'Description', render: () => <Tab.Pane attached={false}><ContentTab event={data} /></Tab.Pane> },
      { menuItem: 'Challenges', render: () => <Tab.Pane attached={false}>{data.challenges && data.challenges.map(challenge => <Challenge key={challenge.id} challenge={challenge} eventID={eventID} isAttending={isAttending} isCompleted={participant[0] !== undefined && participant[0].challenges.filter(e => e === challenge.id)} />)}</Tab.Pane> },
    ]
    return (
      <Tab menu={{ secondary: true }} panes={panes} />
    )
  }
}

export default Tabs