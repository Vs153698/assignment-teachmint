import { useNavigate } from "react-router-dom";
import "./Card.css";
import { generateRandomLightColor } from "../../HelperFunction";
const Card = ({ user, post }) => {
  const navigate = useNavigate();
 
  const postData = post.filter((post) => post.userId === user.id);
  return (
    <div className="mainCard">
      <div
        onClick={() => navigate(`/detail/${user.id}`)}
        className="cardContainer"
        style={{ backgroundColor: generateRandomLightColor() }}
      >
        <div>
          <span className="cardSpanTag">Name: </span>
          {user.name}
        </div>
        <div>
          <span className="cardSpanTag">Post: </span>
          {postData?.length}
        </div>
      </div>
    </div>
  );
};

export default Card;
