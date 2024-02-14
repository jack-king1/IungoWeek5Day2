import React from "react";

function FriendRequest(props) {
    return (
        <div className="w-2/3 bg-white mx-auto text-black text-base h-auto mb-4 rounded-3xl p-3">
            <img
                src={props.image}
                className="h-auto mx-auto max-w-full w-24 h-24"
                alt="..."
            />
            <div className="text-start font-bold">
                Name: {props.firstName} {props.lastName}
            </div>
            <div className="text-start">Username: {props.username}</div>
            <div className="text-start">Email: {props.email}</div>
        </div>
    );
}

export default FriendRequest;
