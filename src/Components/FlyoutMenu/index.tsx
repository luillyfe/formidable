import FlyOut from "./FlyOut";

import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { MouseEvent } from "react";

interface FlyoutMenu {
  handleEdit: (event: MouseEvent) => void;
  handleDelete: (event: MouseEvent) => void;
}

export default function FlyoutMenu({ handleDelete, handleEdit }: FlyoutMenu) {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>
          <Edit className="h-5 w-5" onClick={handleEdit} />
          <Delete className="h-5 w-5" onClick={handleDelete} />
        </FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
