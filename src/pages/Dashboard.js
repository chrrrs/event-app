import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, addParticipant, removeParticipant } from '../store/actions/eventActions';
import { signOut } from '../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Button } from 'semantic-ui-react';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        file: ''
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
                file: ''
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

    render() {
        const { auth, profile } = this.props;
        // console.log(this.props)

        if (!auth.uid) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                This is the dashboard
                <form onSubmit={this.handleSubmit}>
                    <input type="file" id="file" onChange={this.handleFile} />
                    <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                    <input type="text" id="content" onChange={this.handleChange} value={this.state.content} />
                    <button>create event</button>
                </form>
                <div>
                    {
                        this.props.projects && this.props.projects.map(project => {
                            const pId = project.id;
                            return( 
                                <div key={project.id}>
                                    <img src={project.image} alt={project.title} />
                                    <p><b>{project.title}</b></p>
                                    <p>{project.content}</p>
                                    {
                                        project.authorId === auth.uid &&
                                        <p onClick={ () => this.deleteEventHandler(pId)} style={{ color: 'red' }}>delete event</p>
                                    }
                                    {
                                        // project.participants.filter(e => e.userId === auth.uid).length > 0
                                        project.participants.filter(e => e.userId === auth.uid).length > 0 ?
                                        <p onClick={() => this.removeParticipation(pId)}>leave event</p> :
                                        <p onClick={() => this.handleParticipant(pId)}>join event</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <Link to="/login">
                    <Button onClick={this.props.signOut}>Sign Out</Button>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%', alignItems: 'center', margin: '0 auto'}}>
                    <div>
                        <div style={{ borderRadius: '100px', backgroundColor: 'grey', padding: '5px'}}>
                            {profile.initials}
                        </div>
                    </div>
                    <div>
                        <p>{profile.firstName}</p>
                        <p>{profile.lastName}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
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
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);