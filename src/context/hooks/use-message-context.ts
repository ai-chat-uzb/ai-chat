import { useContext } from 'react';
import { CreateContext } from 'context/context';

const useMessageContext = () => {
  const context = useContext(CreateContext);

  if (!context) {
    throw new Error('useThemeContext must be used inside the ThemeProvider');
  }

  return context;
};

export default useMessageContext;
