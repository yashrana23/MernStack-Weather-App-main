import React, { useState, useEffect } from 'react';
import Weather from '../components/Weather/Weather';
import '../styles/home.css';
const Home = () => {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log("position", position.coords);
        setLocation({ latitude, longitude });
        setLoading(false);

      },
      (err) => {
        setLocation({ latitude: 28.6667, longitude: 77.2167 });
        setLoading(false);
        // setError('Permission denied or location unavailable');
        console.error(err);
      }
    );
  }, []);
  return (
    <div className='weather__app-dackground'>
      <Weather location={location} error={error} loading={loading} />
    </div>
  )
}

export default Home