import React from 'react';
import { ExpenseData } from './ExpenseForm';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: ExpenseData[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍔';
      case 'transport': return '🚗';
      case 'entertainment': return '🎬';
      case 'shopping': return '🛒';
      case 'bills': return '📄';
      default: return '💰';
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h2>Your Expenses</h2>
        <div className="empty-state">
          <p>No expenses yet. Add your first expense above!</p>
        </div>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>Your Expenses</h2>
        <div className="total-amount">
          Total: {formatAmount(totalAmount)}
        </div>
      </div>
      
      <div className="expenses">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-icon">
              {getCategoryIcon(expense.category)}
            </div>
            <div className="expense-details">
              <div className="expense-description">{expense.description}</div>
              <div className="expense-meta">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{formatDate(expense.date)}</span>
              </div>
            </div>
            <div className="expense-amount">
              {formatAmount(expense.amount)}
            </div>
            <button 
              className="delete-btn"
              onClick={() => onDeleteExpense(expense.id)}
              title="Delete expense"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;