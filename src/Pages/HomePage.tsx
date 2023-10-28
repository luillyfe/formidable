import ListTodos from "../Components/ListTodos";

export default function HomePage() {
  return (
    <>
      {/* pt-32 sm:pt-48 lg:pt-56 */}
      <div className="mx-auto max-w-2xl pt-0 sm:pt-0 lg:pt-0 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Todo App
        </h1>
        <form className="mt-10 flex items-center justify-center gap-x-6">
          <div className="flex items-center border-b border-white-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-6 focus:outline-none"
              type="text"
              placeholder="Task Name"
              aria-label="Full name"
            />
            <button
              className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white font-semibold py-1 px-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <ListTodos />
    </>
  );
}
