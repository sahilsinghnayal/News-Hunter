import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
 
  constructor(){
    super();
    console.log("hello i am a const")
    this.state={
      articles:[],
      loading:false,
      page:1

    }
  }
  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=1";
    let data= await fetch(url);
    let parseddata= await data.json();
    console.log(parseddata);
    this.setState({articles:parseddata.articles})
  }
  handleprevious= async()=>{
    console.log("prev");
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=${this.state.page - 1}`;
    let data= await fetch(url);
    let parseddata= await data.json();
    console.log(parseddata);
    this.setState({
     page: this.state.page - 1,
     articles:parseddata.articles
    })


  }
  handlenext= async()=>{
    console.log("next");
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=${this.state.page + 1}`;
    let data= await fetch(url);
    let parseddata= await data.json();
    console.log(parseddata);
    this.setState({
     page: this.state.page+1,
     articles:parseddata.articles
    })
  }
  render() {
    return (
      <div className='container my-3'>   
      <h2>Top Headlines</h2>
      <div className="row">
      {this.state.articles.map((element)=>{
       return <div className="col md-4 " key={element.url}>  
      <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url}/>
      </div>
      
    })}

    </div>
      <div className="container d-flex justify-content-between my-3">
      <button disabled={this.state.page<=1} onClick={this.handleprevious} type="button" className="btn btn-dark"> &larr; Previous</button>
      <button onClick={this.handlenext} type="button" className="btn btn-dark"> Next &rarr;</button>
      </div>
        
</div>
      
    )
  }
}

export default News



// https://newsapi.org/v2/top-headlines?apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&q=cricket
// https://newsapi.org/v2/top-headlines?country=in&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc