import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import './Crew.css'
import {getCastThunk} from '../../store/cast';


const Crew = () => {
    const dispatch = useDispatch()

    let crew = [];
    const [isLoaded, setIsLoaded] = useState(false);
    const {movieId} = useParams();


    const crewObj = useSelector(state => {
        return state.cast.cast
    })


    if (crewObj) {
        crew = Object.values(crewObj.crew)
    }


    useEffect(() => {
        dispatch(getCastThunk(movieId)).then((data) => {
            setIsLoaded(true)
        })
    }, [dispatch, movieId])


    return isLoaded ? (
        <div className='castComponentContainer'>
            <h1 className='castHeader'>Crew</h1>
            <div className='castContainer'>
                {
                crew.map((member) => (member ? (
                    <div className='singleCastCard'>
                        {
                        member.profile_path !== null ? (
                            <img className="singleCastImage"
                                src={
                                    `https://image.tmdb.org/t/p/w300/${
                                        member.profile_path
                                    }`
                            }></img>
                        ) : (
                            <img className="singleCastImage"
                                src={`/Default-Profile.png`}></img>
                        )
                    }
                        <div className='castName'>
                            {
                            member.name
                        }</div>
                        <div className='caseMovieName'>
                            {
                            member.character
                        }</div>
                    </div>
                ) : <div>no</div>))
            } </div>

        </div>

    ) : (
        <>
            loading crew data</>
    )
}

export default Crew
