import workImg from "./img/workImg.png"
import Logo from "./img/logo.svg"

export default function Login () {

    return (<>
    <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
            <div className="side">
                <a href="#"><img className="logoImg" src={Logo} alt=""/></a>
                <img className="d-m-n" src={workImg} alt="workImg"/>
            </div>
            <div>
                <form className="formControls" action="index.html">
                    <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                    <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required/>
                    <span>此欄位不可留空</span>
                    <label className="formControls_label" htmlFor="pwd">密碼</label>
                    <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required/>
                    <input className="formControls_btnSubmit" type="button"  value="登入"/> 
                    {/* onClick="javascript:location.href='#todoListPage'" */}
                    <a className="formControls_btnLink" href="#signUpPage">註冊帳號</a>
                </form>
            </div>
        </div>
    </div>

    

    
    </>)
}