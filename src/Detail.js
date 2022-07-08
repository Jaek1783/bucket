import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Detail = () => {
  const params = useParams();
  const bucket_list = useSelector((state) => state.Bucket.list);
  const index = params.index;
  let navigate = useNavigate();
  return (
    <div>
      <p>{bucket_list[index]? bucket_list[index].text: ""}</p>
      <button
        onClick={() => {
          navigate(`/bucket`);
          
        }}
      >
        처음으로
      </button>
    </div>
  );
};
export default Detail;
