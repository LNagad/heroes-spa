import { Navigate, Route, Routes } from 'react-router-dom';
import { DcPage, HeroPage, MarvelPage, SearchPage } from '../pages';
import { Navbar } from '../../ui/components';

export const HeroesRoutes = () => {
   return (
      <>
         <Navbar />
         {/* The reason why the Routes container is wrapped in a div.container is
      to apply the padding and margin to all the children pages inside of It */}
         <div className="container"> 
            <Routes>
          
               <Route path='/marvel' element={<MarvelPage />}/>
               <Route path='/dc' element={<DcPage />}/>
                    
               <Route path='/search' element={<SearchPage />}/>
               <Route path='/hero/:heroId' element={<HeroPage />}/>

               <Route path='/' element={<Navigate to='/marvel' />}/>
               {/* <Route path='/*' element={<Navigate to='/marvel' />}/> */}

            </Routes>
         </div>
      </>
   );
};
