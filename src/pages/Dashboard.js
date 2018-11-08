import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../store/actions/eventActions';

class Dashboard extends Component {
    state = {
        eventTitle: '',
        eventDescription: '',
        date: '',
        place: '',
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
        return (
            <div>
                This is the dashboard
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="eventTitle" onChange={this.handleChange} />
                    <input type="text" id="eventDescription" onChange={this.handleChange} />
                    <input type="text" id="date" onChange={this.handleChange} />
                    <input type="text" id="place" onChange={this.handleChange} />
                    <button>create event</button>
                </form>
                <div>
                    {
                        this.props.projects.map(project => {
                            return( 
                                <div key={project.id}>
                                    <p>{project.title}</p>
                                    <p>{project.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.event.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);