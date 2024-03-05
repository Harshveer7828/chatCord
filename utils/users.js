const users=[];

// function which add the user to the users array

function userJoin(id,username,room){
    const user={id,username,room};
    users.push(user);
    return user;
};

// function to get the current user.
function getCurrentUser(id){
    return users.find(user=>user.id === id);
};

// function if the user leaves the chat

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
  
    console.log(index)
    console.log(users[index]);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}

//function to get the room user
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}



module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};