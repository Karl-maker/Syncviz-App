import VirtualSpaceWidget from "../widgets/virtual-space";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function VirtualSpace() {
  const [searchParams] = useSearchParams();
  const [id] = useState(searchParams.get("id"));

  // On mobile it is sometimes way down at the bottom of the page

  return <VirtualSpaceWidget virtual_room_id={id} />;
}
