import MainContainer from "@/components/mainContainer";
import { useFirestore } from "@/hooks/useFirestore";
import { currentUserState } from "@/states/currentUserState";
import { router } from "next/router";
import Randomstring from "randomstring";
import React, { useEffect, useMemo, useState } from "react";
import { PiArrowLeftBold, PiPaperPlaneTiltBold } from "react-icons/pi";
import { useRecoilValue } from "recoil";
import { format, addDays } from 'date-fns';

function create() {
  const { createPost } = useFirestore();
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const randomSlug = Randomstring.generate(16);
  const currnetUser = useRecoilValue(currentUserState);

  useEffect(() => {
    setPostId(randomSlug);
  }, []);

  useMemo(() => {
    if (currnetUser) {
      setUserId(currnetUser.uid);
      setUsername(currnetUser.name);
    }
  }, [currnetUser]);

  // const handleInputChange = (value) => {
  //   setBody(value);
  // };

  const sendPost = async () => {
    console.log("🤢🙇‍♀️😂", orders)
    for (let i=0;i<orders.length;i++) {
      console.log("🤢🙇‍♀️😂", orders[i])
      await createPost(username, postId, userId, orders[i].date, orders[i].morning, orders[i].lunch, orders[i].dinner); // postId, userId, pBody, pCommentTo, pImageURL
    }

    router.push("/home");
  };

  const reversePost = () => {
    deleteImage(postId);
    router.back();
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState([ // 初期化
    { date: format(selectedDate, 'yyyy-MM-dd'), day: format(selectedDate, 'E'), morning: false, lunch: false, dinner: false },
    { date: format(addDays(selectedDate, 1), 'yyyy-MM-dd'), day: format(addDays(selectedDate, 1), 'E'), morning: false, lunch: false, dinner: false },
    { date: format(addDays(selectedDate, 2), 'yyyy-MM-dd'), day: format(addDays(selectedDate, 2), 'E'), morning: false, lunch: false, dinner: false },
  ]);

  const toggleOrder = (index, meal) => {
    const updatedOrders = [...orders];
    updatedOrders[index][meal] = !updatedOrders[index][meal];
    setOrders(updatedOrders);
  };

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setOrders([ // 初期化
      { date: format(newDate, 'yyyy-MM-dd'), day: format(newDate, 'E'), morning: false, lunch: false, dinner: false },
      { date: format(addDays(newDate, 1), 'yyyy-MM-dd'), day: format(addDays(newDate, 1), 'E'), morning: false, lunch: false, dinner: false },
      { date: format(addDays(newDate, 2), 'yyyy-MM-dd'), day: format(addDays(newDate, 2), 'E'), morning: false, lunch: false, dinner: false },
    ]);
  };

  return (
    <MainContainer active="create">
      <div className="flex justify-between">
        <button type="button" onClick={() => reversePost()} className="p-2">
          <PiArrowLeftBold size={24} />
        </button>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-4">
            <label htmlFor="date-input" className="mr-2">Select Date:</label>
            <input
              type="date"
              id="date-input"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">月日</th>
                <th className="px-4 py-2 border">曜日</th>
                <th className="px-4 py-2 border">朝食</th>
                <th className="px-4 py-2 border">昼食</th>
                <th className="px-4 py-2 border">夕食</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{order.date}</td>
                  <td className="px-4 py-2 border">{order.day}</td>
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={order.morning}
                      onChange={() => toggleOrder(index, 'morning')}
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={order.lunch}
                      onChange={() => toggleOrder(index, 'lunch')}
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={order.dinner}
                      onChange={() => toggleOrder(index, 'dinner')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full max-w-4xl mx-auto flex justify-end mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendPost}>
              記録
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default create;
