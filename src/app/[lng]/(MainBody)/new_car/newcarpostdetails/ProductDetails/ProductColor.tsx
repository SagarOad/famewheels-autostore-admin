
export const ProductColor = ({color}:{color:string}) => {
  return (
    <>
      <ul className="product-color mt-2 mb-2 mb-2">
        <li style={{backgroundColor:color ? color : "white"}}></li>
      </ul>
      <hr />
    </>
  );
};
