import React from "react";
import Button from "./Button";

function ProfileInfo(props) {
    return (
        <div className="h-44 bg-cyan-600 span-col-1 flex p-4 w-full mx-auto align-middle ">
            <div className="flex flex-row align-middle bg-white rounded-3xl w-3/4 mx-auto shadow-md">
                <div className="flex items-center h-full rounded-3xl bg-white">
                    <div className="bg-cyan-600 rounded-full p-7 -translate-x-1/4 shadow-md">
                        <img
                            src={props.image}
                            className="h-auto mx-auto max-w-full w-24 h-24"
                            alt="..."
                        />
                    </div>
                </div>
                <div className="text-black h-full text-xl flex flex-col my-auto justify-around flex-1">
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
                    <div className="h-full flex my-auto">
                        <Button
                            id={props.id}
                            lineID={props.lineID}
                            action={props.action}
                            unaction={props.unaction}
                            text="Add Friend"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
