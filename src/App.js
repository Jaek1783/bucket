import "./styles.css";
import List from "./List";
import React, { useRef,useEffect } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Detail from "./Detail";
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
      <header><h1>나의 버킷리스트</h1></header>
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
        <Route path="/bucket" element={<List />} />
        <Route path="/detail/:index" element={<Detail />} />
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
    background-color: #fff;
    border: none;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-left: 5px;
    padding: 5px;
    border-radius: 15px;
  }
  button:active {
    border: none;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  input {
    width: 60%;
    height: 50px;
    border: 3px dotted antiquewhite;
    border-radius: 15px;
    padding: 0 50px;
    font-size: 20px;
  }
  input:focus {
    outline: none;
    border: 3px dotted skyblue;
  }
`;

const ButtonStyled = styled.button`
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
