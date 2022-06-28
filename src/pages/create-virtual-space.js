import VirtualSpaceWidget from "../widgets/virtual-space";

export default function CreateVirtualSpace() {
  // Create Space On Site

  return (
    <VirtualSpaceWidget
      attributes={{
        name: "React.js Test",
        description: "React.js virtual space test",
      }}
      manage={true}
    />
  );
}
