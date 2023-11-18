import { MouseEvent, memo } from "react";
import { TodoElement } from "../../Store/types";
import { Link } from "react-router-dom";

const Todo = memo(function ({
  id,
  title,
  description,
  handleDelete,
}: TodoElement) {
  return (
    <div
      className="group flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
      role="document"
    >
      <div className="mt-1 flex h-14 w-11 flex-none flex-col items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        {/* Edit icon */}
        <svg
          className="h-6 w-6 text-gray-600  hover:text-indigo-600 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
          />
        </svg>
        {/* Delete icon */}
        <svg
          className="w-5 h-5 text-gray-600 hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            handleDelete(id);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <div className="relative flex flex-col w-full">
        <Link to={`/todos/${id}/edit`} className="font-semibold text-gray-900">
          {title}
          <span className="absolute inset-0"></span>
        </Link>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
});

export default Todo;
