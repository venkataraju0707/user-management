import React from 'react';

const FilterPopup = ({ filters, onFiltersChange, onClose }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content filter-popup">
        <div className="modal-header">
          <h2>Filter Users</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="filter-content">
          <div className="filter-group">
            <label htmlFor="filter-firstName">First Name</label>
            <input
              type="text"
              id="filter-firstName"
              value={filters.firstName || ''}
              onChange={(e) => handleFilterChange('firstName', e.target.value)}
              placeholder="Filter by first name..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-lastName">Last Name</label>
            <input
              type="text"
              id="filter-lastName"
              value={filters.lastName || ''}
              onChange={(e) => handleFilterChange('lastName', e.target.value)}
              placeholder="Filter by last name..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-email">Email</label>
            <input
              type="email"
              id="filter-email"
              value={filters.email || ''}
              onChange={(e) => handleFilterChange('email', e.target.value)}
              placeholder="Filter by email..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="filter-department">Department</label>
            <input
              type="text"
              id="filter-department"
              value={filters.department || ''}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              placeholder="Filter by department..."
            />
          </div>

          <div className="filter-actions">
            <button 
              type="button" 
              onClick={clearFilters}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;