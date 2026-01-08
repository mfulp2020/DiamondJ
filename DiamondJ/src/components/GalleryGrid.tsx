import Image from "next/image";

const photos = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
];

export function GalleryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((src) => (
        <div key={src} className="card overflow-hidden">
          <div className="relative aspect-[4/3] bg-neutral-100">
            <Image
              src={src}
              alt="Diamond J Catering gallery photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
