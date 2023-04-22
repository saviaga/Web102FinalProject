import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { supabase } from "../client";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const sortPostsByCount = async () => {
    const { data } = await supabase
      .from("forum")
      .select()
      .order("count", { ascending: false });

    // set state of posts
    setPosts(data);
  };

  const sortPostsByCreatedAt = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setPosts(sortedPosts);
    setSortBy("created_at");
  };

  useEffect(() => {
    if (Array.isArray(props.data)) {
      setPosts(props.data);
    }
    sortPostsByCount();
  }, [props]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "" || post.type === selectedType)
  );

  return (
    <div className="ReadPosts">
      <div>
        <div className="order-by-container">
         
          <button onClick={sortPostsByCount}>Most Popular</button>
          <button onClick={sortPostsByCreatedAt}>Newest</button>
        </div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
           className="search-bar" 
        />
        <div>
          <input
            type="radio"
            id="all"
            name="type"
            value=""
            checked={selectedType === ""}
            onChange={() => setSelectedType("")}
          />
          <label htmlFor="all">All</label>
          <input
            type="radio"
            id="question"
            name="type"
            value="question"
            checked={selectedType === "question"}
            onChange={() => setSelectedType("question")}
          />
          <label htmlFor="question">Question</label>
          <input
            type="radio"
            id="opinion"
            name="type"
            value="opinion"
            checked={selectedType === "opinion"}
            onChange={() => setSelectedType("opinion")}
          />
          <label htmlFor="opinion">Opinion</label>
        </div>
      </div>
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <div key={post.id}>
            <Card
              id={post.id}
              title={post.title}
              created={post.created_at}
              count={post.count}
              type={post.type}
            />
          </div>
        ))
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default ReadPosts;
