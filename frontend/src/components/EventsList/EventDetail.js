import { Link } from "react-router-dom";

const EventDetail = ({ id, image, date, name, categoryId }) => {
  return (
    <div>
      <div>
        <p>{image}</p>
      </div>
      <div>
        <p>{date}</p>
        <p>{name}</p>
        <p>{categoryId}</p>
      </div>
    </div>
  );
};

export default EventDetail;
