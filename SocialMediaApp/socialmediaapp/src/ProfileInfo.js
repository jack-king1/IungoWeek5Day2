import React from "react";
import Button from "./Button";

function ProfileInfo(props) {
    return (
        <div className="h-44 bg-cyan-600 span-col-1 flex p-4 m-2 rounded-3xl w-2/3 mx-auto drop-shadow-xl align-middle">
            <div className="flex flex-row align-middle w-full bg-white rounded-3xl">
                <div className="flex items-center h-full rounded-3xl bg-white w-1/6">
                    <img
                        src={props.image}
                        className="h-auto mx-auto max-w-full w-24 h-24"
                        alt="..."
                    />
                </div>
                <div className="text-black h-full text-xl flex flex-col my-auto justify-around w-full">
                    <div className="font-bold">
                        {props.firstName} {props.lastName}
                    </div>
                    <div className="text-sm">{props.domain}</div>
                    <div className="text-sm">{props.uni}</div>
                    <div className="text-sm">{props.title}</div>
                    <div className="text-sm">{props.username}</div>
                    <div className="text-sm">Email: {props.email}</div>
                </div>
                <div className="h-full flex">
                    <div className="p-4 flex my-auto">
                        <Button
                            lineID={props.lineID}
                            action={props.action}
                            text="Add Friend"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
