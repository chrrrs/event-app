import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, addParticipant } from '../store/actions/eventActions';

import { Container, Form, Input, TextArea } from 'semantic-ui-react';
import Navbar from '../components/Navbar';

class CreateEvent extends Component {
    state = {
        title: '',
        content: '',
        file: '',
        location: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSelect = (e) => {
        console.log(e.target.value)
        // this.setState({
        //     [e.target.id]: e.target.value
        // });
    }

    handleFile = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { title, content, file } = this.state;

        if (title.length > 0 && content.length > 0 && file !== '') {
            this.props.createEvent(this.state)
            this.props.history.push('/')
        }

    }

    render() {
        const options = [
            { key: 'OC', text: 'Odense C', value: 'Odense C' },
            { key: 'OM', text: 'Odense M', value: 'Odense M' },
        ]
        // const { auth } = this.props;

        // if (!auth.uid) {
        //     return <Redirect to="/login" />
        // }        
        return (
            <React.Fragment>
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px auto' }}>
                        <svg style={{ width: '31px' }} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>icon_svg</title><path className="cls-1" d="M500,846.52c-194.89,0-353.45-158.56-353.45-353.45H249c0,138.41,112.6,251,251,251s251-112.6,251-251H853.45C853.45,688,694.89,846.52,500,846.52Z" /><circle className="cls-1" cx="214.26" cy="239.32" r="64.18" /></svg>
                        <h2 style={{ marginTop: '0', fontSize: '1.7rem', fontWeight: '800' }}>Connect</h2>
                    </div>
                    <Form onSubmit={this.handleSearch}>
                        <Form.Field>
                            <Input type="search" icon="search" />
                        </Form.Field>
                    </Form>
                </Container>
                <div className="fake__background">
                    <div className="modal__view">
                        <Container>
                            <h3>Opret Event</h3>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <input type="file" id="file" onChange={this.handleFile} />
                                </Form.Field>
                                <Form.Field>
                                    <input type="text" placeholder="Titel" id="title" onChange={this.handleChange} value={this.state.title}/>
                                </Form.Field>
                                <Form.Field>
                                    <TextArea placeholder="Beskrivelse" id="content" onChange={this.handleChange} value={this.state.content} />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Select id="location" placeholder="Lokation" options={options} onChange={this.handleSelect} />
                                </Form.Field>
                                {/* <Form.Group widths="3">
                                    <Form.Select />
                                    <Form.Select />
                                    <Form.Select />
                                </Form.Group> */}
                            </Form>
                        </Container>
                    </div>
                </div>
                <Navbar pathObject={this.props.history} submit={this.handleSubmit} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),
        deleteEvent: (event) => dispatch(deleteEvent(event)),
        addParticipant: (event) => dispatch(addParticipant(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent) 