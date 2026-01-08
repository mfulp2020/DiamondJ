export type MenuCategory = {
  title: string;
  note?: string;
  items: { name: string; desc?: string }[];
};

export const menu: MenuCategory[] = [
  {
    title: "Smoked Meats",
    note: "Perfect for catering pans, bulk orders, and events.",
    items: [
      { name: "Brisket", desc: "Slow-smoked, sliced or chopped" },
      { name: "Pulled Pork", desc: "Smoky, tender, crowd favorite" },
      { name: "Ribs (by the rack / half rack)", desc: "Smoked and sauced (or dry)" },
      { name: "Turkey", desc: "Lean and juicy" },
      { name: "Sausage", desc: "Classic BBQ link" }
    ],
  },
  {
    title: "Sandwiches",
    items: [
      { name: "Brisket Sandwich", desc: "Smoked brisket on a bun" },
      { name: "Pulled Pork Sandwich", desc: "Sauce optional" },
      { name: "Turkey Sandwich", desc: "Smoked turkey, simple and solid" }
    ],
  },
  {
    title: "Sides",
    items: [
      { name: "Mac & Cheese" },
      { name: "Baked Beans" },
      { name: "Potato Salad" },
      { name: "Coleslaw" },
      { name: "Chips" }
    ],
  },
  {
    title: "Sauces",
    items: [{ name: "House BBQ" }, { name: "Spicy BBQ" }, { name: "Carolina / Vinegar" }],
  },
];
