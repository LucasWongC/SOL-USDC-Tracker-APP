import { ReactComponent as NotFoundIcon } from 'assets/icons/404.svg';
import { ReactComponent as ReloadIcon } from 'assets/icons/reload.svg';
import SearchInput from 'components/SearchInput';
import { NavLink } from 'react-router-dom';
export default function NotFound() {
    return (
        <div className="flex flex-col items-center gap-5 mt-10">
            <NotFoundIcon />
            <h1 className='font-bold text-[30px] text-neutral-700' >404 - The page could not be found</h1>
            <SearchInput />
            <p>Sorry! This is an invalid search string.</p>
            <NavLink to={"/"}>
                <span className='text-blue-400 flex items-center gap-2'>Go back to homepage <ReloadIcon /></span>
            </NavLink>
        </div>
    );
}