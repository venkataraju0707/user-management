import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import FilterPopup from './components/FilterPopup';
import LoadingSpinner from './components/LoadingSpinner';
import { useUsers } from './hooks/useUsers';
import './App.css';

function App() {
  const {
    users,
    loading,
    error,
    currentUser,
    pagination,
    filters,
    sortConfig,
    addUser,
    updateUser,
    deleteUser,
    setCurrentUser,
    setPagination,
    setFilters,
    setSortConfig,
    clearError
  } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = (userData) => {
    if (currentUser) {
      updateUser(currentUser.id, userData);
    } else {
      addUser(userData);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

   
  const processUsers = (users) => {
    return users.map(user => {
      const nameParts = user.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      
      return {
        ...user,
        firstName,
        lastName,
        department: user.company?.name || 'N/A'
      };
    });
  };

  const processedUsers = processUsers(users);

  const filteredUsers = processedUsers.filter(user => {
    if (!filters.search) return true;
    
    const searchLower = filters.search.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.department.toLowerCase().includes(searchLower)
    );
  });

  if (loading && users.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management</h1>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <span>{error}</span>
            <button onClick={clearError} className="error-close">×</button>
          </div>
        )}

        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          
          <div className="button-group">
            <button 
              onClick={() => setShowFilters(true)}
              className="btn btn-secondary"
            >
              Filters
            </button>
            <button 
              onClick={handleAddUser}
              className="btn btn-primary"
            >
              Add User
            </button>
          </div>
        </div>

        <UserList
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={deleteUser}
          pagination={pagination}
          onPaginationChange={setPagination}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
          loading={loading}
        />

        {showForm && (
          <UserForm
            user={currentUser}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={loading}
          />
        )}

        {showFilters && (
          <FilterPopup
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;