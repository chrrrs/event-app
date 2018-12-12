import React from 'react'

const ContentTab = (props) => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
            {props.event && props.event.content}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <div>
                <b>Attending:</b>
            </div>
            <div>
                {props.event.participants && props.event.participants.length > 0 ? props.event.participants.length : 'You can be the first attendee!'}
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <div>
                <b><p>Date</p></b>
                <p>fill</p>
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