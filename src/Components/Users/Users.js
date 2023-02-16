import React, { useEffect, useState } from 'react'
import searchIcon from './assets/Icon.png';
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from '../Loader/Loader';
import Cookies from 'universal-cookie';
import UsersTable from '../UsersTable/UsersTable';
import './Users.css'

function Users() {
    //declaring the state variables
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    //definig the keys to filter the results while searching
    const keys = ['firstName', 'lastName', 'email']

    //initializing the cookies
    const cookies = new Cookies();

    let navigate = useNavigate();
    const navigateUser = () => {
        if (cookies.get('user')) { //to check if user has already logged in - if yes, redirect to users page : id no then redirect to the login page
            navigate("/users");
        }
        else {
            navigate("/");
        }
    }

    const fetchData = async () => { //fetchdata unction to fetch data from the api
        try {
            const response = await axios.get("https://dummyjson.com/users")
            setTableData(response.data.users) //seting the data of users in the tabledata variable
            setLoading(false) //after loading the data settng the loading to false
        } catch (error) {
            console.error(error);
        }
    }

    const search = (data) => {//seach function filter and return a array of user to display according to the search query
        //filter method loops over the data item by item
        //for one item (user) keys.some () method returns a boolean value true if the item inculdes the key in searchQuery : keys are from the keys array the we defined
        return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery)))
    }

    const HandleLogOut = () => {//clears the user cookies and navite the user to the log in page
        cookies.remove('user')
        return navigate("/");
    }
    useEffect(() => { //call the fetchdata function to fetch the data from api on refresh
        navigateUser()
        fetchData();
    }, [navigateUser])
    return (
        <>

            <div className="navbar">
                <div className="navContainer">
                    <h3 className='navIcon'>FreJun Task</h3>
                    <button className='logOutBt' onClick={() => HandleLogOut()}>Logout</button>
                </div>
            </div>
            <Box id="usersBox"
                sx={{
                    width: '100vw',
                    maxWidth: 700,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3vh',

                }}
            >
                <form>
                    <input className='input' type="text" name="" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className='searchBt' onClick={(e) => e.preventDefault()}>
                        <img src={searchIcon} alt="" />
                    </button>
                </form>
                {loading ? (
                    <Loader msg="Loading" />) : (<UsersTable data={search(tableData)} />)}
            </Box>
        </>
    )
}

export default Users