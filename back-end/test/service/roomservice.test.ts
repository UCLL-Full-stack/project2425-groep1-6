import roomService from '../../service/Room.service';
import roomDb from '../../repository/Room.db';

jest.mock('../../repository/Room.db', () => ({
    getAllRooms: jest.fn(),
    getRoomById: jest.fn(),
}));

describe('Room Service', () => {
    const mockRoom = {
        id: 1,
        name: 'IMAX Theater',
        seats: 100,
    };

    test('getAllRooms: should return all rooms', async () => {
        (roomDb.getAllRooms as jest.Mock).mockResolvedValue([mockRoom]);

        const rooms = await roomService.getAllRooms();
        expect(rooms).toEqual([mockRoom]);
        expect(roomDb.getAllRooms).toHaveBeenCalledTimes(1);
    });

    test('getRoomById: should return the room when it exists', async () => {
        (roomDb.getRoomById as jest.Mock).mockResolvedValue(mockRoom);

        const room = await roomService.getRoomById(1);
        expect(room).toEqual(mockRoom);
        expect(roomDb.getRoomById).toHaveBeenCalledWith(1);
    });

    test('getRoomById: should throw an error when the room does not exist', async () => {
        (roomDb.getRoomById as jest.Mock).mockResolvedValue(null);

        await expect(roomService.getRoomById(999)).rejects.toThrow('Room with id 999 does not exist.');
        expect(roomDb.getRoomById).toHaveBeenCalledWith(999);
    });
});
