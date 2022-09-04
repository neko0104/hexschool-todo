
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { Input, Button, Token } from "./components/htmlElement";
import logo from "./img/logo.svg";
import workImg from "./img/workImg.png";

export default function SignUp({setToken}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submit = async(data)=>{
    const call=await fetch("https://todoo.5xcamp.us/users",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"POST",
      body:JSON.stringify({user:data})
    })

    const fetchData = await call.json()
    console.log(call)
    console.log(fetchData)
    if(call.status!==201) return alert("註冊失敗")
    if(call.status===201){
      setToken(call.headers.get("authorization"))
      sessionStorage.setItem("nickname",fetchData.nickname)
      localStorage.setItem("token",call.headers.get("authorization"))
      alert(fetchData.message)
      navigate("/todo")
    }
  }

  return (
    <>
      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <div className="side">
            <a href="#">
              <img className="logoImg" src={logo} alt="" />
            </a>
            <img className="d-m-n" src={workImg} alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(submit)}>
              <h2 className="formControls_txt">註冊帳號</h2>

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
              {errors.email?.message && <span>{errors.email?.message}</span>}
              <Input
                labelCssClass="formControls_label"
                labelText="您的暱稱"
                cssClass="formControls_input"
                type="text"
                id="nickname"
                placeholder="請輸入您的暱稱"
                register={{
                  ...register("nickname", {
                    required: { value: true, message: "此欄位不可留空" },
                    minLength:{value:2 , message:"暱稱最少需兩個字"},
                  }),
                }}
              />
              { errors.nickname?.message && <span>{errors.nickname?.message }</span>}

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
              {errors.password?.message && <span>{errors.password?.message}</span>}

              <Input
                labelCssClass="formControls_label"
                labelText="再次輸入密碼"
                cssClass="formControls_input"
                type="password"
                id="repwd"
                placeholder="請再次輸入密碼"
                register={{
                  ...register("repwd", 
                    { validate:value=>value===document.querySelector("#password").value },  
                  ),
                }}
              />
              {errors.repwd?.type =="validate" && <span>密碼不一致</span>}
              <Button cssClass="formControls_btnSubmit" type="submit" text="註冊" mission={handleSubmit(submit)}/>

              <Link to="/" className="formControls_btnLink">登入</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
