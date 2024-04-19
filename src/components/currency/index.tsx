import { GeldIcon } from "@/icons/geld";
import Stepp from "../../components/stepper";
import currencyStyle from "@/styles/currency.module.css";
import { MoneyIcon } from "@/icons/money";
import router from "next/router";

function Currency() {
  const confirm = () => {
    router.replace("/balance");
  };

  const currencyOptions = [
    "MNT - Mongolian Tugrik",
    "USD - United States Dollar",
    "EUR - Euro",
    "GBP - British Pound Sterling",
    "JPY - Japanese Yen",
    "CHF - Swiss Franc",
    "CAD - Canadian Dollar",
    "AUD - Australian Dollar",
    "CNY - Chinese Yuan",
    "INR - Indian Rupee",
    "BRL - Brazilian Real",
    "ZAR - South African Rand",
    "RUB - Russian Ruble",
    "MXN - Mexican Peso",
    "SGD - Singapore Dollar",
    "NZD - New Zealand Dollar",
  ];

  return (
    <div className={currencyStyle.container}>
      <div className={currencyStyle.iconBox}>
        <GeldIcon />
        <Stepp />
      </div>

      <div className={currencyStyle.box}>
        <div className={currencyStyle.label}>
          <div className={currencyStyle.moneyBackground}>
            <MoneyIcon />
          </div>
          <label>
            <div className={currencyStyle.title}>
              <h2>Select base currency</h2>
            </div>
            <select
              name="selectedFruit"
              defaultValue="MNT - Mongolian Tugrik"
              className={currencyStyle.select}
            >
              {currencyOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <p
            style={{
              color: "#475569",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Your base currency should be the one you use most often. All
            transactions in other currencies will be calculated based on this
            one
          </p>
          <button className={currencyStyle.confirm} onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
