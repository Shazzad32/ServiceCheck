"use client";
import Link from "next/link";
import { React, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import SimForm from "../simform/page";
import SimTable from "../simtable/page";
import SimDelete from "../simdelete/page";
import axios from "axios";
const Robi = () => {
  const [state, setState] = useState({
    datas: [],
    open: false,
    deleteOpen: false,
    dataResults: [],
    searchItem: "",
    selectItem: null,
  });

  useEffect(() => {
    getNumber();
  }, [getNumber]);

  const getNumber = () => {
    axios
      .get("http://localhost:3000/api/number")
      .then((res) => {
        let data = res.data;
        console.log(data);
        let old = { ...state };
        old.datas = data;
        old.dataResults = data;
        setState(old);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveNumber = (item) => {
    axios
      .post("http://localhost:3000/api/number/", item)
      .then((x) => {
        let old = { ...state };
        old.open = false;
        old.datas = [...old.datas, x.data];
        setState(old);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateNumber = (item) => {
    axios
      .put("http://localhost:3000/api/service-check/", item)
      .then((response) => {
        let old = { ...state };
        old.open = false;
        old.datas = old.datas.map((dataItem) =>
          dataItem._id === item._id ? response.data : dataItem
        );
        setState(old);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNumber = (id) => {
    axios
      .delete("http://localhost:3000/api/number/", { data: { id } })
      .then(() => {
        let old = { ...state };
        old.datas = old.datas.filter((item) => item._id !== id);
        setState(old);
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
      });
  };

  const openForm = () => {
    const old = { ...state };
    old.open = true;
    setState(old);
  };
  const closeForm = () => {
    const old = { ...state };
    old.open = false;
    setState(old);
  };

  const onEditOpen = (item) => {
    const old = { ...state };
    old.open = true;
    old.selectItem = item;
    setState(old);
  };

  const onDeleteOpen = () => {
    const old = { ...state };
    old.deleteOpen = true;
    setState(old);
  };

  const onDeleteClose = () => {
    const old = { ...state };
    old.deleteOpen = false;
    setState(old);
  };

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    console.log(searchTxt);
    let old = { ...state };
    console.log("seract", old);
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.number &&
            x.number.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.date && x.date.toLowerCase().includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    console.log(old.searchItem);
    setState(old);
  };
  return (
    <div className="h-[100vh] w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex">
        <div className="h-full w-[20%]  flex items-center">
          <button className="p-2 ml-4 bg-white text-black rounded-md">
            <Link href="/servicecheck">Service</Link>
          </button>
        </div>
        <div className="h-full w-[50%]  flex items-center justify-center uppercase text-white">
          welcome to robi Platform
        </div>
        <div className="h-full w-[30%]  flex items-center justify-center gap-4">
          <button
            onClick={openForm}
            className="bg-white p-3 text-black rounded-md"
          >
            <FaPlus className="" />
          </button>
          <input
            value={state.searchItem}
            onChange={searchText}
            type="search"
            placeholder="Search..."
            className="h-[40px] p-2 text-black border-none rounded-md"
          ></input>
        </div>
      </div>
      <div className="h-[90vh] w-full bg-cyan-400 flex items-center justify-center">
        <div className="h-[98%] w-[99%] bg-white">
          <div className="h-[8%] w-full bg-cyan-800 flex uppercase text-white">
            <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
            >
              <p style={{ flex: 3 }}>Number</p>
              <p style={{ flex: 3 }}>Status</p>
              <p style={{ flex: 3 }}>Date</p>
            </div>
            <div className="w-[20%] h-full flex items-center justify-center">
              Action
            </div>
          </div>
          <div className="h-[92%] w-full">
            {state.datas.map((item, i) => {
              return (
                <SimTable
                  key={i}
                  item={item}
                  onDeleteOpen={onDeleteOpen}
                  onEditOpen={onEditOpen}
                  deleteNumber={deleteNumber}
                />
              );
            })}
          </div>
        </div>
      </div>

      {state.open && (
        <SimForm
          open={state.open}
          saveNumber={saveNumber}
          closeForm={closeForm}
          selectItem={state.selectItem}
          updateNumber={updateNumber}
        />
      )}
      {state.deleteOpen && (
        <SimDelete open={state.deleteOpen} onDeleteClose={onDeleteClose} />
      )}
    </div>
  );
};

export default Robi;
