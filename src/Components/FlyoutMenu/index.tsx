import FlyOut from "./FlyOut";

import Edit from "../../assets/edit.svg?react";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>
          <Edit />
        </FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
