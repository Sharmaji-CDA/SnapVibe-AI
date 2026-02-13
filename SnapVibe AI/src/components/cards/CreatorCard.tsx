type CreatorCardProps = {
  name: string;
  followers: number;
};

export default function CreatorCard({ name, followers }: CreatorCardProps) {
  return (
    <div className="rounded-xl border p-4 text-center hover:shadow-md">
      <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-gray-200" />
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{followers} followers</p>
    </div>
  );
}
