import VirtualSpaceWidget from "../widgets/virtual-space";
import { useSearchParams } from "react-router-dom";
import { useMemo, useContext } from "react";
import { UserAccountContext } from "../context/user";
import VirtualSpaceClass from "../classes/virtual-space";

export default function VirtualSpace() {
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserAccountContext);
  const virtualSpace = useMemo(
    () => new VirtualSpaceClass(searchParams.get("id"), { attendee: user }),
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
