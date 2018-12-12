import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, addParticipant } from '../store/actions/eventActions';
import Slider from 'react-slick';

import { Container, Form, Input, TextArea, Image } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

const locationOptions = [
    { key: 'OC', text: 'Odense C', value: 'Odense C' },
    { key: 'OM', text: 'Odense M', value: 'Odense M' },
    { key: 'ON', text: 'Odense N', value: 'Odense N' },
    { key: 'OS', text: 'Odense S', value: 'Odense S' },
    { key: 'OO', text: 'Odense Ø', value: 'Odense Ø' },
    { key: 'OV', text: 'Odense V', value: 'Odense V' },
    { key: 'ONO', text: 'Odense NØ', value: 'Odense NØ' },
    { key: 'OSO', text: 'Odense SØ', value: 'Odense SØ' },
    { key: 'OSV', text: 'Odense SV', value: 'Odense SV' }
]

const categoryOptions = [
    { key: 's1', text: 'Sports', value: 'Sports' },
    { key: 'f1', text: 'Food', value: 'Food' },
    { key: 'm1', text: 'Music', value: 'Music' },
    { key: 's2', text: 'School', value: 'School' },
    { key: 't1', text: 'Tech', value: 'Tech' },
    { key: 'm2', text: 'Movies', value: 'Movies' }
]

class CreateEvent extends Component {
    state = {
        title: '',
        content: '',
        file: '',
        location: '',
        category: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSelectLocation = (e, { value }) => {
        this.setState({
            location: value
        });
    }

    handleSelectCategory = (e, { value }) => {
        this.setState({
            category: value
        });
    }

    // handleSelectTime = (e, { value }) => {
    //     this.setState({
    //         location: value
    //     });
    // }

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

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
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
                <BackButton back={this.goBack}/>
                <div style={{ position: 'fixed', width: '100%' }}>
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
                <div className="modal__view" style={{ paddingTop: '20px' }}>
                    <Container>
                        <h3>Create Event</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <input type="file" id="file" onChange={this.handleFile} />
                            </Form.Field>
                            <Form.Field>
                                <input type="text" placeholder="Title" id="title" onChange={this.handleChange} value={this.state.title}/>
                            </Form.Field>
                            <Form.Field>
                                <TextArea autoHeight placeholder="Description" id="content" onChange={this.handleChange} value={this.state.content} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select id="location" placeholder="Location" options={locationOptions} onChange={this.handleSelectLocation} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Select id="category" placeholder="Category" options={categoryOptions} onChange={this.handleSelectCategory} />
                            </Form.Field>
                            <Form.Group>
                                {/* <Form.Select />
                                <Form.Select />
                                <Form.Select /> */}
                            </Form.Group>
                        </Form>
                    </Container>
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