"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AlignJustify } from 'lucide-react';
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
    const [showNav, setShowNav] = useState(false);

    const [showLogout, setShowLogout] = useState(false);


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setShowLogout(true);
        }
    })

    return (
        <>
            {!showNav && (
                <>
                    <nav className="sticky top-0 bg-white flex justify-between p-3 md:pl-10 md:pt-7 w-full md:h-[12vh] z-10 shadow-xl">
                        <div className="md:flex md:gap-3 md:justify-center md:items-center">
                            <h1 className="font-bold text-2xl text-orange-600">
                                <Link href={"/"}>TASK MANAGEMENT SYSTEM</Link>
                            </h1>
                            <p className="md:pt-3">Web App</p>
                        </div>
                        <div className="hidden md:flex gap-7 absolute top-9 right-10">
                            <NavbarLinks />
                        </div>
                        <div>
                            {showLogout && <button
                                onClick={() => setShowNav(!showNav)}
                                className="md:hidden transition duration-1000 ease-in-out"
                            >

                                <AlignJustify size={40} className="mt-2" />
                            </button>}
                        </div>
                    </nav>
                </>
            )}
            {showNav && (
                <div className="fixed inset-0 w-screen h-screen bg-orange-50 z-10">
                    <button
                        className="absolute top-3 right-8 text-3xl transition-all duration-150 ease-in-out"
                        onClick={() => setShowNav(!showNav)}
                    >
                        X
                    </button>
                    <div className="flex flex-col items-center justify-center h-[90vh] gap-7 text-2xl font-bold">
                        <NavbarLinks closeNav={() => setShowNav(!showNav)} />
                    </div>
                </div>
            )}
        </>
    );
}
