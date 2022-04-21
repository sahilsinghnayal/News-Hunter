import React, { Component } from 'react'


export class Newsitem extends Component {
  
  render() {
    let{title,description,imageurl,newsurl}=this.props;
    return (


      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageurl?"https://images.news18.com/ibnlive/uploads/2021/12/delhi-crowded-market-covid-164092567416x9.jpg":imageurl} className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">{title}..</h5>
    <p className="card-text">{description}</p>
    <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
      
    )
  }
}

export default Newsitem
