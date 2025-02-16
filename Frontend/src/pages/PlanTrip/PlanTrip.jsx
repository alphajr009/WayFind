import React, { useState, useEffect } from "react";
import "./PlanTrip.css";
import MainNavbar from "../../components/navbar/MainNavbar/MainNavbar";
import placesData from "./places.json";
import { FaPlus, FaCheck } from "react-icons/fa";

const GOOGLE_MAPS_API_KEY = "AIzaSyAM3iuCz-gy_ZCKscaWWhlsaQ5WUabyy2w"; 

const PlanTrip = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setPlaces(placesData);

    // Initialize Google Map
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    window.initMap = () => {
      const googleMap = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 7.8731, lng: 80.7718 }, 
      });
      setMap(googleMap);
    };
    document.body.appendChild(script);
  }, []);

  const handleSelectPlace = (place) => {
    const isSelected = selectedPlaces.find((p) => p.id === place.id);
    if (isSelected) {
      setSelectedPlaces(selectedPlaces.filter((p) => p.id !== place.id));
      removeMarker(place);
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
      addMarker(place);
    }
  };

  const addMarker = (place) => {
    if (!map) return;
    const marker = new window.google.maps.Marker({
      position: place.location,
      map: map,
      title: place.name,
    });
    setMarkers([...markers, marker]);
  };

  const removeMarker = (place) => {
    const updatedMarkers = markers.filter((marker) => marker.getTitle() !== place.name);
    markers.forEach((marker) => {
      if (marker.getTitle() === place.name) marker.setMap(null);
    });
    setMarkers(updatedMarkers);
  };

  return (
    <div className="PlanTrip">
      <MainNavbar />
      <div className="header-fixed">
        <h2>Find Your Next Adventure</h2>
        <p>Find places to visit and get personalized recommendations</p>
        <input type="text" placeholder="Search for Places you want to visit" className="search-bar" />
      </div>
      <div className="plantrip-content">
        <div className="pc-body-left">
          <h3>Handpicked Just for You</h3>
          <p>Based on your interests, here are some top destinations.</p>
          <div className="cards-container">
            {places.map((place) => (
              <div key={place.id} className="card">
                <img src={place.image} alt={place.name} />
                <div className="card-details">
                  <h4>{place.name}</h4>
                  <p>{place.type}</p>
                  <div className="rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.round(place.rating) ? "filled" : ""}></span>
                    ))}
                  </div>
                  <p>Duration: {place.duration}</p>
                  <button className="select-btn" onClick={() => handleSelectPlace(place)}>
                    {selectedPlaces.find((p) => p.id === place.id) ? <FaCheck /> : <FaPlus />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pc-body-right">
          <h2>Your Selected Destinations</h2>
          <p>Review and customize your trip itinerary</p>
          <div id="map"></div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
