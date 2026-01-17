/**
 * /root/wade-usa/apps/main/context/GlobalStateContext.tsx
 * PURPOSE: Global State Management (The Provider Pattern)
 */
import React, { createContext, useContext, useState, useMemo } from 'react';

interface GlobalState {
  [key: string]: any;
}

interface GlobalStateContextType {
  state: GlobalState;
  // A single function to update any key in the state
  updateState: (key: string, value: any) => void;
  // A function to reset state if needed
  resetState: () => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GlobalState>({});

  const updateState = (key: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const resetState = () => setState({});

  // Memoize the value to prevent unnecessary re-renders of children
  const value = useMemo(() => ({ state, updateState, resetState }), [state]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};


// // Example: Inside a Dashboard or Form
// import { useGlobalState } from '../../context/GlobalStateContext';

// const MyComponent = () => {
//   const { state, updateState } = useGlobalState();

//   return (
//     <div>
//       <p>Current Project: {state.activeProject || 'None Selected'}</p>
//       <button onClick={() => updateState('activeProject', 'Wade Engine Alpha')}>
//         Select Project
//       </button>
//     </div>
//   );
// };