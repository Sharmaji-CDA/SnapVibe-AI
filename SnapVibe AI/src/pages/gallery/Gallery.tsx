import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import ImageCard from "../../components/cards/ImageCard";
import type { ImageItem } from "../../types/image.type";


export default function Gallery() {

  const [params] = useSearchParams();
  const searchQuery = params.get("search")?.toLowerCase() || "";
  const category = params.get("category");

  const [creatorImages, setCreatorImages] = useState<ImageItem[]>([]);
  const [aiImages, setAiImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const creatorQuery = query(
        collection(db, "images"),
        where("source", "==", "creator"),
        orderBy("createdAt", "desc")
      );

      const aiQuery = query(
        collection(db, "images"),
        where("source", "==", "ai"),
        orderBy("createdAt", "desc")
      );

      const [creatorSnap, aiSnap] = await Promise.all([
        getDocs(creatorQuery),
        getDocs(aiQuery),
      ]);

      let creators = creatorSnap.docs.map((doc) => ({
        ...(doc.data() as ImageItem),
        id: doc.id,
      }));

      let ai = aiSnap.docs.map((doc) => ({
        ...(doc.data() as ImageItem),
        id: doc.id,
      }));

      /* 🔍 SEARCH FILTER */
      if (searchQuery) {
        const match = (img: ImageItem) =>
          img.title?.toLowerCase().includes(searchQuery) ||
          img.prompt?.toLowerCase().includes(searchQuery) ||
          img.creatorName?.toLowerCase().includes(searchQuery);

        creators = creators.filter(match);
        ai = ai.filter(match);
      }

      /* 🏷 CATEGORY FILTER */
      if (category) {
        creators = creators.filter(
          (img) => img.category?.toLowerCase() === category
        );
        ai = ai.filter(
          (img) => img.category?.toLowerCase() === category
        );
      }

      setCreatorImages(creators);
      setAiImages(ai);
      setLoading(false);
    };

    fetchImages();
  }, [searchQuery, category]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        Loading gallery...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 space-y-24">
      {/* CREATOR IMAGES */}
      <GallerySection
        title="Creator Gallery"
        subtitle="Discover visuals created by our community."
        images={creatorImages}
      />

      {/* AI IMAGES */}
      <GallerySection
        title="AI Generated Gallery"
        subtitle="Explore stunning visuals generated using AI."
        images={aiImages}
        isAI
      />
    </section>
  );
}

/* ---------------- SECTION ---------------- */

function GallerySection({
  title,
  subtitle,
  images,
}: {
  title: string;
  subtitle: string;
  images: ImageItem[];
  isAI?: boolean;
}) {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-300">{title}</h2>
        <p className="mt-2 max-w-2xl text-slate-500">{subtitle}</p>
      </div>

      {images.length === 0 ? (
        <p className="text-slate-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <ImageCard
              key={img.id}
              {...img}
              onLike={() => console.log("Liked image:", img.id)}
              onDownload={() => console.log("Downloaded image:", img.id)}
              price={20}           />
          ))}
        </div>
      )}
    </div>
  );
}
