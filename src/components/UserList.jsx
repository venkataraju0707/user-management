import React, { useEffect } from 'react';
import Pagination from './Pagination';

const UserList = ({ 
  users, 
  onEdit, 
  onDelete, 
  pagination, 
  onPaginationChange, 
  sortConfig, 
  onSortChange,
  loading 
}) => {
  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSortChange({ key, direction });
  };

  const getSortedUsers = () => {
    if (!sortConfig.key) return users;

    return [...users].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toLowerCase?.() || a[sortConfig.key];
      const bValue = b[sortConfig.key]?.toLowerCase?.() || b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedUsers = getSortedUsers();
  const startIndex = (pagination.page - 1) * pagination.limit;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pagination.limit);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span>↕️</span>;
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
        <div className="pagination-controls">
          <select 
            value={pagination.limit} 
            onChange={(e) => onPaginationChange({ ...pagination, limit: parseInt(e.target.value), page: 1 })}
            className="limit-select"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID <SortIcon columnKey="id" />
              </th>
              <th onClick={() => handleSort('firstName')}>
                First Name <SortIcon columnKey="firstName" />
              </th>
              <th onClick={() => handleSort('lastName')}>
                Last Name <SortIcon columnKey="lastName" />
              </th>
              <th onClick={() => handleSort('email')}>
                Email <SortIcon columnKey="email" />
              </th>
              <th onClick={() => handleSort('department')}>
                Department <SortIcon columnKey="department" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td className="actions">
                  <button 
                    onClick={() => onEdit(user)}
                    className="btn btn-edit"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(user.id)}
                    className="btn btn-delete"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedUsers.length === 0 && (
          <div className="no-users">
            <p>No users found</p>
          </div>
        )}
      </div>

      <Pagination
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        totalItems={users.length}
      />
    </div>
  );
};

export default UserList;