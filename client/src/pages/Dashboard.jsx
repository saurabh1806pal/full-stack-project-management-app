import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../context/workspaceCreateContext";

import WorkspaceGrid from "../components/dashboard/WorkspaceGrid";
import CreateWorkspaceModal from "../components/dashboard/CreateWorkspaceModal";

import Navbar from "../components/Navbar"

const Dashboard = () => {
  const { workspaces, fetchWorkspaces } =
    useContext(WorkspaceContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <>
    <Navbar></Navbar>
      <button
        onClick={() => setShowModal(true)}
      >
        Create Workspace
      </button>

      <WorkspaceGrid
        workspaces={workspaces}
      />

      <CreateWorkspaceModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Dashboard;