import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router';
import { AuthContext } from '../../src/auth';
import { render, screen } from '@testing-library/react';

describe('testing <AppRouter />', () => { 
  
   test('should show the login if not authenticated', () => { 

      const initialValue = {logged: false};

      render( 
         <MemoryRouter initialEntries={['/marvel']}>
            <AuthContext.Provider value={ initialValue }>
               <AppRouter />
            </AuthContext.Provider>
         </MemoryRouter>
      );

      expect( screen.getAllByText('Login').length ).toBe(2);

   });

   
   test('should show /marvel page if authenticated', () => { 

      const initialValue = {logged: true};

      render( 
         <MemoryRouter initialEntries={['/login']}>
            <AuthContext.Provider value={ initialValue }>
               <AppRouter />
            </AuthContext.Provider>
         </MemoryRouter>
      );

      expect( screen.getByText('Marvel Page') ).toBeTruthy();

   });


});