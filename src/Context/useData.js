import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useData() {
  return useContext(AuthContext);
}

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [post, setPosts] = useState([]);
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url, setter) => {
    setLoading(true);
    const response = await axios.get(url);
    setter(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData("https://jsonplaceholder.typicode.com/users", setUser);
    fetchData("https://jsonplaceholder.typicode.com/posts", setPosts);
    fetchData("http://worldtimeapi.org/api/timezone", setCountry);
  }, []);

  const value = { user, post,country, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
