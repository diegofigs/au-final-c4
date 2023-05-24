type PaginatorProps = {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  total?: number;
};
export function Paginator({ page, setPage, pageSize, total }: PaginatorProps) {
  const totalPages = total ? Math.ceil(total / pageSize) : 0;

  return (
    <div className="flex justify-center my-2 text-gray-500 bg-white">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className={`px-4 py-2 border border-gray-300 rounded mr-2 ${
          page <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Prev
      </button>
      <span className="mx-4 self-center">
        Page {page}
        {total && ` of ${totalPages}`}
      </span>
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={`px-4 py-2 border border-gray-300 rounded ml-2 ${
          page >= totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
}

