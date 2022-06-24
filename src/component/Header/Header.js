import "./Header.css";

const Header = () => {

   //onclick used,when we click on ehub the page should appear on top
   return <span onClick={()=>window.scroll(0,0)} className="header">Entertainment Hub 🎥🎥</span>
};

export default Header;