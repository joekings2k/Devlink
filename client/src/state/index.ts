import {createSlice, PayloadAction} from "@reduxjs/toolkit"


export interface AppState {
  mode:string,
  user:any,
  token:string|null,
  posts:any[],
}
const initialState:AppState ={
  mode:"light",
  user:null,
  token:null,
  posts:[]
}

export const authSlice =createSlice({
  name:"auth",
  initialState,
  reducers:{
    setMode:(state:AppState)=>{
      state.mode =state.mode ==="light"?"dark" : "light"
    },
    setLogin :(state:AppState,action:PayloadAction<{user:any;token:string|null}>)=>{
      state.user = action.payload.user
      state.token = action.payload.user
    },
    setLogout :(state:AppState)=>{
      state.user=null
      state.token =null
    },
    setFriends :(state:AppState ,action:any)=>{
      if(state.user){
        state.user.friends  = action.payload.friends
      }else{
        console.log("user non-existent ");
        
      }
    },
    setPosts:(state:AppState,action:any)=>{
      state.posts= action.payload.posts
    },
    setPost: (state:AppState,action:any)=>{
      const updatedPosts = state.posts.map((post)=>{
        if(post._id === action.payload.post_id) return action.payload.post
        return post
      })
      state.posts=updatedPosts
    }
  }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost}=authSlice.actions
export default authSlice.reducer