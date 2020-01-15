const chatMain = document.getElementById('app')

const inputMessage = document.createElement('div')
document.body.appendChild(inputMessage)

const authorName = prompt('Enter your name')

async function chat() {
    const response = await fetch (`http://localhost:3000/chat`)
    return await response.json()   
}
chat()

.then(response => {
    const messages = (response)
    messages.map((message) => {
        const {author, text, time, id} = message
        const divMessage = document.createElement('div')
        chatMain.appendChild(divMessage)
        divMessage.innerHTML = `${author}: ${text} ${time}`
    })
    let i = messages.length
        setInterval(async() => {
            const getNewMessage = await fetch(`http://localhost:3000/chat`)
            const newMessage =  await getNewMessage.json()
                if (newMessage[newMessage.length - 1].id === i + 1) {
                    const divNewMessage = document.createElement('div')
                    chatMain.appendChild(divNewMessage)
                    divNewMessage.innerHTML = `${newMessage[newMessage.length - 1].author}: ${newMessage[newMessage.length - 1].text} ${newMessage[newMessage.length - 1].time}`
                    i++
                }
        }, 1000)
})

.then(async() => {
    const text = document.createElement('input')
    text.type = 'textarea'
    inputMessage.appendChild(text)

    const send = document.createElement('button')
    send.textContent= 'send'
    inputMessage.appendChild(send)

    const timeNow = new Date()
    send.onclick = async () => {
        const textMessage = {
                author: authorName,
                text: text.value,
                time: `${timeNow.getHours()}:${timeNow.getMinutes()}`
            }
        text.value = ''
        const textMessageJson = JSON.stringify(textMessage)
        await fetch(`http://localhost:3000/chat`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: textMessageJson 
        })
    }
})  

