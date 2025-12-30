interface AddProps {
  setCurrentPage: (page: string) => void;
}

export default function Add({ setCurrentPage }: AddProps) {
  return (
    <div>
      <h1>Add Page</h1>
      <button onClick={() => setCurrentPage("Welcome")}>Back</button>
    </div>
  );
}
