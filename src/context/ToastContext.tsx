import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';

interface Toast {
  message: string;
  open: boolean;
}

interface ContextProps {
    children: React.ReactNode;
}

interface ToastContextValue {
  showToast: (message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<ContextProps> = (props: ContextProps) => {
  const [toast, setToast] = useState<Toast>({ message: '', open: false });

  const showToast = (message: string) => {
    setToast({ message, open: true });
  };

  const hideToast = () => {
    setToast((prevToast) => ({ ...prevToast, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {props.children}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={hideToast}
        message={toast.message}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
