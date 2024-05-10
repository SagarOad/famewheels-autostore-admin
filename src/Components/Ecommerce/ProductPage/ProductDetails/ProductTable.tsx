import { ABC, Availability, Brand, Cotton, Fabric, InStock, PixelStrap, Seller } from "@/Constant";

export const ProductTable = ({product}:{product:any}) => {
  return (
    <>
      <div>
        <table className="product-page-width">
          <tbody>
            <tr>
              <td>
                <b>{Brand} &nbsp;&nbsp;&nbsp;:</b>
              </td>
              <td>{product?.brand_name}</td>
            </tr>
            <tr>
              <td>
                <b>{Availability} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
              </td>
              <td className="txt-success">{InStock}</td>
            </tr>
            <tr>
              <td>
                <b>{Seller} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
              </td>
              <td>{ABC}</td>
            </tr>
            <tr>
              <td>
                <b>{"Category"} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
              </td>
              <td>{product?.category_name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
    </>
  );
};
