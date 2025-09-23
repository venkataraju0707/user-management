import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const [filters, setFilters] = useState({
    search: '',
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await userAPI.getUsers();
      setUsers(data);
      setPagination(prev => ({ ...prev, total: data.length }));
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await userAPI.createUser(userData);
      setUsers(prev => [...prev, { ...newUser, id: Date.now() }]); // Mock ID since API doesn't actually create
    } catch (err) {
      setError('Failed to add user: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    
    try {
      await userAPI.updateUser(id, userData);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      ));
    } catch (err) {
      setError('Failed to update user: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await userAPI.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
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
  };
};