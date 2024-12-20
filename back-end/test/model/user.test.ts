import { User } from "../../model/User";

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    const user = new User({
        id: 1,
        username: "testuser",
        password: "securepassword",
        email: "testuser@example.com",
        role: "admin"
    });

    expect(user.getId()).toBe(1);
    expect(user.getUsername()).toBe("testuser");
    expect(user.getEmail()).toBe("testuser@example.com");
    expect(user.getPassword()).toBe("securepassword");
    expect(user.getRole()).toBe("admin");
});

test('given: invalid values for user, when: validate is called, then: error is thrown', () => {
    expect(() => new User({
        username: "",
        password: "securepassword",
        email: "testuser@example.com",
        role: "user"
    })).toThrow("Username is required");

    expect(() => new User({
        username: "validuser",
        password: "",
        email: "testuser@example.com",
        role: "user"
    })).toThrow("Password is required");

    expect(() => new User({
        username: "validuser",
        password: "securepassword",
        email: "",
        role: "user"
    })).toThrow("Email is required");
});

test('given: UserPrisma object, when: from() is called, then: User instance is created', () => {
    const userPrisma = {
        id: 2,
        username: "anotheruser",
        password: "securepassword",
        email: "anotheruser@example.com",
        role: "guest"
    };

    const user = User.from(userPrisma);

    expect(user.getId()).toBe(2);
    expect(user.getUsername()).toBe("anotheruser");
    expect(user.getEmail()).toBe("anotheruser@example.com");
    expect(user.getPassword()).toBe("securepassword");
    expect(user.getRole()).toBe("guest");
});



test('given: user, when: role is changed, then: new role is retained', () => {
    const user = new User({
        id: 1,
        username: "adminuser",
        password: "adminpass",
        email: "adminuser@example.com",
        role: "admin",
    });

    expect(user.getRole()).toBe("admin");
});

test('given: invalid username, when: User is created, then: validation fails', () => {
    expect(() => new User({
        username: "",
        password: "securepassword",
        email: "email@example.com",
        role: "worker",
    })).toThrow("Username is required");
});

test('given: valid UserPrisma object, when: User.from() is called, then: object matches values', () => {
    const userPrisma = {
        id: 3,
        username: "validuser",
        password: "validpassword",
        email: "validuser@example.com",
        role: "guest",
    };

    const user = User.from(userPrisma);

    expect(user.getId()).toBe(3);
    expect(user.getUsername()).toBe("validuser");
    expect(user.getEmail()).toBe("validuser@example.com");
    expect(user.getPassword()).toBe("validpassword");
    expect(user.getRole()).toBe("guest");
});

test('given: two users, when: equality is checked, then: result is correct', () => {
    const user1 = new User({
        id: 1,
        username: "user1",
        password: "pass1",
        email: "user1@example.com",
        role: "user",
    });

    const user2 = new User({
        id: 1,
        username: "user1",
        password: "pass1",
        email: "user1@example.com",
        role: "user",
    });

    expect(user1.equals(user2)).toBe(true);
});

