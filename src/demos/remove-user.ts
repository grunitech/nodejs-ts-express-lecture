fetch('http://localhost:3003/user/4', {
    method: 'delete'
})
    .then(res => {
        console.log('response status code', res.status);
        return res.json()
    })
    .then(body => console.log('>>>', body))
    .catch(e => console.log(']]]', e));
