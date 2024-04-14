import { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '../db/firebase';
import classes from './CardForm.module.css';


export default function CardForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSendindData, setIsSentingData] = useState(false);
    const [error, setError] = useState('');
    const [isOnline, setIsOnline] = useState(true);



    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);

        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if(isOnline){
                setIsSentingData(true);
                const docRef = await addDoc(collection(db,'cards'), {
                    title,
                    description,
                });
                console.log("Document written with ID: ", docRef.id);
                setTitle('');
                setDescription('');
                }
            
        } catch (error) {
            setIsSentingData(false);
            console.error("Error adding document: ", error);
            setError('Error while sending data to DB, Please try again');
        }
        
        setIsSentingData(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px', height:'100%', fontFamily:'Roboto' }}>
            <label className={classes.formlabel} htmlFor="title" style={{ fontWeight: 'bold' }}>Title:</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the card title"
                className={classes.forminput}
                style={{ padding: '8px', fontSize: '16px' }}
                required
            />
            <label className={classes.formlabel} htmlFor="description" style={{ fontWeight: 'bold' }}>Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the card description"
                rows="4"
                className={classes.forminput}
                style={{ padding: '8px', fontSize: '16px' }}
                required
            />
            <button type="submit" className={classes.submitButton}>
                Add Card
            </button>
{/* LOADING SPINNER */}
            {isSendindData && isOnline && <div className={classes.loadingstate}>
                                    <div className={classes.loading}>     
                                    </div>
                                </div>}
{/*ERROR  */}
            {error.length > 0 && isOnline && <div className={classes.errorDiv}> <h1 className={classes.error}>{error}</h1> </div>}
{/* USER IS NOT ONLINE */}
            {!isOnline && <div className={classes.notOnlineDiv}>
                            <h1 className={classes.notOnlineHeader}>Please check your internet connection</h1>
                        </div>}
        </form>
    );
}
