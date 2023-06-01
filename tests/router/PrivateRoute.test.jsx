import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { AuthContext } from '../../src/auth';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from '../../src/router';

describe('testing <PrivateRoute />', () => {
   
   test('should show the children routes if logged in', () => {

      Storage.prototype.setItem = jest.fn();

      const initialValue = {
         logged: true,
         user: {
            id: 123,
            name: 'LNagad'
         }
      };

      render( 
         <AuthContext.Provider value={ initialValue }>
            <MemoryRouter initialEntries={['/login']}>

               <Routes>
                  <Route 
                     path='/login' 
                     element={ 
                        <PublicRoute>
                           <h1>Public</h1>
                        </PublicRoute> 
                     } 
                  />

                  <Route 
                     path='/marvel' 
                     element={ <PrivateRoute>
                        <h1>Private</h1>
                     </PrivateRoute> 
                     } 
                  />  
               </Routes>
            </MemoryRouter>
         </AuthContext.Provider>
      );

      expect( screen.getByText('Private') ).toBeTruthy();

      expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

   });
});
