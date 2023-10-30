import AddTodo from "../Components/AddTodo";

export default function AddTodoPage() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
        <div
          className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl
             bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
        >
          <div className="p-4">
            <div className="mx-auto max-w-2xl pt-0 sm:pt-0 lg:pt-0 text-center">
              <h1 className="pb-16 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                New Todo
              </h1>
            </div>
            <AddTodo />
          </div>
        </div>
      </div>
    </div>
  );
}
