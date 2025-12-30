import { useContext } from "react";
import { PageContext } from "../App";

export default function List() {
  const { setCurrentPage } = useContext(PageContext);

  return (
    <div>
      <h1>List Page</h1>
      <button onClick={() => setCurrentPage("Welcome")}>Back</button>
    </div>
  );
}
