import { memo } from "react";
import { TodoElement } from "../../Store/types";
import FlyoutMenu from "../FlyoutMenu";
import { Link } from "react-router-dom";

const Todo = memo(function ({ id, title, description }: TodoElement) {
  return (
    <div
      className="group flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
      role="document"
    >
      <FlyoutMenu />
      <div>
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
