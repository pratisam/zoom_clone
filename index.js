let localStream
let remoteStream
let peerConnection

const server = {
    iceServers:[{
        urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
    }]
}

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
    //passing the server to the rtcpeerconnection
    peerConnection =new RTCPeerConnection(server)
    remoteStream = new MediaStream()
    document.getElementById("user2").srcObject = remoteStream

    //tracking all the stream
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track,localStream)
    });
    //tracking remote stream
    peerConnection.ontrack =(e) =>{
        e.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack()
        })
    }

    peerConnection.onicecandidate = async (e) => {
        if(e.candidate){
            console.log("new ice candidate",e.candidate)
        }
    }
    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log("offer:",offer)
}

init()