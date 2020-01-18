const chatMain = document.getElementById('app')
chatMain.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 900px;
    height: 578px
    
`
document.body.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center
`
const sentMessage = document.createElement('div')
sentMessage.style.cssText = `
    height: 525px;
    overflow: auto;
    margin-bottom: 5px
`
chatMain.appendChild(sentMessage)

const inputMessage = document.createElement('div')
inputMessage.style.cssText = `
    margin-bottom: 10px;
`
chatMain.appendChild(inputMessage)

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
        divMessage.style.cssText = `
            display: flex;
            align-items: center;
            background: #363636;
            color: #ffffff;
            width: 700px;
            height: 50px;
            margin: 5px;
            padding: 5px;
            border-radius: 10px;
        `
        sentMessage.appendChild(divMessage)
        const spanAuthor = document.createElement('span')
        spanAuthor.innerHTML = `${author}:`
        spanAuthor.style.cssText = `
            margin-right: 5px;
            font-weight: bold
        `
        divMessage.appendChild(spanAuthor)

        const spanText = document.createElement('span')
        spanText.innerHTML = `${text}`
        spanText.style.cssText = `
            margin-right: 5px
        `
        divMessage.appendChild(spanText)

        const spanTime = document.createElement('span')
        spanTime.innerHTML = `(${time})`
        spanTime.style.cssText = `
            color: grey;
            font-size: 10px
        `
        divMessage.appendChild(spanTime)
    })
    let i = messages.length
        setInterval(async() => {
            const getNewMessage = await fetch(`http://localhost:3000/chat`)
            const newMessage =  await getNewMessage.json()
                if (newMessage[newMessage.length - 1].id === i + 1) {
                    const divNewMessage = document.createElement('div')
                    divNewMessage.style.cssText = `
                        display: flex;
                        align-items: center;
                        background: #363636;
                        color: #ffffff;
                        width: 700px;
                        height: 50px;
                        margin: 5px;
                        padding: 5px;
                        border-radius: 10px;
                    `
                    sentMessage.appendChild(divNewMessage)

                    const newSpanAuthor = document.createElement('span')
                    newSpanAuthor.innerHTML = `${newMessage[newMessage.length - 1].author}:`
                    newSpanAuthor.style.cssText = `
                        margin-right: 5px;
                        font-weight: bold
                    `
                    divNewMessage.appendChild(newSpanAuthor)

                    const newSpanText = document.createElement('span')
                    newSpanText.innerHTML = `${newMessage[newMessage.length - 1].text}`
                    newSpanText.style.cssText = `
                        margin-right: 5px
                    `
                    divNewMessage.appendChild(newSpanText)

                    const newSpanTime = document.createElement('span')
                    newSpanTime.innerHTML = `(${newMessage[newMessage.length - 1].time})`
                    newSpanTime.style.cssText = `
                        color: grey;
                        font-size: 10px
                    `
                    divNewMessage.appendChild(newSpanTime)
                    i++
                }
        }, 1000)        
})

.then(async() => {
    const text = document.createElement('input')
    text.type = 'textarea'
    text.required = true
    text.style.cssText = `
        width: 615px;
        height: 50px;
        margin-right: 10px;
        border-radius: 10px;
        border: 1px solid #17a2b8;
        outline: none;
        vertical-align: middle;
    `
    inputMessage.appendChild(text)

    const send = document.createElement('button')
    send.textContent= 'send'
    send.className = 'btn btn-outline-info'
    send.style.cssText = `
        width: 100px;
        height: 50px;
        border-radius: 10px
    `
    inputMessage.appendChild(send)

    const timeNow = new Date()
    send.onclick = async () => {
        if(text.value !== '') {
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
    }    
})  

