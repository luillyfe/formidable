import { MouseEvent } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";

import { Task } from "../../Store/types";

export default function AddTodo() {
  const { todo } = useLoaderData() as { todo: Task };
  const navigate = useNavigate();

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
    navigate("/");
  }

  return (
    <Form method="post" role="form" className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-1/2 md:w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="title"
            type="text"
            placeholder="Todo Title"
            name="title"
            defaultValue={todo.title}
          />
          <p className="text-red-500 text-xs italic">
            Please fill out the todo title.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Todo description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
            placeholder="Write your description here..."
            name="description"
            defaultValue={todo.description}
          ></textarea>

          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <button
            className="w-full py-1 px-2 flex-shrink-0 bg-indigo-500 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white font-semibold rounded-r-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={handleClick}
          >
            Back
          </button>
        </div>
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <input
            className="w-full py-1 px-2 flex-shrink-0 bg-indigo-500 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white font-semibold rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            value="Add"
            type="submit"
          ></input>
        </div>
      </div>
    </Form>
  );
}
