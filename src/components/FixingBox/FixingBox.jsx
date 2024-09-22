
/* eslint-disable */
const FixingBox = ({detail, isFix, whatFix}) => {
  let fixing = <div></div>

  switch(whatFix){
    case 'intro' :
      if( isFix == true ){
        fixing = <textarea type="text" className="setting-intro-fixing" placeholder={detail.intro} />;
      }else{
        fixing = <div className="setting-intro">{detail.intro}</div>
      }
      break;
    case 'email' :
      if( isFix == true ){
        fixing = <input type="text" className="setting-contain-fixing" placeholder={detail.email} />;
      }else{
        fixing = <div className="setting-contain">{detail.email}</div>
      }
      break;
    case 'school' :
      if( isFix == true ){
        fixing = <input type="text" className="setting-contain-fixing" placeholder={detail.school} />;
      }else{
        fixing = <div className="setting-contain">{detail.school}</div>
      }
      break;
    default :
      break;
  }
  return (
    <>
      {fixing}
    </>
  )
}

export default FixingBox