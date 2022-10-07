import React , {useState } from 'react';

const ReaderContext = React.createContext({
    isReader: false,
    // currentReaderName & Id will be "" for an authUser 
    currentReaderId : '',
    currentReaderName : '',
    onChangeReader : () => {},
    onChangeReaderName : () => {},
});

export const ReaderContextProvider = (props) => {
    const [id, setChangeId] = useState('');
    const [name, setChangeName] = useState('');
    
    const isReader = !!id;
  
    const changeReaderHandler= (id) => {
      setChangeId(id);
    }

    const changeReaderNameHandler= (name) => {
        setChangeName(name);
      }


    return (
        <ReaderContext.Provider 
            value={{
                isReader: isReader,
                currentReaderId: id,
                currentReaderName: name,
                onChangeReader: changeReaderHandler,
                onChangeReaderName: changeReaderNameHandler
        }}>
            {props.children}
        </ReaderContext.Provider>
            );
};

export default ReaderContext;