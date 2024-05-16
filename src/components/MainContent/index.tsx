import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import TransactionDetails from './TransactionDetails';

export default function MainContent() {
    return (
        <div className='mx-auto max-w-[1400px] flex justify-center p-2'>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path='/:hash' Component={TransactionDetails} />
            </Routes>
        </div>
    )
}