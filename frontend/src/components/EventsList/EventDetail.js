// import { Link } from "react-router-dom";
const formatDate = (date) => {
  const dateString = new Date(date).toDateString();
  const dateStringSplit = dateString.split(' ');
  const formattedDate = `${dateStringSplit[0]}, ${dateStringSplit[1]} ${dateStringSplit[2]}`;
  return formattedDate;
};

const formatTime = (time) => {
  const timeString = new Date(time).toLocaleTimeString();
  const timeStringSplit = timeString.split(':');
  const formattedTime = `${timeStringSplit[0]}:${timeStringSplit[1]} ${timeStringSplit[2][3]}M`;
  return formattedTime;
};

const EventDetail = ({ id, image, date, eventName, groupName }) => {
  return (
    <div className='event-list-detail'>
      <div className='event-list-image-container'>
        <img className='event-list-image' src={image} alt='Event'></img>
      </div>
      <div className='event-list-info'>
        <div className='event-list-date-container'>
          <div className='event-list-date'>{`${formatDate(date)} @ ${formatTime(date)}`}</div>
        </div>
        <p className='event-list-event-name'>{eventName}</p>
        <div className='event-list-group-name-container'>
          <p className='event-list-group-name'>{groupName}</p>
        </div>
        <div className='event-list-attendees-container'>
          <div className='event-list-attendees'>0 attendees</div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
