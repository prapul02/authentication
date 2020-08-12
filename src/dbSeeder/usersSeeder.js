const users = require("../models/usersmodel");

const userData = [
  {
    email: "captain@gmail.com",
    password: "captain1",
    friend1 : "ironman",
    friend2 : "hulk",
    friend3 : "thor",
    friend4 : "blackwidow"
  },
  {
    email: "sachin@gmail.com",
    password: "captain2",
    friend1 : "ganguly",
    friend2 : "dravid",
    friend3 : "laxman",
    friend4 : "kumble"
  },
  {
    email: "john@gmail.com",
    password: "captain3",
    friend1 : "undertaker",
    friend2 : "randy",
    friend3 : "rock",
    friend4 : "roman"
  },
  {
    email: "javascript@gmail.com",
    password: "captain4",
    friend1 : "react",
    friend2 : "angular",
    friend3 : "node",
    friend4 : "vue"
  }
];

const usersSeeder = async () => {
  await users.sync({ force: true });

  userData.forEach(async (user) => {
    try {
      const result = await users.create(user);
      console.log(result.get());
    } catch (error) {
      console.log(error);
    }
  });
};

usersSeeder();
