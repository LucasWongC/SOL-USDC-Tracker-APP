import { NavLink } from "react-router-dom";
import USDCIcon from 'assets/icons/usdc.webp';

export default function Header() {
    return (
        <NavLink to={"/"}>
            <div className="h-20 flex justify-center items-center sm:gap-5 gap-3 bg-white text-blue-400 font-bold sm:text-[60px] text-[40px] cursor-pointer">
                <img
                    src={USDCIcon}
                    alt="USDC Coin"
                    className="sm:w-[60px] sm:h-[60px] w-10 h-10"
                />
                Transfer Scan
            </div>
        </NavLink>
    );
};