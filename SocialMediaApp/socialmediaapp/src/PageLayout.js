import React from "react";
import Header from "./Header";
import { useEffect, useState, useContext } from "react";
import ProfileInfo from "./ProfileInfo";
import { fetchAllUsers } from "./AllUsersAPI";
import FriendRequest from "./FriendRequest";

function PageLayout() {
    const [users, setUsers] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    async function GetUsers() {
        let users = await fetchAllUsers();
        console.log("Fetched Users: ", users.users);
        let shuffled = users.users.sort(() => Math.random() - 0.5);
        setUsers(shuffled);
    }

    useEffect(() => {
        GetUsers();
    }, []);

    useEffect(() => {
        console.log("user Effect Users: ", users);
    }, [users]);

    const AddFriendRequest = (reqID) => {
        console.log(reqID);
        setFriendRequests([...friendRequests, users[reqID]]);
    };

    const RemoveFriendRequest = (userID) => {
        console.log(userID);
        // Filter out the user with the matching userID
        let newFriendReqArray = friendRequests.filter(
            (user) => user.id !== userID
        );
        // Update the state with the filtered array
        setFriendRequests(newFriendReqArray);
    };

    return (
        <div className="max w-screen h-screen">
            <div className="grid grid-cols-4 grid-rows-8 h-full">
                <Header />
                <div className="col-span-4 grid grid-col-6  row-span-7 h-auto">
                    <div className="grid grid-cols-5 bg-red-50">
                        <div className="col-span-4 grid grid-col-3">
                            {users.map((user, index) => {
                                return (
                                    <ProfileInfo
                                        key={index}
                                        lineID={index}
                                        id={user.id}
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        image={user.image}
                                        domain={user.domain}
                                        uni={user.university}
                                        title={user.company.title}
                                        email={user.email}
                                        username={user.username}
                                        action={AddFriendRequest}
                                        unaction={RemoveFriendRequest}
                                    />
                                );
                            })}
                        </div>
                        <div className="col-span-1 bg-cyan-600 shadow-2xl">
                            <h1 className="text-3xl text-center">
                                <div className="py-4">Friend Requests</div>
                                <div className="flex flex-col">
                                    {friendRequests.map((user, index) => {
                                        return (
                                            <FriendRequest
                                                key={index}
                                                firstName={user.firstName}
                                                lastName={user.lastName}
                                                username={user.username}
                                                image={user.image}
                                                email={user.email}
                                            />
                                        );
                                    })}
                                </div>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageLayout;
