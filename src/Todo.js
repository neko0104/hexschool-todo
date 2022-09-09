
import work2 from "./img/work2.png";
import { useState, useEffect, useContext } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Input, Button, Token, fetchFn } from "./components/htmlElement"
import { useForm } from "react-hook-form"

export default function Todo({setToken}) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const myToken = useContext(Token)
  const [activePage, setActivePage] = useState("全部");
  const [list, setList] = useState([]);
  const [pageList, setPageList] = useState([
    { page: "全部", active: true },
    { page: "待完成", active: false },
    { page: "已完成", active: false },
  ]);

  useEffect(()=>{
    let check= async()=>{
      if(localStorage.getItem("token")){
        await setToken(localStorage.getItem("token"))
        await getTodo()
        return
      }
      if(!myToken)navigate("/");
    }

    check()

  },[])


  const getTodo = async()=>{
    const call = await fetch("https://todoo.5xcamp.us/todos",{
      headers: {
        'accept': 'application/json',
        'content-Type': 'application/json',
        'authorization':myToken,
      },
      method:"GET",
    })
    const fetchData = await call.json()
    // console.log(fetchData)
    if(call.status!==200) return alert(fetchData.message)
    if(call.status===200) {
      fetchData.todos.sort()
      setList(fetchData.todos)
    }
  }


  const removeFinish = (e) => {
    e.preventDefault();
    // console.log(list.filter(v=>v.completed_at!==null))
    list.filter(v=>v.completed_at!==null).map(async v=>{
      const call =  await fetchFn(`todos/${v.id}`,"DELETE",true,myToken)
      const fetchData = await call.json() 
      if(call.status!==200) return
      if(call.status===200) {
        console.log("刪除成功")
        setList(list.filter(v=>v.completed_at===null))
      }
    })
    //setList(list.filter((v) => v.completed_at === false));
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
              <span>{sessionStorage.getItem("nickname")}的代辦</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              fetch("https://todoo.5xcamp.us/users/sign_out",{
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'authorization':myToken,
              },
              method:"DELETE",
              })
              .then(res=>{
                if(res.status===200) {
                  localStorage.removeItem("token")
                  navigate("/");
                  return 
                }
                if(res.status!==200) alert("登出失敗");
                console.log(res)
              })
            }}>登出</a>
          </li>
        </ul>
      </nav>
    );
  }

  function InputArea({ setList, list }) {
  
    const addText = async(data) => {
      // console.log(data)
      if(data.content.trim()==="")return alert("請輸入文字")
      const call = await fetchFn("todos","POST",true,myToken,{"todo":data})
      const fetchData = await call.json()
      // console.log(call)
      // console.log(fetchData)
      if(call.status!==201) return alert(fetchData.message)
      if(call.status===201) {
        setValue("content","")
        getTodo()
      };
    };

    return (
      <form className="inputBox rel" onSubmit={handleSubmit(addText)}>
        <Input type="text" id="content" placeholder="請輸入待辦事項" 
                register={{
                  ...register("content", {
                    required: true ,
                  }),
                }}/>
        <Button type="button" text={ <i className="fa fa-plus"></i>} onClick={handleSubmit(addText)}/>
      </form>
    );
  }

  //各個小item
  function ListDetail({ text, status, index, setList, list }) {
    const changeStatus = async (e) => {
      let id = e.target.getAttribute("index")
      const call = await fetchFn(`todos/${id}/toggle`,"PATCH",true,myToken)
      const fetchData = await call.json()
      if(call.status!==200) return alert("好像怪怪的")
      if(call.status===200) {
        console.log(fetchData)
        setList(list.map((v,i)=>{
          if(fetchData.id===v.id)return fetchData
          return v
        }))
      }
    }

    const removeOne = async(e) => {
      e.preventDefault();
      let id = e.target.closest("label").getAttribute("index")
      const call = await fetchFn(`todos/${id}`,"DELETE",true,myToken)
      if(call.status===200){
        console.log("刪除成功")
        getTodo()
      }
    };

    return (
      <li key={v4()}>
        <label className="todoList_label" index={index}>
          <input
            index={index}
            onClick={changeStatus}
            className="todoList_input"
            type="checkbox"
            defaultChecked={status}
          />
          <span className=" flex-grow:1">{text}</span>
          <a href="#" onClick={removeOne}>
            <i className="fa fa-times t:17px"></i>
          </a>
        </label>
      </li>
    );
  }

  //分類頁籤
  function PageTab({ pageList, setPageList, setActivePage }) {
    const tabSwitch = (e) => {
      e.preventDefault();
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
              status={!(v.completed_at ===null)}
              text={v.content}
              index={v.id}
              list={list}
              setList={setList}
            />
          );
        })
      : activePage === "待完成"
      ? list
          .filter((v) => v.completed_at === null)
          .map((v, i) => {
            return (
              <ListDetail
                key={v4()}
                status={!(v.completed_at ===null)}
                text={v.content}
                index={v.id}
                list={list}
                setList={setList}
              />
            );
          })
      : list
          .filter((v) => v.completed_at !== null)
          .map((v, i) => {
            return (
              <ListDetail
                key={v4()}
                status={!(v.completed_at ===null)}
                text={v.content}
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
                    {list.filter((v) => v.completed_at === null).length} 個待完成項目
                  </p>
                  <a href="#" onClick={removeFinish}>
                    清除已完成項目
                  </a>
                </div>
              </div>
            </div>
    )
  }

  const divHeight = document.querySelector("nav")?window.innerHeight-document.querySelector("nav").offsetHeight-40:0

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <Navbar />
        <div className={`conatiner todoListPage vhContainer max-h:${divHeight}px overflow:auto`}>
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
