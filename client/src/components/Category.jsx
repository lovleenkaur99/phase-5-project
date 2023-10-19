import { useNavigate } from "react-router-dom"


function Category({setFilterCategory}){ 

    

    function handleCategory(e){ 
        
        setFilterCategory(e.target.value)
        navigate("/getquiz")
    }

    const navigate = useNavigate()
    
    return ( 
        <div className="category-display"> 
            <select onChange={() => navigate(`/getquiz`)} >
                <option value="">-------Choose Category--------</option>
                
                <option value="Japanese Manga and Anime">Japanese Manga and Anime</option>
                
            </select><br/>
        </div>
    )
}

export default Category