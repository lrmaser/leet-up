import { Link } from "react-router-dom";

const GroupDetail = ({ id, name, details }) => {
  return (
    <Link to={`/groups/${id}`}>
      <div className='group-list-detail'>
        <div className='group-list-image-container'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmiX6KlsV8U1SURHBcVTfPRgqyMUctbciwCg&usqp=CAU' alt='Group of People Icons'></img>
        </div>
        <div className='group-list-info'>
          <p className='group-list-group-name'>{name}</p>
          <p className='group-list-about'>{details}</p>
        </div>
      </div>
    </Link>
  );
};

export default GroupDetail;
