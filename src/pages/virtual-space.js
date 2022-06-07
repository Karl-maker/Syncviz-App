import VirtualSpaceWidget from "../widgets/virtual-space";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function VirtualSpace() {
  const [searchParams] = useSearchParams();
  const [id] = useState(searchParams.get("id"));

  return (
    <div className="page">
      <VirtualSpaceWidget virtual_room_id={"629ed48cb925d5aadcac8614"} />
    </div>
  );
}
