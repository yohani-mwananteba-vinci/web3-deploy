import { useLoaderData } from 'react-router';
import ExpenseTransactionItem from '@/components/ExpenseTransactionItem';
import TransferTransactionItem from '@/components/TransferTransactionItem';
import type { LoaderData } from './loader';


export default function Transactions() {
  const { transactions } = useLoaderData<LoaderData>();
  // C: Dans la solution, la section utilise des classes utilitaires (container mx-auto, marges, etc.) pour respecter la maquette.
  return (
    <section>
      {/* C: La solution affiche un titre et un sous-titre ("Transactions", "Recent transaction activity") en haut de la page. */}
      {/* C: Il manque aussi une gestion explicite du cas où la liste est vide (afficher "No transactions found" quand transactions.length === 0). */}
      <ul>
        {/* C: La solution enrobe chaque transaction dans un conteneur stylé (div avec transition/hover) au lieu d'un simple <li> non stylé. */}
        {transactions.map((tx) => (
          <li key={`${tx.id}`} >
              {tx.kind === 'expense' ? (
                <ExpenseTransactionItem transaction={tx} />
              ) : (
                <TransferTransactionItem transaction={tx} />
              )}
          </li>
        ))}
      </ul>
    </section>
  );
}