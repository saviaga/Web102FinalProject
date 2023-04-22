import { createClient } from "@supabase/supabase-js";
import { supabase } from "../client";

import { useState, useEffect } from "react";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Retrieve all comments for the current post from Supabase
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("post_id", postId);
      if (error) console.log("Error fetching comments:", error.message);
      else setComments(data);
      console.log(data);
    }
    fetchComments();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add the new comment to the 'comments' table in Supabase
    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      content: newComment,
    });
    if (error) console.log("Error adding comment:", error.message);
    else {
      setNewComment("");
      setComments((prevComments) => [
        ...prevComments,
        { post_id: postId, content: newComment },
      ]);
    }
  };

  return (
    <div>
      <h3>Comments:</h3>
      {comments && comments.length > 0 && (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Leave a comment:
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentSection;
