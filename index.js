let localStream
let remoteStream
let peerConnection

let init =async() => {
    localStream = await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false//change later to true
    })
    document.getElementById("user1").srcObject = localStream
    //creat a another offer
    createOffer()

}
let createOffer = async() =>{
    //A WebRTC connection between the local computer and a remote peer. 
    peerConnection =new RTCPeerConnection()
    remoteStream = new MediaStream()
    document.getElementById("user2").srcObject = remoteStream
    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log("offer:",offer)
}

init()