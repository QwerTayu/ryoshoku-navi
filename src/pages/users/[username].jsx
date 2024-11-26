import MainContainer from '@/components/mainContainer'
import Modal from '@/components/modal'
import Post from '@/components/post'
import { useFirestore } from '@/hooks/useFirestore'
import { currentUserState } from '@/states/currentUserState'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

function username() {
    const currentUser = useRecoilValue(currentUserState)
    const [profileUser, setProfileUser] = useState(null);
    const { getProfileUserById, showPosts, getAllUsers } = useFirestore();
    const [ users, setUsers ] = useState([]);
    const [ isFollowing, setIsFollowing ] = useState(false);
    const [ isFollowingModalOpen, setIsFollowingModalOpen ] = useState(false);
    const [ isFollowerModalOpen, setIsFollowerModalOpen ] = useState(false);
    const [ followingIds, setFollowingIds ] = useState([]);
    const [ followerIds, setFollowerIds ] = useState([]);
    const [ followingList, setFollowingList ] = useState([]);
    const [ followerList, setFollowerList ] = useState([]);
    const router = useRouter();
    const routerUserId = router.query.username;

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await showPosts();
            const usersData = await getAllUsers();
            setUsers(usersData);
        };
        fetchData();
    }, []);

    // Following, Followerのリストを表示する
    useEffect(() => {
        const fetchData = async () => {
            const newFollowerList = [];
            const newFollowingList = [];
    
            for (const followerId of followerIds) {
                const res = await getProfileUserById(followerId);
                newFollowerList.push(res);
            }
    
            for (const followingId of followingIds) {
                const res = await getProfileUserById(followingId);
                newFollowingList.push(res);
            }
    
            setFollowerList(newFollowerList);
            setFollowingList(newFollowingList);
        };
    
        fetchData();
    }, [isFollowingModalOpen, isFollowerModalOpen, profileUser]); 

    useMemo(async () => {
        if (router.isReady && currentUser) {
            if (routerUserId === currentUser.uid) setProfileUser(currentUser);
            else {
                const user = await getProfileUserById(routerUserId);
                setProfileUser(user)
            }
        }
    }, [router, currentUser])


    const handleFollow = async () => {
        if (isFollowing) {
            await removeFollowing(currentUser.uid, profileUser.uid);
        } else {
            await addFollowing(currentUser.uid, profileUser.uid);
        }

        // フォロー状態をトグル
        setIsFollowing(!isFollowing);
    };

    return (
        <MainContainer active={profileUser ? profileUser.uid : 'user'}>
            {profileUser && (
                <div className='w-full justify-between py-2'>
                    <div className='flex flex-col px-2'>
                        <div className='flex gap-5 items-center'>
                            <img className='w-[60px] h-[60px] rounded-full' src={profileUser.image} alt={profileUser.name} />
                            <div className='w-full'>
                                <div className='mb-3 flex items-center gap-2'>
                                    <h1 className='text-xl font-bold'><span className='line-clamp-1'>{profileUser.name}</span></h1>
                                    <p className='text-gray-500'>@{profileUser.uid}</p>
                                </div>
                                <button className='px-5 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out'
                                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                                >
                                    ログアウトする
                                </button>
                            </div>
                        </div>
                        <Modal open={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)} title='Following' > {/* Following */}
                            {followingList && (
                                <div className='mt-3 mx-3'>
                                    {followingList && followingList.map((user) => (
                                        <Link key={user.uid} href={`/users/${user.uid}`} className='flex items-center gap-3 mb-3' onClick={() => setIsFollowingModalOpen(false)} >
                                            <img src={user.image} alt={user.name} width={50} height={50} className='rounded-full' />
                                            <div className='flex flex-col justify-space'>
                                                <p className='text-md'>{user.name}</p>
                                                <p className='text-sm text-slate-500'>@{user.uid}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </Modal>
                        <Modal open={isFollowerModalOpen} onClose={() => setIsFollowerModalOpen(false)} title='Follower' > {/* Follower */}
                            {followerList && (
                                <div className='mt-3 mx-3'>
                                    {followerList && followerList.map((user) => (
                                        <Link key={user.uid} href={`/users/${user.uid}`} className='flex items-center gap-3 mb-3' onClick={() => setIsFollowerModalOpen(false)} >
                                            <img src={user.image} alt={user.name} width={50} height={50} className='rounded-full' />
                                            <div className='flex flex-col justify-space'>
                                                <p className='text-md'>{user.name}</p>
                                                <p className='text-sm text-slate-500'>@{user.uid}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </Modal>
                    </div>
                    <p className='text-sm px-2'>
                        E2136 村上惟
                    </p>
                    
                </div >
            )}
        </MainContainer >
    )
}

export default username
