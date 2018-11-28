import React, { Component } from 'react'

import { Tab } from 'semantic-ui-react';
import Challenge from '../components/Challenge'


export default class Tabs extends Component {
  render() {
    const { data } = this.props;
    const panes = [
      { menuItem: 'Description', render: () => <Tab.Pane attached={false}>{data.content}</Tab.Pane> },
      { menuItem: 'Challenges', render: () => <Tab.Pane attached={false}>{data.challenges && data.challenges.map(challenge => <Challenge key={challenge.challengeTitle} />)}</Tab.Pane> },
    ]
    return (
      <Tab menu={{ secondary: true }} panes={panes} />
    )
  }
}
