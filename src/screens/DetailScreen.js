import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Clock from "../components/DetailScreen/Clock";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/DetailScreen.css";
import { useData } from "../Context/useData";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { generateRandomLightColor } from "../HelperFunction";
import Modal from "../components/Modal/Modal";
import { Dna } from "react-loader-spinner";

const DetailScreen = () => {
  const { userId } = useParams();
  const [open, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("Asia/Kolkata");
  const navigate = useNavigate();
  const { country, user, post, loading } = useData();
  const selectedUser = user.find((user) => user.id === Number(userId));
  const postData = post.filter((post) => post.userId === Number(userId));
  if (loading && !selectedUser?.name && postData?.length === 0) {
    return (
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
    );
  }
  if (!loading && !selectedUser?.name && postData?.length === 0) {
    return (
      <div className="noData" >

      <div className="loader">
        <h1>No Data Found</h1>
      </div>
        <div className="backToHome" onClick={() => navigate("/")}>Back to home</div>
      </div>
    );
  }
  return (
    <div className="mainDetialScreen">
      <div className="detailScreenContainer">
        <div onClick={() => navigate(-1)} className="iconContainer">
          <FaArrowLeft size={20} />
        </div>
        <div className="detailScreenContainerTwo">
          <select
            className="selectstyle"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {country.map((country) => (
              <option key={country} value={country}>
                {" "}
                {country}{" "}
              </option>
            ))}
          </select>
          <Clock selectedCountry={selectedCountry} />
        </div>
      </div>

      <div className="profileSection">
        <div>
          <div className="basictextStyle">{selectedUser.name}</div>
          <div className="basictextStyle">
            {" "}
            {selectedUser.username} | {selectedUser.company.catchPhrase}
          </div>
        </div>
        <div>
          <div className="basictextStyle">
            {" "}
            <IoLocation style={{ marginRight: 2 }} size={14} />{" "}
            {selectedUser.address.suite} {selectedUser.address.street}{" "}
            {selectedUser.address.city}{" "}
          </div>
          <div className="basictextStyle">
            <MdEmail style={{ marginRight: 2 }} size={14} />{" "}
            {selectedUser.email}
          </div>
          <div className="basictextStyle">
            <FaPhone style={{ marginRight: 2 }} size={14} />{" "}
            {selectedUser.phone}
          </div>
        </div>
      </div>
      <div className="grid">
        {postData.map((item) => (
          <div
            onClick={() => (setSelectedData(item), setIsOpen(true))}
            style={{ backgroundColor: generateRandomLightColor() }}
            key={item.id}
            className="card"
          >
            <h4>{item.title}</h4>
            <p>{item.body.slice(0, 50)}...</p>
          </div>
        ))}
      </div>
      {open && <Modal setIsOpen={setIsOpen} selectedData={selectedData} />}
    </div>
  );
};

export default DetailScreen;
