"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/error.png"
                width={300}
                height={300}
                alt="에러"
                className="dark:hidden"
            />
            <Image
                src="/error-dark.png"
                width={300}
                height={300}
                alt="에러"
                className="hidden dark:block"
            />
            <h2 className="text-xl font-medium">잘못된 접근입니다.</h2>
            <Button asChild>
                <Link href="/documents">메모 목록으로 돌아가기</Link>
            </Button>
        </div>
    );
};

export default Error;
