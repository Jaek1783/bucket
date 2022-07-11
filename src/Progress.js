import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Progress = () => {
  const data = useSelector((state) => state.Bucket.list);
  let count = 0;
  data.map((b) => {
    if (b.completed === true) {
      count++;
    }
  });
  return (
    <Container>
      <View width={(count / data.length) * 100 + "%"}></View>
      <Dot></Dot>
      <span>{(count / data.length) * 100+ "%" }</span>
    </Container>
  );
};
export default Progress;

const Container = styled.div`
  width: 90%;
  margin: 0 auto 1rem;
  height: 15px;
  border-radius: 15px;
  background: #fdfdfd;
  display: flex;
    span{
      padding-left:10px;
    }
`;
const View = styled.div`
  transition: 0.5s ease-in-out;
  width: ${(props) => props.width};
  height: 15px;
  background-color: skyblue;
`;
const Dot = styled.div`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid skyblue;
  margin: -5px -5px -5px -10px;
  background-color: #fff;
`;
