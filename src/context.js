import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./Reducer";
import axios from 'axios';


const AppContext = React.createContext();


let Api_url = `http://localhost:4000/obj`;
const initialState = {
    isLoading: true,
    page: 1,
    total_pages: 0,
    hits: [],
    limit_per_page:5,    
}

// create provider function
const AppProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);


    const fetchProducts = async (Api_url) => {
        dispatch({type:'SET_LOADING'  });
        try{
        const res =  await axios.get(Api_url);
        dispatch({
            type:'GET_DATA',
            payload:{
                hits:res.data,
                total_pages:res.data[15].total_pages,
                limit_per_page:res.data[15].limit_per_page,
                isLoading: false
            }}
            );
            // console.log(res.data);
            }catch(error){
                console.log(error);
            }
    }

    useEffect(() => {
        fetchProducts(Api_url);
    }, []);

   


    return (
        <AppContext.Provider value={{...state}}>
            {children}
        </AppContext.Provider>
    )
};

// custom hook context

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
