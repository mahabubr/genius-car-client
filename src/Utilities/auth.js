const authToken = (user) => {

    const currentUser = {
        email: user.email
    }

    // Get JWT Token
    fetch('https://genius-car-server-nu.vercel.app/jwt', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token)
        })
        .catch(e => console.log(e.message))
}

export default authToken