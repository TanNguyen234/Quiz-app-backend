import { Request, Response } from "express";
import RoomChat from "../models/room-chat.model";
import User from "../models/user.model";

interface RoomFriend {
  typeRoom: string;
  users: [
    {
      user_id: string;
      role: string;
    },
    {
      user_id: string;
      role: string;
    }
  ];
  info?: Object;
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
//[GET] /api/v1/rooms/
export const index = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const { id } = req.user;

  const rooms = await RoomChat.find({
    "users.user_id": id,
    deleted: false,
  });

  const newRooms = []

  for (var room of rooms) {
    if (room.typeRoom === "friend") {
      const userOther: any =
        room.users[0]?.user_id !== id
          ? room.users[0]?.user_id
          : room.users[1]?.user_id;
      if (userOther) {
        const user = await User.findOne({ _id: userOther }).select(
          "fullName avatar"
        );
        newRooms.push({
            ...room,
            info: user
        })
      }
    }
  }
  console.log(newRooms);

  if (!id || rooms.length === 0) {
    res.json({
      code: 400,
      message: "No Data",
    });
    return;
  }

  res.json({
    code: 200,
    data: newRooms,
  });
};

//[GET] /api/v1/rooms/:id
export const check = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  const id: string = req.params.id;

  if (!id) {
    res.json({
      code: 400,
      message: "Invalid ID",
    });
    return;
  }

  try {
    const room = await RoomChat.findOne({
      _id: id,
      deleted: false,
    });

    if (!room) {
      throw new Error("Could not find room");
    } else {
      res.json({
        code: 200,
        data: room,
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Invalid ID",
    });
  }
};
