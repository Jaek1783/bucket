import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Detail = (props) => {
  const params = useParams();
  const list_data = useSelector((state) => state.Bucket.list);
  let navigate = useNavigate();
  return (
    <div>
      <p>{list_data[params.index].text}</p>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        처음으로
      </button>
    </div>
  );
};
export default Detail;
