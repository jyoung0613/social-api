const $friendList = document.querySelector("#friend-list");
const getFriendList = () => {
  fetch("/api/users/friend-list")
    .then((response) => response.json())
    .then((friendListArr) => {
      friendListArr.forEach(printFriend);
    })
    .catch((err) => {
      console.log(err);
    });
};

const printFriend = ({ _id, username, friendCount, createdBy, createdAt }) => {
    const friendCard = `
    <div class='col-12 col-lg-6 flex-row'>
    <div class='card w-100 flex-column'>
    <h3 class='card-header'>${username}</h3>
    <div class='card-body flex-column col-auto'>
    <h4 class='text-dark'>By ${createdBy}</h4>
    <p>${thoughtCount} Thoughts</p>
          <h5 class="text-dark">Friends</h5>
          <ul>
            ${friends
              .map(friend => {
                return `<li>${friend}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/user?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>`

   $friendList.innerHTML += friendCard;
};

getFriendList();