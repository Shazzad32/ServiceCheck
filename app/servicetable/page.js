import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import ServiceDelete from "../servicedelete/page";
const ServiceTable = ({ item, onDeleteOpen, onEditOpen }) => {
  return (
    <div className="h-14 w-full  flex index shadow-md">
      <div
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          padding: 10,
        }}
      >
        <p style={{ flex: 1.2 }}>{item.device_id}</p>
        <p style={{ flex: 1.5 }}>{item.reg_no}</p>
        <p style={{ flex: 1.2 }}>{item.customer_number}</p>
        <p style={{ flex: 1 }}>{item.district}</p>
        <p style={{ flex: 1 }}>{item.address}</p>
        <p style={{ flex: 1.5 }}>{item.problems}</p>
      </div>
      <div className="w-[20%] h-full flex items-center justify-evenly">
        <div
          style={{
            flex: 7,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 70,
          }}
        >
          <button onClick={() => onEditOpen(item)}>
            <FiEdit className="text-black" />
          </button>
          <button onClick={() => onDeleteOpen(item)}>
            <AiOutlineDelete className="text-red-700" />
          </button>
        </div>
        <div
          style={{
            flex: 3,
            padding: 1,
            borderRadius: 4,
            height: 20,
            width: 50,
            color: "black",
          }}
        >
          {item.is_complete === true ? (
            <div className="h-[20px] w-[50px] rounded-md bg-green-600"></div>
          ) : (
            <div className="h-[20px] w-[50px] rounded-md bg-red-600"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;
