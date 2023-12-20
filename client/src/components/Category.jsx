import { useNavigate } from "react-router-dom"


function Category({setFilterCategory}){ 

    

    function handleCategory(e){ 
        
        setFilterCategory(e.target.value)
        
    }

    const navigate = useNavigate()
    
    return ( 
        <div className="category-display"> 
        {/* fix the eroor so the player will have to choose the category first before playing priority number three   */}
            <select onChange={() => navigate("/getQuiz")} >
                <option value="">-------Choose Category--------</option>
                
                <option value="Japanese Manga and Anime">Japanese Manga and Anime</option>
                
            </select><br/>
        </div>
    )
}

export default Category