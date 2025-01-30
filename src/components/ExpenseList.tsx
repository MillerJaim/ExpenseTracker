import React from 'react';
import { ExpenseData } from './ExpenseForm';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: ExpenseData[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (expense: ExpenseData) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense, onEditExpense }) => {
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
          <p>📝 No expenses yet</p>
          <p style={{fontSize: '0.9rem', color: '#999', marginTop: '8px'}}>Add your first expense above to get started!</p>
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
            <div className="expense-actions">
              <button 
                className="edit-btn"
                onClick={() => onEditExpense(expense)}
                title="Edit expense"
              >
                ✏️
              </button>
              <button 
                className="delete-btn"
                onClick={() => onDeleteExpense(expense.id)}
                title="Delete expense"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;