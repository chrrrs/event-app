import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, addParticipant } from '../store/actions/eventActions';
import { signOut } from '../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.createEvent(this.state)
    }

    deleteEventHandler = (pId) => {
        this.props.deleteEvent(pId)
    }

    handleParticipant = (pId) => {
        this.props.addParticipant(pId)
    }

    render() {
        const { auth, profile } = this.props;
        console.log(this.props)

        if (!auth.uid) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                This is the dashboard
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="title" onChange={this.handleChange} />
                    <input type="text" id="content" onChange={this.handleChange} />
                    <button>create event</button>
                </form>
                <div>
                    {
                        this.props.projects && this.props.projects.map(project => {
                            const pId = project.id;
                            return( 
                                <div key={project.id}>
                                    <p><b>{project.title}</b></p>
                                    <p>{project.content}</p>
                                    {
                                        project.authorId === auth.uid &&
                                        <p onClick={ () => this.deleteEventHandler(pId)} style={{ color: 'red' }}>delete event</p>
                                    }
                                    <p onClick={() => this.handleParticipant(pId)}>join event</p>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to="/login">
                    <div onClick={this.props.signOut}>Sign Out</div>
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
    console.log(state)
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
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);