import VirtualSpaceWidget from "../widgets/virtual-space";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import VirtualSpaceClass from "../classes/virtual-space";

export default function VirtualSpace() {
  const [searchParams] = useSearchParams();
  const virtualSpace = useMemo(
    () => new VirtualSpaceClass(searchParams.get("id"), {}),
    // eslint-disable-next-line
    [searchParams.get("id")]
  );
  const socket = useMemo(
    () => virtualSpace.connect({}),
    // eslint-disable-next-line
    [virtualSpace]
  );

  return (
    <>
      {socket && (
        <VirtualSpaceWidget virtualSpace={virtualSpace} socket={socket} />
      )}
    </>
  );
}
