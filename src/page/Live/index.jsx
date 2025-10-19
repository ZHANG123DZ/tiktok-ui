// import React, { useState, useRef, useEffect } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';

// const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

// export default function LivePage() {
//   const [joined, setJoined] = useState(false);
//   const [role, setRole] = useState('host');
//   const [localTracks, setLocalTracks] = useState([]);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   useEffect(() => {
//     // cleanup khi unmount
//     return () => {
//       localTracks.forEach((track) => {
//         track.stop();
//         track.close();
//       });
//       client.leave();
//     };
//   }, [localTracks]);

//   const startLive = async () => {
//     try {
//       const channel = 'demoChannel';
//       const res = await fetch(
//         `http://localhost:3000/token?channel=${channel}&role=${role}`
//       );
//       const data = await res.json();

//       await client.setClientRole(role);
//       await client.join(data.appId, channel, data.token, data.uid);

//       setJoined(true);
//       console.log('✅ Joined channel as', role);

//       if (role === 'host') {
//         // tạo track
//         const [micTrack, camTrack] =
//           await AgoraRTC.createMicrophoneAndCameraTracks();
//         setLocalTracks([micTrack, camTrack]);

//         // chờ React render xong video element
//         await new Promise((r) => setTimeout(r, 200));

//         // hiển thị preview
//         if (localVideoRef.current) {
//           camTrack.play(localVideoRef.current);
//           console.log('🎥 Playing local video...');
//         } else {
//           console.warn('⚠️ localVideoRef is null!');
//         }

//         await client.publish([micTrack, camTrack]);
//         console.log('📡 Published local tracks');
//       } else {
//         client.on('user-published', async (user, mediaType) => {
//           await client.subscribe(user, mediaType);
//           console.log('👀 Subscribed to', user.uid, mediaType);

//           if (mediaType === 'video' && remoteVideoRef.current) {
//             user.videoTrack.play(remoteVideoRef.current);
//           }
//           if (mediaType === 'audio') {
//             user.audioTrack.play();
//           }
//         });
//       }
//     } catch (err) {
//       console.error('❌ startLive error:', err);
//     }
//   };

//   const stopLive = async () => {
//     try {
//       localTracks.forEach((track) => {
//         track.stop();
//         track.close();
//       });
//       await client.unpublish();
//       await client.leave();
//       setLocalTracks([]);
//       setJoined(false);
//       console.log('🛑 Live stopped');
//     } catch (err) {
//       console.error('Error stopping live:', err);
//     }
//   };

//   return (
//     <div className="p-4 flex flex-col items-center">
//       {!joined ? (
//         <>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             style={{ marginBottom: 12 }}
//           >
//             <option value="host">Host</option>
//             <option value="audience">Audience</option>
//           </select>

//           <button
//             onClick={startLive}
//             style={{
//               backgroundColor: 'red',
//               color: 'white',
//               padding: '10px 16px',
//               borderRadius: 8,
//             }}
//           >
//             Start Live
//           </button>
//         </>
//       ) : (
//         <div className="flex flex-col items-center mt-4">
//           <div
//             style={{
//               width: 480,
//               height: 360,
//               background: '#111',
//               borderRadius: 8,
//               overflow: 'hidden',
//               position: 'relative',
//             }}
//           >
//             {/* Host hiển thị local, audience hiển thị remote */}
//             <div
//               ref={role === 'host' ? localVideoRef : remoteVideoRef}
//               style={{
//                 width: '100%',
//                 height: '100%',
//               }}
//             />

//             <span
//               style={{
//                 position: 'absolute',
//                 top: 8,
//                 left: 8,
//                 background: 'red',
//                 color: 'white',
//                 padding: '2px 6px',
//                 borderRadius: 4,
//                 fontSize: 12,
//                 fontWeight: 'bold',
//               }}
//             >
//               🔴 LIVE
//             </span>
//           </div>

//           <button
//             onClick={stopLive}
//             style={{
//               backgroundColor: '#444',
//               color: 'white',
//               padding: '8px 14px',
//               borderRadius: 8,
//               marginTop: 16,
//             }}
//           >
//             Stop Live
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
