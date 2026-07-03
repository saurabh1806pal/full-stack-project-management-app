import { useState } from "react";
import API from "../api/axios";
import { WorkspaceContext } from "./workspaceCreateContext";

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all workspaces
  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const res = await API.get("/workspaces");

      setWorkspaces(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Create workspace
  const createWorkspace = async (name) => {
    try {
      setLoading(true);

      const res = await API.post("/workspaces", {
        name,
      });

      setWorkspaces((prev) => [...prev, res.data]);

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        loading,
        fetchWorkspaces,
        createWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};