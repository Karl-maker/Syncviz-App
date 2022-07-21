import VirtualSpaceWidget from "../widgets/virtual-space";
import { useState, useMemo } from "react";
import VirtualSpaceClass from "../classes/virtual-space";
import SetupVirtualSpace from "../components/setup-virtual-room";

export default function CreateVirtualSpace() {
  // Create Space On Site

  /*

  Cannot re make another Metaverse room from refreshing so a re-render tracker is made

  */

  const [live, goLive] = useState(false);
  const [setup, setSetup] = useState(true);
  const [attributes, setAttributes] = useState({ description: "" });

  /*

  1. Fill out info
  2. Create Metaverse Room

  */

  const virtualSpace = useMemo(() => {
    if (attributes.description) {
      let vs = new VirtualSpaceClass(null, {
        description: attributes.description,
      });

      goLive(true);

      return vs;
    } else {
      return null;
    }
    // eslint-disable-next-line
  }, [setup]);

  return (
    <>
      {live ? (
        <VirtualSpaceWidget
          manage={true}
          socket={virtualSpace.connect({})}
          virtualSpace={virtualSpace}
        />
      ) : (
        <SetupVirtualSpace
          key="setup-virtual-space"
          setSetup={setSetup}
          setup={setup}
          attributes={attributes}
          setAttributes={setAttributes}
        />
      )}
    </>
  );
}
