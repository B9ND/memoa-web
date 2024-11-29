import "./style.css";

const Banner = ({ isLogin }) => {
  return (
    isLogin ? (
      <div className="login-hero">
        <h1 className='login-message'>기록하고,</h1>
        <h1 className='login-message'>공유하고,</h1>
        <h1 className='login-message'>활용하는,</h1>
        <div className='login-message-box'>
          <h1 className="login-gap">
            가장 <span className="login-highlight"> 똑똑한</span>SNS
            <span className="login-highlight-bar"> —</span>
          </h1>
        </div>
        <div className="login-hero-button">
          MEMO<span className="login-highlight-logo">A</span>
        </div>
      </div>
    ) : (
      <div className="signup-hero">
        <h1 className='signup-message'>기록하고,</h1>
        <h1 className='signup-message'>공유하고,</h1>
        <h1 className='signup-message'>활용하는,</h1>
        <div className='signup-message-box'>
          <h1 className="signup-gap">
            가장 <span className="signup-highlight"> 똑똑한</span>SNS
            <span className="signup-highlight-bar"> —</span>
          </h1>
        </div>
        <div className="signup-hero-button">
          MEMO<span className="signup-highlight-logo">A</span>
        </div>
      </div>
    )
  );
};

export default Banner;
