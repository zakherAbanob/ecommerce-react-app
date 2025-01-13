import amazonPayLogo from "../../assets/images/amazon-pay.png";
import americanExpressLogo from "../../assets/images/American-Express-Color.png";
import masterCardLogo from "../../assets/images/mastercard.webp";
import paypalLogo from "../../assets/images/paypal.png";
import appStoreLogo from "../../assets/images/get-apple-store.png";
import googleLogo from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-slate-200 py-8 ">
      <div className=" space-y-4 text-center">
        <header>
          <h2>Get the FreshCart App</h2>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
        </header>

        <div className="flex gab-2 ">
          <input
            className="form-control flex-grow"
            type="email"
            placeholder="Email Address"
          />
          <button className="btn uppercase bg-green-700 hover:bg-green-800 text-white text-sm">
            Share App Link
          </button>
        </div>

        <div className="flex justify-between items-center py-4 border-y-2 border-slate-400">
          <div className="payment-partners flex gap-3 items-center">
            <h3>Payment Partners</h3>
            <img className="w-24" src={amazonPayLogo} />
            <img className="w-24" src={americanExpressLogo} />
            <img className="w-20" src={masterCardLogo} />
            <img className="w-24" src={paypalLogo} />
          </div>
          <div className="download flex gap-3 items-center">
            <img className="w-24 cursor-pointer" src={appStoreLogo} />
            <img className="w-[105px] cursor-pointer" src={googleLogo} />
          </div>
        </div>
      </div>
    </footer>
  );
}
