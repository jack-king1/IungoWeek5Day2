import React from "react";

function Header() {
    return (
        <div className="w-full bg-cyan-600 text-6xl flex flex-row p-6 justify-between col-span-4 grid-rows-1">
            <div className="flex-1 my-auto">CatBook</div>
            <div className="my-auto flex flex-row text-3xl">
                <div className="pr-4">Home</div>
                <div className="pr-4">Friends</div>
                <div>Feed</div>
            </div>
        </div>
    );
}

export default Header;
