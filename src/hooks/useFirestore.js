import { db } from "@/lib/firebase";
import { FieldValue, doc, serverTimestamp, setDoc, getDocs, collection, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

export const useFirestore = () => {
    const createPost = async (username, postId, userId, date, morning, lunch, dinner) => {
        const pRef = doc(db, "orders", postId)
        try {
            await setDoc(pRef, {
                username: username,
                postId: postId,
                userId: userId,
                createdAt: serverTimestamp(FieldValue),
                date: date,
                morning: morning,
                lunch: lunch,
                dinner: dinner,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const showPosts = async () => {
        const snapShot = await getDocs(collection(db, "orders"));
        return snapShot.docs.map((doc) => ({ ...doc.data() }));
    };

    const getProfileUserById = async (userId) => {
        const snapShot = await getDoc(doc(db, "users", userId));
        return {
            ...snapShot.data(),
            uid: snapShot.id,
        };
    }

    const getProfileUserByName = async (userName) => {
        const snapShot = await getDocs(collection(db, "users"));
        return snapShot.docs.filter((doc) => doc.data().name === userName).map((doc) => {
            const data = doc.data();
            data.uid = doc.id;
            return data;
        });
    }

    const getAllUsers = async () => {
        const snapShot = await getDocs(collection(db, "users"));
        return snapShot.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id,
        }));
    }

    // const updateLikes = async (currentUserId, postId, LikedArr, setLikedArr, isLiked, setIsLiked, likeCounts, setLikeCounts) => {
    //     const postRef = doc(db, "posts", postId);

    //     if (isLiked) {
    //         setIsLiked(false) // いいねを取り消したユーザーの状態を更新
    //         setLikeCounts(likeCounts - 1) // いいね数を更新
    //         setLikedArr(LikedArr.filter((liked) => liked !== currentUserId))
    //         await updateDoc(postRef, {
    //             liked: LikedArr.filter((liked) => liked !== currentUserId),
    //         }) // 投稿のいいねを取り消したユーザーを削除
    //     } else {
    //         setIsLiked(true) // いいねしたユーザーの状態を更新
    //         setLikeCounts(likeCounts + 1) // いいね数を更新
    //         setLikedArr([...LikedArr, currentUserId])
    //         await updateDoc(postRef, {
    //             liked: [...LikedArr, currentUserId],
    //         }) // 投稿にいいねしたユーザーを追加
    //     }
    // }

    // const addFollowing = async (userId, followingId) => {
    //     const followingRef = doc(db, "users", userId, "following", followingId);
    //     const followerRef = doc(db, "users", followingId, "follower", userId);
    //     try {
    //         await setDoc(followingRef, {
    //             userId: followingId,
    //         });
    //         await setDoc(followerRef, {
    //             userId: userId,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const removeFollowing = async (userId, followingId) => {
    //     const followingRef = doc(db, "users", userId, "following", followingId);
    //     const followerRef = doc(db, "users", followingId, "follower", userId);
    //     try {
    //         await deleteDoc(followingRef);
    //         await deleteDoc(followerRef);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getFollowing = async (userId) => {
    //     const snapShot = await getDocs(collection(db, "users", userId, "following"));
    //     return snapShot.docs.map((doc) => ({ ...doc.data() }));
    // }

    // const getFollower = async (userId) => {
    //     const snapShot = await getDocs(collection(db, "users", userId, "follower"));
    //     return snapShot.docs.map((doc) => ({ ...doc.data() }));
    // }

    return { createPost, showPosts, getProfileUserById, getProfileUserByName, getAllUsers };
};
