import React, { useState } from 'react';
import './App.css';
import ExpenseForm, { ExpenseData } from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);

  const handleAddExpense = (expense: ExpenseData) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

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