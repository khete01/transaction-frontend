import { GeldIcon } from "@/icons/geld";
import Stepp from "../../components/stepper";
import { currencyStyle } from "./style";
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
    <div style={{ ...currencyStyle.container, flexDirection: "column" }}>
      <div style={{ ...currencyStyle.iconBox, flexDirection: "column" }}>
        <GeldIcon />
        <Stepp />
      </div>

      <div style={currencyStyle.box}>
        <div style={{ ...currencyStyle.label, flexDirection: "column" }}>
          <div style={currencyStyle.moneyBackground}>
            <MoneyIcon />
          </div>
          <label>
            <div style={currencyStyle.title}>
              <h2>Select base currency</h2>
            </div>
            <select
              name="selectedFruit"
              defaultValue="MNT - Mongolian Tugrik"
              style={currencyStyle.select}
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
              ...currencyStyle.alt,
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
          <button style={currencyStyle.confirm} onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
