import {ResumeContext} from "../context/ResumeContext"
import { useContext } from "react";


export function useResume() {
  return useContext(ResumeContext);
}