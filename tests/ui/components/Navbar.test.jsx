import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui/components/Navbar';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

   ...jest.requireActual('react-router-dom'),

   useNavigate: () => mockedUseNavigate
}));


describe('testing <Navbar />', () => { 

   const initialValue = {
      logged: true,
      user: {
         name: 'Maycol',
         id: 123
      },
      logout: jest.fn()
   };

   beforeAll( () => jest.clearAllMocks() );

   test('should show the user name on the navBar', () => { 

      render(
         <AuthContext.Provider value={initialValue}>
            <MemoryRouter>
               <Navbar />

            </MemoryRouter>
         </AuthContext.Provider>
      );
      const {user: {name}} = initialValue;

      expect( screen.getByText(name) ).toBeTruthy();
   });

   test('should call the logout & navigate once the button is clicked', () => { 
     
      render(
         <AuthContext.Provider value={initialValue}>
            <MemoryRouter>
               <Navbar />

            </MemoryRouter>
         </AuthContext.Provider>
      );
        
      const buttonElement = screen.getByRole('button');
      fireEvent.click( buttonElement );

      expect( initialValue.logout ).toHaveBeenCalled();

      expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {'replace': true});
   });
  
});
