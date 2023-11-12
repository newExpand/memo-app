"use client";

import {
    ChevronDown,
    ChevronRight,
    LucideIcon,
    MoreHorizontal,
    Plus,
    Trash,
} from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;
        const promise = archive({ id });

        toast.promise(promise, {
            loading: "메모를 휴지통으로 이동 중...",
            success: "메모가 휴지통으로 이동되었습니다.",
            error: "메모 이동에 실패했습니다.",
        });
    };

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onExpand?.();
    };

    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!id) return;
        e.stopPropagation();
        const promise = create({ title: "제목없음", parentDocument: id }).then(
            (documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                router.push(`/documents/${documentId}`);
            }
        );

        toast.promise(promise, {
            loading: "메모를 작성하는 중...",
            success: "메모를 작성했습니다",
            error: "메모를 작성하는 중에 오류가 발생했습니다",
        });
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
            ) : (
                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    CTRL K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="w-4 h-4 mr-2" />
                                삭제
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground">
                                마지막 수정: {user?.username}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    >
                        <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-[30%] h-4" />
        </div>
    );
};
