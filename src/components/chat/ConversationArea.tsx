import React, { useCallback, useEffect, useRef, useState } from "react";
import { Paperclip, Send, Mic, Phone, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/store/messageStore";
import { useAuthStore } from "@/store/authStore";
import { Message, User } from "@/types";
import { webRtcStore } from "@/store/webRtcStore";
import { socket } from "@/config/socket";
import { getMessages } from "@/services";

type Props = {
  selectedUser: User;
};

const peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};

export const ConversationArea = ({ selectedUser }: Props) => {
  const [message, setMessage] = useState("");
  const { user } = useAuthStore();
  const messagesMap = useMessageStore((state) => state.messages);
  const messages = messagesMap[selectedUser.id] || [];
  const addMessage = useMessageStore((state) => state.addMessage);
  const setMessages = useMessageStore((state) => state.setMessages);
  const { inCall, setInCall, setOffer, setAnswerUser, setOfferUser } =
  webRtcStore();
  
  const ioOfferRef = useRef(false);
  const rtcPeerObject = useRef<RTCPeerConnection>(null);
  const localStream = useRef<MediaStream>(null);
  const remoteStream = useRef<MediaStream>(null);

  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const createRtcPeerConnection = useCallback(
    async (offer?: RTCSessionDescriptionInit) => {
      if (!localStream.current && !remoteStream.current) {
        return;
      }
      if(remoteVideo.current && remoteStream.current){
        console.log("remote Audio Call");
        remoteVideo.current.srcObject = remoteStream.current
      }
      const peerConnection = await new RTCPeerConnection(peerConfiguration);
      remoteStream.current = new MediaStream();

      localStream.current?.getTracks().forEach((track) => {
        if (localStream.current)
          peerConnection.addTrack(track, localStream.current);
      });

      peerConnection.onsignalingstatechange = (event) => {
        console.log({ stateChange: event });
        console.log(peerConnection.signalingState);
      };

      peerConnection.onicecandidate = (event) => {
        console.log({user});
        if (event.candidate) {
          socket.emit("send-ice-candidate-to-signaling-server", {
            iceCandidate: event.candidate,
            user,
            ioOffer: ioOfferRef,
          });
        }
      };

      peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.current?.addTrack(track);
          if(remoteVideo.current){
            remoteVideo.current.srcObject = remoteStream.current
          }
          console.log("Here's an exciting moment... fingers cross");
        });
      };

      if (offer) {
        console.log("offer get")
        await peerConnection.setRemoteDescription(offer);
      }

      rtcPeerObject.current = peerConnection;
    },
    [user]
  );

  const getMediaUser = async (
    isVideo: boolean
  ): Promise<MediaStream | undefined> => {
    const config: MediaStreamConstraints = {
      audio: true,
      ...(isVideo && { video: true }),
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(config);
      localStream.current = stream;

      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const call = async (isVideo: boolean) => {
    if (inCall) return;

    await getMediaUser(true);
    await createRtcPeerConnection();

    try {
      const offer = await rtcPeerObject.current?.createOffer();
      if (!offer) return;
      rtcPeerObject.current?.setLocalDescription(offer);
      ioOfferRef.current = true
      setInCall(true);
      setOffer(offer);
      setAnswerUser(selectedUser);
      socket.emit("new-offer", { offer, selectedUser, user, isVideo });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    if (user?.id && selectedUser?.id && message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        owner: "me",
        sender: { id: user?.id },
        reciever: { id: selectedUser?.id },
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      addMessage(selectedUser.id, newMessage);
      socket.emit("send-message", newMessage);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const answerOffer = useCallback(
    async ({
      offer,
      offerUser,
      isVideo,
    }: {
      offer: RTCSessionDescriptionInit;
      offerUser: User;
      isVideo: boolean;
    }) => {
      if (inCall || !user) return;
      await getMediaUser(isVideo);
      await createRtcPeerConnection(offer);
      setInCall(true);
      setOffer(offer);
      setOfferUser(offerUser);
      setAnswerUser(user);
      const answer = await rtcPeerObject.current?.createAnswer();
      if (!answer) return;
      await rtcPeerObject.current?.setLocalDescription(answer);

      const offerIceCandidate = await socket.emitWithAck("new-answer", {
        answer,
        offerUser,
      });
      offerIceCandidate.forEach((element: RTCIceCandidateInit) => {
        rtcPeerObject.current?.addIceCandidate(element);
      });
    },
    [
      createRtcPeerConnection,
      inCall,
      setAnswerUser,
      setInCall,
      setOffer,
      setOfferUser,
      user,
    ]
  );

  const addAnswer = useCallback(
    async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      await rtcPeerObject.current?.setRemoteDescription(answer);
    },
    []
  );

  const addNewIceCandidate = useCallback(
    (iceCandidate: RTCIceCandidateInit) => {
      console.log("answer")
      console.log({iceCandidate})
      rtcPeerObject.current?.addIceCandidate(iceCandidate);
    },
    []
  );

  useEffect(() => {
    socket.on("receivedIceCandidateFromServer", addNewIceCandidate);
    return () => {
      socket.removeListener(
        "receivedIceCandidateFromServer",
        addNewIceCandidate
      );
    };
  }, [addNewIceCandidate]);

  useEffect(() => {
    socket.on("newOfferAwaiting", answerOffer);
    return () => {
      socket.removeListener("newOfferAwaiting", answerOffer);
    };
  }, [answerOffer]);

  useEffect(() => {
    socket.on("answerResponse", addAnswer);
    return () => {
      socket.removeListener("answerResponse", addAnswer);
    };
  }, [addAnswer]);

  useEffect(() => {
    if (user) {
      const fetchMessages = async () => {
        const allMessages = await getMessages(user.id, selectedUser.id);
        setMessages(selectedUser.id, allMessages);
      };

      fetchMessages();
    }
  }, [selectedUser.id, setMessages, user]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=random"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{selectedUser.name}</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer hover:bg-gray-100"
            title="Audio Call"
            onClick={() => call(false)}
          >
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer hover:bg-gray-100"
            title="Video Call"
            onClick={() => {
              call(true);
            }}
          >
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-gray-50 h-72">
        <div className="space-y-4">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.owner === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  msg.owner === "me"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white shadow-sm rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.owner === "me" ? "text-purple-100" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>

          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="min-h-[40px] max-h-[100px] py-2 pr-10 resize-none border-gray-300 rounded-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-0 flex items-center justify-center"
              disabled={!message.trim()}
              onClick={handleSendMessage}
            >
              {message.trim() ? (
                <Send className="h-5 w-5 text-purple-600" />
              ) : (
                <Mic className="h-5 w-5 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <video ref={myVideo} width="320" height="240" controls autoPlay></video>
        <video ref={remoteVideo} width="320" height="240" controls autoPlay></video>
      </div>
    </div>
  );
};
