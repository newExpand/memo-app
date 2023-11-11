import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";

const MarketingPage = () => {
    return (
        <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
            <div className="flex flex-col items-center justify-center flex-1 px-6 pb-10 text-center  md:justify-start gap-y-8">
                <Heading />
                <Heroes />
                <Footer />
            </div>
        </div>
    );
};
export default MarketingPage;
