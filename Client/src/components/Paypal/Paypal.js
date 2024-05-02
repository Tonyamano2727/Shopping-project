import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

// This value is from the props in the UI
const style = { layout: "vertical" };


// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "ResetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            console.log(response);
                // if(response.status === 'COMPLETED'){
                //     console.log(response);
                // }
          })
        }
      />
    </>
  );
};

export default function Paypal({amount}) {
  return (
    <div className="w-[80%] flex flex-col justify-center z-0">
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}>
        <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
