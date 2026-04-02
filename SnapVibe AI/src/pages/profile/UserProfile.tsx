import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import { uploadAvatar } from "../../services/storage.service";
import { updateProfile } from "firebase/auth";
import ImageCard from "../../components/asset/AssetCard";
import { updateUserProfileData } from "../../services/user/user.service";
import { getAssetsByCreator } from "../../services/assets/asset.query";
import type { ImageItem } from "../../types/asset.type";
import EditProfileModal from "../../components/modals/EditProfilModal";
import { getUserDownloads } from "../../services/downloads/download.service";
import { getUserLikes } from "../../services/likes/like.service";
import { getAssetById } from "../../services/assets/asset.query";

export default function UserProfile() {
  const { user, profile, refreshProfile } = useAuth();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [downloads, setDownloads] = useState<ImageItem[]>([]);
  const [likes, setLikes] = useState<ImageItem[]>([]);
  const [stats, setStats] = useState({
    downloads: 0,
    likes: 0,
    uploads: 0,
  });

  const isCreator = profile?.role === "creator";

  useEffect(() => {
    if (!user) return;

    setName(profile?.displayName || user.displayName || "");
    setBio(profile?.bio || "");

    const loadData = async () => {
      try {
        /* ---------------- CREATOR ---------------- */
        if (isCreator) {
          const assets = await getAssetsByCreator(user.uid);
          setImages(assets);

          const totalLikes = assets.reduce(
            (sum, img) => sum + (img.likes || 0),
            0
          );

          const totalDownloads = assets.reduce(
            (sum, img) => sum + (img.downloads || 0),
            0
          );

          setStats({
            uploads: assets.length,
            likes: totalLikes,
            downloads: totalDownloads,
          });

          setLoading(false);
        }

        /* ---------------- USER ---------------- */
        else {
          const downloadIds = await getUserDownloads(user.uid);

          const downloadImages = await Promise.all(
            downloadIds.map((id) => getAssetById(id))
          );

          const validDownloads = downloadImages.filter(Boolean) as ImageItem[];
          setDownloads(validDownloads);

          const liked = await getUserLikes(user.uid);

          const likedImages = await Promise.all(
            liked.map((l) => getAssetById(l.imageId))
          );

          const validLikes = likedImages.filter(Boolean) as ImageItem[];
          setLikes(validLikes);

          setStats({
            downloads: validDownloads.length,
            likes: validLikes.length,
            uploads: 0,
          });

          setLoading(false);
        }

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadData();

  }, [user, profile, isCreator]);

  if (!user) return null;

  const handleSaveProfile = async () => {
    if (!user) return;

    let photoURL = user.photoURL || "";

    try {
      if (photoFile) {
        photoURL = await uploadAvatar(photoFile, user.uid);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      await updateUserProfileData(user.uid, {
        displayName: name,
        bio,
        photoPath: photoURL,
      });

      await refreshProfile();
      setEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* 🔥 PROFILE HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">

            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={
                  profile?.photoPath ||
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${name}`
                }
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full"
              />

              <div>
                <h1 className="text-base sm:text-lg md:text-2xl font-bold text-slate-700">
                  {name}
                </h1>

                <p className="text-xs sm:text-sm text-slate-500">
                  {user.email}
                </p>

                <span className="inline-block mt-2 px-3 py-1 text-[10px] sm:text-xs rounded-full bg-slate-800 text-white">
                  {profile?.role?.toUpperCase()} • {profile?.subscription}
                </span>

                {bio && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600">
                    {bio}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setEditOpen(true)}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 bg-black text-white rounded-xl text-sm"
            >
              Edit Profile
            </button>

          </div>
        </div>

        {/* 🔥 USER / CREATOR CONTENT */}
        {!isCreator ? (
          <NormalUserSection plan={profile?.subscription} 
             downloads={downloads}
             likes={likes}
             stats={stats} 
          />
        ) : (
          <CreatorSection images={images} loading={loading} />
        )}

        {/* 🔥 MODAL */}
        {editOpen && (
          <EditProfileModal
            name={name}
            bio={bio}
            setName={setName}
            setBio={setBio}
            setPhotoFile={setPhotoFile}
            onClose={() => setEditOpen(false)}
            onSave={handleSaveProfile}
          />
        )}

      </div>
    </section>
  );
}

/* ================= USER SECTION ================= */

function NormalUserSection({ plan, downloads, likes, stats }: { plan?: string; downloads: ImageItem[]; likes: ImageItem[]; stats: any }) {
  return (
    <div className="space-y-6 sm:space-y-8">

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Stat title="Downloads" value={stats.downloads} />
        <Stat title="Likes" value={stats.likes} />
        <Stat title="Purchases" value="0" />
        <Stat title="Credits" value="0" />
      </div>

      {/* 🔥 DOWNLOADS */}
      <Section title="Your Downloads">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {downloads.length ? (
            downloads.map((img) => (
              <ImageCard
                key={img.id}
                {...img}
                imageUrl={img.imagePath}
                likes={img.likes}
                downloads={img.downloads}
                creatorAvatar={img.creatorAvatar}
                creatorName={img.creatorName}
                price={img.price ?? undefined}
              />
            ))
          ) : (
            <p className="text-sm text-slate-400">No downloads yet</p>
          )}
        </div>
      </Section>

      {/* 🔥 LIKES */}
      <Section title="Liked Images">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {likes.length ? (
            likes.map((img) => (
              <ImageCard
                key={img.id}
                {...img}
                imageUrl={img.imagePath}
                likes={img.likes}
                downloads={img.downloads}
                creatorAvatar={img.creatorAvatar}
                creatorName={img.creatorName}
                price={img.price ?? undefined}
              />
            ))
          ) : (
            <p className="text-sm text-slate-400">No liked images</p>
          )}
        </div>
      </Section>

      {/* 🔥 SUBSCRIPTION */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Current Plan: <b>{plan?.toUpperCase()}</b>
        </p>

        <button className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm">
          Upgrade Plan
        </button>
      </div>

    </div>
  );
}

/* ================= CREATOR SECTION ================= */

function CreatorSection({
  images,
  loading,
}: {
  images: ImageItem[];
  loading: boolean;
}) {
  if (loading) return <div>Loading uploads...</div>;

  return (
    <>
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Your Uploads
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <ImageCard
            key={img.id}
            {...img}
            imageUrl={img.imagePath}
            price={img.price ?? undefined}
            likes={img.likes || 0}
            downloads={img.downloads || 0}
          />
        ))}
      </div>
    </>
  );
}

/* ================= REUSABLE ================= */

function Stat({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-xs text-slate-500">{title}</p>
      <h2 className="text-sm font-semibold mt-1">{value}</h2>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-600 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}