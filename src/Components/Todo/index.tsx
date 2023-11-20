import { TodoElement } from "../../Store/types";
import FlyoutMenu from "../FlyoutMenu";

export default function Todo({ title, description, handleClick }: TodoElement) {
  return (
    <div
      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
      role="document"
      onClick={handleClick}
    >
      <FlyoutMenu />
      <div>
        <a href="#" className="font-semibold text-gray-900">
          {title}
          <span className="absolute inset-0"></span>
        </a>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
