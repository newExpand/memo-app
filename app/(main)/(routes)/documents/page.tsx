"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "제목없음" });

        toast.promise(promise, {
            loading: "메모를 작성하는 중입니다",
            success: "메모를 작성했습니다",
            error: "메모를 작성하는 중에 오류가 발생했습니다",
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                width={300}
                height={300}
                alt=""
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                width={300}
                height={300}
                alt=""
                className="hidden dark:block"
            />
            <h2>{user?.username} 님! ExpandMemo에 오신 것을 환영합니다</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="w-4 h-4 mr-2" />
                메모 작성하기
            </Button>
        </div>
    );
};

export default DocumentsPage;
