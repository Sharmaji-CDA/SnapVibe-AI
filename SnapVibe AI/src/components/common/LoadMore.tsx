type Props = {
  onLoadMore: () => void;
};

export default function LoadMore({ onLoadMore }: Props) {
  return (
    <div className="mt-10 text-center">
      <button
        onClick={onLoadMore}
        className="rounded-lg border px-6 py-2 hover:bg-gray-100"
      >
        Load More
      </button>
    </div>
  );
}
