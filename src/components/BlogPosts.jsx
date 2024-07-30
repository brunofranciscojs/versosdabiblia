import React, { useState, useEffect, memo } from "react";


const BlogPosts = () =>{
     const [post, setPost] = useState([])
     
     const getRandomRange = (min, max, range = 5) => {
       const random = Math.floor(Math.random() * (max - min + 1));
       return [random, Math.min(random + range - 1, max)];
    };
      
    const [start, end] = getRandomRange(0, 10);
     useEffect(() =>{
      const fetchBlog = async () =>{
        const res = await fetch('https://jesuseabiblia.com.br/wp-json/wp/v2/posts?category=5')
        const resul = await res.json()
        setPost(resul)
      }
      fetchBlog()
    },[])

     return(       
       <div className="flex gap-8 mx-auto max-w-[1200px] py-12 justify-between flex-wrap lg:flex-nowrap">
          {post.slice(start,end).map((item,index) => (
  
              <figure className="w-[330px] flex flex-col gap-1 rounded-xl overflow-hidden grow !bg-center !bg-cover justify-end py-5 h-56 px-5 [&:hover_h2]:[text-shadow:0_0_2px]"
                      style={{background:`linear-gradient(to top, #000000dd, transparent),url(${item.uagb_featured_image_src.medium[0]})`}} key={index}>

                  <h2 className="text-md text-left text-gray-100 leading-none text-balance hover:text-white  duration-100">
                    {item.title.rendered}
                  </h2>
              </figure>
          ))}
       </div>
      
      )
}

export default memo(BlogPosts)