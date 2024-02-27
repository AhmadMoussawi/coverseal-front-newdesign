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
  className?: string;
  containerClassName?: string;
  direction?: AnimationDirection;
  main_title:string;
}

export function HeaderImage({
  id,
  title,
  main_title,
  className,
  containerClassName,
  direction,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

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
  }, []);
  const [imageUrl, setImageUrl] = useState("");
  const[url, setUrl] = useState("");


  const link = `${CMS_PUBLIC_URL}/assets/${id}?quality=60&format=webp`;
  const unsigned_url = "https://d3nou5eyizbneo.cloudfront.net/" + id;
  const cssClassImage = classNames({
    image: true,
    "css-image": false,
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
  
  
  return (
    
    <div className={cssClassContainer}>
      <div ref={ref} className="overlay" >
      
        </div>
      <img className={cssClassImage} src={`${link}`} alt={title} />
      <div className="header-title-container">
      <h1
              className="main-title main-title--terra-cotta header-title"
            >
              {main_title}
            </h1>
            
      </div>
      <div className="header-shape header-shape-bottom" data-negative="false">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	<path className="header-shape-fill" d="M0,6V0h1000v100L0,6z"></path>
</svg>		</div>
    </div>
  );
  
}
