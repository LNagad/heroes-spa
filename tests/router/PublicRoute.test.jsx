import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from '../../src/router';
import { AuthContext } from '../../src/auth';

describe('testing <PublicRoute />', () => {
  
   test('should render the children if not authenticated', () => { 
    
      const contextValue = {
         logged: false
      };

      render( 
         <AuthContext.Provider value={ contextValue }>
            <PublicRoute>
               <h2>Public Route</h2>
            </PublicRoute>

         </AuthContext.Provider>
      );

      expect( screen.getByText('Public Route') ).toBeTruthy();
   });

   test('should navigate if is logged in', () => { 
     
      const contextValue = {
         logged: true,
         user: {
            name: 'LNagad',
            id: '123'
         }
      };

      render( 
         <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/login']}>

               <Routes>
                  <Route path='/login' element={
                     <PublicRoute>
                        <h2>Public Route</h2>
                     </PublicRoute>
                  } />
                  <Route path='/marvel' element={<h1>Marvel page</h1>} />
               </Routes>

            </MemoryRouter>
         </AuthContext.Provider>
      );
      
      expect( screen.getByText('Marvel page') ).toBeTruthy();

   });
});
