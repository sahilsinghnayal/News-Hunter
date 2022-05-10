import React, { useEffect,useState } from 'react'
import Loading from './Loading';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'

const News =(props)=>{
 const [articles, setArticles] = useState([])
 const [loading, setLoading] = useState(false)
 const [page, setPage] = useState(1)
 const [totalresult, setTotalresult] = useState(0)
 
 const updatenews=async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=${page}&pageSize=${props.pageSize}`
  setLoading(true);
  let data= await fetch(url);
  let parseddata= await data.json();
  console.log(parseddata);
  setArticles(parseddata.articles)
  setTotalresult(parseddata.totalResults)
  setLoading(false)
}
 useEffect(() => {
   updatenews();
 }, [])
 
 const handleprevious= async()=>{
    setPage(page-1)
    updatenews();


  }
  const handlenext= async()=>{
    console.log("next");
    setPage(page+1)
    updatenews();
    }
    return (
      <div className='container my-3'>  
      <h1 className="text-center" style={{margin:`80px`}}>Top Headlines</h1>
      {loading && <Loading/>}
      <div className="row">
      {!loading &&articles.map((element)=>{
       return <div className="col md-4 " key={element.url}>  
      <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} published={element.publishedAt} source={element.source.name}/>
      </div>
      
    })}
  
    </div>
      <div className="container d-flex justify-content-between my-3">
      <button disabled={page<=1} onClick={handleprevious} type="button" className="btn btn-dark"> &larr; Previous</button>
      <button disabled={page +1 >Math.ceil(totalresult/props.pageSize)} onClick={handlenext} type="button" className="btn btn-dark"> Next &rarr;</button>
      </div>
        
  </div>
      
    )
  }
 
  
  

News.defaultProps={
  country:'in',
  pageSize: 8
}
News.propTypes={
 country:PropTypes.string,
 pageSize:PropTypes.number,
 category:PropTypes.string
}
export default News



// https://newsapi.org/v2/top-headlines?apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&q=cricket
// https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc