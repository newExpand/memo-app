import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background dark:bg-[#1f1f1f] z-50">
            <Logo />
            <div className="flex items-center justify-between w-full md:ml-auto md:justify-end gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    개인정보정책
                </Button>
                <Button variant="ghost" size="sm">
                    이용약관
                </Button>
            </div>
        </div>
    );
};
