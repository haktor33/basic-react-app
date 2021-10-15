import React, { useEffect} from 'react';
import AgoraRTC from "agora-rtc-sdk-ng"
import shortid from 'shortid';

let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null
};

let options = {
    // Pass your App ID here.
    appId: "cbc802a57710400ab7a2ad5b49582586",
    // Set the channel name.
    channel: "CpeaX_Channel",
    // Pass your temp token here.
    token: "006cbc802a57710400ab7a2ad5b49582586IAASNKryBfKH2xz5VvFHiDRyvOo9UzE0P9lKCoi8MYaYmYYFe4EAAAAAEACLBKCgdYVpYQEAAQB0hWlh",
    // Set the user ID.
    uid: shortid.generate()
};

const joinRemoteOnClick = async () => {
    await rtc.client.join(options.appId, options.channel, options.token, (uid) => {
        console.log(uid)
        // Create a local stream
    }, (err) => { console.log(err) });
}

const joinHostOnClick = async () => {
    // Join an RTC channel.
    await rtc.client.join(options.appId, options.channel, options.token, options.uid);
    // Create a local audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the RTC channel.
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    rtc.localVideoTrack.play("local_stream");
    console.log("publish success!");
}

const leaveOnClick = async () => {
    // Destroy the local audio and video tracks.
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    // Traverse all remote users.
    rtc.client.remoteUsers.forEach(user => {
        // Destroy the dynamically created DIV containers.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
    });

    // Leave the channel.
    await rtc.client.leave();
}

const startBasicCall = async () => {
    // Create an AgoraRTCClient object.
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

    // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
    rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");
        // If the remote user publishes a video track.
        if (mediaType === "video") {
            // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
            const remoteVideoTrack = user.videoTrack;
            remoteVideoTrack.play("remote_video");
        }

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
            // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
            const remoteAudioTrack = user.audioTrack;
            // Play the remote audio track. No need to pass any DOM element.
            remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        rtc.client.on("user-unpublished", user => {
            // Get the dynamically created DIV container.
            //const remotePlayerContainer = document.getElementById(user.uid);
            // Destroy the container.
            //remotePlayerContainer.remove();
        });

    });
}

const BasicVideoCall = () => {
    useEffect(() => {
        startBasicCall();
    }, [])

    return (
        <>
            <button onClick={joinHostOnClick}>Join Host</button>
            <button onClick={joinRemoteOnClick}>Join Remote</button>
            <button onClick={leaveOnClick}>Leave</button>
            <div>local</div>
            <div id="local_stream" className="local_stream" style={{ width: "640px", height: "480px" }}></div>
            <div>remote</div>
            <div id="remote_video" style={{ width: "640px", height: "480px" }} />
        </>
    )
}

export default BasicVideoCall;