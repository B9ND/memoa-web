import Ad from "../Ad/Ad"

const Ads = () => {
  const Ads = [
    { adId: 0,
      adImg: 'src/assets/ad.png',
      adLink: ''},
    { adId: 1,
      adImg: 'src/assets/ad2.jpeg',
      adLink: ''}
  ]
  return (
    <div className="ads">
      {Ads.map((ad, index)=>{
        return(
          <Ad detail={ad} key={index}/>
        )
      })}
    </div>
  )
}

export default Ads