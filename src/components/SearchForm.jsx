import React, {useState} from 'react';

const SearchForm = ({searchText}) => {
    const [ text, setText ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        searchText(text)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="e.g politics" className="rounded-l-lg py-2 px-2 w-40 md:w-56 " onChange={(e) => setText(e.target.value)} />
                <button 
                type="submit" className="bg-green-400 rounded-r-lg text-white hover:bg-green-900 py-2 px-2">Search</button>
            </form>
        </div>
    )
}

export default SearchForm;