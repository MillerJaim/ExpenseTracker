import { ExpenseData } from '../components/ExpenseForm';

const STORAGE_KEY = 'expense_tracker_data';

export const saveExpensesToStorage = (expenses: ExpenseData[]): void => {
  try {
    const data = {
      expenses,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save expenses to localStorage:', error);
  }
};

export const loadExpensesFromStorage = (): ExpenseData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const data = JSON.parse(stored);
    
    if (data && Array.isArray(data.expenses)) {
      return data.expenses.filter(expense => 
        expense.id && 
        typeof expense.amount === 'number' && 
        expense.description && 
        expense.category && 
        expense.date
      );
    }
    
    return [];
  } catch (error) {
    console.error('Failed to load expenses from localStorage:', error);
    return [];
  }
};

export const clearExpensesFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear expenses from localStorage:', error);
  }
};