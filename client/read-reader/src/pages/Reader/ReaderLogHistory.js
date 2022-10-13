import { useState, useEffect } from 'react';


function ReaderLogHistory(props) {
    const [readerSessions, setReaderSessions] = useState([]);
    const [error, setError] = useState('');

     //Get all reader sessions from server using reader id
     useEffect(()=>{
        const url = "http://localhost:5000/reader/" + props.readerId + "/sessions";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + props.token
            }
        };
        const fetchReader = async () => {
            const res = await fetch(url, requestOptions);

            if(!res.ok){
                throw new Error('Something went wrong!');
            };
            const resData = await res.json();

            const loadedSessions = resData.sessions;

            setReaderSessions(loadedSessions);

        };
        fetchReader().catch(err=> setError(err.msg));
    }, []);

  return (<>
    {readerSessions.map(session => <div key={session._id}>{JSON.stringify(session)}</div>)}
  </>);
}
  
  export default ReaderLogHistory;


