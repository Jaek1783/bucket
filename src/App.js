import "./styles.css";
import List from "./List";
import List_Tablet from "./List_Tablet";
import React, { useRef,useEffect,useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Progress from "./Progress";
import { addBucketFB,loadBucketFB,completeBucketFB  } from "./Bucket";
import { useMediaQuery } from "react-responsive";

export default function App() {
  const timeRef = useRef(null);
  const dayRef = useRef(null);
  const [text , setText] = useState("");
  const myRef = useRef(null);
  const dateRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    let time = 86400;
    let timeSet = "";
    let timeHours = "";
    let timeMin = "";
    let timeSec = "";

    let hours = "";
    let min = "";
    let sec = "";
    setInterval(()=>{
      const today = new Date();
      const todayHours = today.getHours();
      const todayMin = today.getMinutes();
      const todaySec = today.getSeconds();

  
        timeSet = parseInt(time/60);
        timeHours = parseInt(timeSet/60);
        timeMin = timeSet%60;
        timeSec = time%60;
        time --;

        hours = timeHours - todayHours;
        min = timeMin - todayMin;
        
      timeRef.current.innerHTML = `${hours<10 ? `0${hours}`:hours}시간 ${min<10 ? `0${min}`:min} 분 ${timeSec<10? `0 ${timeSec}`
       : timeSec} 초`;
      dayRef.current.innerHTML = `${todayHours<10 ? `AM 0${todayHours}`:todayHours > 12 ? `PM 0${todayHours-12}`
       : `AM ${todayHours}`}:${todayMin<10 ? `0${todayMin}`:todayMin}:${todaySec<10 ? `0${todaySec}`:todaySec}`;
       if(time < 0 ){
        time = 86400;
       }
    },1000);
    return () => clearInterval(timer);
  },[]);
  const isTablet = useMediaQuery({
    query:"(min-width:980px)"
  });
  useEffect(()=>{
    dispatch(loadBucketFB ());
  },[]);


  const addList = async () => {
    const value = myRef.current.value;
    const date = dateRef.current.value;
    dispatch(addBucketFB({date:date, text: value, completed: "false" }));
  };
  const textCheck = (e)=>{
    setText(e.target.value);
  }
  return (
    <div className="App">
      <HeaderStyle>
        <h1>매일쓰는 계획표</h1>
        <div className="timer">
          <div>현재 시간 : <span ref={dayRef}></span> </div>
          <div>오늘 남은시간 : <span ref={timeRef}></span> </div>
        </div>

      </HeaderStyle>
      <Progress />
      <InputStyle isTablet={isTablet}>
        <input type="date" ref={dateRef}/>
        <input type="text" ref={myRef} placeholder="오늘의 계획을 적어주세요" value={text} onChange={(e)=>{
          textCheck(e)
          }}/>
        <button
          onClick={() => {
            if(text !== ""){
              addList();
              setText('');
            }
            else{
              alert('도전을 작성해 주세요')
            }
          }}
        >
          올리기
        </button>
      </InputStyle>
      {isTablet ? <List/>:<List_Tablet/>}
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

const HeaderStyle = styled.header`
  h1 {
    width: 100%;
    border-radius: 15px;
    font-size: 1.4em;
    margin: 0 auto 1rem;
    color: antiquewhite;
    background-color: skyblue;
    padding: 0.4rem 0;
  }
  div.timer{
    display:flex;
    justify-content:space-evenly;
    color:skyblue;
    font-size: 1.4em;
    padding:1rem;
  }
`;
const InputStyle = styled.div`
  padding-bottom: 1em;
  border-bottom: 1px dotted #000;
  margin-bottom:1em;
  position: relative;
  button {
    width:50px;
    height:50px;
    position:${props=>props.isTablet ? "":"absolute"};
    top:75px;
    right:5%;
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