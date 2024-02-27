import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CMS_PUBLIC_URL, AnimationDirection } from "../utils/constants";
import FormData from "form-data";
function getAnimationValues(
  direction: AnimationDirection = AnimationDirection.LEFT_TO_RIGHT
) {
  switch (direction) {
    case AnimationDirection.TOP_TO_BOTTOM:
    case AnimationDirection.BOTTOM_TO_TOP:
      return {
        start: {
          y: 0,
        },
        end: {
          y: direction === AnimationDirection.BOTTOM_TO_TOP ? "-100%" : "100%",
        },
      };
    case AnimationDirection.LEFT_TO_RIGHT:
    case AnimationDirection.RIGHT_TO_LEFT:
      return {
        start: {
          x: 0,
        },
        end: {
          x: direction === AnimationDirection.LEFT_TO_RIGHT ? "100%" : "-100%",
        },
      };
  }
}

interface Props {
  id: string;
  title: string;
  isBackgroundCss?: boolean;
  className?: string;
  containerClassName?: string;
  direction?: AnimationDirection;
  quality?:string;
}

export function Image({
  id,
  title,
  isBackgroundCss,
  className,
  containerClassName,
  direction,
  quality="60"
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if(direction)
    {
    const { start, end } = getAnimationValues(direction);
    var orig = window.location.origin;
    setUrl(orig);
    gsap.fromTo(
      ref.current,
      {
        display: "block",
        ...start,
      },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=10%",
        },
        duration: 2,
        ...end,
        ease: "power3.out",
      }
    );
    }
  }, []);
  const [imageUrl, setImageUrl] = useState("");
  const[url, setUrl] = useState("");


  const link = `${CMS_PUBLIC_URL}/assets/${id}?quality=${quality}&format=webp`;
  const unsigned_url = "https://d3nou5eyizbneo.cloudfront.net/" + id;
  const cssClassImage = classNames({
    image: true,
    "css-image": isBackgroundCss,
    ...(className ? { [className]: true } : {}),
  });
  const cssClassContainer = classNames({
    "image-container": true,
    ...(containerClassName ? { [containerClassName]: true } : {}),
  });
  
  /*fetch(`${url}/api/signed-url?unsigned_url=${unsigned_url}`).then(async (res)=>{
    var result = await res.json();
    setImageUrl(result.signed_url);
  })*/
  if (isBackgroundCss) {
    return (
      
      <div className={cssClassContainer}>
        <div ref={ref} className="overlay" />
        <div
          className={cssClassImage}
          style={{ backgroundImage: `url(${link})` }}
        />
      </div>
    );
  }
  
  return (
    
    <div className={cssClassContainer}>
      <div ref={ref} className="overlay" />
      <img className={cssClassImage} src={`${link}`} alt={title} />
    </div>
  );
  
}
