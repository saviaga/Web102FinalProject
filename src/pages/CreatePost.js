import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';


const CreatePost = () => {
  const [post, setPost] = useState({ title: '',  description: '', image:'', type: 'opinion'  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
     // Check if image is a valid URL
  if (post.image && !isValidUrl(post.image)) {
    alert('No valid image URL provided, leave blank if no image to upload');
    return;
  }
    await supabase.from('forum')
    .insert({title: post.title,  description: post.description, image: post.image,type: post.type, created_at: new Date().toISOString()})
    .select();
    window.location = "/";
  };
  return (
        <div>
             <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} placeholder="Enter a title"/><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} placeholder="Content (Optional)">
                </textarea>
                <br/>
                <label htmlFor="type">Type</label><br />
        <input type="radio" id="opinion" name="type" value="opinion" checked={post.type === 'opinion'} onChange={handleChange} />
        <label htmlFor="opinion">Opinion</label><br />
        <input type="radio" id="question" name="type" value="question" checked={post.type === 'question'} onChange={handleChange} />
        <label htmlFor="question">Question</label><br /><br />

                <label htmlFor="image">Image/Video URL</label> <br />
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} placeholder="Image (Optional)"/><br />
                <br/>
               
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost;