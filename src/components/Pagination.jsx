function Pagination({ pagination, chanegePage }) {
  return (
    <div className="w-full mt-10 lg:mt-20">
      <ul className="flex justify-center ">
        {/* 上一頁 */}
        <li className="mr-2">
          <a
            className={`page-link ${pagination.hasPrev ? "" : "disabled"}`}
            href="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              if (pagination.hasPrev) {
                chanegePage(pagination.currentPage - 1);
              }
            }}
          >
            <span aria-hidden="true">上一頁</span>
          </a>
        </li>

        {/* 頁碼 */}
        {[...new Array(pagination.totalPages)].map((_, i) => (
          <li
            key={`${i}_page`}
          >
            <a
              className={`a-link ${i + 1 === pagination.currentPage ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                chanegePage(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}

        {/* 下一頁 */}
        <li>
          <a
            className={`page-link ${pagination.hasNext ? "" : "disabled"}`}
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              if (pagination.hasNext) {
                chanegePage(pagination.currentPage + 1);
              }
            }}
          >
            <span aria-hidden="true">下一頁</span>
          </a>
        </li>
      </ul>
    </div>
  );
}


export default Pagination;