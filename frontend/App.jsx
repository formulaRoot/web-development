import * as React from 'react';
import web_development from 'ic:canisters/web_development';

import Home from './components/Home';

const list = [
  {
    name: "Bat",
    description: "Something about baseball",
    imageUrl: "https://www.watershedcabins.com/uploads/for-sale-sign-e1509648047898-400x234.jpg",
    minBid: 100,
  },
  {
    name: "Hat",
    description: "You put this on your head",
    imageUrl: "https://www.watershedcabins.com/uploads/for-sale-sign-e1509648047898-400x234.jpg",
    minBid: 1000,
  },
  {
    name: "Rat",
    description: "Friends with the chef",
    imageUrl: "https://www.watershedcabins.com/uploads/for-sale-sign-e1509648047898-400x234.jpg",
    minBid: 10000,
  },
  {
    name: "Rat",
    description: "Friends with the chef",
    imageUrl: "https://www.watershedcabins.com/uploads/for-sale-sign-e1509648047898-400x234.jpg",
    minBid: 10000,
  },
  {
    name: "Rat",
    description: "Friends with the chef",
    imageUrl: "https://www.watershedcabins.com/uploads/for-sale-sign-e1509648047898-400x234.jpg",
    minBid: 10000,
  },
];

const App = () => {
  const [itemList, setitemList] = React.useState(list);

  return (
    <Home itemList={itemList} setter={setitemList} />
  );
};

export default App;
