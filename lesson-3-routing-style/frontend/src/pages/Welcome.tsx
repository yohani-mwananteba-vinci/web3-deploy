interface WelcomeProps {
  setCurrentPage: (page: string) => void;
}
export default function Welcome({ setCurrentPage }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome Page</h1>
      <button onClick={() => setCurrentPage("List")}>View Expense List</button>
      <button onClick={() => setCurrentPage("Add")}>Add a new Expense</button>
    </div>
  );
}
