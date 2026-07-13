import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";


const WorkSpace = () => {
  const { workspaceId } = useParams();
  console.log("WorkSpace", workspaceId);
  return (
    <>
      <Navbar />
      <div>WorkSpace: {workspaceId}</div>
    </>
  )
}

export default WorkSpace