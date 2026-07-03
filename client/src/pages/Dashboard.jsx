import { useEffect, useContext } from "react";
import { WorkspaceContext } from "../context/workspaceCreateContext";
import WorkspaceGrid from "../components/dashboard/WorkspaceGrid";
import Navbar from "../components/Navbar"

const Dashboard = () => {
  const { workspaces, fetchWorkspaces } =
    useContext(WorkspaceContext);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Workspaces
        </h1>

        <button>
          Create Workspace
        </button>
      </div>

      <WorkspaceGrid workspaces={workspaces} />
    </div>
    </>
  );
};

export default Dashboard;