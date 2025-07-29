import React, { useState } from "react";
import Friends from "./components/Friends";
import Form from "./components/Form";
import Button from "./components/Button";
import Split from "./components/Split";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [friends, setAddFriends] = useState(initialFriends);
  const [showAddfriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleFriends(friend) {
    setAddFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelection(friend) {
    //setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  function handleSplitBill(value) {
    setAddFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Friends
            friends={friends}
            onSelection={handleSelection}
            selectedFriend={selectedFriend}
          />
          {showAddfriend && <Form onAddFriend={handleFriends}></Form>}
          <Button onClick={handleShowAddFriend}>
            {showAddfriend ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend && (
          <Split
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        )}
      </div>
    </>
  );
}
