import React from 'react'
import '../../Home.css';

const Home = () => {
  return (
    <div className="journal-home-container">
        <main className="journal-main">
            <section className="hero-section">
                <h2>Welcome to the Journal System</h2>
            </section>

            <section className="features-section">
                <h3>Made By:</h3>
                <ul>
                    Noor Haddad & Yaman Alkurdi
                </ul>
            </section>
        </main>
    </div>
  );
}

export default Home