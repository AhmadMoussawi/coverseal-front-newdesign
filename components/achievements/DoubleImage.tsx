import classNames from "classnames";
import { AnimationDirection } from "../../utils/constants";
import dynamic from "next/dynamic";
const Image = dynamic(() => import('../Image'));
import { useWindowSize } from "../useWindowSize";


export function DoubleImage({
  image,
  image_2,
  double_images_variant,
}: AchievementsSectionsDirectus) {
  const cssClass = classNames({
    "double-image-block": true,
    block: true,
    "images-equal": double_images_variant === "images_equal",
    "images-overlap-1": double_images_variant === "images_overlap_1",
    "images-overlap-2": double_images_variant === "images_overlap_2",
    "images-overlap-3": double_images_variant === "images_overlap_3",
  });

  const animationDirection = (() => {
    switch (double_images_variant) {
      case "images_overlap_1":
        return {
          image: AnimationDirection.BOTTOM_TO_TOP,
          image_2: AnimationDirection.LEFT_TO_RIGHT,
        };
      case "images_equal":
        return {
          image: AnimationDirection.LEFT_TO_RIGHT,
          image_2: AnimationDirection.RIGHT_TO_LEFT,
        };
      case "images_overlap_2":
        return {
          image: AnimationDirection.RIGHT_TO_LEFT,
          image_2: AnimationDirection.TOP_TO_BOTTOM,
        };
      case "images_overlap_3":
        return {
          image: AnimationDirection.RIGHT_TO_LEFT,
          image_2: AnimationDirection.TOP_TO_BOTTOM,
        };
      default:
        return {
          image: AnimationDirection.RIGHT_TO_LEFT,
          image_2: AnimationDirection.RIGHT_TO_LEFT,
        };
    }
  })();

  const size = useWindowSize();

  const isBackgroundCss =
    size.width > 580 &&
    double_images_variant !== "images_overlap_2" &&
    double_images_variant !== "images_equal";

  return (
    <div className={cssClass}>
      <Image
        id={image}
        title="image"
        containerClassName="first"
        direction={animationDirection.image}
        isBackgroundCss={isBackgroundCss}
      />
      <Image
        id={image_2}
        title="image"
        containerClassName="second"
        direction={animationDirection.image_2}
        isBackgroundCss={isBackgroundCss}
      />
    </div>
  );
}
