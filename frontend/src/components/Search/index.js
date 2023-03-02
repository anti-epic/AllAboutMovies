import React from 'react';
import './Search.css';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {getSearch} from '../../store/search';
export default function Search({placeholder, searchData}) {
    const dispatch = useDispatch()
    const history = useHistory();

    const [searchText, setSearchText] = useState('');
    const searchObj = useSelector(state => state.search)
    useEffect(() => {}, [dispatch])
let search = []

useEffect(() => {


    },[dispatch, search])



    const handleSearching = async (e) => {
        setSearchText(e.target.value)
        if(searchObj){
            search = Object.values(searchObj)
        }
     setTimeout(() => {
            dispatch(getSearch(searchText)).then(() =>{
                if(searchObj){
                    search = Object.values(searchObj)
                }
            }).then((data) => {
                dispatch(getSearch(searchText))
            },5000);
            }, 500)

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch(getSearch(searchText)).then(() => {
            history.push('/search')
        })

    }
    return search ? (
        <div className='search'>
            <div className='searchInputs'></div>
            <form onSubmit={handleSubmit}>

                <input className='searchArea' type="text"
                    value={searchText}
                    onChange={handleSearching}
                    required
                    placeholder='enter a movie name...'></input>
                <input className='searchSubmit' type='submit' value='search'></input>
                <div className='searchIcon'></div>
                <div className='dataResult'>
                    {/* {search.map((movie) => {
                    <div>{movie.title}</div>
                })} */}
                 </div>
            </form>
        </div>
    ) : (<div></div>)
}
