import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
    const navigate = useNavigate();
    const [hash, setHash] = useState('');
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!hash.trim()) return;
        setHash('');
        navigate(`/${hash.trim()}`);
    }
    return (
        <form className="relative w-full rounded-md flex" onSubmit={search}>
            <input
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                type="text"
                placeholder="Search Transaction Hash"
                className="bg-secondary w-full rounded-md absolute h-full px-5 outline-none"
            />
            <div className='flex items-center ml-auto z-[100]'>
                {hash && <button type='button' onClick={() => setHash('')}>
                    <CloseIcon />
                </button>}
                <button type='submit' className='bg-rose-400 p-4 rounded-md m-[2px]'>
                    <SearchIcon />
                </button>                
            </div>
        </form>
    );
};