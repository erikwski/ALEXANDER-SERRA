let url = new URL(window.location.href);
let service = url.searchParams.get("service");

if (!service.length) location.href = url.origin;

document.getElementById(service).checked = true;

paypal.FUNDING.SOFORT = "disallowed";
paypal.FUNDING.MYBANK = "disallowed";
let paypal_inizialize = {
  style: {
    size: "responsive",
    size: "large",
    shape: "pill",
    color: "blue",
    label: "pay",
    fundingicons: true,
    layout: "horizontal",
  },
  // Set up the transaction
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "50",
          },
        },
      ],
    });
  },

  // Finalize the transaction
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (orderData) {
      // Successful capture! For demo purposes:
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );
      var transaction = orderData.purchase_units[0].payments.captures[0];
      alert(
        "Transaction " +
          transaction.status +
          ": " +
          transaction.id +
          "\n\nSee console for all available details"
      );

      // Replace the above to show a success message within this page, e.g.
      // const element = document.getElementById('paypal-button-container');
      // element.innerHTML = '';
      // element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
    });
  },
};
debugger;
paypal.Buttons(paypal_inizialize).render("#paypal-button-gold");
paypal.Buttons(paypal_inizialize).render("#paypal-button-diamond");
paypal.Buttons(paypal_inizialize).render("#paypal-button-platinum");
