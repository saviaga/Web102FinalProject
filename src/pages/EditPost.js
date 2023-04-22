import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";
import { supabase } from "../client";

const EditPost = ({ data }) => {
  const { id } = useParams();
  const post = data.filter((item) => item.id === Number(id))[0];

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image);
  const [type, setType] = useState(post.type);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await supabase
        .from("forum")
        .update({
          title,
          description,
          created_at: new Date().toISOString(),
          image,
          type
        })
        .eq("id", id);
      window.location = "/";
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (event) => {
    event.preventDefault();
    try {
      await supabase.from("forum").delete().eq("id", id);
      alert("Post deleted successfully!");
      window.location = "/";
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <br />
        <label htmlFor="image">Image</label> <br />
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <br />
        <br />
        <label htmlFor="type">Type</label>
        <br />
        <input
          type="radio"
          id="opinion"
          name="type"
          value="opinion"
          checked={type === "opinion"}
          onChange={() => setType("opinion")}
        />
        <label htmlFor="opinion">Opinion</label>
        <br />
        <input
          type="radio"
          id="question"
          name="type"
          value="question"
          checked={type === "question"}
          onChange={() => setType("question")}
        />
        <label htmlFor="question">Question</label>
        <br />
        <br />

        <input type="submit" value="Submit" />
        <button className="deleteButton" onClick={deletePost}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;
