import { useEffect, useState } from 'react';
import { db } from '../db/firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import classes from './Card.module.css';

export default function Card() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(''); // Change to store error message
    const [deleted, setIsDeleted] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        let isMounted = true; // Flag to check if component is mounted

        const fetchCards = async () => {
            if (isMounted) {
                setIsLoading(true);
                setError(''); // Reset error message
            }
            
            try {
                const querySnapshot = await getDocs(collection(db, "cards"));
                const cardsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));  
                if (isMounted) {
                    setCards(cardsArray);
                }
            } catch(err) {
                if (isMounted) {
                    setError("Error fetching data from DB: " + err.message); // Store actual error message
                }
            }

            if (isMounted) {
                setIsLoading(false);
            }
        };

        fetchCards();

        return () => {
            isMounted = false; // Clean up
        };
    }, [deleted]); 


    async function handleDeleteCard(cardId){
        setIsDeleting(true);
        // send delete request to fire base
        const docRef = doc(db,'cards', cardId)
        try{
            await deleteDoc(docRef);
            setIsDeleted(true);
            console.log("Document deleted with ID:", cardId);
            setIsDeleting(false);
        }
        catch(error){
            console.log("error deleting card: " + error);
        }
    }



    return (
        <> 
{/* DISPLAY LOADING SPINNER */}
            {(isLoading || isDeleting) && <div className={classes.loadingstate}>
                                    <div className={classes.loading}>     
                                    </div>
                                </div>}
{/* DISPLAY ERROR */}
            {error && <div style={{marginBottom:'10px', marginTop:'10px'}} className={classes.errorDiv}>
                    <h2 className={classes.errorMessage}>{error}</h2></div>}

{/* DISPLAY THE CARDS */}
            {!isLoading && !error && cards && <section className={classes.allCardsDiv}>
                <h2 style={{color:'#2ea1da', backgroundColor:'#fcf5e5', borderRadius:'20px', padding:'15px'}}>Cards List</h2>
                {cards.map((card) => (
                    
                    <div key={card.id} className={classes.cardDiv}>
                        <button className={classes.closeButton} onClick={()=>{handleDeleteCard(card.id)}}>X</button>
                        <h3 style={{color:'#D59D80'}}>{card.title}</h3>
                        <p style={{color:'#0C7075'}}>{card.description}</p>
                    </div>
                ))}

{/* if CARDS IS EMPTY */}
            </section>}
            {cards.length === 0 &&<div className={classes.errorDiv}>
                    <h2 className={classes.errorMessage}>No Cards to show</h2>
                </div> }
            </>
    );
}
