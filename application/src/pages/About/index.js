import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutWrapper}>
        <div className={styles.aboutContainer}>
            <h2>About</h2>
            <div className={styles.aboutSection}>
                <h3>Despre Aplicație</h3>
                <p>
                Aceasta este o aplicație de gestionare a sarcinilor. Scopul principal
                al aplicației este de a ajuta utilizatorii să își organizeze și
                gestioneze sarcinile prin mutarea acestora între diferite stadii de
                progres, cum ar fi: Open, In Work, Testing și Done.
                </p>
            </div>

            <div className={styles.aboutSection}>
                <h3>Cum Funcționează</h3>
                <p>
                Utilizatorii pot adăuga noi sarcini, le pot muta între diferite stadii
                de progres și pot șterge sarcinile finalizate. Fiecare sarcină conține
                o dată de adăugare și un buton pentru gestionare rapidă.
                </p>
            </div>

            <div className={styles.aboutSection}>
                <h3>Tehnologii Utilizate</h3>
                <ul>
                <li>React</li>
                <li>Material-UI</li>
                <li>Express</li>
                </ul>
            </div>

            <div className={styles.aboutSection}>
                <h3>Autori</h3>
                <p>
                Acesta este un proiect personal realizat de Mihail Gutu. Aplicația a
                fost construită ca parte a unui proiect de învățare.
                </p>
            </div>

            <div className={styles.aboutSection}>
                <h3>Contact</h3>
                <p>
                Pentru întrebări sau suport, contactați-mă la{" "}
                <a href="mailto:email@example.com">email@example.com</a>.
                </p>
            </div>
            </div>
    </div>
    
  );
};

export default About;
