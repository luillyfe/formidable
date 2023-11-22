import FlyOut from "./FlyOut";

import Edit from "../../assets/edit.svg?react";
import Delete from "../../assets/delete.svg?react";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>
          <Edit />
          <Delete />
        </FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
