import './signup_2.css';

const Signup_2 = () => {
  return (
    <><div className="inputWrap">
      <img src={inputIcon} className="input-icon" />
      <label className={`floating-label ${email ? 'active' : ''}`}>didkdk이메일</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <button type="button" className="Delbutton" onClick={handleClearEmail}>
        <img src={del} alt="Clear Email" />
      </button>
    </div>
    <div className="inputWrap">
      <img src={inputIcon} className="input-icon" />
      <label className={`floating-label ${password ? 'active' : ''}`}>비밀번호</label>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="button" className="eyebutton" onClick={toggleShowPassword}>
        <img src={showPassword ? eyeOpen : eyeClosed} alt="Toggle Password Visibility" />
      </button>
    </div></>
  );
};

export default Signup_2;