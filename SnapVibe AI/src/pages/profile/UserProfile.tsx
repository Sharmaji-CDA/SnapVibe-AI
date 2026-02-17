import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import {
  updateUserProfileData,
} from "../../services/user.service";
import { uploadAvatar } from "../../services/storage.service";
import { updateProfile } from "firebase/auth";
import {
  getImagesByCreator,
} from "../../services/image.service";
import ImageCard from "../../components/cards/ImageCard";

export default function UserProfile() {
  const { user, profile, refreshProfile } = useAuth();

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const isCreator = profile?.accountType === "creator";

  useEffect(() => {
    if (!user) return;

    setName(profile?.displayName || user.displayName || "");
    setBio(profile?.bio || "");

    if (isCreator) {
      getImagesByCreator(user.uid)
        .then(setImages)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, profile, isCreator]);

  if (!user) return null;

  const handleSaveProfile = async () => {
    if (!user) return;

    let photoURL = user.photoURL || "";

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
      photoURL,
    });

    await refreshProfile();
    setEditOpen(false);
  };

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* SHARED PROFILE HEADER */}
        <div className="rounded-3xl bg-white p-8 shadow-sm mb-12">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${name}`
                }
                className="h-24 w-24 rounded-full"
              />

              <div>
                <h1 className="text-2xl text-slate-600 font-bold">
                  {name}
                </h1>
                <p className="text-slate-500">
                  {user.email}
                </p>

                <span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-slate-700">
                  {profile?.accountType?.toUpperCase()} • {profile?.plan}
                </span>

                {bio && (
                  <p className="mt-2 text-sm text-slate-600">
                    {bio}
                  </p>
                )}
              </div>
            </div>

            {/* EDIT BUTTON (FOR BOTH USER & CREATOR) */}
            <button
              onClick={() => setEditOpen(true)}
              className="px-6 py-3 rounded-xl bg-black text-white text-sm font-medium"
            >
              Edit Profile
            </button>

          </div>
        </div>

        {/* ROLE-BASED CONTENT */}
        {!isCreator ? (
          <NormalUserSection plan={profile?.plan} />
        ) : (
          <CreatorSection images={images} loading={loading} />
        )}

        {/* EDIT MODAL */}
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


function NormalUserSection({ plan }: any) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Account Overview
      </h2>

      <p className="text-slate-600">
        You are on the <b>{plan}</b> plan.
      </p>

      <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl">
        Upgrade to Creator
      </button>
    </div>
  );
}


function CreatorSection({ images, loading }: any) {
  if (loading) return <div>Loading uploads...</div>;

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">
        Your Uploads
      </h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img: any) => (
          <ImageCard key={img.id} {...img} />
        ))}
      </div>
    </>
  );
}



function EditProfileModal({
  name,
  bio,
  setName,
  setBio,
  setPhotoFile,
  onClose,
  onSave,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-slate-700 font-bold">
            Edit Profile
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-700 font-medium">
            Display Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-400 rounded-xl p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-700 font-medium">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full border border-slate-400 rounded-xl p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-700 font-medium">
            Profile Photo
          </label>
          <input
            type="file"
            onChange={(e) =>
              setPhotoFile(e.target.files?.[0] || null)
            }
            className="w-full border border-slate-400 rounded-xl p-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-black text-white rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}