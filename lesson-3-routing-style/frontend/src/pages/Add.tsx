import { useContext } from "react";
import { PageContext } from "../App";

export default function Add() {
  const { setCurrentPage } = useContext(PageContext);

  return (
    <div>
      <h1>Add Page</h1>
      <button onClick={() => setCurrentPage("Welcome")}>Back</button>
    </div>
  );
}
