interface ListProps {
  setCurrentPage: (page: string) => void;
}

export default function List({ setCurrentPage }: ListProps) {
  return (
    <div>
      <h1>List Page</h1>
      <button onClick={() => setCurrentPage("Welcome")}>Back</button>
    </div>
  );
}
