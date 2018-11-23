import React, { Component } from 'react'

import { Menu, Icon, Button } from 'semantic-ui-react';

export default class Navbar extends Component {
  render() {
    return (
        <React.Fragment>
            <Menu fluid borderless widths="5" className="navbar__fix">
                <Menu.Item name='home'>
                    <Icon name='home' size="large"/>
                </Menu.Item>

                <Menu.Item
                    name='point'
                >
                    <Icon name='point' size="large"/>
                </Menu.Item>

                <Menu.Item>
                    <Button>+</Button>
                </Menu.Item>

                <Menu.Item
                    name='trophy'
                >
                    <Icon name='trophy' size="large"/>
                </Menu.Item>

                <Menu.Item
                    name='user'
                >
                    <Icon name='user' size="large"/>
                </Menu.Item>
            </Menu>
        </React.Fragment>
    )
  }
}
