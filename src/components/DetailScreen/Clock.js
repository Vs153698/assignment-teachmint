import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from "axios";
import "./Clock.css";

const Clock = ({ selectedCountry }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [initialTimeFetched, setInitialTimeFetched] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  useEffect(() => {
    setInitialTimeFetched(false);
  }, [selectedCountry]);

  const fetchTime = async () => {
    try {
      const response = await axios.get(
        `http://worldtimeapi.org/api/timezone/${selectedCountry}`
      );

      const serverTime = new Date(response.data.datetime);
      const timeZone = response.data.timezone;
      setTimeZone(timeZone);
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour12: true,
        timeZone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(serverTime);
      setLocalTime(serverTime);

      if (!initialTimeFetched) {
        setCurrentTime(formattedTime);
        setInitialTimeFetched(true);
      }
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  useEffect(() => {
    fetchTime();
  }, [selectedCountry]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setLocalTime((prevTime) => {
          const newTime = new Date(prevTime.getTime() + 1000);

          setCurrentTime(() => {
            const formattedLocalTime = newTime.toLocaleTimeString("en-US", {
              hour12: true,
              timeZone,
            });
            return formattedLocalTime;
          });

          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeZone]);

  const onPauseToggle = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="clockContainer">
      <div className="timeContainer">
        <div>
          <p className="time">{currentTime}</p>
        </div>
      </div>
      <div className="button" onClick={onPauseToggle}>
        {isPaused ? <FaPlay size={16} /> : <FaPause size={16} />}
      </div>
    </div>
  );
};

export default Clock;
