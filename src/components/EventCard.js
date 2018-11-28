import React, { Component } from 'react';
import Lazyload from 'react-lazyload';

export default class EventCard extends Component {
  render() {
    const { event } = this.props;

    return (
      <div className="event__card__container" onClick={this.props.goTo}>
        <Lazyload throttle={200} height={130}>
          <img className="event__card__image" src={event.image} alt="" />
        </Lazyload>
        <div className="event__card__content__wrapper">
          <div>
            <p>{event.title}</p>
            <p><b>Organizer</b> {event.organization && event.organization.length > 0 ? event.organization : `${event.authorFirstName} ${event.authorLastName}`}</p>
          </div>
          <div className="sub__info__wrapper">
            <div>
              <p>Date</p>
              <p>fill</p>
            </div>
            <div>
              <p>Category</p>
              <p>sport</p>
            </div>
            <div>
              <p>Location</p>
              <p>Odense C</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}