import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { completeBucket, deleteBucket } from "./Bucket";

const List = () => {
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
                navigate(`/detail/` + index);
                // console.log(index);
              }}
            >
              {list.text}
            </StyledList>
            <StyledButton
              onClick={() => {
                dispatch(deleteBucket(index));
              }}
            >
              삭제
            </StyledButton>
            <StyledButton
              onClick={() => {
                dispatch(completeBucket(index));
              }}
            >
              완료
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
  cursor: pointer;
  width: 80%;
  height: 2rem;
  text-align: center;
  background-color: ${(props) =>
    props.completed === "true" ? "#ccc" : "antiquewhite"};
  color: ${(props) => (props.completed === "true" ? "#fff" : "#000")};
  line-height: 2rem;
  font-size: 1rem;
`;
