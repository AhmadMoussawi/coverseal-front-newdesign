import dynamic from "next/dynamic";
const Image = dynamic(() => import('../Image'));

export function ImageOnly({ image }: AchievementsSectionsDirectus) {
  return (
    <div className="image-only-block block">
      <Image id={image} title="image" />
    </div>
  );
}
