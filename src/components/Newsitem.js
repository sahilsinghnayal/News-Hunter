import React from 'react'


const Newsitem =(props)=> {
  
    let{title,description,imageurl,newsurl,author,published,source}=props;
    return (


      <div className="my-3">
        <div className="card" style={{width: "22rem"}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:`90%`}}>{source}
  </span>
  <img src={!imageurl?"https://images.news18.com/ibnlive/uploads/2021/12/delhi-crowded-market-covid-164092567416x9.jpg":imageurl} className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">{title}..</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By : {author?author:"unknown"}  At : {new Date(published).toGMTString()}</small></p>   
    <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
      
    )
  
}
// toGMTString() it convert time to gmt format
export default Newsitem
