import { MouseEvent, memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Task } from "../../Store/types";
import { deleteDocument } from "../../Store/actions";

import FlyoutMenu from "../FlyoutMenu";

const Todo = memo(function ({ id, title, description }: Task) {
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  function handleDelete(event: MouseEvent) {
    event.stopPropagation();
    // if success, "todos" query below will be invalidated
    deleteDocument(id).then(() => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    });
  }

  function handleEdit(event: MouseEvent) {
    console.log(event);
  }

  return (
    <div
      className="group flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
      role="document"
    >
      <FlyoutMenu handleDelete={handleDelete} handleEdit={handleEdit} />
      <div>
        <Link to={`/todos/${id}/edit`} className="font-semibold text-gray-900">
          {title}
        </Link>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
});

export default Todo;
