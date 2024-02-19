import SVG from "@/CommonComponent/SVG";

const InvoiceRightSide = () => {
  return (
    <ul style={{ listStyle: "none", display: "flex",justifyContent:"center", background: "linear-gradient(291deg, #b80505 21.2%, #b80505 83.92%)", padding: "13px 20px",  gap: 28,width:"100%" }} >
      <li>
        <SVG className="stroke-icon" iconId="call" style={{ height: "14px", width: "14px", fill: "#fff", marginRight: "10px" }} />
        <span style={{ color: "#FFFFFF",fontSize:"12px" }}>0300-111326-3</span>
      </li>
      <li style={{ borderLeft: "1px dashed rgba(255, 255, 255, 0.3)", borderRight: "1px dashed rgba(255, 255, 255, 0.3)", padding: "0 22px" }} >
        <SVG className="stroke-icon" style={{ height: "16px", width: "16px", fill: "#fff", marginRight:"10px" }} iconId="email-box" />
        <span style={{ color: "#FFFFFF",fontSize:"12px" }}>support@famewheels.com</span>
      </li>
      <li>
        <SVG className="stroke-icon" style={{ height: "16px", width: "16px", fill: "#fff", marginRight: "10px" }} iconId="web" />
        <span style={{ color: "#FFFFFF",fontSize:"12px" }}>www.famewheels.com</span>
      </li>
    </ul>
  );
};

export default InvoiceRightSide;
