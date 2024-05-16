import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function DetailItem({ name, content, loading }: { name: React.ReactNode, content: React.ReactNode, loading?: Boolean }) {
    return (
        <div className="sm:grid sm:grid-cols-6 gap-2 w-full">
            <div className="mx-1">{name}</div>
            <div className="col-span-5 mx-1">{loading ? <Skeleton /> : content}</div>
        </div>
    );
};