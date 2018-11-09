import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEvent } from '../store/actions/eventActions';
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

    render() {
        if (!this.props.auth.uid) {
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
                            return( 
                                <div key={project.id}>
                                    <p><b>{project.title}</b></p>
                                    <p>{project.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to="/login">
                    <div onClick={this.props.signOut}>Sign Out</div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.events,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(Dashboard);