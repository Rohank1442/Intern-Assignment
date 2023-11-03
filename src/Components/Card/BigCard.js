import React from 'react'
import Card from './Card'
import './style.css';
import './responsive_grid.css';
const BigCard = ({ obj }) => {
    return (

        <div className='product-grid'>

            {

                obj?.map((data, index) => {
                    return data.title===undefined ?<div key={index}></div> 
                    : (index === 0 ? (<Card title={data.title} stylingclass='featured'
                        description={data.Description}
                        price={data.Price}
                        imgpath={data.img}
                        key={index} />) :
                        (<Card title={data.title}
                            description={data.Description}
                            price={data.Price}
                            imgpath={data.img}
                            key={index} />)
                    )
                })

            }


        </div>

    )
}

export default BigCard
