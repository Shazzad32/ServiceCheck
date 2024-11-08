import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const SimTable = ({ item, onEditOpen, onDeleteOpen }) => {
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
        <p style={{ flex: 3 }}>{item.number}</p>
        <p style={{ flex: 3 }}>
          {item.is_active === true ? "Active" : "Inactive"}
        </p>
        <p style={{ flex: 3 }}>{item.date}</p>
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
          <button onClick={onDeleteOpen}>
            <AiOutlineDelete className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SimTable;
