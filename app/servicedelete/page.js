"use client";
import { Modal } from "@mui/material";

const ServiceDelete = ({ open, onDeleteClose, deleteData, selectItem }) => {
  console.log("delete", selectItem);
  return (
    <Modal open={open} className="flex items-center justify-center">
      <div className="bg-white h-2/8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-md flex flex-col">
        <div className="h-[65%] w-full text-black text-left flex items-center p-4 gap-2 uppercase text-base sm:text-sm md:text-base">
          <h1>Delete The Number !!!</h1>
          <span className="text-red-700 font-bold">{selectItem.device_id}</span>
        </div>
        <div className="h-[35%] w-full flex items-center gap-4 p-4">
          <button
            className="h-[35px] w-[70px] bg-cyan-700 flex justify-center items-center text-white rounded-md cursor-pointer uppercase text-sm"
            onClick={() => deleteData(selectItem?._id)}
          >
            YES
          </button>
          <button
            className="h-[35px] w-[70px] bg-cyan-700 flex justify-center items-center text-white rounded-md cursor-pointer uppercase text-sm"
            onClick={onDeleteClose}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDelete;
