import { Link } from "react-router-dom";

const EventDetail = ({ id, image, date, eventName, groupName }) => {
  return (
    <div>
      <div>
        <p>{image}</p>
      </div>
      <div>
        <p>{date}</p>
        <p>{eventName}</p>
        <p>{groupName}</p>
      </div>
    </div>
  );
};

export default EventDetail;
