
import './css/menu.css'
import { useEffect, useState } from 'react'
import Axios from "axios"

const Menu = () => {

    const [data, setData] = useState([])
    const [category, setCategory] = useState([]);
    const [cuisine, setCuisine] = useState([])
    const [price, setPrice] = useState(10000);
    const [option, setOption] = useState("Ratings")
    const [location, setLocation] = useState("Delhi");

    useEffect(() => {

        // Axios.get('http://localhost:3000/restaurants')
        // .then((res)=>{
        //     if(res.status == 200)
        //     {
        //         setData(res.data)

        //     }
        // })
        // .catch((err) => alert(err))

        handleData();
    }, [location, price])


    const handleData = () => {

        Axios.post('http://localhost:3000/filterCategory', {
            category: category,
            cuisine: cuisine, price: price, sort: option, city:location
        })
            .then((res) => {
                if (res.status == 200) {
                    setData(res.data)
                    console.log(res.data)
                }

            })
            .catch((err) => alert(err))
    }

    const handleChange = (e) => {

        var id = e.target.id;


        if (id == "c1") {

            if (e.target.checked) {
                let arr = category;
                arr.push(e.target.value);
                setCategory(arr)
                console.log(category)
                handleData();

            }
            else {
                let arr = category;
                let idx = arr.indexOf(e.target.value);
                arr.splice(idx, 1);
                setCategory(arr)
                console.log(category)
                handleData();
            }
        }

        if (id == "d1") {

            if (e.target.checked) {
                let arr = cuisine;
                arr.push(e.target.value);
                setCuisine(arr)
                console.log(cuisine)
                handleData();

            }
            else {
                let arr = cuisine;
                let idx = arr.indexOf(e.target.value);
                arr.splice(idx, 1);
                setCuisine(arr)
                console.log(cuisine)
                handleData();
            }
        }

        if(id=='e1')
        {
            let val = Number(e.target.value);

            if(e.target.checked)
            {

                setPrice(val)
            }
            else
            {
                setPrice(10000)
            }
        }

        if (id == 'sort') {
            console.log(e.target.value)
            setOption(e.target.value)
            
        }

        if(id == 'loc')
        {
            setLocation(e.target.value);
            
        }
        
    }

    return (
        <>

            <div class="menu-container">

                <div class="sidebar">
                    <p>Filter by Category</p>

                    <div class="sidebar-item">
                        <input type='checkbox' id="c1" name='c1' onChange={handleChange} value="Pure Veg" />
                        <label forhtml="c1">Pure Veg</label><br />
                        <input type='checkbox' id="c1" name='c2' onChange={handleChange} value="Non Veg" />
                        <label forHTML="c1">Non Veg</label>
                    </div>
                    <p>Filter by Cuisine</p>
                    <div class="sidebar-item">
                        <input type='checkbox' id="d1" name='d1' onChange={handleChange} value="North Indian" />
                        <label forHTML="d1">North Indian</label><br />
                        <input type='checkbox' id="d1" name='d2' onChange={handleChange} value="Chinese" />
                        <label forHTML="d2">Chinese</label><br />
                        <input type='checkbox' id="d1" name='d3' onChange={handleChange} value="Italian" />
                        <label forHTML="d3">Italian</label><br />
                        <input type='checkbox' id="d1" name='d4' onChange={handleChange} value="Continental" />
                        <label forHTML="d4">Continental</label>
                    </div>

                    <p>Filter by Price</p>
                    <div class="sidebar-item">
                        <input type='checkbox' id="e1" name='e1' onChange={handleChange} value="3000" />
                        <label forhtml="c1">Under 3000</label><br />

                    </div>

                </div>

                <div class="menu">
                    <div className='select-menu' id='s1' >
                        <span>Sort By  </span>
                        <select name='sort' id='sort' onChange={handleChange}>
                            <option value="Ratings">Rating</option>
                            <option value="Price">Price</option>
                        </select>
                    </div>
                    <div className='select-menu2' id='s2' >
                        <span>Enter your location </span>
                        <select name='loc' id='loc' onChange={handleChange}>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                        </select>
                    </div>
                    {
                        data
                            .sort((a, b) => {
                                if (option === "Ratings") {
                                    return b.Ratings - a.Ratings; // Sort by Ratings in descending order
                                } else if (option === "Price") {
                                    return a.AvgPrice - b.AvgPrice; // Sort by AvgPrice in ascending order
                                }
                                return 0; // Default: no sorting
                            })
                            .map((val) => {
                                return (
                                    <div className='menu-item' key={val._id}>
                                        <img src={val.Images[0]} />
                                        <span className='menu-item-title'>{val.Name}</span>
                                        <p className='menu-item-address'>{val.Address}</p>
                                        <div className='menu-item-rating'><span>{val.Ratings}</span></div>
                                        <div className='menu-item-price'>
                                            {val.Cuisine.map((val) =>{
                                                return(
                                                    
                                                    <span>{val}</span>
                                                    
                                                )
                                            })}
                                            <span>Price: ₹{val.AvgPrice}</span>
                                        
                                        </div>
                                    </div>
                                );
                            })
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Menu