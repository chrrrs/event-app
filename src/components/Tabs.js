import React, { Component } from 'react'

import { Button, Container, Form, Input, Tab } from 'semantic-ui-react';


export default class Tabs extends Component {
  render() {
    const { data } = this.props;
    const panes = [
        { menuItem: 'Description', render: () => <Tab.Pane attached={false}>{data.content}</Tab.Pane> },
        { menuItem: 'Challenges', render: () => <Tab.Pane attached={false}>Challenges Tab</Tab.Pane> },
    ]
    return (
        <Tab menu={{ secondary: true }} panes={panes} />
    )
  }
}
