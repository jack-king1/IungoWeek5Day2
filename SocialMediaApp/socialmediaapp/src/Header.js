import React from "react";
import { FaBook } from "react-icons/fa";

function Header() {
    return (
        <div className="w-full mx-auto text-6xl flex flex-row p-6 px-12 justify-between col-span-4 grid-rows-1 shadow-2xl">
            <div className="w-4/5 flex flex-row justify-around mx-auto">
                <div className="flex-1 my-auto ">
                    <div className="text-white flex flex-row">
                        <div className="logo pr-2">CatBook</div> <FaBook />
                    </div>
                </div>
                <div className="my-auto flex flex-row text-3xl mt-4 gap-8">
                    <div className="bg-cyan-700 rounded-md px-2">Home</div>
                    <div className="">Friends</div>
                    <div>Feed</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
