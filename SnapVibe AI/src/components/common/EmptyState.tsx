type Props = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="py-20 text-center">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
