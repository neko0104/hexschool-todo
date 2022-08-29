import logo from "./img/logo.svg";
import work2 from "./img/work2.png";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

export default function Todo() {
  const [activePage, setActivePage] = useState("全部");
  const [list, setList] = useState([
    { text: "吃飽飽", status: true, id: 0 },
    { text: "去上班", status: false, id: 1 },
  ]);
  const [pageList, setPageList] = useState([
    { page: "全部", active: true },
    { page: "待完成", active: false },
    { page: "已完成", active: false },
  ]);

  const removeFinish = (e) => {
    e.preventDefault();
    setList(list.filter((v) => v.status === false));
  };

  function Navbar() {
    return (
      <nav className="align-items:center mb:40px">
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>王小明的代辦</span>
            </a>
          </li>
          <li>
            <a href="#loginPage">登出</a>
          </li>
        </ul>
      </nav>
    );
  }

  function InputArea({ setList, list }) {
    const [inputText, setInputText] = useState("");
    const hendleText = (e) => {
      setInputText(e.target.value);
    };

    const addText = (e) => {
      e.preventDefault();
      let inputEle = document.querySelector("#text");
      setList((list) => [
        ...list,
        {
          ["text"]: inputEle.value,
          ["status"]: false,
          ["id"]: Math.max(...list.map((v) => v.id)) + 1,
        },
      ]);
      setInputText("");
    };

    return (
      <div className="inputBox">
        <input
          type="text"
          placeholder="請輸入待辦事項"
          id="text"
          onChange={hendleText}
          value={inputText}
        />
        <a href="#" onClick={addText}>
          <i className="fa fa-plus"></i>
        </a>
      </div>
    );
  }

  //各個小item
  function ListDetail({ text, status, index, setList, list }) {
    const changeStatus = (e) => {
      const { checked } = e.target;
      let ta = {
        text: text,
        status: checked,
        id: parseInt(e.target.getAttribute("index")),
      };
      // console.log(ta)
      setList(
        list.map((v, i) => {
          if (ta.id === v.id) return (v = ta);
          return v;
        })
      );
    };
    const removeOne = (e) => {
    //   console.log(index);
      setList(list.filter((v, i) => i !== index));
    };

    return (
      <li key={v4()}>
        <label className="todoList_label">
          <input
            index={index}
            onClick={changeStatus}
            className="todoList_input"
            type="checkbox"
            defaultChecked={status}
          />
          <span>{text}</span>
        </label>
        <a href="#" onClick={removeOne}>
          <i className="fa fa-times"></i>
        </a>
      </li>
    );
  }

  //分類頁籤
  function PageTab({ pageList, setPageList, setActivePage }) {
    const tabSwitch = (e) => {
      const index = e.target.getAttribute("index");
      setPageList(
        pageList.map((v, j) => {
          if (j === parseInt(index)) return { ...v, ["active"]: true };
          return { ...v, ["active"]: false };
        })
      );
      setActivePage(e.target.innerText);
    };

    return (
      <ul className="todoList_tab">
        {pageList.map((v, i) => {
          return (
            <li key={v4()}>
              <a
                href="#"
                index={i}
                className={v.active ? "active" : null}
                onClick={tabSwitch}
              >
                {v.page}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  //item switch
  function Items({ list, setList, ListDetail, activePage }) {
    return activePage === "全部"
      ? list.map((v, i) => {
          return (
            <ListDetail
              key={v4()}
              status={v.status}
              text={v.text}
              index={v.id}
              list={list}
              setList={setList}
            />
          );
        })
      : activePage === "待完成"
      ? list
          .filter((v) => v.status == false)
          .map((v, i) => {
            return (
              <ListDetail
                key={v4()}
                status={v.status}
                text={v.text}
                index={v.id}
                list={list}
                setList={setList}
              />
            );
          })
      : list
          .filter((v) => v.status == true)
          .map((v, i) => {
            return (
              <ListDetail
                key={v4()}
                status={v.status}
                text={v.text}
                index={v.id}
                list={list}
                setList={setList}
              />
            );
          });
  }

  function ListNone (){

    return (
        <div className="flex:col align-items:center t:center pt:60px">
            <p className="">目前尚無待辦事項</p>
            <img className="max-w:50% mt:16px" src={work2}/>
        </div>
    )
  }

  function ListShow (){

    return(
<div className="todoList_list">
              <PageTab
                pageList={pageList}
                setPageList={setPageList}
                setActivePage={setActivePage}
              />
              <div className="todoList_items">
                <ul className="todoList_item">
                  <Items
                    list={list}
                    setList={setList}
                    activePage={activePage}
                    ListDetail={ListDetail}
                  />
                </ul>
                <div className="todoList_statistics">
                  <p>
                    {" "}
                    {list.filter((v) => v.status === true).length} 個已完成項目
                  </p>
                  <a href="#" onClick={removeFinish}>
                    清除已完成項目
                  </a>
                </div>
              </div>
            </div>
    )
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <Navbar />
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <InputArea list={list} setList={setList} />
            {list.length===0?<ListNone/>:<ListShow/>}
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}
