import SearchInput from "components/SearchInput";

export default function Home() {
    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center sm:w-1/2 w-full -mt-10">
            <SearchInput />
        </div>
    );
};