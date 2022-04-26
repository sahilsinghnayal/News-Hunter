import React, { Component } from 'react'
import Loading from './Loading';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'

export class News extends Component {
 static defaultProps={
   country:'in',
   pageSize: 8
 }
 static propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
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
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data= await fetch(url);
    let parseddata= await data.json();
    console.log(parseddata);
    this.setState({articles:parseddata.articles , totalresult:parseddata.totalResults ,loading:false})
  }
  handleprevious= async()=>{
    console.log("prev");
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parseddata= await data.json();
    console.log(parseddata);
    this.setState({
     page: this.state.page - 1,
     articles:parseddata.articles,
     loading:false
    })


  }
  handlenext= async()=>{
    console.log("next");
    if(!(this.state.page +1 >Math.ceil(this.state.totalresult/this.props.pageSize))){
      


      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data= await fetch(url);
      let parseddata= await data.json();
      
      this.setState({
       page: this.state.page+1,
       articles:parseddata.articles,
       loading:false
      })
    }
  }
  render() {
    return (
      <div className='container my-3'>  
      <h1 className="text-center" style={{margin:`30px`}}>Top Headlines</h1>
      {this.state.loading && <Loading/>}
      <div className="row">
      {!this.state.loading &&this.state.articles.map((element)=>{
       return <div className="col md-4 " key={element.url}>  
      <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url}/>
      </div>
      
    })}

    </div>
      <div className="container d-flex justify-content-between my-3">
      <button disabled={this.state.page<=1} onClick={this.handleprevious} type="button" className="btn btn-dark"> &larr; Previous</button>
      <button disabled={this.state.page +1 >Math.ceil(this.state.totalresult/this.props.pageSize)} onClick={this.handlenext} type="button" className="btn btn-dark"> Next &rarr;</button>
      </div>
        
</div>
      
    )
  }
}

export default News



// https://newsapi.org/v2/top-headlines?apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc&q=cricket
// https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d36a43e2ab643af9f2a95f64b8bf2cc