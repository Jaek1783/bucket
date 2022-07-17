import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
const Detail = () => {
  const params = useParams();
  const bucket_list = useSelector((state) => state.Bucket.list);
  const index = params.index;
  let navigate = useNavigate();
  return (
    <DetailStyle>
      <p>{bucket_list[index]? bucket_list[index].text: ""}</p>
      <p>상세페이지 만들기 작업 중</p>

      <button
        onClick={() => {
          navigate(`/bucket`);
          
        }}
      >
        처음으로
      </button>
    </DetailStyle>
  );
};
export default Detail;
const DetailStyle = styled.div`
  p{
    padding-bottom:1rem;
  }
  padding-top:1rem;
  button {
    width:70px;
    height:50px;
    background-color: antiquewhite;
    border: none;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    border-radius: 15px;
    font-size:12px;

  }
  button:active {
    border: none;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
`;
