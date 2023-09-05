import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

function App() {

  const [data, setData] = useState([]);
  const [dataperpage, setDataPerPage] = useState(10);
  const [currentpage, setCurrentpage] = useState(1);


  const totalpages = Math.ceil(data.length/dataperpage);
  const pages = [...Array(totalpages+1).keys()].slice(1);

  const lastindex = currentpage * dataperpage;
  const firstindex = lastindex - dataperpage;

  const visibaledata = data.slice(firstindex,lastindex);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  },[])
  console.log(data);

  const previousbutton = () => {
    if (currentpage !== 1) {
      setCurrentpage(currentpage - 1)
    }
  };

  const nextbutton = () =>{
    if (currentpage !== totalpages) {
      setCurrentpage(currentpage + 1)
    }
  }

  return (
    <>
      <div className="main-div">
        {visibaledata.map((user) => {
          return (
            <div key={user.id} className="details-div">
              <h3>ID :<span>{user.id}</span></h3>
              <h3>TITLE :<span>{user.title}</span></h3>
              <h3>BODY :<span>{user.body}</span></h3>
            </div>
          )
        })}
      </div>
      <div style={{textAlign:"center"}}>
      <button onClick={() => setCurrentpage(1)} >firstpage</button>
        <button onClick={previousbutton} disabled={currentpage==1}>prev</button>
        {pages.map((page) => {
          return(
            <button key={page} onClick={() => setCurrentpage(page)} className={`${currentpage==page ? "active-btn": ""} buttons`}>{page}</button>
          )
        })}
        <button onClick={nextbutton} disabled={currentpage==totalpages}>next</button>
        <button onClick={() => setCurrentpage(totalpages)}>lastpage</button>
        <select onChange={(e) => setDataPerPage(e.target.value) }>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>
    </>
  )
}

export default App
