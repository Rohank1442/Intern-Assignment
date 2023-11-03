import axios from 'axios';

export const axiosOne = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});
 
export const getPostsPage = async(pageParam = 1)=>{
    const response = await axiosOne.get(`/posts?_page=${pageParam}`);
    return response.data;
}