import React from 'react';
import './Search.css';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { getSearch } from '../../store/search';
export default function Search({placeholder, searchData}){
const dispatch = useDispatch()
const history = useHistory();

const [searchText, setSearchText] = useState('');

useEffect(() => {
},[dispatch])



const handleSubmit = async (e) => {
    e.preventDefault();
    console.time('in handle submit')
    dispatch(getSearch(searchText)).then(() => {
       history.push('/search')
    })

}
    return (
        <div className='search'>
            <div className='searchInputs'></div>
            <form onSubmit={handleSubmit} >

            <input type="text"  value={searchText}
              onChange={
                (e) => setSearchText(e.target.value)
            }
            placeholder='enter a movie name...'></input>
            <input className='searchSubmit'  type='submit' value='submitSearch'></input>
            <div className='searchIcon'></div>
            <div className='dataResult'>
                {/* {searchData.map((movie) => {
                    return<div>{movie.title}</div>
                })} */}
            </div>
                </form>
        </div>
    )
}
