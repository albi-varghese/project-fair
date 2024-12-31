import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function ContextShare({ children }) {
  const [addProjectResponse, setAddProjectResponse] = useState("");
  const [editProjectResponse,setEditProjectResponse] = useState("")
  return (
    <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
      {children}
      </editProjectResponseContext.Provider>
    </addProjectResponseContext.Provider>
  );
}

// Validate the `children` prop
ContextShare.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextShare;
