import React, { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from "../client";
import moment from 'moment';



const Card = ({ id, title, created, image, count,type }) => {



const formattedDate = moment(created).fromNow();

  return (
    <div className="Card">
      <Link to={'edit/' + id}><img className="moreButton" alt="edit button" src={more} /></Link>
      <Link to={'PostDetail/' + id} >
      <h2 className="title">{title}</h2>
      </Link>
      <h2 className="created_at">Updated {formattedDate}</h2>
      <p className="image">{image}</p>
      <text className="betcount"  >👍 Upvotes: {count}</text>
      <text className="created_at"  >Type: {type}</text>
    </div>
  );
};

export default Card;
