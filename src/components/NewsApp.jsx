import React, {useState, useEffect} from 'react';
import CONFIG from '../utils/api';
import showFormattedDate from '../utils/dateFormatter';
import SearchForm from './SearchForm';
import { FaArrowRight } from "react-icons/fa6";
 
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
                    <h1 className="text-3xl font-bold text-white text-center capitalize mb-8 lg:text-6xl">Viewing article about {term}</h1>
                    <SearchForm searchText={(text) => setTerm(text)} />
                </div>
            </div>

            {isLoading ? ( 
            <h1 className="text-center mt-20 font-bold text-6xl">Loading...</h1>
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 pt-10 pb-20">
                    {articles.map((article) => {
                        const { headline:{main}, byline:{original}, _id, pub_date, lead_paragraph, web_url } = article;
                        const LeadParagraph = lead_paragraph.length > 250
                        ? `${lead_paragraph.substring(0, 250)}...`
                        : lead_paragraph;

                        return (
                            <article key={_id} className="bg-white py-5 px-5 rounded-lg shadow-gray-50 relative">
                                <h2 className="font-bold text-2xl mb-2 "><a href={web_url} target="_blank">{main}</a></h2>
                                <p className="font-light text-gray-400 text-sm">{original}</p>
                                <p className="font-light text-gray-400 text-sm mb-8">{showFormattedDate(pub_date)}</p>
                                <p className="mb-10">{LeadParagraph}</p>
                                <a href={web_url} target="_blank" className="flex row text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-full absolute bottom-5 right-5"><FaArrowRight /></a>
                            </article>
                        )
                    })}
                </section>
            )}
            
        </>
    );
}
 
export default NewsApp;