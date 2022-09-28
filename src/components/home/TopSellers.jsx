import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [topSellers, setTopSellers] = useState([]);

  async function getTopSellersData() {
    const topSellersData = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setTopSellers(topSellersData.data);
    
  }

  useEffect(() => {
    getTopSellersData() 
}, []);
  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              
               {topSellers.length? 
               (<>
                { topSellers.map( (seller, index) => (
               <li key={index}>
                  <div className="author_list_pp" >
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
                    <span>{`${seller.price} ETH
`}</span>
                  </div>
                </li>
                
                ))}
                </>) : (
                
                <>
                { new Array(12).fill(0).map((_, index) => (

<li key={index}>
<div className="author_list_pp" >
  <Link to={`/author/${_.authorId}`}>
   <Skeleton width={50} height={50} borderRadius={50}/>
    <i className="fa fa-check"></i>
  </Link>
</div>
<div className="author_list_info">
  <span>
<Skeleton width={80} height={10} />
</span>
<span>
<Skeleton width={50} height={10} />
</span>
 
</div>
</li>



                ))

                }
                </>
                )}

                
             
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
