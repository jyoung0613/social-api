const $userForm = document.querySelector('#user-form');

const handleAddFriend = event => {
    event.preventDefault();

    const friendValue = documment.querySelector('#new-friend').value;

    if (!friendValue) {
        return false;
    }

    const label = document.createElement('label');
    label.textContent = friendValue;
    label.htmlFor = friendValue
        .toLowerCase();    
};

const handleUserSubmit = event => {
    event.preventDefault();

    const username = $userForm.querySelector('#user-username').value.trim();
    const email = $userForm.querySelector('#user-email').value.trim();
    const thoughts = $userForm.querySelector('#user-thoughts').value.trim();
    const reactions = $userForm.querySelector('#user-reactions').value.trim();
    const friends = [...$userForm.querySelectorAll('[name=friend]:checked')].map(friends => {
        return friends.value;
      });

      if (!username || !createdBy  || !friends.length) {
          return;
      }

      const formData = { username, email, createdBy, friends }

      fetch('/api/users', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(postResponse => {
            alert('User created successfully!');
            console.log(postResponse);
        })
        .catch(err => {
            console.log(err);
            saveRecord(formData);
        });
};

$userForm.addEventListener('submit', handleUserSubmit);
$addFriendsBtn.addEventListener('click', handleAddFriend)