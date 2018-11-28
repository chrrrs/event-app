import React, { Component } from 'react'

import { Accordion, Icon, Input, Button } from 'semantic-ui-react';

class Challenge extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <Accordion fluid styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    What is a dog?
                    <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <p>
                        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
                        be found as a welcome guest in many households across the world.
                    </p>
                </Accordion.Content>
            </Accordion>
        )
    }
}

export default Challenge