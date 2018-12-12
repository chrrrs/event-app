import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, addParticipant, removeParticipant } from '../store/actions/eventActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Slider from 'react-slick';
import Lazyload from 'react-lazyload';

import { Container, Form, Input, Image, Loader } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        file: '',
        searchTerm: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleFile = (e) => {
        this.setState({ 
            file: e.target.files[0] 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { title, content, file } = this.state;
        
        if( title.length > 0 && content.length > 0 && file !== '') {
            this.props.createEvent(this.state)
    
            this.setState({
                title: '',
                content: '',
                filteredData: []
            })
        }

    }

    deleteEventHandler = (pId) => {
        this.props.deleteEvent(pId)
    }

    handleParticipant = (pId) => {
        this.props.addParticipant(pId)
    }

    removeParticipation = (pId) => {
        this.props.removeParticipant(pId)
    }

    handleSearch = (e) => {
        const searchTerm = e.target.value
        const filteredData = this.props.projects.filter(event => event.title.toLowerCase().match(searchTerm.toLowerCase()) 
            || (event.category && event.category.toLowerCase().match(searchTerm.toLowerCase()))
        )
        this.setState({ filteredData })
    }

    goToSingleEvent = (projectID) => {
        this.props.history.push(`/event/${projectID}`)
    }

    render() {
        const { auth } = this.props;

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

        if (!auth.uid) {
            return <Redirect to="/login" />
        }
        return (
            <React.Fragment>
                <div>
                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px auto'}}>
                                <svg style={{ width: '31px'}} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>icon_svg</title><path className="cls-1" d="M500,846.52c-194.89,0-353.45-158.56-353.45-353.45H249c0,138.41,112.6,251,251,251s251-112.6,251-251H853.45C853.45,688,694.89,846.52,500,846.52Z" /><circle className="cls-1" cx="214.26" cy="239.32" r="64.18" /></svg>
                                <h2 style={{ marginTop: '0', fontSize: '1.7rem', fontWeight: '800' }}>Connect</h2>
                        </div>
                        <Form onSubmit={this.handleSearch}>
                            <Form.Field>
                                <Input type="search" icon="search" onChange={this.handleSearch}/>
                            </Form.Field>
                        </Form>
                    </Container>
                </div>
                <Container fluid>
                    <Slider {...settings}>
                        {
                            this.props.projects && this.props.projects.length > 1 ? this.props.projects.slice(0, 3).map(project => {
                                const projectID = project.id

                                return (
                                    <Container key={project.id}>
                                        <div>
                                            <span className="featured__badge">Featured</span>
                                            <Lazyload height='100%'>
                                                <Image className="slider__image" src={project.image} alt={project.title} onClick={() => this.goToSingleEvent(projectID)} style={{ height: '150px', width: '250px', objectFit: 'cover', borderRadius: '4px' }}/>
                                            </Lazyload>
                                        </div>
                                    </Container>
                                )
                            }) :
                            <Loader active inline='centered' />
                        }
                    </Slider>
                </Container>
                <Container className="view__container">
                    <div>
                        <h3>Events</h3>
                        {
                            this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData.map( project => {
                                const projectID = project.id

                                return (
                                    <Lazyload height='100%' key={project.id}>
                                        <EventCard
                                            event={project}
                                            goTo={() => this.goToSingleEvent(projectID)} />
                                    </Lazyload>
                                )
                            }) : this.props.projects && this.props.projects.length > 1 ? this.props.projects.map(project => {
                                const projectID = project.id

                                return (
                                    <Lazyload height='100%' key={project.id}>
                                        <EventCard
                                            event={project}
                                            goTo={() => this.goToSingleEvent(projectID)} />
                                    </Lazyload>
                                )
                            }) :
                            <Loader active inline='centered' />
                        }
                    </div>
                </Container>
                <Navbar pathObject={this.props.history} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.events,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),
        deleteEvent: (event) => dispatch(deleteEvent(event)),
        addParticipant: (event) => dispatch(addParticipant(event)),
        removeParticipant: (event) => dispatch(removeParticipant(event)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);