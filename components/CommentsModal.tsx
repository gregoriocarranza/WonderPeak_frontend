import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Text,
  TextInput,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { formatDate } from "@/utils";
import i18n from "@/languages";
import { getUserById } from "@/services/userServices";

interface Comment {
  commentUuid: string;
  userUuid: string;
  text: string;
  createdAt: string;
}

interface CommentWithUser extends Comment {
  userData?: {
    name: string;
    lastname: string;
    profileImage: string;
  };
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  comments: Comment[];
  onSubmit: (text: string) => Promise<void>;
  isLoading?: boolean;
}

const CommentItem = ({ comment }: { comment: CommentWithUser }) => {
  const [userData, setUserData] = useState(comment.userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userData) {
          const response = await getUserById(comment.userUuid);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [comment.userUuid]);

  if (!userData) {
    return (
      <View style={styles.commentContainer}>
        <ActivityIndicator size="small" color={Colors.darkPurple} />
      </View>
    );
  }

  return (
    <View style={styles.commentContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: userData.profileImage }} style={styles.avatar} />
        <View>
          <Text className="font-psemibold">
            {userData.name} {userData.lastname}
          </Text>
          <Text className="font-pregular">{comment.text}</Text>
          <Text style={styles.date} className="font-pregular">
            {formatDate(comment.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const AddComment = ({
  onSubmit,
}: {
  onSubmit: (text: string) => Promise<void>;
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert(i18n.t("error"), i18n.t("commentCannotBeEmpty"));
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(comment);
      setComment("");
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      Alert.alert(i18n.t("error"), i18n.t("errorSendingComment"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder={i18n.t("writeAComment")}
        style={styles.input}
        multiline
        className="font-pregular"
      />
      <Pressable
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={styles.sendButton}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={Colors.darkPurple} />
        ) : (
          <Ionicons name="send" size={24} color={Colors.darkPurple} />
        )}
      </Pressable>
    </View>
  );
};

export default function CommentsModal({
  isVisible,
  onClose,
  comments,
  onSubmit,
  isLoading = false,
}: Props) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior={"height"} style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.handle} />
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.darkPurple} />
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.commentUuid}
              renderItem={({ item }) => <CommentItem comment={item} />}
              style={styles.commentsList}
            />
          )}
          <AddComment onSubmit={onSubmit} />
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.gray,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  commentsList: {
    maxHeight: "70%",
  },
  commentContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});
