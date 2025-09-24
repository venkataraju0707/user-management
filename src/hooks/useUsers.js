import { useState, useEffect, useCallback, useMemo } from 'react';
import { userAPI } from '../services/api';

export const useUsers = () => {
  const [allUsers, setAllUsers] = useState([{
    id: 1,
    name: "Prabhas",
    username: "Bret",
    email: "PanIndianStar@gmail.com",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: { lat: "-37.3159", lng: "81.1496" }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  },
  {
    id: 2,
    name: "MS Dhoni",
    username: "Antonette",
    email: " CaptainCool@gmail.com",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43.9509", lng: "-34.4618" }
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    }
  },
  {
    id: 3,
    name: "Rajinikant",
    username: "Samantha",
    email: "SuperStar@gmail.com",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: { lat: "-68.6102", lng: "-47.0653" }
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications"
    }
  },
  {
    id: 4,
    name: "Hrithik Roshan",
    username: "Karianne",
    email: "GreekGod@gmail.com",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: { lat: "29.4572", lng: "-164.2990" }
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services"
    }
  }]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 4
  });

  const [filters, setFilters] = useState({
    search: '',
    name: '',
    email: '',
    department: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

   const getNameParts = (user) => {
    if (!user || !user.name) return { firstName: '', lastName: '' };
    
    const nameParts = user.name.split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || ''
    };
  };

   const processedUsers = useMemo(() => {
    let result = allUsers;
    
     if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(user => {
        const name = user?.name || '';
        const email = user?.email || '';
        const companyName = user?.company?.name || '';
        
        return name.toLowerCase().includes(searchLower) ||
               email.toLowerCase().includes(searchLower) ||
               companyName.toLowerCase().includes(searchLower);
      });
    }
    
     if (filters.name) {
      const nameLower = filters.name.toLowerCase();
      result = result.filter(user => 
        user?.name?.toLowerCase().includes(nameLower)
      );
    }
    
    if (filters.email) {
      const emailLower = filters.email.toLowerCase();
      result = result.filter(user => 
        user?.email?.toLowerCase().includes(emailLower)
      );
    }
    
    if (filters.department) {
      const deptLower = filters.department.toLowerCase();
      result = result.filter(user => 
        user?.company?.name?.toLowerCase().includes(deptLower)
      );
    }
    
     if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        
         if (sortConfig.key === 'department') {
          const aDept = a?.company?.name || '';
          const bDept = b?.company?.name || '';
          
          if (aDept < bDept) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aDept > bDept) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        }
        
         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
     setPagination(prev => ({ ...prev, total: result.length }));
    
     const startIndex = (pagination.page - 1) * pagination.limit;
    return result.slice(startIndex, startIndex + pagination.limit);
  }, [allUsers, filters, sortConfig, pagination.page, pagination.limit]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await userAPI.getUsers();
       const mappedData = data.map(u => ({
        id: u.id,
        name: u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim(),
        firstName: u.firstName || (u.name ? u.name.split(' ')[0] : ''),
        lastName: u.lastName || (u.name ? u.name.split(' ').slice(1).join(' ') : ''),
        email: u.email || '',
        username: u.username || '',
        phone: u.phone || '',
        website: u.website || '',
        address: u.address || {},
        company: u.company || { name: '' },
        department: u.company?.name || u.department || ''
      })).filter(user => user.name); 
      
      setAllUsers(prev => [...prev, ...mappedData]);
    } catch (err) {
      setError('Failed to fetch users: ' + (err.message || 'Unknown error'));
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
      const userWithName = {
        ...newUser,
        id: Date.now(),  
        name: userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
        company: userData.company || { name: userData.department || '' }
      };
      
      setAllUsers(prev => [...prev, userWithName]);
    } catch (err) {
      setError('Failed to add user: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    
    try {
      await userAPI.updateUser(id, userData);
      setAllUsers(prev => prev.map(user => 
        user.id === id ? { 
          ...user, 
          ...userData,
          name: userData.name || user.name,
          company: userData.company || user.company
        } : user
      ));
    } catch (err) {
      setError('Failed to update user: ' + (err.message || 'Unknown error'));
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
      setAllUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    users: processedUsers,
    allUsers,
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
    clearError,
    getNameParts  
  };
};
