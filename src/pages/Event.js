import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteEvent, addParticipant, removeParticipant } from '../store/actions/eventActions';
import { signOut } from '../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Slider from 'react-slick';

import { Button, Container, Form, Input, Image } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import BackButton from '../components/BackButton';

class Event extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    deleteEventHandler = (id) => {
        this.props.deleteEvent(id)
        this.props.history.push('/')
    }

    handleParticipant = (id) => {
        this.props.addParticipant(id)
    }

    removeParticipation = (id) => {
        this.props.removeParticipant(id)
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const id = this.props.match.params.id
        const { event, auth } = this.props

        const settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            lazyLoad: true,
            centerMode: true,
            dots: true
        };

        return (
            <React.Fragment>
                <BackButton back={this.goBack} />
                <div style={{ position: 'fixed', width: '100%'}}>
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
                    <Container fluid>
                        <Slider {...settings}>
                            <Container>
                                <div>
                                    <span style={{ position: 'absolute', zIndex: '999', padding: '4px 10px', margin: '10px', backgroundColor: '#000000c4', fontWeight: '800', borderRadius: '4px', color: 'white', fontSize: '0.8rem' }}>Featured</span>
                                    <Image src="https://images.pexels.com/photos/295047/pexels-photo-295047.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" srcSet="" />
                                </div>
                            </Container>
                            <Container>
                                <div>
                                    <span style={{ position: 'absolute', zIndex: '999', padding: '4px 10px', margin: '10px', backgroundColor: '#000000c4', fontWeight: '800', borderRadius: '4px', color: 'white', fontSize: '0.8rem' }}>Featured</span>
                                    <Image src="https://images.pexels.com/photos/1443657/pexels-photo-1443657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" srcSet="" />
                                </div>
                            </Container>
                        </Slider>
                    </Container>
                </div>
                <div className="fake__background" onClick={this.goBack}>
                </div>
                <div className="modal__view">
                    {
                        event && 
                        <React.Fragment>
                            <img src={event[id].image} alt="" style={{ marginBottom: '20px', objectFit: 'cover', width: '100vw', height: '200px', borderRadius: '4px 4px 0 0' }} />
                            <Container>
                                <h3>{event[id].title}</h3>
                                <p><b>Organizer</b> {event[id].organization && event[id].organization.length > 0 ? event[id].organization : `${event[id].authorFirstName} ${event[id].authorLastName}` }</p>
                                <Tabs data={event[id]} eventID={id} isAttending={event[id].participants.filter(e => e.userId === auth.uid).length > 0} participant={event[id].participants.filter(e => e.userId === auth.uid)} />
                                {
                                    event[id].authorId === auth.uid &&
                                    <Button onClick={() => this.deleteEventHandler(id)} style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}>delete event</Button>
                                }
                            </Container>
                        </React.Fragment>
                    }
                </div>
                {
                    event && event[id].participants.filter(e => e.userId === auth.uid).length > 0 ?
                    <Navbar pathObject={this.props.history} isAttending={true} submit={() => this.removeParticipation(id)}/> :
                    <Navbar pathObject={this.props.history} isAttending={false} submit={() => this.handleParticipant(id)}/> 
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        event: state.firestore.data.events,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEvent: (event) => dispatch(deleteEvent(event)),
        addParticipant: (event) => dispatch(addParticipant(event)),
        removeParticipant: (event) => dispatch(removeParticipant(event)),
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect( props => [
        { collection: 'events', doc: props.match.params.id }
    ])
)(Event);