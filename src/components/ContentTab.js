import React from 'react'

const ContentTab = (props) => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
            {props.event && props.event.content}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <div>
                <p>Date</p>
                <p>fill</p>
            </div>
            <div>
                <p>Category</p>
                <p>{props.event.category && props.event.category.length > 0 ? props.event.category : '...'}</p>
            </div>
            <div>
                <p>Location</p>
                <p>{props.event.location && props.event.location.length > 0 ? props.event.location : '...'}</p>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <div>
                Attending:
            </div>
            <div>
                {props.event.participants && props.event.participants.length > 0 ? props.event.participants.length : 'You can be the first attendee!'}
            </div>
        </div>
    </div>
)

export default ContentTab