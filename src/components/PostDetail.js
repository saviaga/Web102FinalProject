import { useEffect } from "react";
import React, { useState } from 'react'
import { supabase } from "../client";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentSection from "../components/CommentSection"

import "./PostDetail.css"
const PostDetail = ({ data }) => {
  useEffect(() => {
    console.log("data", data);
  }, []);

  const { id } = useParams();
  const post = data.filter((item) => item.id === Number(id))[0];
  const [betCount, setBetCount] = useState(post.count);

const updateCount = async (event) => {
  event.preventDefault();
  try {
    const { error } = await supabase
      .from("forum")
      .update({
        count: betCount + 1
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
    setBetCount(betCount + 1);
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

useEffect(() => {
  const fetchPost = async () => {
    try {
      const { data: updatedPost, error } = await supabase
        .from("forum")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }
      setBetCount(updatedPost.count);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  fetchPost();
}, [id, betCount]);

const isVideoUrl = (url) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(.+)/;
  return youtubeRegex.test(url);
};


  return (
<div className="card">
  <form>
    <div className="card-header">    
      <h4 className="card-title">Title:</h4> 
      <div tid="title" name="title">
        {post.title}
      </div>
    </div>
    <div className="card-body">
      <h4 className="card-title">Description:</h4> 
      <div tid="description" name="description">
        {post.description}
      </div>
      <h4 className="card-title">Type:</h4> 
      <div tid="type" name="type">
        {post.type}
      </div>
      
      <h4 className="card-title">Image/Video:</h4> 
      {isVideoUrl(post.image) ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${post.image.split('v=')[1]}`}
             
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded YouTube video"
            ></iframe>
          ) : (
            <img
              src={post.image}
              alt=""
              style={{ maxWidth: '500px' }}
            />
          )}

      <h4 className="card-title">Upvotes:</h4> 
      <button className="betButton" onClick={updateCount} >👍 Upvotes:  {betCount}</button>

     
     
    </div>
    <div className="card-footer">
      <Link to={"../edit/" + post.id}>
        <button>Wanna edit/delete this Post?</button>
      </Link>
    </div>
  </form>
  <CommentSection postId={post.id} />
</div>

  );
};

export default PostDetail;
