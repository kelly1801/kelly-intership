import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Counter from "../home/Counter";
import Skeleton from "../UI/Skeleton";
const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);

  const [next, setSlice] = useState(8);
  async function filterItems(filter) {
    const apiRoute = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    setExploreItems(apiRoute.data);
  }
  async function getExploreItemsData() {
    const exploreItemsData = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExploreItems(exploreItemsData.data);
  }

  useEffect(() => {
    getExploreItemsData();
  }, []);
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length ? (
        <>
          {exploreItems.slice(0, next).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Counter expDate={item.expiryDate} />}

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
                  <Link to={`/item-detail/${item.title}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{`${item.price} ETH`}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(16)
            .fill(0)
            .slice(0, next)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <Skeleton width={250} height={300} />
              </div>
            ))}
        </>
      )}
      {exploreItems.length !== next && (
        <div
          className="col-md-12 text-center"
          onClick={() => setSlice(next + 4)}
        >
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
