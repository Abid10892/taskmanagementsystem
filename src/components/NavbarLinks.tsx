'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface NavbarLinksProps {
    closeNav?: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ closeNav = () => { } }) => {

    const [showLogout, setShowLogout] = useState(false);


    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout');
            if (res.ok) {
                localStorage.removeItem('user');
                router.push('/login');
                router.refresh();
                setShowLogout(false)
                closeNav();
            }
        } catch (error: any) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setShowLogout(true);
        }
    }, [handleLogout])
    const router = useRouter();

    return (
        <>
            {showLogout && <button
                onClick={handleLogout}
                className={`relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-indigo-600
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-500`}
            >
                LOGOUT
            </button>}
        </>
    );
}


export default NavbarLinks;
