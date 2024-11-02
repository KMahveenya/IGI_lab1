import React, { useState, useEffect } from "react";
import NewDataService from "../../services/new.service";
import { withRouter } from '../../common/with-router';
import { useParams } from 'react-router-dom';
//import "../../css/medicine.css";
import axios from 'axios';

import styles from '..//../css/new-info.module.css';

const New = () => {
    const { id } = useParams();

    const [currentNew, setCurrentNew] = useState({
        id: null,
        title: "",
        description: "",
        text: "",
        image: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        getNew(id);
    }, [id]);

    const getNew = (id) => {
        NewDataService.get(id)
            .then(response => {
                const updatedImage = response.data.image.startsWith("http")
                    ? response.data.image
                    : "http://localhost:8080/" + response.data.image;
                    
                setCurrentNew({ ...response.data, image: updatedImage });
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className={styles.container}>
            <img
                className={styles.image}
                src={currentNew.image.endsWith("/") ? `${currentNew.image}uploads/default.png` : currentNew.image}
                alt="Товар"
            />
            <h2 className={styles.title}>{currentNew.title}</h2>
            <div className={styles.content}>
                <p className={styles.description}>{currentNew.description}</p>
                <p className={styles.text}>{currentNew.text}</p>
            </div>
        </div>
        
    );
};

export default New;