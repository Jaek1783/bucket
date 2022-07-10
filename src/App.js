import "./styles.css";
import List from "./List";
import React, { useRef,useEffect } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Detail from "./Detail";
import Progress from "./Progress";
import { addBucketFB,loadBucketFB  } from "./Bucket";

export default function App() {
  useEffect(()=>{
    dispatch(loadBucketFB ());
  },[]);
  const myRef = useRef(null);
  const dispatch = useDispatch();
  const addList = async () => {
    const value = myRef.current.value;
    dispatch(addBucketFB({ text: value, completed: "false" }));  


  };
  return (
    <div className="App">
      <HeaderStyle>
        <h1>나의 버킷리스트</h1>
      </HeaderStyle>
      <Progress />
      <InputStyle>
        <input type="text" ref={myRef} />
        <button
          onClick={() => {
            addList();
            myRef.current.value = "";
          }}
        >
          올리기
        </button>
      </InputStyle>
      <Routes>
        <Route path="/" element={<List/>} />
      </Routes>
      <ButtonStyled
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        맨 위로
      </ButtonStyled>
    </div>
  );
}

const InputStyle = styled.div`
  padding-bottom: 1em;
  border-bottom: 1px dotted #000;
  position: relative;
  button {
    width:50px;
    height:50px;
    background-color: antiquewhite;
    border: none;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-left: 2rem;
    padding: 5px;
    border-radius: 15px;
  }
  button:active {
    border: none;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  input {
    width: 70%;
    height: 50px;
    border: 3px dotted antiquewhite;
    border-radius: 15px;
    padding: 0 50px;
    margin-bottom:1rem;
    font-size: 20px;
  }
  input:focus {
    outline: none;
    border: 3px dotted skyblue;
  }
`;
const HeaderStyle = styled.header`
  display:flex;
  h1 {
    width: 80%;
    border-radius: 15px;
    font-size: 1.4em;
    margin: 0 auto 1rem;
    color: skyblue;
    background-color: antiquewhite;
    padding: 0.4rem 0;
  }
`;

const ButtonStyled = styled.button`
width:50px;
height:50px;
  position: fixed;
  z-index:9999;
  right: 1%;
  bottom: 10%;
  background-color: antiquewhite;
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