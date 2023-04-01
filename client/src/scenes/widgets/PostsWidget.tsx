import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {AppState, setPosts} from "state"
import { PostWidget } from "./PostWidget"

interface PostsWidgetProps{
  userId ?:string ;
  isProfile? :Boolean;
}
interface PostMapContent {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  picture: { public_id: string; secure_url: string };
  userPicture: { public_id: string; secure_url: string };
  likes: { [userId: string]: boolean };
  comments: [];
}

export const PostsWidget =({userId,isProfile =false }:PostsWidgetProps)=>{
  const dispatch = useDispatch();
  const Posts = useSelector((state: AppState) => state.posts);
  const token = useSelector((state: AppState) => state.token);


    
  
  const getPosts = async () => {
    
    const response = await fetch("http://localhost:3001/posts",
     {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <>
      {Posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picture,
          userPicture,
          likes,
          comments,
        }: PostMapContent) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picture={picture.secure_url}
            userPicture={userPicture.secure_url}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
}