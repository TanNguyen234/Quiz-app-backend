import User from "../../models/user.model";
import RoomChat from '../../models/room-chat.model'
import Chat from '../../models/chat.model'

export const handleAddFriend = async (
  id: string,
  userId: string
): Promise<void> => {
  //Thêm id của người gửi vào acceptFriend của B
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $addToSet: { acceptFriends: id },
    }
  );
  //Thêm id của người gửi vào requestFriends của người gửi(A)
  await User.updateOne(
    {
      _id: id,
    },
    {
      $addToSet: { requestFriends: userId },
    }
  );
};

export const handleCancelRequest = async (
  id: string,
  userId: string
): Promise<void> => {
  //Xóa id của người gửi trong acceptFriend của B
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        acceptFriends: id,
      },
    }
  );
  //Xóa id của người gửi trong requestFriends của người gửi(A)
  await User.updateOne(
    {
      _id: id,
    },
    {
      $pull: {
        requestFriends: userId,
      },
    }
  );
};

export const handleDenyFriend = async (
  id: string,
  userId: string
): Promise<void> => {
  //Xóa id của người gửi trong acceptFriend của B
  await User.updateOne(
    {
      _id: id,
    },
    {
      $pull: {
        acceptFriends: userId,
      },
    }
  );
  //Xóa id của người gửi trong requestFriends của người gửi(A)
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        requestFriends: id,
      },
    }
  );
};

export const handleAcceptFriend = async (
  id: string,
  userId: string
): Promise<void> => {
  //Tạo room chat
  const dataRoom = {
    typeRoom: "friend",
    users: [
      {
        user_id: userId,
        role: "superAdmin",
      },
      {
        user_id: id,
        role: "superAdmin",
      },
    ],
  };
  const roomChat = new RoomChat(dataRoom)
  await roomChat.save()
  //End Tạo room chat

  //Xóa id của người gửi trong acceptFriend của B
  const userBinA = await User.findOne({
    _id: userId,
    "friendList.user_id": id,
  });
  if (!userBinA) {
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          requestFriends: id,
        },
        $addToSet: {
          friendList: {
            user_id: id,
            room_chat_id: roomChat.id,
          },
        },
      }
    );
  }
  //Xóa id của người gửi trong requestFriends của người gửi(A)
  const userAinB = await User.findOne({
    _id: id,
    "friendList.user_id": userId,
  });
  if (!userAinB) {
    await User.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          acceptFriends: userId,
        },
        $addToSet: {
          friendList: {
            user_id: userId,
            room_chat_id: roomChat.id,
          },
        },
      }
    );
  }
};

export const handleDeleteFriend = async (
  id: string,
  userId: string
): Promise<void> => {
  await RoomChat.deleteMany({
    typeRoom: "friend",
    "users.user_id": { $all: [id, userId] }
  })
  // await RoomChat.deleteMany({
  //   typeRoom: "friend",
  //   "users.user_id": { $all: [id, userId] }
  // })
  //Xóa id của B trong friendList của A
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        friendList: {
          user_id: id,
        },
      },
    }
  );
  //Xóa id của A trong friendList của B
  await User.updateOne(
    {
      _id: id,
    },
    {
      $pull: {
        friendList: {
          user_id: userId,
        },
      },
    }
  );
};
