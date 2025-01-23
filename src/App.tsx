import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm, { ExpenseData } from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { saveExpensesToStorage, loadExpensesFromStorage } from './utils/localStorage';

function App() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedExpenses = loadExpensesFromStorage();
    setExpenses(loadedExpenses);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveExpensesToStorage(expenses);
    }
  }, [expenses, isLoading]);

  const handleAddExpense = (expense: ExpenseData) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Expense Tracker</h1>
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
        <p>Track your daily expenses</p>
      </header>
      <main>
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseList 
          expenses={expenses} 
          onDeleteExpense={handleDeleteExpense} 
        />
      </main>
    </div>
  );
}

export default App;