export default function AddTodo() {
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="title"
            type="text"
            placeholder="Todo Title"
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Todo description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your description here..."
          ></textarea>

          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>
    </form>
  );
}
