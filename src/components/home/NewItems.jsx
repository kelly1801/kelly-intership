import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Counter from "./Counter";

const NewItems = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const [newItems, setNewItems] = useState([]);

  async function getNewItemsData() {
    const newItemsData = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItems(newItemsData.data);
  }

  useEffect(() => {
    getNewItemsData();
  }, []);
    
  
    


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {newItems.length ? (
            <OwlCarousel className="owl-theme" {...options}>
              {newItems.map((item, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                 {item.expiryDate && <Counter expDate={item.expiryDate}/>}
              
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>Pinky Ocean</h4>
                    </Link>
                    <div className="nft__item_price">`${item.price} ETH`</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
            
         ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {new Array(7).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                     <Skeleton width={50}
                     height={50}
                     borderRadius={50}/>
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown"><Skeleton width={50} height={20} borderRadius={15}
                    /></div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to="/item-details">
                    
                    <Skeleton width={200} height={200} borderRadius={15}/>
                    </Link>
                  </div>
                  <div className="nft__item_info">
                   
                    <Skeleton width={100} height={30}/>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                     
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )} 
        </div>
      </div>
    </section>
  );
};

export default NewItems;
