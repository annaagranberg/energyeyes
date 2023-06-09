import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

const NewData = () => {
    const { currentUser, logout } = useAuth();
    const [people, setPeople] = useState()
    const [area, setArea] = useState()
    const [profil, setProfil] = useState('')
    const [dusch, setDusch] = useState()
    const [duschtid, setDuschTid] = useState()
    const [disk, setDisk] = useState()
    const [kok, setKok] = useState()
    const [tvatt, setTvatt] = useState(0)
    
    useEffect(() => {
    var docRef = db.collection("user_collection").doc(currentUser.uid);

  docRef.get("name.firstname").then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        setArea(data.boendeyta)
        setPeople(data.antalPersoner);
        setProfil(data.profiltyp);
        setDusch(data.duschparametrar.antal)
        setDuschTid(data.duschparametrar.tid)
        setDisk(data.diskparametrar.antal);
        setKok(data.kokparametrar.antal);
        setTvatt(data.tvattparametrar.antal);
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}, [currentUser.uid]);
    
    const now = new Date();
    const dayOfWeek = now.getDay();
    const numDays = 7;
    const remove = 7 - dayOfWeek;
    const dayArray = Array.from({ length: numDays }, (_, i) => {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 0, 0, 0, 0);
      const dailyTotal = Array.from({ length: 1 }, (_) => {
        const randomValue = calculateDailyEnergyUsage(people, area, dusch, duschtid, disk, kok, tvatt);
        return { date: day, value: randomValue };
      });
      return dailyTotal;
    });

    // Set the last "remove" number of elements in dayArray to 0
    dayArray.splice(-remove, remove, Array(remove).fill({ date: null, value: 0 }));

    return { dayArray };
}

function calculateDailyEnergyUsage(people, area, dusch,duschtid, disk, kok, tvatt) {
    // Calculate total energy usage based on the input variables
    const energyUsage = (people * 2000) + (area * 50) + duschtid + dusch + (disk * 1500) + (kok * 3000) + (tvatt * 2000);
  
    // Generate a random daily energy usage value based on the total energy usage
    const min = energyUsage * 0.8; // 80% of total energy usage
    const max = energyUsage * 1.2; // 120% of total energy usage
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomValue/100;
  }
  export default NewData;