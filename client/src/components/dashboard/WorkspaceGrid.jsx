import WorkspaceCard from "./WorkspaceCard";

const WorkspaceGrid = ({ workspaces }) => {
  if (workspaces.length === 0) {
    return <h2>No Workspaces Found</h2>;
  }

  return (
    <>
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace._id}
          workspace={workspace}
        />
      ))}
    </>
  );
};

export default WorkspaceGrid;