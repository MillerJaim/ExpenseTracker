import React from 'react';
import { ExpenseData } from './ExpenseForm';
import './ExpenseStats.css';

interface ExpenseStatsProps {
  expenses: ExpenseData[];
}

interface CategoryStats {
  category: string;
  total: number;
  count: number;
  icon: string;
  displayName: string;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenses }) => {
  const getCategoryDetails = (category: string) => {
    const details = {
      food: { icon: '🍔', displayName: 'Food & Dining' },
      transport: { icon: '🚗', displayName: 'Transportation' },
      entertainment: { icon: '🎬', displayName: 'Entertainment' },
      shopping: { icon: '🛒', displayName: 'Shopping' },
      bills: { icon: '📄', displayName: 'Bills & Utilities' },
      other: { icon: '💰', displayName: 'Other' }
    };
    return details[category as keyof typeof details] || { icon: '💰', displayName: 'Other' };
  };

  const calculateCategoryStats = (): CategoryStats[] => {
    const categoryTotals: { [key: string]: { total: number; count: number } } = {};
    
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = { total: 0, count: 0 };
      }
      categoryTotals[expense.category].total += expense.amount;
      categoryTotals[expense.category].count += 1;
    });

    return Object.entries(categoryTotals).map(([category, stats]) => {
      const details = getCategoryDetails(category);
      return {
        category,
        total: stats.total,
        count: stats.count,
        icon: details.icon,
        displayName: details.displayName
      };
    }).sort((a, b) => b.total - a.total);
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryStats = calculateCategoryStats();

  if (expenses.length === 0) {
    return (
      <div className="expense-stats">
        <h2>Statistics</h2>
        <div className="stats-empty">
          <p>No data to show yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-stats">
      <h2>Statistics</h2>
      
      <div className="stats-overview">
        <div className="stat-item">
          <span className="stat-label">Total Expenses</span>
          <span className="stat-value total">{formatAmount(totalAmount)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Transactions</span>
          <span className="stat-value">{expenses.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Amount</span>
          <span className="stat-value">{formatAmount(totalAmount / expenses.length)}</span>
        </div>
      </div>

      <div className="category-breakdown">
        <h3>By Category</h3>
        <div className="category-stats">
          {categoryStats.map(stat => {
            const percentage = totalAmount > 0 ? (stat.total / totalAmount * 100) : 0;
            return (
              <div key={stat.category} className="category-stat">
                <div className="category-info">
                  <span className="category-icon">{stat.icon}</span>
                  <div className="category-details">
                    <span className="category-name">{stat.displayName}</span>
                    <span className="category-count">{stat.count} transaction{stat.count !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="category-amount">
                  <span className="amount">{formatAmount(stat.total)}</span>
                  <span className="percentage">({percentage.toFixed(1)}%)</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-bar-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;