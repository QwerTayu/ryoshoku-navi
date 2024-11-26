import React, { useEffect, useMemo, useState } from "react";
import MainContainer from "@/components/mainContainer";
import Post from "@/components/post";
import { useFirestore } from "@/hooks/useFirestore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "@/states/currentUserState";

function home() {
  const { showPosts, getAllUsers } = useFirestore();
  const [orders, setOrders] = useState([]); // (username, postId, userId, date, morning, lunch, dinner)
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const currnetUser = useRecoilValue(currentUserState);

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await showPosts();
      const usersData = await getAllUsers();
      setOrders(postsData);
      setUsers(usersData);
    };
    fetchData();
  }, []);

  useMemo(() => {
    if (currnetUser) {
      setUserId(currnetUser.uid);
    }
  }, [currnetUser]);

  return (
    <MainContainer active="home">
      {/* コンテンツ */}
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
          {orders
          .filter(order => order.userId == userId)
          .map((order, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{order.date}</td>
              <td className="px-4 py-2 border">{order.day}</td>
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={order.morning}
                  onChange={() => toggleOrder(index, "morning")}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={order.lunch}
                  onChange={() => toggleOrder(index, "lunch")}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={order.dinner}
                  onChange={() => toggleOrder(index, "dinner")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainContainer>
  );
}

export default home;
