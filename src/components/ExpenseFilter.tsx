import React, { useState } from 'react';
import './ExpenseFilter.css';

export interface FilterCriteria {
  category: string;
  dateFrom: string;
  dateTo: string;
  searchText: string;
}

interface ExpenseFilterProps {
  onFilterChange: (criteria: FilterCriteria) => void;
  onClearFilters: () => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ onFilterChange, onClearFilters }) => {
  const [category, setCategory] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = () => {
    const criteria: FilterCriteria = {
      category,
      dateFrom,
      dateTo,
      searchText: searchText.trim()
    };
    onFilterChange(criteria);
  };

  const handleClearAll = () => {
    setCategory('');
    setDateFrom('');
    setDateTo('');
    setSearchText('');
    onClearFilters();
  };

  const hasActiveFilters = category || dateFrom || dateTo || searchText;

  React.useEffect(() => {
    handleFilterChange();
  }, [category, dateFrom, dateTo, searchText]);

  return (
    <div className="expense-filter">
      <div className="filter-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>🔍 Filters</span>
          {hasActiveFilters && <span className="filter-badge">{
            [category, dateFrom, dateTo].filter(Boolean).length
          }</span>}
        </button>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filter-options">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="food">Food & Dining</option>
                <option value="transport">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills & Utilities</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="date-from">From Date</label>
              <input
                type="date"
                id="date-from"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="date-to">To Date</label>
              <input
                type="date"
                id="date-to"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                min={dateFrom}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseFilter;