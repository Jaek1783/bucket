// bucket.js
import { db  } from "./firebase";
import { collection,getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
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
const RETRY = "bucket/RETRY";
const DELETE = "bucket/DELETE";

// Action Creators
export function createBucket(bucket) {
  return { type: CREATE, bucket: bucket };
}
export function completeBucket(bucket_index) {
  return { type: COMPLETE, bucket_index };
}
export function retryBucket(bucket_index) {
  return {type: RETRY , bucket_index};
}
export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}
export function loadBucket (bucket_list){
  return{type:LOAD, bucket_list};
}

//middleweares
export const loadBucketFB = ()=>{
  return async function (dispatch){
    const bucket_data = await getDocs(collection(db, "bucket"));
    let bucket_list = [];
    bucket_data.forEach((b)=>{
      // bucket_list = [...bucket_list, {...b.data()}];
      bucket_list.push({id:b.id,  ...b.data()});
    });
    dispatch(loadBucket(bucket_list));

  }
}

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
  const docRef = await addDoc(collection(db, "bucket"),bucket);
  // const _bucket = await getDoc (docRef);  
  const bucketData = {id: docRef.id, ...bucket};
// console.log(docRef);
  dispatch(createBucket(bucketData)) ;
  }
}
export const completeBucketFB = (bucket_id) => {
  return async  function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
   await updateDoc(docRef, {completed:true});
  //  console.log(getState().Bucket);
   const bucket_list = getState().Bucket.list;
   const bucket_index = bucket_list.findIndex((b)=>{
    return b.id === bucket_id;
   })
   dispatch(completeBucket(bucket_index));
  }
}
export const retryBucketFB = (bucket_id) => {
  return async  function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
   await updateDoc(docRef, {completed:false});
   const bucket_list = getState().Bucket.list;
   const bucket_index = bucket_list.findIndex((b)=>{
    return b.id === bucket_id;
   })
   dispatch(retryBucket(bucket_index));
  }
}
export const deleteBucketFB = (bucket_id)=> {
  return async function (dispatch, getState){
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);
    const bucket_list = getState().Bucket.list;
    const bucket_index = bucket_list.findIndex((b)=>{
     return b.id === bucket_id;
    })
    dispatch(deleteBucket(bucket_index));
  }
}
// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      const new_list = [...state.list, action.bucket];
      return { list: new_list };
    }
    case "bucket/COMPLETE": {
      const new_list = state.list.map((l, idx) => {
        if (action.bucket_index === idx) {
          return { ...l, completed:true };
        } else {
          return l; 
        }
      });
      return { list: new_list };
    }
    case "bucket/RETRY": {
      const new_list = state.list.map((l, idx) => {
        if (action.bucket_index === idx) {
          return { ...l, completed:false };
        } else {
          return l; 
        }
      });
      return { list: new_list };
    }
    case "bucket/DELETE": {
      const new_list = state.list.filter((l, idx) => {
        return action.bucket_index !== idx;
      });
      return { list: new_list };
    }
    case "bucket/LOAD":{
      return {list: action.bucket_list}
    }
    default:
      return state;
  }
}
