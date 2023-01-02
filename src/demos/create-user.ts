const user = {
    email: 'stam1@no-where.com',
    fname: '111111',
    lname: 'Chaplin',
    password: 'abcdefgh'
};

const opts = {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
        'content-type': 'application/json'
    }
}

fetch('http://localhost:3003/user', opts)
    .then(res => {
        console.log('response status code', res.status);
        return res.json()
    })
    .then(body => console.log('>>>', body))
    .catch(e => console.log(']]]', e));
