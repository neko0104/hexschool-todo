import logo from "./img/logo.svg";
import workImg from "./img/workImg.png";

export default function SignUp() {
  return (
    <>
      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <div className="side">
            <a href="#">
              <img
                className="logoImg"
                src={logo}
                alt=""
              />
            </a>
            <img
              className="d-m-n"
              src={workImg}
              alt="workImg"
            />
          </div>
          <div>
            <form className="formControls" action="index.html">
              <h2 className="formControls_txt">註冊帳號</h2>
              <label className="formControls_label" for="email">
                Email
              </label>
              <input
                className="formControls_input"
                type="text"
                id="email"
                name="email"
                placeholder="請輸入 email"
                required
              />
              <label className="formControls_label" for="name">
                您的暱稱
              </label>
              <input
                className="formControls_input"
                type="text"
                name="name"
                id="name"
                placeholder="請輸入您的暱稱"
              />
              <label className="formControls_label" for="pwd">
                密碼
              </label>
              <input
                className="formControls_input"
                type="password"
                name="pwd"
                id="pwd"
                placeholder="請輸入密碼"
                required
              />
              <label className="formControls_label" for="pwd">
                再次輸入密碼
              </label>
              <input
                className="formControls_input"
                type="password"
                name="pwd"
                id="pwd"
                placeholder="請再次輸入密碼"
                required
              />
              <input
                className="formControls_btnSubmit"
                type="button"
                onClick="javascript:location.href='#todoListPage'"
                value="註冊帳號"
              />
              <a className="formControls_btnLink" href="#loginPage">
                登入
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
