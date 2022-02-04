import Footer from "./Footer";
import { useState } from "react/cjs/react.development";
import navbarItems from "../shared/navbarItems";
import { getPosts, createPost, deletePost } from "../Services/postService";
import Navbar from "./Navbar";
import Post from "./Post";
import { useEffect } from "react";

const Home = () => {
  
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [isPend, setIsPend] = useState(false);
  const [err, setErr] = useState("");

  const delPost = (id) => {
    deletePost(id).then(d => {
      
      })
      .catch(error => {
        
      });
  }

  const create = (post) => {
    setIsPend(true);
    createPost(post).then(d => {
    setIsPend(false);
    setName("");
    setPost("");
    })
    .catch(error => {
      setErr(error.message);
      setIsPend(false);
    });
  }

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);

  const min = (a, b) => {
    return a < b ? a : b;
  };

  const cutText = (text) => {
    var res = "";
    var text = text.split(" ");
    for (var i = 0; i < min(text.length, 25); i++) {
      res += text[i] + " ";
    }
    return res + " ...";
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getPosts().then(d => {
      let res = [];
      d.data.forEach(element => {
          element.post = cutText(element.post);
          res.push(element);
      });
      setIsPending(false);
      setData(res.reverse());
    })
    .catch(error => {
      setIsPending(false);
      setError(error.message);
    });
    return () => abortCont.abort();
});

  return (
    <>
      <Navbar items={navbarItems.in} />
      <div className="container">
        <h2>Create new post</h2>
        <form onSubmit={(e) => {e.preventDefault(); create({name : name, post : post})}}>
          <div className="form-group">
            <label>Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id=""
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Post</label>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="form-control"
              placeholder="What do you think in ..."
              style={{height : 120}}
            />
          </div>
          {!isPend && <button type="submit" className="btn btn-primary" desabled>
            Create Post
          </button>}
          {isPend && <button type="submit" className="btn btn-primary">
            Creating Post...
          </button>}
          
        </form>

        {isPending && (<h3>Pending...</h3>)}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {data && data.map((d) => <Post post={d} isHome={true} key={d.id} delPost={delPost} />)}
      </div>
      <Footer />
    </>
  );
};

export default Home;
