// bucket.js
import { db  } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
const initState = {
  list: [
    // { text: "혼자 여행 하기", completed: "false" },
    // { text: "해외 여행 하기", completed: "false" },
    // { text: "고양이 키우기", completed: "false" }
  ]
};
// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const COMPLETE = "bucket/COMPLETE";
const DELETE = "bucket/DELETE";

// Action Creators
export function createBucket(bucket) {
  return { type: CREATE, bucket: bucket };
}
export function completeBucket(bucket_index) {
  return { type: COMPLETE, bucket_index };
}
export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}
export function loadBucket (bucketStore){
  return{type:LOAD, bucketStore};
}

export const bucketFirebase = ()=>{
  return async function (dispatch){
    const bucket_data = await getDocs(collection(db, "bucket"));
    // console.log(bucket_data);
    let bucket_list = [];
    bucket_data.forEach((doc)=>{
      bucket_list = [...bucket_list, {...doc.data()}]
      // bucket_list.push({...doc.data()});
    });
    console.log(bucket_list);
    dispatch(loadBucket(bucket_list));
  }
}
// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/CREATE": {
      const new_list = [...state.list, action.bucket];
      return { list: new_list };
    }
    case "bucket/COMPLETE": {
      const new_list = state.list.map((l, idx) => {
        // console.log(l);
        // console.log(action.bucket_index !== idx, action.bucket_index, idx);
        if (action.bucket_index === idx) {
          return { ...l, completed: "true" };
        } else {
          return l;
        }
      });
      return { list: new_list };
    }
    case "bucket/DELETE": {
      const new_list = state.list.filter((l, idx) => {
        // console.log(action.bucket_index !== idx, action.bucket_index, idx);
        return action.bucket_index !== idx;
      });
      return { list: new_list };
    }
    case "bucket/LOAD":{
      return {list: action.bucketStore}
    }
    default:
      return state;
  }
}
