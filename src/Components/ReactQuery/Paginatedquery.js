import React from 'react'
import { useState,useEffect } from 'react';
import BigCard from '../Card/BigCard';
import { useGlobalContext } from '../../context';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import Muinavbar from '../Navbar/muiNavbar';
import Filter from './Filter';


const Paginatedquery = () => {
   const {hits,
    isLoading,
    page,
    limit_per_page} = useGlobalContext();
    const [show,setShow] = useState([]);
    const [sort,setSort] = useState({
        Price: false,
        Title: false,
    })
    const [filter,setFilter] = React.useState({
        "< 500": false,  
        "501-1000" : false,
        "1001-1500": false,
        "1501-2000": false,
        "> 2000": false
    })
    useEffect(()=>{
        setShow(hits.slice(0,hits.length-1))
    },[isLoading])
    // console.log(isLoading)

    const [currentPage,setcurrentPage]=useState(page);
    const [search,setSearch] = useState("");
    const lastIndex = currentPage*limit_per_page;
    const firstIndex=  lastIndex-limit_per_page;
    const data = show.slice(firstIndex,lastIndex);
    const [pa,setPa] = useState([])
    useEffect(()=>{
        const pages = show.length / limit_per_page
        const arr = [];
        for(let i=1;i<=pages;i++){
            arr.push(i)
        }
        setPa(arr);
    },[show])
    useEffect(()=>{
        const brr = hits.slice(0,hits.length-1)
        const arr = brr.filter((s)=>{
            const t = s.title.toLowerCase()
            return t.includes(search.toLowerCase())
        });
        if(!search) setShow(brr)
        else setShow(arr)
        setFilter({
            "< 500": false,  
            "501-1000" : false,
            "1001-1500": false,
            "1501-2000": false,
            "> 2000": false
        })
        setSort({
            Price: false,
            Title: false,
        })
    },[search])
   
    return (
        <>
            <Muinavbar search={search} setSearch={setSearch} />
            <Filter setShow={setShow} hits={hits} search={search} sort={sort} setSort={setSort} filter={filter} setFilter={setFilter} />
            <div>
                {
                    <BigCard obj={data} />
                }
            </div>
            {show.length===0 &&  <div style={{color: "#fff"}}>
                    No Matching Product
                </div>
            }
            <div>
            <ButtonGroup variant="text" aria-label="outlined primary button group" sx={{marginBottom: "30px"}}>
                <Button onClick={() => setcurrentPage(page => page - 1)} disabled={currentPage === 1 || show.length===0}>Prev</Button>
                {pa.map((p,ind)=>{
                    return <Button onClick={() => setcurrentPage(ind+1)} variant={currentPage===ind+1 ? 'contained' : 'text'} key={ind}>{p}</Button>
                })}
                <Button onClick={() => setcurrentPage(page => page + 1)} disabled={currentPage*(limit_per_page) >= show.length-1}>Next</Button>
            </ButtonGroup>
            </div>
        </>
    )
}

export default Paginatedquery;
