import workImg from "./img/workImg.png"
import Logo from "./img/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { Input, Button, Token } from "./components/htmlElement"
import { useForm } from "react-hook-form"
import { useContext, useEffect } from "react"


export default function Login ({setToken}) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const myToken = useContext(Token);
    const onSubmit = async(data)=>{
        // alert(JSON.stringify(data))
        const call = await fetch("https://todoo.5xcamp.us/users/sign_in",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body:JSON.stringify({user:data})
        })
        
        const fetchData = await call.json()
        if(call.status!==200)return alert(fetchData.error)
        if(call.status===200){
          // console.log(fetchData)
          setToken(call.headers.get("authorization"))
          localStorage.setItem("token",call.headers.get("authorization"))
          sessionStorage.setItem("nickname",fetchData.nickname)
          navigate("/todo")
        }
    }
    
    useEffect(()=>{
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        navigate("/todo")
      }
    },[])

    return (
      <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
          <div className="side">
            <a href="/">
              <img className="logoImg" src={Logo} alt="" />
            </a>
            <img className="d-m-n" src={workImg} alt="workImg" />
          </div>
          <div>
            <form
              className="formControls"
              action="index.html"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <Input
                labelCssClass="formControls_label"
                labelText="Email"
                cssClass="formControls_input"
                type="text"
                id="email"
                placeholder="請輸入 email"
                register={{
                  ...register("email", {
                    required: { value: true, message: "此欄位不可留空" },
                    pattern: { value: /^\S+@\S+$/i, message: "不符合 Email 規則" },
                  }),
                }}
              />
              <span className="d:block h:14px">{errors.email?.message}</span>
              <Input
                labelCssClass="formControls_label"
                labelText="密碼"
                cssClass="formControls_input"
                type="password"
                id="password"
                placeholder="請輸入密碼"
                register={{
                  ...register("password", {
                    required: { value: true, message: "此欄位不可留空" },
                  }),
                }}
              />
              <span className="d:block h:14px">{errors.password?.message}</span>
              <Button
                cssClass="formControls_btnSubmit"
                type="submit"
                text="登入"
                mission={handleSubmit(onSubmit)}
              />
              {/* onClick="javascript:location.href='#todoListPage'" */}
              <Link to="/signup" className="formControls_btnLink">
                註冊帳號
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}