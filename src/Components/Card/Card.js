import React from 'react'
import './style.css';
import './responsive_grid.css';



const Card = ({title,description,price,stylingclass='',imgpath}) => {
   
  return (
    <div className={`card ${stylingclass}`}
    style={{ backgroundImage:`url(${imgpath})` ,
    backgroundSize:'cover'
  }} >              
        <div className="card-content">
            <h2 className="card-title">
             {`${title}`}
            </h2>
                <p className="card-body">
                  Description: {`${description}`}<br/>
                  Price: {`${price}`}
                </p>
               
                <button className='button'>Learn More</button>
        </div>
    </div>
   

  )
}

export default Card
