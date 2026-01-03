import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';

const startState = loadState('employees') || {
  items: [],
  filter: {
    search: '',
    gender: 'all', // all, Male, Female
    status: 'all', // all, active, inactive
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState: startState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = { ...action.payload, id: Date.now().toString() };
      state.items.push(newEmployee);
      saveState('employees', state);
    },
    updateEmployee: (state, action) => {
      const index = state.items.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveState('employees', state);
      }
    },
    deleteEmployee: (state, action) => {
      state.items = state.items.filter(e => e.id !== action.payload);
      saveState('employees', state);
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setFilter } = employeeSlice.actions;

export const selectAllEmployees = (state) => state.employees.items;
export const selectFilter = (state) => state.employees.filter;

export const selectFilteredEmployees = (state) => {
  const { items, filter } = state.employees;
  return items.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(filter.search.toLowerCase());
    const matchesGender = filter.gender === 'all' || emp.gender === filter.gender;
    const matchesStatus = filter.status === 'all' 
      || (filter.status === 'active' && emp.active)
      || (filter.status === 'inactive' && !emp.active);
    
    return matchesSearch && matchesGender && matchesStatus;
  });
};

export const selectStats = (state) => {
  const items = state.employees.items;
  return {
    total: items.length,
    active: items.filter(e => e.active).length,
    inactive: items.filter(e => !e.active).length,
  };
};

export default employeeSlice.reducer;
