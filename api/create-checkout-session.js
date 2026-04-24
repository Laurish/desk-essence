const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card", "klarna"],
  billing_address_collection: "required",
  line_items: items.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  })),
  mode: "payment",
  automatic_tax: { enabled: true },
  shipping_address_collection: {
    allowed_countries: ["SE"],
  },
  success_url: `${req.headers.origin}/order-success`,
  cancel_url: `${req.headers.origin}/cart`,
});