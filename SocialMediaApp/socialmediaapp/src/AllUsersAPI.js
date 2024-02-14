export const fetchAllUsers = async () => {
    try {
        const response = await fetch("https://dummyjson.com/users").then(
            (res) => res.json()
        );
        console.log("@NFETCHUSERS: ", response);
        return response; // Returning an array of user items
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return an empty array in case of an error
    }
};
