import { Link } from "react-router-dom";

const GroupDetail = ({ id, name, details }) => {
  return (
    <Link to={`/groups/${id}`}>
      <div className='group-list-detail'>
        <div className='group-list-icon-container'>
          <i className="fas fa-users"></i>
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
