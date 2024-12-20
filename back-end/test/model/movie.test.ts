import { Movie } from "../../model/Movie";

test('given: valid values for movie, when: movie is created, then: movie is created with those values', () => {
    const movie = new Movie({
        id: 1,
        name: "Inception",
        duration: new Date("2024-01-01T02:28:00"),
        playingdates: [new Date("2024-01-02T18:00:00"), new Date("2024-01-03T20:00:00")],
        genre: "Sci-Fi",
        summary: "A thief who steals corporate secrets through dream-sharing technology."
    });

    expect(movie.getId()).toBe(1);
    expect(movie.getName()).toBe("Inception");
    expect(movie.getDuration()).toEqual(new Date("2024-01-01T02:28:00"));
    expect(movie.getPlayingdates()).toHaveLength(2);
    expect(movie.getPlayingdates()).toContainEqual(new Date("2024-01-02T18:00:00"));
    expect(movie.getGenre()).toBe("Sci-Fi");
    expect(movie.getSummary()).toBe("A thief who steals corporate secrets through dream-sharing technology.");
});

test('given: MoviePrisma object, when: from() is called, then: Movie instance is created', () => {
    const moviePrisma = {
        id: 2,
        name: "Interstellar",
        duration: new Date("2024-01-01T02:49:00"),
        playingdates: [new Date("2024-01-04T18:00:00")],
        genre: "Adventure",
        summary: "A group of explorers travel through a wormhole in space to ensure humanity's survival."
    };

    const movie = Movie.from(moviePrisma);

    expect(movie.getId()).toBe(2);
    expect(movie.getName()).toBe("Interstellar");
    expect(movie.getDuration()).toEqual(new Date("2024-01-01T02:49:00"));
    expect(movie.getPlayingdates()).toHaveLength(1);
    expect(movie.getPlayingdates()).toContainEqual(new Date("2024-01-04T18:00:00"));
    expect(movie.getGenre()).toBe("Adventure");
    expect(movie.getSummary()).toBe("A group of explorers travel through a wormhole in space to ensure humanity's survival.");
});


test('given: a movie, when: genre is retrieved, then: correct genre is returned', () => {
    const movie = new Movie({
        id: 1,
        name: "Inception",
        duration: new Date("1970-01-01T02:28:00"), 
        playingdates: [new Date("2024-01-01"), new Date("2024-01-02")],
        genre: "Sci-Fi",
        summary: "A mind-bending thriller about dreams within dreams.",
    });

    expect(movie.getGenre()).toBe("Sci-Fi");
});

test('given: a movie with multiple playing dates, when: playing dates are retrieved, then: all dates are correct', () => {
    const playingDates = [new Date("2024-01-01"), new Date("2024-01-02")];
    const movie = new Movie({
        id: 2,
        name: "Interstellar",
        duration: new Date("1970-01-01T02:49:00"), 
        playingdates: playingDates,
        genre: "Adventure",
        summary: "A journey through space and time to save humanity.",
    });

    expect(movie.getPlayingdates()).toEqual(playingDates);
    expect(movie.getPlayingdates().length).toBe(2);
    expect(movie.getPlayingdates()[0]).toEqual(new Date("2024-01-01"));
});

test('given: a movie, when: name is retrieved, then: correct name is returned', () => {
    const movie = new Movie({
        id: 3,
        name: "The Matrix",
        duration: new Date("1970-01-01T02:16:00"),
        playingdates: [new Date("2024-03-01")],
        genre: "Action",
        summary: "A hacker discovers the truth about reality.",
    });

    expect(movie.getName()).toBe("The Matrix");
});

test('given: a movie, when: movie is created with no ID, then: ID is undefined', () => {
    const movie = new Movie({
        name: "The Dark Knight",
        duration: new Date("1970-01-01T02:32:00"), 
        playingdates: [new Date("2024-04-01"), new Date("2024-04-02")],
        genre: "Crime",
        summary: "Batman faces his greatest foe, the Joker.",
    });

    expect(movie.getId()).toBeUndefined();
});

test('given: two movies with identical properties, when: equality is checked, then: properties match', () => {
    const movie1 = new Movie({
        id: 4,
        name: "Dune",
        duration: new Date("1970-01-01T02:35:00"), 
        playingdates: [new Date("2024-05-01")],
        genre: "Science Fiction",
        summary: "A young man becomes the leader of a desert planet.",
    });

    const movie2 = new Movie({
        id: 4,
        name: "Dune",
        duration: new Date("1970-01-01T02:35:00"),
        playingdates: [new Date("2024-05-01")],
        genre: "Science Fiction",
        summary: "A young man becomes the leader of a desert planet.",
    });

    expect(movie1.getId()).toBe(movie2.getId());
    expect(movie1.getName()).toBe(movie2.getName());
    expect(movie1.getDuration()).toEqual(movie2.getDuration());
    expect(movie1.getPlayingdates()).toEqual(movie2.getPlayingdates());
    expect(movie1.getGenre()).toBe(movie2.getGenre());
    expect(movie1.getSummary()).toBe(movie2.getSummary());
});

test('given: invalid movie data, when: Movie is created, then: correct data is retained', () => {
    const invalidPlayingDates = [new Date("Invalid Date")];
    const movie = new Movie({
        id: 5,
        name: "Unknown",
        duration: new Date("Invalid Date"), 
        playingdates: invalidPlayingDates,
        genre: "",
        summary: "",
    });

    expect(movie.getName()).toBe("Unknown");
    expect(movie.getDuration().toString()).toBe("Invalid Date");
    expect(movie.getPlayingdates()[0].toString()).toBe("Invalid Date");
    expect(movie.getGenre()).toBe("");
    expect(movie.getSummary()).toBe("");
});
