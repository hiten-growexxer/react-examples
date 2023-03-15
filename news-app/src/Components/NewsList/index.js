import React, { useEffect, useState } from 'react';
import NewsItem from '../NewsItem.js';
import axios from 'axios';
import './index.css';
export default function NavList({query}) {
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;

  const getArticle = async (currPage) => {
    setLoading(true);
    try{
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=8cdef79c4bd64f2d9156630a5914264d&page=${currPage}&pageSize=8&sortBy=popularity`;
      const res = await axios.get(encodeURI(url));
      setArticle(res.data.articles);
      setTotal(res.data.totalResults);
    } catch(error){
      alert('error')
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('setting page to default')
    setPage(1);
    getArticle(1);
  },[query])


  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
    getArticle(newPage);
  };
  return (
    <>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',alignItems:'center' }}
      >
        {loading && <div className='loader'></div>}
        {!loading &&
          article.map((article) => {
            return <NewsItem key={article.url} article={article} />;
          })}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '1em',
        }}
      >
        <button
          style={
            page <= 1
              ? {
                  background: 'grey',
                  padding: '1em',
                  color: 'white',
                  width: '8em',
                }
              : {
                  background: '#0e0c4c',
                  padding: '1em',
                  color: 'white',
                  width: '8em',
                  cursor: 'pointer',
                }
          }
          disabled={page <= 1}
          onClick={() => {
            onPageChangeHandler(page - 1);
          }}
        >
          Previous
        </button>
        <button
          style={
            page >= Math.ceil(total / pageSize)
              ? {
                  background: 'grey',
                  padding: '1em',
                  color: 'white',
                  width: '8em',
                }
              : {
                  background: '#0e0c4c',
                  padding: '1em',
                  color: 'white',
                  cursor: 'pointer',
                  width: '8em',
                }
          }
          disabled={page >= Math.ceil(total / pageSize)}
          onClick={() => {
            onPageChangeHandler(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
