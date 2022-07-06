// bucket.js
const initState = {
  list: [
    { text: "혼자 여행 하기", completed: "false" },
    { text: "해외 여행 하기", completed: "false" },
    { text: "고양이 키우기", completed: "false" }
  ]
};
// Actions
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
    default:
      return state;
  }
}
