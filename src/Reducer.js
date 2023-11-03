const reducer=(state,action)=>{

    switch(action.type)
    {
        case 'GET_DATA':
            return{
                ...state,
                hits:action.payload.hits,
                nbPages:action.payload.nbPages,
                isLoading:false,
                limit_per_page:action.payload.limit_per_page
            };
        case "SET_LOADING":
        return{
            ...state,
            isLoading:true
        }
       
        default:return state;
    }
    
};
export default reducer;