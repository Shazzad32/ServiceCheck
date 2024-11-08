import {
  Checkbox,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";

const SimForm = ({ open, closeForm, saveNumber, selectItem, updateNumber }) => {
  const [info, setInfo] = useState({
    number: "018",
    date: "",
  });

  useEffect(() => {
    setInfo({ ...selectItem });
  }, [selectItem]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (selectItem) {
      updateNumber(info);
    } else {
      saveNumber(info);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSwitchChange = (name) => {
    setInfo((prevValue) => ({ ...prevValue, [name]: !prevValue[name] }));
  };

  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      className="flex items-center justify-center"
    >
      <form
        onSubmit={handelSubmit}
        className="h-[55vh] w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] bg-white rounded-md shadow-lg p-4"
      >
        {/* Header */}
        <div className="h-[15%]  w-full flex justify-center items-center border-b-2 bg-cyan-700 text-white text-lg font-semibold">
          {selectItem ? "Update INformation" : "Enter Sim Number"}
        </div>

        {/* Content */}
        <div className="h-[70%] w-full flex flex-col items-center gap-4 p-6">
          <TextField
            type="number"
            name="number"
            value={info.number || ""}
            onChange={handleChange}
            label="Sim Number"
            className="w-5/6"
          />

          <TextField
            type="date"
            name="date"
            value={info.date || ""}
            onChange={handleChange}
            label="Date"
            className="w-5/6"
          />
          <div className="w-5/6 h-[55px flex items-center p-3 rounded-md shadow-md">
            Active
            {
              <Switch
                value={info.is_active}
                name="is_active"
                onChange={() => handleSwitchChange("is_active")}
                checked={info.is_active}
              />
            }
          </div>
        </div>
        <div className="h-[15%] w-full flex items-center justify-end border-t-2 p-2 gap-4">
          <button
            type="submit"
            onClick={handelSubmit}
            className="w-[70px] bg-sky-900 text-white rounded-md uppercase text-sm p-2 flex items-center justify-center"
          >
            {selectItem ? "Update" : "Send"}
          </button>
          <button
            onClick={closeForm}
            className="p-2 w-[70px] bg-sky-900 text-white rounded-md uppercase text-sm mr-4"
          >
            No
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SimForm;
