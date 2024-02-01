import React, {useState, useEffect} from 'react';
import CONFIG from '../utils/api';
import showFormattedDate from '../utils/dateFormatter';
 
const NewsApp = () => {
    const [ articles, setArticles ] = useState([]);
    const [ term , setTerm ] = useState('politics');
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${CONFIG.BASE_URL}?q=${term}&api-key=${CONFIG.API_KEY}`);
                const articles = await response.json();
                setArticles(articles.response.docs)
                console.log(articles.response.docs);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticles();
    }, [])


    return (
        <>
            <section>
                {articles.map((article) => {
                    const { abstract, headline:{main}, byline:{original}, _id, pub_date, lead_paragraph, web_url } = article;

                    return (
                        <article key={_id}>
                            <h2>{main}</h2>
                            <p>{original}</p>
                            <p>{showFormattedDate(pub_date)}</p>
                            <p>{lead_paragraph}</p>
                            <a href={web_url} target="_blank">See More...</a>
                        </article>
                    )
                })}
            </section>
        </>
    );
}
 
export default NewsApp;