import { Room } from '../model/Room';
import roomDb from '../repository/Room.db';

const getAllRooms = async (): Promise<Room[]> => {
    return roomDb.getAllRooms();
};

const getRoomById = async (id: number): Promise<Room> => {
    const room = await roomDb.getRoomById(id);
    if (!room) {
        throw new Error(`Room with id ${id} does not exist.`);
    }
    return room;
};

export default {
    getAllRooms,
    getRoomById,
};
