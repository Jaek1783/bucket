import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { completeBucketFB, deleteBucketFB, retryBucketFB } from "./Bucket";
// import { db  } from "./firebase";
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";


const List =() => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Bucket.list);
  let navigate = useNavigate();
  return (
    <MyUl>
      {data.map((list, index) => {
        return (
          <li key={index}>
            <StyledList
              completed={list.completed}
              onClick={() => {
              // onClick={() => {navigate(`/detail/` + index);
            }}>{list.text}</StyledList>
            {/* }}>{list.text} <span>클릭해서 상세보기</span></StyledList> */}
            <StyledButton
              onClick={() => {
                dispatch(deleteBucketFB (data[index].id ));
              }}
            >
              삭제
            </StyledButton>
            <StyledButton
              onClick={() => {
                // dispatch(completeBucket(index));
                dispatch(completeBucketFB(data[index].id));
              }}
            >
              완료
            </StyledButton>
            <StyledButton
              onClick={() => {
                // dispatch(completeBucket(index));
                // dispatch(completeBucketFB(data[index].id));
                  dispatch(retryBucketFB(data[index].id));
              }}
            >
              <span>도전</span>
            </StyledButton>
          </li>
        );
      })}
    </MyUl>
  );
};
export default List;

const MyUl = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column-reverse;
  li {
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid #ccc;
    margin: 0;
    margin-bottom: 1em;
    padding: 1em;
    font-size: 0.9em;
    list-style-type: none;
    text-align: left;
  }
`;

const StyledButton = styled.button`
  background-color: #fff;
  border: none;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-left: 5px;
  padding: 5px;
  border-radius: 15px;
  :active {
    border: none;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
`;

const StyledList = styled.p`
  width: 80%;
  height: 2rem;
  text-align: center;
  background-color: ${(props) =>
    props.completed === true ? "skyblue" : "antiquewhite"};
  color: ${(props) => (props.completed === "true" ? "#fff" : "#000")};
  line-height: 2rem;
  font-size: 1rem;
  position:relative;
  span{
    position:absolute;
    right:0;
    font-size:.7rem;
    padding-right:100px;
  }
`;
