import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactStars from 'react-stars'
import {
  getGuestSuiteContent
} from "../utils/fetchers";
const Avis = ({ data, locale }) => {
  const [posts, setPosts] = useState(data.reviews);
  const [page, setPage] = useState(data.page);
  const [hasMore, setHasMore] = useState(true);
  const getMoreReviews = async () => {
    var avis = await getGuestSuiteContent(locale, page + 1);
    const newPosts = avis.reviews;
    const newPage = avis.page;
    console.log("NEWPAGE",newPage);
    if(avis.reviews.length == 0)
    {
      setHasMore(false);
    }
    setPosts((post) => [...post, ...newPosts]);
    setPage(newPage);
  };
  
const wid = "calc(80% - 20px)"//(size.width - 200).toString() + "px";
  return (
    
      <InfiniteScroll dataLength={posts.length} next={getMoreReviews}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage=""
      >
        {posts.map((data)=>{
            var rating = data.global_rate / 2;
            var name = data.user_name as string;
            return (
              <>
              <div style={{marginTop:"50px"}}>
           <div style={{width:"50px", float:"left"}}>  
            <div style={{backgroundColor:"white",color:"var(--color-terra-cotta)", width:"50px", height:"50px", borderRadius:"100%", lineHeight:"50px", textAlign:"center", textTransform:"uppercase", fontWeight:"bold", fontSize:"16px"}}>{name.substr(0,1)}</div>
            </div>
            <div style={{width:wid, float:"left", marginLeft:"20px"}}>
              <div style={{color:"var(--color-terra-cotta)", textTransform:"capitalize", fontWeight:"bold", fontSize:"16px"}}>{name}</div>
              <ReactStars
        count={5}
        value={rating}
        edit={false}
        size={15}
        color1={'white'}
        color2={'white'} />
              <div>{data.comment}</div>
              <div style={{width:"100%", height:"1px", backgroundColor:"white", marginTop:"10px"}}></div>
            </div>
            </div>
            <div style={{clear:"both"}}></div>
            
            </>
            )
          })}
        
      </InfiniteScroll>
      
  );
};

export default Avis;