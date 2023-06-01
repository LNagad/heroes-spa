import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUseNavigate
}));

describe('testing <SearchPage />', () => { 

   beforeEach(() => jest.clearAllMocks());

   test('should show the default values', () => { 

      const { container } = render(
         <MemoryRouter>
            <SearchPage />
         </MemoryRouter>
      );

      expect( container ).toMatchSnapshot();
    
   });

   test('should show Batman & the input should have the queryString', () => { 

      render(
         <MemoryRouter initialEntries={['/search?q=batman']}>
            <SearchPage />
         </MemoryRouter>
      );

      const input = screen.getByRole('textbox');
      const img = screen.getByRole('img');

      expect( input.value ).toBe('batman');
      expect( img.src ).toContain('/heroes/dc-batman.jpg');
      // screen.debug();
   });

   test('should show the error container if not hero found', () => { 
      const inputValue = 'Mentol';

      render(
         <MemoryRouter initialEntries={[`/search?q${inputValue}`]}>
            <SearchPage />
         </MemoryRouter>
      );
      
      const showErrorMessage = screen.getByLabelText('showErrorMessage'); 
      
      expect(showErrorMessage).toBeTruthy();
      
   });

   test('should call the navigate', () => { 
    
      render(
         <MemoryRouter>
            <SearchPage />
         </MemoryRouter>
      );
      const inputValue = 'Mentol';
      const input = screen.getByRole('textbox');

      fireEvent.input(input, {target: {value: inputValue}});
      fireEvent.submit( screen.getByLabelText('form' ) );
      
      expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=Mentol')
   });

});