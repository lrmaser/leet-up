// import { Link } from "react-router-dom";

const EventDetail = ({ id, image, date, eventName, groupName }) => {
  return (
    <div className='event-list-detail'>
      <div className='event-list-image-container'>
        <img className='event-list-image' src={image} alt='Event'></img>
      </div>
      <div className='event-list-info'>
        <div className='event-list-date-container'>
          <time className='event-list-date' dateTime={date}>{date}</time>
        </div>
        <p className='event-list-event-name'>{eventName}</p>
        <div className='event-list-group-name-container'>
          <p className='event-list-group-name'>{groupName}</p>
        </div>
        <div className='event-list-attendees'></div>
      </div>
    </div>
  );
};

export default EventDetail;
