paypal.FUNDING.SOFORT = "disallowed";
paypal.FUNDING.MYBANK = "disallowed";
let paypal_inizialize = {
  style: {
    size: "responsive",
    size: "large",
    shape: "pill",
    color: "blue",
    label: "pay",
    tagline: false,
    fundingicons: true,
    layout: "horizontal",
  },
  // Set up the transaction
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "9",
          },
        },
      ],
    });
  },

  // Finalize the transaction
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (orderData) {
      Swal.fire({
        icon: "success",
        title:
          "Pagamento inviato correttamente, contattami per ricevere il link del webinar",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Whatsapp",
        denyButtonText: "Instagram",
      }).then((el) => {
        if (el.isConfirmed) {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = "https://wa.link/lunpdl";
          a.target = "_blank";
          a.click();
          delete a;
        } else if (el.isDenied) {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = "https://www.instagram.com/runningcoach_/";
          a.target = "_blank";
          a.click();
          delete a;
        }
      });
    });
  },
};

paypal.Buttons(paypal_inizialize).render("#paypal_container");

$(".visualizza_dati_bonifico").click(() => $(".dati_bonifico").toggle(500));
