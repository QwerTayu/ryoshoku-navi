import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export const GetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isFetched, setIsFetched] = useState(false)
    const [isSession, setIsSession] = useState(false)
    useEffect(() => {
        if (window.location.pathname === '/') setIsSession(false)
        else if ((window.location.pathname !== '/') && !isSession) setIsSession(true)
        else return
    }, [])
    const { data: session } = useSession({ required: isSession })
    if (!isFetched && session && !currentUser) {
        setCurrentUser({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        })
        setIsFetched(true)
    }
    return;
}