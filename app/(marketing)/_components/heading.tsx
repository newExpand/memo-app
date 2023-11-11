"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-3-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                간단하고 빠르게 메모하고 싶을 때{" "}
                <span className="underline">ExpandMemo</span>로 오세요
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                ExpandMemo는 메모에 특화된 깔끔하고 심플한
                <br />
                작업환경을 구성해 줍니다.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        시작하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        ExpandMemo 체험하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    );
};
