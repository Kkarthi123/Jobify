type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    handlePrev: () => void;
    handleNext: () => void;
};

export default function Pagination({currentPage, totalPages, setPage, handlePrev, handleNext}: PaginationProps) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 font-semibold shadow transition hover:from-blue-300 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                Previous
            </button>
            {(() => {
                const pageNumbers = [];
                const maxVisible = 5;
                let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let end = start + maxVisible - 1;

                if (end > totalPages) {
                    end = totalPages;
                    start = Math.max(1, end - maxVisible + 1);
                }

                for (let i = start; i <= end; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`px-4 py-2 rounded-full font-semibold shadow transition cursor-pointer
                                ${currentPage === i
                                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white scale-105"
                                    : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-100"
                                }
                            `}
                        >
                            {i}
                        </button>
                    );
                }

                return pageNumbers;
            })()}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 font-semibold shadow transition hover:from-blue-300 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                Next
            </button>
        </div>
    );
}