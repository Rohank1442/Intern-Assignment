import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function Filter({setShow,hits,search,sort,setSort,filter,setFilter}) {
  const [state, setState] = React.useState({
    right: false,
  });
  

  const handleClick = (index)=>{
    if(index===0){
        if(sort.Price){
            setSort({
                Price: false,
                Title: false,
            })
            const brr = hits.slice(0,hits.length-1)
            const arr = brr.filter((s)=>{
                const t = s.title.toLowerCase()
                return t.includes(search.toLowerCase())
            });
            if(!search) setShow(brr)
            else setShow(arr)
        }else{
            setSort({
                Price: true,
                Title: false,
            })
            const brr = hits.slice(0,hits.length-1)
            const arr = brr.filter((s)=>{
                const t = s.title.toLowerCase()
                return t.includes(search.toLowerCase())
            });
            if(!search) setShow(brr.sort((a, b) => a.Price - b.Price))
            else setShow(arr.sort((a, b) => a.Price - b.Price))
        }
    }else{
        if(sort.Title){
            setSort({
                Price: false,
                Title: false,
            })
            const brr = hits.slice(0,hits.length-1)
            const arr = brr.filter((s)=>{
                const t = s.title.toLowerCase()
                return t.includes(search.toLowerCase())
            });
            if(!search) setShow(brr)
            else setShow(arr)
        }else{
            setSort({
                Price: false,
                Title: true,
            })
            const brr = hits.slice(0,hits.length-1)
            const arr = brr.filter((s)=>{
                const t = s.title.toLowerCase()
                return t.includes(search.toLowerCase())
            });
            if(!search) setShow(brr.sort((a, b) => a.title - b.title))
            else setShow(arr.sort((a, b) => a.title - b.title))
        }
    }
    setState({["right"]: false });
  }

  const handleFilterClick = (text)=>{
    if(filter[text]){
        setFilter({...filter,[text]: false})
        const brr = hits.slice(0,hits.length-1)
        const arr = brr.filter((s)=>{
        const t = s.title.toLowerCase()
            return t.includes(search.toLowerCase())
        });
        if(!search) setShow(brr)
        else setShow(arr)
    }else{
        if(text==="< 500"){
            if(!filter[text]){
                setFilter({
                    "< 500": true,  
                    "501-1000" : false,
                    "1001-1500": false,
                    "1501-2000": false,
                    "> 2000": false
                })
                const brr = hits.slice(0,hits.length-1)
                const arr = brr.filter((s)=>{
                    const t = s.title.toLowerCase()
                    return t.includes(search.toLowerCase())
                });
                if(!search) setShow(brr.filter((a)=>a.Price<=500))
                else setShow(arr.filter((a)=>a.Price<=500))
            }
        }
        else if(text==="501-1000"){
            if(!filter[text]){
                setFilter({
                    "< 500": false,  
                    "501-1000" : true,
                    "1001-1500": false,
                    "1501-2000": false,
                    "> 2000": false
                })
                const brr = hits.slice(0,hits.length-1)
                const arr = brr.filter((s)=>{
                    const t = s.title.toLowerCase()
                    return t.includes(search.toLowerCase())
                });
                if(!search) setShow(brr.filter((a)=>a.Price>500 && a.Price<=1000))
                else setShow(arr.filter((a)=>a.Price>500 && a.Price<=1000))
            }
        }
        else if(text==="1001-1500"){
            if(!filter[text]){
                setFilter({
                    "< 500": false,  
                    "501-1000" : false,
                    "1001-1500": true,
                    "1501-2000": false,
                    "> 2000": false
                })
                const brr = hits.slice(0,hits.length-1)
                const arr = brr.filter((s)=>{
                    const t = s.title.toLowerCase()
                    return t.includes(search.toLowerCase())
                });
                if(!search) setShow(brr.filter((a)=>a.Price>1000 && a.Price<=1500))
                else setShow(arr.filter((a)=>a.Price>1000 && a.Price<=1500))
            }
        }
        else if(text==="1501-2000"){
            if(!filter[text]){
                setFilter({
                    "< 500": false,  
                    "501-1000" : false,
                    "1001-1500": false,
                    "1501-2000": true,
                    "> 2000": false
                })
                const brr = hits.slice(0,hits.length-1)
                const arr = brr.filter((s)=>{
                    const t = s.title.toLowerCase()
                    return t.includes(search.toLowerCase())
                });
                if(!search) setShow(brr.filter((a)=>a.Price>1500 && a.Price<=2000))
                else setShow(arr.filter((a)=>a.Price>1500 && a.Price<=2000))
            }
        }
        else {
            if(!filter[text]){
                setFilter({
                    "< 500": false,  
                    "501-1000" : false,
                    "1001-1500": false,
                    "1501-2000": false,
                    "> 2000": true
                })
                const brr = hits.slice(0,hits.length-1)
                const arr = brr.filter((s)=>{
                    const t = s.title.toLowerCase()
                    return t.includes(search.toLowerCase())
                });
                if(!search) setShow(brr.filter((a)=>a.Price>2000))
                else setShow(arr.filter((a)=>a.Price>2000))
            }
        }
    }
    setState({["right"]: false });
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Filter'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FilterAltIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        <FormGroup sx={{marginLeft: "20px"}}>
            {["< 500","501-1000","1001-1500","1501-2000","> 2000"].map((text,index)=>(
              <FormControlLabel control={<Checkbox checked={filter[text]} onClick={()=>handleFilterClick(text)}/>} label={text} key={index} />
            ))}
        </FormGroup>
        <Divider />
      <List>
        {['Sort'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <FormGroup sx={{marginLeft: "20px"}}>
            {["Price","Title"].map((text,index)=>(
              <FormControlLabel control={<Checkbox checked={sort[text]} onClick={()=>handleClick(index)}/>} label={text} key={index} />
            ))}
        </FormGroup>
    </Box>
  );
  return (
    <div>
      {['right'].map((anchor) => (
        <Box key={anchor} sx={{display: "flex",justifyContent: "flex-end",paddingRight: "25px"}}>
          <Button color='success' variant='contained' onClick={toggleDrawer(anchor, true)}>Filter</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Box>
      ))}
    </div>
  );
}