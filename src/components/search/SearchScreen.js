import React, { useMemo } from 'react'
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    
    const [ formValues, handleInputChange] = useForm({
        searchText: q
    });
    
    const { searchText } = formValues;
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
       history.push(`?q=${searchText}`);
    }


    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-lg-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-xs-12 col-sm-12 col-lg-7">
                    <h4> Results </h4>
                    <hr/>

                    { 
                        (q === '') 
                            && <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                     { 
                        (q !== '' && heroesFiltered.length === 0) 
                            && <div className="alert alert-danger">
                                There is no a hero with  <b>{ q }</b>
                            </div>
                    }
                    
                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
