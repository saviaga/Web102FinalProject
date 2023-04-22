import './App.css';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from "react-router-dom";
import { supabase } from "./client";
import React,{ useEffect,useState } from "react";
import PostDetail from "./components/PostDetail";


const App = () => {
  const [posts, setPosts] = useState({});
  const [list, setList] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [sortedByCount, setSortedByCount] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);

  

  const sortPostsByCount = async () => {
    const { data } =await supabase
      .from('forum')
      .select()
      .order('count',  { ascending: false });
    console.log(data);
    setSortedByCount(true);
    setPosts(data);
    setSortBy("count");
  };

  const sortPostsByCreatedAt = async() => {
    const { data } = await supabase
    .from('forum')
    .select()
    .order('created_at',  { ascending: false });
  console.log(data);
  setSortedByDate(true);
  setPosts(data);
  setSortBy("created_at");

  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("forum").select();
      if (sortedByCount) {
        data.sort((a, b) => b.count - a.count);
      }else {
          if (sortedByDate)
        data.sort((a, b) => b.created_at - a.created_at);

      }
      setPosts(data);
    };
    fetchPosts();
  }, []);

  

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost  data={posts}/>
    },
    {
      path: "PostDetail/:id",
      element: <PostDetail  data={posts}/>,
    },
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h3>👍 Forum 1.0</h3>
        <div>

      </div>
        <Link to="/"><button className="headerBtn"> Explore Posts 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit Posts 🏆 </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
