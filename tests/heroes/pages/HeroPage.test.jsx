import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes/pages/HeroPage';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUseNavigate
}));


//?This is a mock of the hook that uses heroPage which works and is another way to do something
// jest.mock('react-router-dom', () => ({
//    ...jest.requireActual('react-router-dom'),
//    useParams: () => ({
//       heroId: 'dc-batman'
//    }),
// }));



describe('testing <HeroPage />', () => {

   beforeEach(() => jest.clearAllMocks());

   const id = 'dc-batman';

   test('should show the hero card (Batman) if the heroId is sent', () => {
      
      render(
         <MemoryRouter initialEntries={[`/hero/${id}`]}>
            <Routes>
               <Route 
                  path='/hero/:heroId' 
                  element={
                     <HeroPage />
                  } 
               />
            </Routes>
         </MemoryRouter>
      );

      expect( screen.getByText('Batman') ).toBeTruthy();

   });

   test('should redirect to /marvel if heroId is not finded', () => {
      
      render(
         <MemoryRouter initialEntries={['/hero/sad']}>
            <Routes>
               <Route 
                  path='/hero/:heroId' 
                  element={
                     <HeroPage />
                  } 
               />
               <Route 
                  path='/marvel' 
                  element={
                     <h1>Marvel</h1>
                  } 
               />
            </Routes>
         </MemoryRouter>
      );

      expect( screen.getByText('Marvel') ).toBeTruthy();

   });

   test('should call the navigate if the return button is clicked', () => {
      
      render(
         <MemoryRouter initialEntries={[`/hero/${id}`]}>
            <Routes>
               <Route 
                  path='/hero/:heroId' 
                  element={
                     <HeroPage />
                  } 
               />
            </Routes>
         </MemoryRouter>
      );

      const buttonElement = screen.getByRole('button');

      fireEvent.click(buttonElement);
      expect( mockedUseNavigate ).toHaveBeenCalledWith('/dc');
   });

});
