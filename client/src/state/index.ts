import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface postState {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  likes: { [userId: string]:boolean };
  comments: [];
  picture: { public_id: string; secure_url: string };
  userPicture: { public_id: string; secure_url: string };
}
interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  picture: {};
  occupation: String;
}

export interface AppState {
  mode: string;
  user: any;
  token: string | null;
  posts: postState[];
}
const initialState: AppState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state: AppState) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (
      state: AppState,
      action: PayloadAction<{ user: any; token: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state: AppState) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (
      state: AppState,
      action: PayloadAction<{ friends: UserState }>
    ) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user non-existent ");
      }
    },
    setPosts: (state: AppState, action: PayloadAction<{ posts: any }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state: AppState, action: PayloadAction<{ post?: any ; post_id?:any }>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
