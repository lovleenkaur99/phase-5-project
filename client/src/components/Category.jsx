import { useNavigate } from "react-router-dom"

function Category(){ 


    // function handleCategory(e){ 
    //     setFilterCategory(e.target.value)
        
    // }

    const navigate = useNavigate()
    
    return ( 
        <div> 
            <select>
                <option value="">-------Choose Category--------</option>
                <option value="math">math</option>
                <option value="Japanese Manga and Anime">Japanese Manga and Anime</option>
                <option value="General Knowledge">General Knowledge</option>
            </select><br/>

            <button onClick={() => navigate('/getQuiz') } >Start!</button>
        </div>
    )
}

export default Category