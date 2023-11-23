import React from "react";
import "../styles/HomeScreen.css";
import Card from "../components/HomeScreen/Card";
import { useData } from "../Context/useData";
import { Dna } from "react-loader-spinner";

const HomeScreen = () => {
  const { user, post, loading } = useData();
  return (
    <div>
      <div className="heading">
        <h1>Directory</h1>
      </div>
      {loading ? (
        <div className="loader">
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        </div>
      ) : (
        user.map((user) => <Card key={user.id} user={user} post={post} />)
      )}
    </div>
  );
};

export default HomeScreen;
