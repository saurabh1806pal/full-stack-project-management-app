import { useState } from "react";
import API from "../api/axios";
import { WorkspaceContext } from "./workspaceCreateContext";

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================
  // Fetch Workspaces
  // ===========================
  const fetchWorkspaces = async () => {
    setLoading(true);

    try {
      const { data } = await API.get("/workspaces");

      setWorkspaces(data);

      return data;
    } catch (error) {
      console.error("Fetch Workspaces Error:", error.response?.data || error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Create Workspace
  // ===========================
  const createWorkspace = async (workspaceData) => {
    setLoading(true);

    try {
      console.log("Sending Workspace:", workspaceData); // Temporary for debugging

      const { data } = await API.post("/workspaces", workspaceData);

      setWorkspaces((prev) => [...prev, data]);

      return data;
    } catch (error) {
      console.error(
        "Create Workspace Error:",
        error.response?.data || error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Delete Workspace
  // ===========================
  const deleteWorkspace = async (workspaceId) => {
    setLoading(true);

    try {
      await API.delete(`/workspaces/${workspaceId}`);

      setWorkspaces((prev) =>
        prev.filter((workspace) => workspace._id !== workspaceId)
      );
    } catch (error) {
      console.error(
        "Delete Workspace Error:",
        error.response?.data || error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Add Member
  // ===========================
  const addMember = async (workspaceId, userId) => {
    setLoading(true);

    try {
      const { data } = await API.post(
        `/workspaces/${workspaceId}/members`,
        {
          userId,
        }
      );

      setWorkspaces((prev) =>
        prev.map((workspace) =>
          workspace._id === workspaceId ? data : workspace
        )
      );

      return data;
    } catch (error) {
      console.error(
        "Add Member Error:",
        error.response?.data || error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        loading,
        workspaces,
        fetchWorkspaces,
        createWorkspace,
        deleteWorkspace,
        addMember,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};