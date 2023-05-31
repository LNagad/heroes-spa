
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';

import queryString from 'query-string';
import { getHeroesByName } from '../helpers/getHeroesByName';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = ''} = queryString.parse( location.search );

  const heroes = getHeroesByName(q);

  const showSearchMessage = (q === '');
  const showErroMessage = (heroes.length === 0);

  const { searchText, onInputChange, onResetBtn} = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
  
    navigate(`?q=${ searchText }`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        
        <div className="col-5">
          <h4>Searching...</h4>
          <hr />

          <form onSubmit={ onSearchSubmit } >

            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off" 
              value={ searchText }
              onChange={ onInputChange }
            />

            <button 
              type='submit' 
              className="btn btn-outline-primary mt-3">Search
            </button>

          </form>

        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            (showSearchMessage) 
              ? <div className="alert alert-primary">Search a Hero</div>
              : (showErroMessage) 
            && <div className="alert alert-danger">No hero with <b> { q } </b></div>
          }


          {
            heroes.map( hero => (
              <HeroCard key={ hero.id } { ...hero } />
            ))
          }

        </div>

      </div>
    </>
  );
};
