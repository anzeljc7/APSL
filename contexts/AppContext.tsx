import { formatCurrency, generateId } from '@/utils';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface User {
  id: string;
  taxNumber: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  isAuthenticated: boolean;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'qr';
  amount: number;
  recipient?: string;
  sender?: string;
  merchant?: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: GroupMember[];
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  isActive: boolean;
}

export interface Expense {
  id: string;
  groupId: string;
  amount: number;
  description: string;
  paidBy: string; // User ID who paid
  splitType: 'equal' | 'exact' | 'percentage' | 'shares';
  splits: ExpenseSplit[];
  date: string;
  category?: string;
  receipt?: string;
}

export interface ExpenseSplit {
  userId: string;
  amount: number;
  percentage?: number;
  shares?: number;
}

export interface Debt {
  fromUserId: string;
  toUserId: string;
  amount: number;
  groupId?: string;
}

export interface Settlement {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  groupId?: string;
  date: string;
  status: 'pending' | 'completed';
}

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  groups: Group[];
  debts: Debt[];
  settlements: Settlement[];
  isLoading: boolean;
  error: string | null;
  
  // Authentication
  login: (taxNumber: string, activationCode: string) => Promise<boolean>;
  logout: () => void;
  
  // Transaction management
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateBalance: (amount: number) => void;
  
  // Group management
  createGroup: (name: string, description?: string) => string;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  addGroupMember: (groupId: string, member: Omit<GroupMember, 'id'>) => void;
  
  // Expense management
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  updateExpense: (expenseId: string, updates: Partial<Expense>) => void;
  deleteExpense: (expenseId: string) => void;
  
  // Debt settlement
  calculateDebts: (groupId?: string) => Debt[];
  settleDebt: (fromUserId: string, toUserId: string, amount: number, groupId?: string) => void;
  getGroupBalance: (groupId: string) => { userId: string; balance: number }[];
  
  // Utility functions
  clearError: () => void;
  formatCurrency: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock transactions data
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'sent',
        amount: 25.00,
        recipient: 'John Doe',
        description: 'Payment for lunch',
        date: '2024-01-15T14:30:00Z',
        status: 'completed',
      },
      {
        id: '2',
        type: 'received',
        amount: 50.00,
        sender: 'Jane Smith',
        description: 'Shared expenses',
        date: '2024-01-15T16:15:00Z',
        status: 'completed',
      },
      {
        id: '3',
        type: 'qr',
        amount: 4.50,
        merchant: 'Coffee Shop',
        description: 'Morning coffee',
        date: '2024-01-14T10:45:00Z',
        status: 'completed',
      },
      {
        id: '4',
        type: 'sent',
        amount: 100.00,
        recipient: 'Mike Johnson',
        description: 'Birthday gift',
        date: '2024-01-13T20:00:00Z',
        status: 'completed',
      },
      {
        id: '5',
        type: 'received',
        amount: 15.00,
        sender: 'Sarah Wilson',
        description: 'Movie tickets',
        date: '2024-01-12T18:30:00Z',
        status: 'completed',
      },
    ];
    setTransactions(mockTransactions);

    // Mock groups data
    const mockGroups: Group[] = [
      {
        id: '1',
        name: 'Roommates',
        description: 'Shared apartment expenses',
        members: [
          { id: '1', name: 'John Smith', email: 'john@example.com', isActive: true },
          { id: '2', name: 'Jane Doe', email: 'jane@example.com', isActive: true },
          { id: '3', name: 'Mike Johnson', email: 'mike@example.com', isActive: true },
        ],
        expenses: [
          {
            id: 'exp1',
            groupId: '1',
            amount: 120.00,
            description: 'Groceries for the week',
            paidBy: '1',
            splitType: 'equal',
            splits: [
              { userId: '1', amount: 40.00 },
              { userId: '2', amount: 40.00 },
              { userId: '3', amount: 40.00 },
            ],
            date: '2024-01-14T10:30:00Z',
            category: 'Food',
          },
          {
            id: 'exp2',
            groupId: '1',
            amount: 45.00,
            description: 'Electricity bill',
            paidBy: '2',
            splitType: 'equal',
            splits: [
              { userId: '1', amount: 15.00 },
              { userId: '2', amount: 15.00 },
              { userId: '3', amount: 15.00 },
            ],
            date: '2024-01-12T14:20:00Z',
            category: 'Utilities',
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'Vacation Friends',
        description: 'Trip to Barcelona',
        members: [
          { id: '1', name: 'John Smith', email: 'john@example.com', isActive: true },
          { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', isActive: true },
          { id: '5', name: 'Tom Brown', email: 'tom@example.com', isActive: true },
        ],
        expenses: [
          {
            id: 'exp3',
            groupId: '2',
            amount: 300.00,
            description: 'Hotel booking',
            paidBy: '1',
            splitType: 'equal',
            splits: [
              { userId: '1', amount: 100.00 },
              { userId: '4', amount: 100.00 },
              { userId: '5', amount: 100.00 },
            ],
            date: '2024-01-10T16:45:00Z',
            category: 'Accommodation',
          },
        ],
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
    ];
    setGroups(mockGroups);
  }, []);

  const login = useCallback(async (taxNumber: string, activationCode: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockUser: User = {
        id: generateId(),
        taxNumber,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+386 40 123 456',
        balance: 1234.56,
        isAuthenticated: true,
      };
      
      setUser(mockUser);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      date: new Date().toISOString(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update balance based on transaction type
    if (user) {
      const balanceChange = transactionData.type === 'received' 
        ? transactionData.amount 
        : -transactionData.amount;
      
      setUser(prev => prev ? {
        ...prev,
        balance: prev.balance + balanceChange,
      } : null);
    }
  }, [user]);

  const updateBalance = (amount: number) => {
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        balance: amount,
      } : null);
    }
  };

  // Group management methods
  const createGroup = (name: string, description?: string): string => {
    const groupId = Date.now().toString();
    const newGroup: Group = {
      id: groupId,
      name,
      description,
      members: user ? [{ id: user.id, name: user.name, email: user.email, isActive: true }] : [],
      expenses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGroups(prev => [...prev, newGroup]);
    return groupId;
  };

  const joinGroup = (groupId: string) => {
    if (!user) return;
    
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? {
            ...group,
            members: [...group.members, { id: user.id, name: user.name, email: user.email, isActive: true }],
            updatedAt: new Date().toISOString(),
          }
        : group
    ));
  };

  const leaveGroup = (groupId: string) => {
    if (!user) return;
    
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? {
            ...group,
            members: group.members.filter(member => member.id !== user.id),
            updatedAt: new Date().toISOString(),
          }
        : group
    ));
  };

  const addGroupMember = (groupId: string, member: Omit<GroupMember, 'id'>) => {
    const memberId = Date.now().toString();
    const newMember: GroupMember = { ...member, id: memberId };
    
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? {
            ...group,
            members: [...group.members, newMember],
            updatedAt: new Date().toISOString(),
          }
        : group
    ));
  };

  // Expense management methods
  const addExpense = (expenseData: Omit<Expense, 'id' | 'date'>) => {
    const expenseId = Date.now().toString();
    const newExpense: Expense = {
      ...expenseData,
      id: expenseId,
      date: new Date().toISOString(),
    };
    
    setGroups(prev => prev.map(group => 
      group.id === expenseData.groupId 
        ? {
            ...group,
            expenses: [...group.expenses, newExpense],
            updatedAt: new Date().toISOString(),
          }
        : group
    ));
  };

  const updateExpense = (expenseId: string, updates: Partial<Expense>) => {
    setGroups(prev => prev.map(group => ({
      ...group,
      expenses: group.expenses.map(expense => 
        expense.id === expenseId ? { ...expense, ...updates } : expense
      ),
      updatedAt: new Date().toISOString(),
    })));
  };

  const deleteExpense = (expenseId: string) => {
    setGroups(prev => prev.map(group => ({
      ...group,
      expenses: group.expenses.filter(expense => expense.id !== expenseId),
      updatedAt: new Date().toISOString(),
    })));
  };

  // Debt settlement methods
  const calculateDebts = (groupId?: string): Debt[] => {
    const relevantGroups = groupId ? groups.filter(g => g.id === groupId) : groups;
    const calculatedDebts: Debt[] = [];
    
    relevantGroups.forEach(group => {
      const memberBalances: { [userId: string]: number } = {};
      
      // Initialize balances
      group.members.forEach(member => {
        memberBalances[member.id] = 0;
      });
      
      // Calculate balances from expenses
      group.expenses.forEach(expense => {
        const paidByAmount = expense.amount;
        memberBalances[expense.paidBy] += paidByAmount;
        
        expense.splits.forEach(split => {
          memberBalances[split.userId] -= split.amount;
        });
      });
      
      // Create debt relationships
      const creditors = Object.entries(memberBalances)
        .filter(([_, balance]) => balance > 0)
        .sort((a, b) => b[1] - a[1]);
      
      const debtors = Object.entries(memberBalances)
        .filter(([_, balance]) => balance < 0)
        .sort((a, b) => a[1] - b[1]);
      
      let creditorIndex = 0;
      let debtorIndex = 0;
      
      while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
        const [creditorId, creditorBalance] = creditors[creditorIndex];
        const [debtorId, debtorBalance] = debtors[debtorIndex];
        
        const settlementAmount = Math.min(creditorBalance, Math.abs(debtorBalance));
        
        if (settlementAmount > 0.01) { // Avoid tiny amounts
          calculatedDebts.push({
            fromUserId: debtorId,
            toUserId: creditorId,
            amount: settlementAmount,
            groupId: group.id,
          });
        }
        
        creditors[creditorIndex][1] -= settlementAmount;
        debtors[debtorIndex][1] += settlementAmount;
        
        if (creditors[creditorIndex][1] <= 0.01) creditorIndex++;
        if (Math.abs(debtors[debtorIndex][1]) <= 0.01) debtorIndex++;
      }
    });
    
    return calculatedDebts;
  };

  const settleDebt = (fromUserId: string, toUserId: string, amount: number, groupId?: string) => {
    const settlementId = Date.now().toString();
    const newSettlement: Settlement = {
      id: settlementId,
      fromUserId,
      toUserId,
      amount,
      groupId,
      date: new Date().toISOString(),
      status: 'completed',
    };
    
    setSettlements(prev => [...prev, newSettlement]);
    
    // Add transaction for the settlement
    addTransaction({
      type: 'sent',
      amount,
      recipient: toUserId,
      description: `Settlement${groupId ? ` - Group` : ''}`,
      status: 'completed',
    });
  };

  const getGroupBalance = (groupId: string): { userId: string; balance: number }[] => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return [];
    
    const memberBalances: { [userId: string]: number } = {};
    
    // Initialize balances
    group.members.forEach(member => {
      memberBalances[member.id] = 0;
    });
    
    // Calculate balances from expenses
    group.expenses.forEach(expense => {
      const paidByAmount = expense.amount;
      memberBalances[expense.paidBy] += paidByAmount;
      
      expense.splits.forEach(split => {
        memberBalances[split.userId] -= split.amount;
      });
    });
    
    return Object.entries(memberBalances).map(([userId, balance]) => ({
      userId,
      balance,
    }));
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const formatCurrencyMemo = useCallback((amount: number) => {
    return formatCurrency(amount);
  }, []);

  const value: AppContextType = useMemo(() => ({
    user,
    transactions,
    groups,
    debts,
    settlements,
    isLoading,
    error,
    login,
    logout,
    addTransaction,
    updateBalance,
    createGroup,
    joinGroup,
    leaveGroup,
    addGroupMember,
    addExpense,
    updateExpense,
    deleteExpense,
    calculateDebts,
    settleDebt,
    getGroupBalance,
    clearError,
    formatCurrency: formatCurrencyMemo,
  }), [
    user,
    transactions,
    groups,
    debts,
    settlements,
    isLoading,
    error,
    login,
    logout,
    addTransaction,
    updateBalance,
    createGroup,
    joinGroup,
    leaveGroup,
    addGroupMember,
    addExpense,
    updateExpense,
    deleteExpense,
    calculateDebts,
    settleDebt,
    getGroupBalance,
    clearError,
    formatCurrencyMemo,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
