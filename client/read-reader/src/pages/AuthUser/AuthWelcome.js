import { useState, useContext, useEffect } from "react";

import AuthContext from '../../store/auth-contex';

import ReaderBadgeLink from '../../components/Reader/ReaderBadgeLink'

import { Link } from 'react-router-dom';

import styled from 'styled-components';

const AuthWelcome = () => {
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState('');

    const [readers, setReaders] = useState([]);



    useEffect(()=> {
        const url = "http://localhost:5000/readers";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + authCtx.token
            }
        };
        
        const fetchReaderData = async() => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const resData = await res.json();
            
            const loadedReaders = resData.readers.map(reader => {
                return {
                    id: reader['_id'],
                    name: reader['reader_name'],
                    minutesRead: reader['total_reading_duration'],
                    coinsEarned: reader['reading_coins']
            }
        });
            setReaders(loadedReaders);
            };

            fetchReaderData().catch((err) => {
                setError(err.msg);
            });
    }, []);
    

    return (
        <>
        { !error && readers && 

        <ReaderBadgesContainer>
            {readers.map(reader => {
                return <ReaderBadgeLink key={reader.id} id={reader.id} minutesRead={reader.minutesRead} coinsEarned={reader.coinsEarned} readerName={reader.name}/>
            })}
        </ReaderBadgesContainer>
        }
        {!readers && !error && <Link to={'/reader/add'}>Add Reader</Link>}
        {error && <p>{error}</p>}
        </>
    );
};

export default AuthWelcome;

const ReaderBadgesContainer = styled.ul`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 5rem;
    justify-content: center;
    align-content: center;
    margin-top: 5rem;
    margin-bottom: 1rem;

    @media(min-width: 500px){
        grid-template-columns: auto auto;
    }
    @media(min-width: 850px){
        grid-template-columns: auto auto auto;
    }

`;