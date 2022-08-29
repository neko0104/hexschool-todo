import workImg from "./img/workImg.png"
import Logo from "./img/logo.svg"
import { Link } from "react-router-dom"
import { Input, Button } from "./components/htmlElement"
import { useForm } from "react-hook-form"

export default function Login () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data)=>{
        alert(JSON.stringify(data))
    }

    return (<div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
            <div className="side">
                <a href="/"><img className="logoImg" src={Logo} alt=""/></a>
                <img className="d-m-n" src={workImg} alt="workImg"/>
            </div>
            <div>
                <form className="formControls" action="index.html" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                    <Input cssClass="formControls_input" type="text" id="email" placeholder="請輸入 email" register={{...register("email",{required:{value:true,message:"此欄位不可留空"}})}}/>
                    <span className="d:block h:14px">{errors.email?.message}</span>
                    <label className="formControls_label" htmlFor="pwd">密碼</label>
                    <Input cssClass="formControls_input" type="password" id="password" placeholder="請輸入密碼" register={{...register("password",{required:{value:true,message:"此欄位不可留空"}})}}/>
                    <span className="d:block h:14px">{errors.password?.message}</span>
                    <Button cssClass="formControls_btnSubmit" type="submit" text="登入"/>
                    {/* onClick="javascript:location.href='#todoListPage'" */}
                    <Link to="/signup" className="formControls_btnLink" >註冊帳號</Link>
                </form>
            </div>
        </div>
    </div>
    )
}