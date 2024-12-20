import { Room } from "../../model/Room";

test('given: valid values for room, when: room is created, then: room is created with those values', () => {
    const room = new Room({
        id: 1,
        name: "Main Auditorium",
        chairs: [1, 2, 3, 4, 5]
    });

    expect(room.getId()).toBe(1);
    expect(room.getName()).toBe("Main Auditorium");
    expect(room.getChairs()).toHaveLength(5);
    expect(room.getChairs()).toContain(1);
    expect(room.getChairs()).toContain(5);
});

test('given: RoomPrisma object, when: from() is called, then: Room instance is created', () => {
    const roomPrisma = {
        id: 2,
        name: "Conference Hall",
        chairs: [10, 20, 30]
    };

    const room = Room.from(roomPrisma);

    expect(room.getId()).toBe(2);
    expect(room.getName()).toBe("Conference Hall");
    expect(room.getChairs()).toHaveLength(3);
    expect(room.getChairs()).toContain(10);
    expect(room.getChairs()).toContain(30);
});
