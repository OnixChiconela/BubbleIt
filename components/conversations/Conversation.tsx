
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { Conversations, User } from '@/app'
import { router } from 'expo-router'
import Divider from '../Divider'
import Colors from '@/constants/Colors'
import Avatar from '../Avatar'
import { setParams } from 'expo-router/build/global-state/routing'

interface ConversationProps {
  data?: Conversations[]
  currentUser?: User

}

const Conversation: React.FC<ConversationProps> = ({
  // data,
  currentUser
}) => {
  const colorScheme = useColorScheme()
  const currentUserr = {
    id: "sgdsuid65i7sdhjhls",
    email: "jamil@gmail.com",
    image: "",
    displayName: "Jamil"
  }

  const data = [
    {
      id: "asjhajshdjas",
      title: "new message",
      unreadCount: 2,
      participants: [
        {
          userId: "ldshfkjdshf",
          conversationId: "asjhajshdjas",
          user: {
            id: "sadhhsdgashda4n",
            email: "otheruser@email.com",
            image: "",
            displayName: "James"
          }
        }
      ],
      messages: [
        {
          id: "djhsladjhsajld",
          senderId: currentUserr.id,
          content: "Hi this's message from current user yho",
          timeStamp: new Date(2024),
          receiver: {
            id: "sadhhsdgashda4n",
            email: "email@gmail.com",
            displayName: "James"
          }
        },
        {
          id: "asdhgahdasld",
          senderId: "sadhhsdgashda4n",
          content: "this can be a long conversation if you wont pay me, your bitch ass",
          timeStamp: new Date(2024 - 12),
          receiver: {
            id: currentUserr.id,
            email: "email@gmail.com"
          }
        }
      ]
    }
  ]
  currentUser = currentUserr
  return (
    <View>
      {data && data?.map((conversation) => {
        const otherParticipant = conversation.participants?.find(
          (participant) => participant.userId !== currentUser?.id
        )
        const sortedMessages = conversation.messages.sort((a, b) =>
          new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime())
        const lastMessage = sortedMessages[0]?.content || 'Nenhuma mensagem ainda';

        const handleChat = (id: string, receiverId?: string, name?: string) => {
          router.push("/messages/Chat")
          router.setParams({ id, receiverId, name })
          console.log(id)
        }

        return (
          <View key={conversation.id}>
            <TouchableOpacity
              onPress={() => handleChat(conversation.id, otherParticipant?.userId, otherParticipant?.user.email)}
              onLongPress={() => console.log("Era suposto acontecer algo")}
            // onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} // Feedback tátil
            >
              <View style={styles.conversationContainer}>
                <View style={styles.container}>
                  <Avatar height={50} width={50} src={otherParticipant?.user.image} />
                  <View style={{ flexDirection: "column", gap: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {otherParticipant?.user?.email || `${otherParticipant?.user?.email} ${otherParticipant?.user?.displayName}` || "Usuário Desconhecido"}
                    </Text>
                    <Text style={{ fontWeight: "light", color: Colors.gray }}>
                      {lastMessage.slice(0, 45)}{lastMessage?.length > 45 ? '...' : ''}
                    </Text>
                  </View>
                </View>

                <View style={{ position: "relative" }}>
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{conversation.unreadCount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Divider />
            </View>
          </View>
        )
      })}
    </View>
  )

  //   const handleChat = () => {
  //     router.push("/messages/Chat")
  //   }
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         onPress={() => handleChat()}
  //         onLongPress={() => console.log("Era suposto acontecer algo")}
  //       // onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} // Feedback tátil
  //       >
  //         <View style={styles.conversationContainer}>
  //           <View style={styles.container}>
  //             <Avatar height={50} width={50} src={""} />
  //             <View style={{ flexDirection: "column", gap: 5 }}>
  //               <Text style={{ fontSize: 16, fontWeight: "600", color: colorScheme == "dark" ? "#fff" : Colors.text1 }}>
  //                 User name
  //               </Text>
  //               <Text style={{ fontWeight: "light", color: colorScheme == "dark" ? Colors.lightGray : Colors.gray   }}>
  //                 last message received in this damn chat
  //               </Text>
  //             </View>
  //           </View>

  //           <View style={{ position: "relative" }}>
  //             <View style={styles.notificationBadge}>
  //               <Text style={styles.notificationText}>2</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //       <View style={{}}>
  //         <Divider />
  //       </View>

  //       <TouchableOpacity
  //         // onPress={() => handleChat(conversation.id, otherParticipant?.userId, otherParticipant?.user.email)}
  //         onLongPress={() => console.log("Era suposto acontecer algo")}
  //       // onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} // Feedback tátil
  //       >
  //         <View style={styles.conversationContainer}>
  //           <View style={styles.container}>
  //             <Avatar height={50} width={50} src={""} />
  //             <View style={{ flexDirection: "column", gap: 5 }}>
  //               <Text style={{ fontSize: 16, fontWeight: "600" }}>
  //                 Name User
  //               </Text>
  //               <Text style={{ fontWeight: "light", color: Colors.gray }}>
  //                 last message received in this damn chat...
  //               </Text>
  //             </View>
  //           </View>

  //           <View style={{ position: "relative" }}>
  //             <View style={styles.notificationBadge}>
  //               <Text style={styles.notificationText}>5</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   )
}

export default Conversation

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  conversationContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between"
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EC615C',
    padding: 5,
    borderRadius: 10,
    minWidth: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})