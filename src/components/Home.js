import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import { useEffect } from "react";

const Home = (props) => {
  const Navigate = useNavigate();
  const authorize = () => {
    if (!localStorage.getItem("authToken")) {
      Navigate("/login");
    }
  };
  useEffect(() => {
    authorize();
  });
  return (
    <div>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
