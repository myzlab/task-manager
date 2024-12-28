
"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function LoadingDemo() {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        router.push(token ? '/tasks' : '/login');
    });

    return null;
}
