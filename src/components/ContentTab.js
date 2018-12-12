import React from 'react'

const ContentTab = (props) => (
    <div className="content__tab__container">
        <div>
            {props.event && props.event.content}
        </div>
        <div className="details">
            <div>
                <b>Attending:</b>
            </div>
            <div>
                {props.event.participants && props.event.participants.length > 0 ? props.event.participants.length : 'You can be the first attendee!'}
            </div>
        </div>
        <div className="details">
            <div>
                <b><p>Date</p></b>
                <p>...</p>
            </div>
            <div>
                <b><p>Category</p></b>
                <p>{props.event.category && props.event.category.length > 0 ? props.event.category : '...'}</p>
            </div>
            <div>
                <b><p>Location</p></b>
                <p>{props.event.location && props.event.location.length > 0 ? props.event.location : '...'}</p>
            </div>
        </div>
    </div>
)

export default ContentTab