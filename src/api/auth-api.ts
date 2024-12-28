export const authApi = {
    login: async (username: string, password: string): Promise<{ token: string }> => {
      await new Promise((resolve) => setTimeout(resolve, 350));
  
      if (username === 'admin@example.com' && password === '1234') {
        return { token: 'fake-token-12345' };
      }
      
      throw new Error('Invalid credentials');
    },
  };
  