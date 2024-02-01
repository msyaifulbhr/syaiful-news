import React, {useState, useEffect} from 'react';
import CONFIG from '../utils/api';
import showFormattedDate from '../utils/dateFormatter';
import SearchForm from './SearchForm';
 
const NewsApp = () => {
    const [ articles, setArticles ] = useState([]);
    const [ term , setTerm ] = useState('everything');
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${CONFIG.BASE_URL}?q=${term}&api-key=${CONFIG.API_KEY}`);
                const articles = await response.json();
                setArticles(articles.response.docs);
                console.log(articles.response.docs);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticles();
    }, [term])


    return (
        <>
            <div className="banner">
                <div className="overlay px-5">
                    <h1 className="text-4xl font-bold text-white text-center capitalize mb-8 lg:text-6xl">Viewing article about {term}</h1>
                    <SearchForm searchText={(text) => setTerm(text)} />
                </div>
            </div>

            {isLoading ? ( 
            <h1 className="text-center mt-20 font-bold text-6xl">Loading...</h1>
            ) : (
                <section className="grid grid-cols-1 gap-8 px-5 pt-10 pb-20">
                    {articles.map((article) => {
                        const { abstract, headline:{main}, byline:{original}, _id, pub_date, lead_paragraph, web_url } = article;

                        return (
                            <article key={_id} className="bg-white py-10 px-5 rounded-lg shadow-gray-50">
                                <h2 className="font-bold text-2xl mb-2 lg:text-4xl"><a href={web_url} target="_blank">{main}</a></h2>
                                <p className="font-light text-gray-400 text-sm">{showFormattedDate(pub_date)}</p>
                                <p className="font-light text-gray-400 text-sm mb-8">{original}</p>
                                <p className="mb-6">{lead_paragraph}</p>
                                <a href={web_url} target="_blank" className="text-blue-500 hover:text-blue-700">Read More...</a>
                            </article>
                        )
                    })}
                </section>
            )}
            
        </>
    );
}
 
export default NewsApp;