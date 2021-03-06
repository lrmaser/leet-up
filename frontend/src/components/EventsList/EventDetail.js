import { Link } from "react-router-dom";

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
    <Link to={`/events/${id}`}>
      <div className='event-list-detail'>
        <div className='event-list-image-container'>
          <img className='event-list-image' src={image.length > 0 ? image : 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt='Event'></img>
        </div>
        <div className='event-list-info'>
          <div className='event-list-date'>{`${formatDate(date).toUpperCase()} @ ${formatTime(date).toUpperCase()}`}</div>
          <p className='event-list-event-name'>{eventName}</p>
          <p className='event-list-group-name'>{groupName}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventDetail;
