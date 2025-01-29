import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm, { ExpenseData } from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseStats from './components/ExpenseStats';
import ExpenseFilter, { FilterCriteria } from './components/ExpenseFilter';
import EditExpenseModal from './components/EditExpenseModal';
import { saveExpensesToStorage, loadExpensesFromStorage } from './utils/localStorage';

function App() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<ExpenseData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const loadedExpenses = loadExpensesFromStorage();
    setExpenses(loadedExpenses);
    setFilteredExpenses(loadedExpenses);
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

  const handleEditExpense = (expense: ExpenseData) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedExpense: ExpenseData) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setIsEditModalOpen(false);
    setEditingExpense(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingExpense(null);
  };

  const handleFilterChange = (criteria: FilterCriteria) => {
    let filtered = [...expenses];

    if (criteria.category) {
      filtered = filtered.filter(expense => expense.category === criteria.category);
    }

    if (criteria.dateFrom) {
      filtered = filtered.filter(expense => expense.date >= criteria.dateFrom);
    }

    if (criteria.dateTo) {
      filtered = filtered.filter(expense => expense.date <= criteria.dateTo);
    }

    if (criteria.searchText) {
      const searchLower = criteria.searchText.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredExpenses(filtered);
  };

  const handleClearFilters = () => {
    setFilteredExpenses(expenses);
  };

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

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
        <ExpenseFilter 
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        <ExpenseStats expenses={filteredExpenses} />
        <ExpenseList 
          expenses={filteredExpenses} 
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
        <EditExpenseModal
          expense={editingExpense}
          isOpen={isEditModalOpen}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </main>
    </div>
  );
}

export default App;