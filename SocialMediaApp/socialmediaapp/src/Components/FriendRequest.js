import React from "react";

function FriendRequest(props) {
    return (
        <div className="w-3/4 bg-white mx-auto text-black text-base h-auto mb-4 rounded-3xl flex flow-row shadow-xl">
            <div className="bg-cyan-600 p-4 rounded-full -translate-x-1/4 shadow-md">
                <img
                    src={props.image}
                    className="h-auto mx-auto max-w-full w-8 h-8"
                    alt="..."
                />
            </div>
            <div className="text-start font-bold pt-1 flex flex-col">
                {props.firstName} {props.lastName}
                <div className="font-normal text-sm">pending</div>
            </div>
        </div>
    );
}

export default FriendRequest;
